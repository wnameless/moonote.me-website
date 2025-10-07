# Data Model: Company Description & Services Page

**Feature**: 002-my-company-decription
**Date**: 2025-10-07

## Overview

This document defines the data structures for the company description page. All content is stored in a single JSON file (`data/content.json`) with support for 4 languages: English (en), Traditional Chinese (zh-TW), Simplified Chinese (zh-CN), and Thai (th).

## JSON Schema

### Root Structure

```json
{
  "en": { /* English content */ },
  "zh-TW": { /* Traditional Chinese content */ },
  "zh-CN": { /* Simplified Chinese content */ },
  "th": { /* Thai content */ }
}
```

Each language object contains identical keys with translated values.

---

## ContentData Entity (Per Language)

### Fields

#### Company Overview
- `companyName`: string - Company legal name
- `companyNameChinese`: string (zh-TW, zh-CN only) - Chinese legal name
- `tagline`: string - Company tagline/slogan
- `aboutUs`: object
  - `title`: string - Section heading
  - `description`: string - Company description paragraph

#### Framework Features
- `frameworkFeatures`: array of objects
  - `title`: string - Section heading ("Self-Developed Framework Technology")
  - `items`: array of objects
    - `name`: string - Feature name
    - `description`: string - Feature description

#### Functional Modules
- `functionalModules`: object
  - `title`: string - Section heading ("Functional Modules Library")
  - `modules`: array of objects
    - `name`: string - Module name (e.g., "Supplier Management")
    - `description`: string - Short description
    - `capabilities`: array of strings - List of key capabilities

#### Industry Solutions
- `industrySolutions`: object
  - `title`: string - Section heading ("Industry Solutions")
  - `solutions`: array of objects
    - `name`: string - Solution name (e.g., "Chemical Management System")
    - `modules`: array of strings - List of module names used
    - `industries`: array of strings - Target industries

#### Technical Innovation
- `technicalCapabilities`: object
  - `title`: string - Section heading ("Technical Innovation")
  - `items`: array of strings - List of capabilities

#### Development Efficiency
- `developmentEfficiency`: object
  - `title`: string - Section heading ("Development Efficiency")
  - `items`: array of strings - List of efficiency advantages

#### Company Commitments
- `commitments`: object
  - `title`: string - Section heading ("Our Commitments")
  - `items`: array of objects
    - `title`: string - Commitment name
    - `description`: string - Commitment description

#### Contact Information
- `contactInfo`: object
  - `email`: string - Email address (same across all languages: "info@moonote.me")
  - `phone`: string - Phone number (same across all languages: "(+886) 02-23956600")
  - `address`: string - English address
  - `addressChinese`: string (zh-TW, zh-CN only) - Chinese address

#### UI Labels (for language toggle, buttons, etc.)
- `ui`: object
  - `languageToggle`: string - "Language" label
  - `switchLanguage`: string - "Switch Language" tooltip

---

## Complete JSON Example

```json
{
  "en": {
    "companyName": "Moonote Co., Ltd.",
    "tagline": "Building Tomorrow's Enterprise Solutions Today",
    "aboutUs": {
      "title": "About Us",
      "description": "Moonote Co., Ltd. is a software technology company focused on enterprise application development frameworks and industry-specific solutions. We are committed to providing efficient, secure, and scalable information management systems for academic research institutions, medical organizations, and corporate clients."
    },
    "frameworkFeatures": {
      "title": "Self-Developed Framework Technology",
      "items": [
        {
          "name": "Out-of-box RESTful API Operations",
          "description": "Standard REST operations ready to use without configuration."
        },
        {
          "name": "Dynamic Data-Driven Form Integration",
          "description": "Zero frontend development required for form generation."
        },
        {
          "name": "NoSQL Database Enhanced Support",
          "description": "Includes audit trails and advanced filtering capabilities."
        },
        {
          "name": "Built-in Permissions Management",
          "description": "Multi-tenant architecture with role-based access control."
        },
        {
          "name": "Modern Frontend-Backend Integration",
          "description": "Seamless user experience with cutting-edge technology."
        }
      ]
    },
    "functionalModules": {
      "title": "Functional Modules Library",
      "modules": [
        {
          "name": "Supplier Management",
          "description": "Comprehensive vendor management system",
          "capabilities": [
            "Vendor data maintenance",
            "Product catalog management",
            "Procurement tracking"
          ]
        },
        {
          "name": "Inventory Management",
          "description": "Real-time inventory tracking and alerts",
          "capabilities": [
            "Real-time inventory monitoring",
            "In/out records",
            "Stock alerts"
          ]
        },
        {
          "name": "Application Workflow",
          "description": "Multi-stage workflow management",
          "capabilities": [
            "Multi-stage workflows",
            "Online form submission",
            "Automatic review assignment"
          ]
        },
        {
          "name": "Review Management",
          "description": "Committee and decision tracking system",
          "capabilities": [
            "Committee management",
            "Review opinion consolidation",
            "Decision tracking"
          ]
        },
        {
          "name": "Version Control",
          "description": "Document history and change management",
          "capabilities": [
            "Document history tracking",
            "Change tracking",
            "Revision management"
          ]
        },
        {
          "name": "Organization Permissions",
          "description": "Hierarchical access control system",
          "capabilities": [
            "Hierarchical organization structure",
            "Role inheritance",
            "Fine-grained permission control"
          ]
        },
        {
          "name": "Compliance Tracking",
          "description": "Regulatory compliance management",
          "capabilities": [
            "Regulatory standards management",
            "Security audits",
            "Report generation"
          ]
        },
        {
          "name": "Waste Disposal",
          "description": "Waste management and compliance reporting",
          "capabilities": [
            "Waste classification",
            "Disposal procedures",
            "Compliance reporting"
          ]
        }
      ]
    },
    "industrySolutions": {
      "title": "Industry Solutions",
      "solutions": [
        {
          "name": "Chemical Management System",
          "modules": ["Supplier Management", "Inventory Management", "Organization Permissions", "Compliance Tracking", "Waste Disposal"],
          "industries": ["Academic research institutions", "Chemical enterprises", "Laboratory management units"]
        },
        {
          "name": "Research Ethics Review System",
          "modules": ["Application Workflow", "Review Management", "Version Control", "Organization Permissions"],
          "industries": ["University ethics committees", "Medical institutions", "Research units"]
        },
        {
          "name": "Enterprise Procurement Management System",
          "modules": ["Supplier Management", "Application Workflow", "Inventory Management", "Organization Permissions"],
          "industries": ["Medium to large enterprises", "Government agencies", "Medical institutions"]
        },
        {
          "name": "Document Review Platform",
          "modules": ["Application Workflow", "Review Management", "Version Control", "Organization Permissions"],
          "industries": ["Publishing industry", "Educational institutions", "Certification organizations"]
        }
      ]
    },
    "technicalCapabilities": {
      "title": "Technical Innovation",
      "items": [
        "Latest enterprise technology stack and development standards",
        "Type-safe dynamic query construction",
        "High-performance object conversion and data mapping",
        "Enterprise authentication protocols (cloud auth, enterprise SSO)",
        "Complete data version tracking and audit system"
      ]
    },
    "developmentEfficiency": {
      "title": "Development Efficiency",
      "items": [
        "Dynamic code generation (70% reduction in repetitive work)",
        "Schema-driven UI automatic generation",
        "Comprehensive test coverage and continuous integration",
        "Modular architecture design for easy maintenance and expansion"
      ]
    },
    "commitments": {
      "title": "Our Commitments",
      "items": [
        {
          "title": "Self-Developed Technology",
          "description": "Core framework completely self-developed, independent from third-party frameworks"
        },
        {
          "title": "Open-Source Spirit",
          "description": "Some frameworks are open-sourced to contribute back to the developer community"
        },
        {
          "title": "Continuous Innovation",
          "description": "Keeping pace with technology trends, adopting the latest stable technologies"
        },
        {
          "title": "Professional Support",
          "description": "Deep understanding of industry needs, providing customized solutions"
        }
      ]
    },
    "contactInfo": {
      "email": "info@moonote.me",
      "phone": "(+886) 02-23956600",
      "address": "2F, No. 31, Sec. 2, Nanchang Rd., Taipei 100, Taiwan",
      "addressChinese": "100 台北市南昌路二段31號2樓"
    },
    "ui": {
      "languageToggle": "Language",
      "switchLanguage": "Switch Language"
    }
  },
  "zh-TW": {
    "companyName": "月本股份有限公司",
    "companyNameChinese": "月本股份有限公司",
    "tagline": "打造明日企業解決方案",
    "aboutUs": {
      "title": "關於我們",
      "description": "月本股份有限公司是一家專注於企業級應用開發框架與行業解決方案的軟體科技公司。我們致力於為學術研究機構、醫療組織及企業客戶提供高效、安全、可擴展的資訊管理系統。"
    },
    "frameworkFeatures": {
      "title": "自主研發框架技術",
      "items": [
        {
          "name": "開箱即用的 RESTful API 標準操作",
          "description": "無需配置即可使用的標準 REST 操作。"
        }
        /* ... additional Chinese translations ... */
      ]
    }
    /* ... rest of Traditional Chinese content ... */
  },
  "zh-CN": {
    /* Simplified Chinese translations */
  },
  "th": {
    /* Thai translations */
  }
}
```

---

## LanguagePreference Entity (localStorage)

**Storage Location**: `localStorage.preferredLanguage`

**Format**: String value, one of: `"en"`, `"zh-TW"`, `"zh-CN"`, `"th"`

**Lifecycle**:
- Set on first page visit (via browser language detection)
- Updated when user manually changes language
- Persists indefinitely until cleared or overridden

**Example**:
```javascript
// Get
const lang = localStorage.getItem('preferredLanguage'); // "zh-TW"

// Set
localStorage.setItem('preferredLanguage', 'en');
```

---

## Validation Rules

### Required Fields (all languages must have):
- `companyName`
- `tagline`
- `aboutUs.title` and `aboutUs.description`
- `frameworkFeatures.title` and `frameworkFeatures.items` (5 items)
- `functionalModules.title` and `functionalModules.modules` (8 modules)
- `industrySolutions.title` and `industrySolutions.solutions` (4 solutions)
- `technicalCapabilities.title` and `technicalCapabilities.items`
- `developmentEfficiency.title` and `developmentEfficiency.items`
- `commitments.title` and `commitments.items` (4 commitments)
- `contactInfo.email`, `contactInfo.phone`, `contactInfo.address`
- `ui.languageToggle`, `ui.switchLanguage`

### Invariant Fields (same across all languages):
- `contactInfo.email`
- `contactInfo.phone`

### Optional Fields:
- `companyNameChinese` (only for zh-TW and zh-CN)
- `contactInfo.addressChinese` (only for zh-TW and zh-CN)

### Array Length Constraints:
- `frameworkFeatures.items`: exactly 5 items
- `functionalModules.modules`: exactly 8 items
- `industrySolutions.solutions`: exactly 4 items
- `commitments.items`: exactly 4 items

---

## Data Flow

```
1. Page Load
   ↓
2. Detect Language (localStorage → navigator.language → default zh-TW)
   ↓
3. Fetch data/content.json
   ↓
4. Parse JSON
   ↓
5. Extract content for detected language (e.g., data["zh-TW"])
   ↓
6. Render page with language-specific content
   ↓
7. User clicks language toggle
   ↓
8. Update current language
   ↓
9. Re-render page with new language content (from same JSON)
   ↓
10. Save preference to localStorage
```

---

## File Structure

```
data/
└── content.json    # Single file, ~30-50KB (all 4 languages)
```

**Future Optimization** (if file grows >100KB):
```
data/
├── en.json         # English content
├── zh-TW.json      # Traditional Chinese content
├── zh-CN.json      # Simplified Chinese content
└── th.json         # Thai content
```

Then load only the required language file on demand:
```javascript
const data = await fetch(`/data/${currentLang}.json`).then(r => r.json());
```

---

## Entity Relationships

```
ContentData (JSON)
  ↓
  ├── Company Overview (companyName, tagline, aboutUs)
  ├── Framework Features (5 items)
  ├── Functional Modules (8 modules)
  │     ↓ referenced by
  ├── Industry Solutions (4 solutions, each references modules)
  ├── Technical Capabilities (list)
  ├── Development Efficiency (list)
  ├── Commitments (4 items)
  ├── Contact Info (email, phone, addresses)
  └── UI Labels (language toggle text)

LanguagePreference (localStorage)
  → controls which ContentData language is displayed
```

---

## Notes for Content Editors

1. **Editing Content**: Open `data/content.json` in any text editor
2. **Adding Translations**: Ensure all language objects have matching keys
3. **Testing**: Validate JSON syntax before committing (use jsonlint.com or VS Code)
4. **Fallback**: If a translation is missing, the English version will be shown
5. **Commit Message**: Use descriptive messages like `"Update zh-TW module descriptions"`

---

## Next Steps (Phase 1)

1. Create `quickstart.md` with manual testing procedures
2. Generate sample `data/content.json` with placeholder content for all 4 languages
3. Update CLAUDE.md agent context file
