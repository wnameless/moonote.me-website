// particles.js - Lightweight particle background system
class ParticleSystem {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouseX = 0;
    this.mouseY = 0;
    this.isMouseOver = false;

    // Colors from logo palette
    this.colors = [
      { r: 0, g: 229, b: 255 },    // cyan #00e5ff
      { r: 171, g: 71, b: 188 },   // purple #ab47bc
      { r: 124, g: 77, b: 255 },   // blue-purple #7c4dff
      { r: 224, g: 64, b: 251 },   // bright purple #e040fb
    ];

    this.init();
    this.animate();
    this.addEventListeners();
  }

  init() {
    this.resize();
    this.createParticles();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    // Calculate particle count based on screen size (lower density for performance)
    const area = this.canvas.width * this.canvas.height;
    const particleCount = Math.min(Math.floor(area / 20000), 80);

    this.particles = [];

    for (let i = 0; i < particleCount; i++) {
      const color = this.colors[Math.floor(Math.random() * this.colors.length)];

      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1,
        color: color,
        alpha: Math.random() * 0.4 + 0.1,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.01
      });
    }
  }

  drawParticles() {
    this.particles.forEach(p => {
      // Pulsing alpha effect
      const pulseAlpha = p.alpha + Math.sin(p.pulsePhase) * 0.1;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${pulseAlpha})`;
      this.ctx.fill();

      // Optional glow effect for larger particles
      if (p.radius > 1.5) {
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius * 2, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${pulseAlpha * 0.2})`;
        this.ctx.fill();
      }
    });
  }

  drawConnections() {
    const maxDistance = 120;

    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          const alpha = (1 - distance / maxDistance) * 0.15;

          // Create gradient line between particles
          const gradient = this.ctx.createLinearGradient(
            this.particles[i].x, this.particles[i].y,
            this.particles[j].x, this.particles[j].y
          );

          const c1 = this.particles[i].color;
          const c2 = this.particles[j].color;

          gradient.addColorStop(0, `rgba(${c1.r}, ${c1.g}, ${c1.b}, ${alpha})`);
          gradient.addColorStop(1, `rgba(${c2.r}, ${c2.g}, ${c2.b}, ${alpha})`);

          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.strokeStyle = gradient;
          this.ctx.lineWidth = 1;
          this.ctx.stroke();
        }
      }
    }

    // Draw connections to mouse position when hovering
    if (this.isMouseOver) {
      this.particles.forEach(p => {
        const dx = this.mouseX - p.x;
        const dy = this.mouseY - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          const alpha = (1 - distance / 150) * 0.3;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(this.mouseX, this.mouseY);
          this.ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
          this.ctx.lineWidth = 1;
          this.ctx.stroke();
        }
      });
    }
  }

  updateParticles() {
    this.particles.forEach(p => {
      // Update position
      p.x += p.vx;
      p.y += p.vy;

      // Update pulse phase
      p.pulsePhase += p.pulseSpeed;

      // Boundary wrapping (seamless)
      if (p.x < -10) p.x = this.canvas.width + 10;
      if (p.x > this.canvas.width + 10) p.x = -10;
      if (p.y < -10) p.y = this.canvas.height + 10;
      if (p.y > this.canvas.height + 10) p.y = -10;

      // Mouse interaction - particles gently pushed away
      if (this.isMouseOver) {
        const dx = p.x - this.mouseX;
        const dy = p.y - this.mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100 && dist > 0) {
          const force = (100 - dist) / 100 * 0.02;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
      }

      // Velocity dampening to prevent excessive speed
      p.vx *= 0.99;
      p.vy *= 0.99;

      // Maintain minimum movement
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (speed < 0.1) {
        p.vx += (Math.random() - 0.5) * 0.1;
        p.vy += (Math.random() - 0.5) * 0.1;
      }
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.updateParticles();
    this.drawConnections();
    this.drawParticles();

    requestAnimationFrame(() => this.animate());
  }

  addEventListeners() {
    // Resize handler with debounce
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.resize();
        this.createParticles();
      }, 250);
    });

    // Mouse tracking
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.isMouseOver = true;
    });

    document.addEventListener('mouseleave', () => {
      this.isMouseOver = false;
    });

    // Reduce animation when tab is not visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.particles.forEach(p => {
          p.vx *= 0.5;
          p.vy *= 0.5;
        });
      }
    });
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem('particle-canvas');
  });
} else {
  new ParticleSystem('particle-canvas');
}

export default ParticleSystem;
