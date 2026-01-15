// animations.js - Scroll animations and interactive effects

class ScrollAnimations {
  constructor() {
    this.init();
  }

  init() {
    // Set up Intersection Observer for fade-in animations
    this.setupFadeInObserver();

    // Initialize smooth scroll for anchor links
    this.initSmoothScroll();

    // Initialize card hover effects
    this.initCardEffects();
  }

  setupFadeInObserver() {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    };

    this.fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add visible class with a slight delay based on data attribute
          const delay = parseInt(entry.target.style.transitionDelay) || 0;

          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);

          // Unobserve after animation triggered
          this.fadeObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
      this.fadeObserver.observe(el);
    });

    // Re-observe dynamically added elements
    this.setupMutationObserver();
  }

  setupMutationObserver() {
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) { // Element node
            // Check if the node itself has fade-in class
            if (node.classList && node.classList.contains('fade-in')) {
              this.fadeObserver.observe(node);
            }
            // Check descendants
            if (node.querySelectorAll) {
              node.querySelectorAll('.fade-in').forEach(el => {
                this.fadeObserver.observe(el);
              });
            }
          }
        });
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();

          // Calculate offset for sticky header
          const headerHeight = document.querySelector('header')?.offsetHeight || 0;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  initCardEffects() {
    // Add subtle mouse-follow gradient effect to cards
    document.querySelectorAll('.card-glow').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
      });
    });
  }
}

// Parallax effect for background elements (optional, performance-conscious)
class ParallaxBackground {
  constructor() {
    this.elements = document.querySelectorAll('[data-parallax]');
    if (this.elements.length === 0) return;

    this.init();
  }

  init() {
    // Use passive listener for better scroll performance
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateParallax();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  updateParallax() {
    const scrollY = window.pageYOffset;

    this.elements.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.5;
      const offset = scrollY * speed;
      el.style.transform = `translateY(${offset}px)`;
    });
  }
}

// Header scroll effect - add background opacity on scroll
class HeaderScrollEffect {
  constructor() {
    this.header = document.querySelector('header');
    if (!this.header) return;

    this.init();
  }

  init() {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateHeader();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    // Initial check
    this.updateHeader();
  }

  updateHeader() {
    const scrollY = window.pageYOffset;

    if (scrollY > 50) {
      this.header.classList.add('bg-moonote-dark/95');
      this.header.classList.remove('bg-moonote-dark/80');
    } else {
      this.header.classList.remove('bg-moonote-dark/95');
      this.header.classList.add('bg-moonote-dark/80');
    }
  }
}

// Initialize all animations when DOM is ready
function initAnimations() {
  new ScrollAnimations();
  new ParallaxBackground();
  new HeaderScrollEffect();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAnimations);
} else {
  initAnimations();
}

export { ScrollAnimations, ParallaxBackground, HeaderScrollEffect };
