# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Gatsby 5-based medical education platform for Dr. Daniel Sufficool, focusing on evidence-based cancer treatment information with interactive visualizations and progressive content disclosure.

## Development Commands

```bash
# Install dependencies (using pnpm)
pnpm install

# Development server (runs on PORT from .env, default 8526)
pnpm run develop
pnpm run dev                  # Alias for develop
pnpm run start               # Alias for develop

# Production build
pnpm run build               # Create production build
pnpm run build:analyze       # Build with bundle analyzer
pnpm run serve              # Serve production build locally

# Code quality
pnpm run typecheck          # TypeScript type checking
pnpm run clean              # Clean Gatsby cache and public folder

# Performance testing
pnpm run perf               # Build and serve for performance testing
pnpm run lighthouse         # Generate Lighthouse report

# Content generation scripts
pnpm run create-content                 # Interactive content creation
pnpm run content:treatment <type>       # Create treatment page
pnpm run content:journey <phase>        # Create journey phase
pnpm run content:hub <cancer-type>      # Create cancer type hub
pnpm run content:calculator <name>      # Create calculator page
pnpm run content:shared <topic>         # Create shared content
pnpm run content:wizard                 # Interactive content wizard
pnpm run content:list                   # List all content types
```

## Architecture Overview

### Tech Stack
- **Gatsby 5.14** - Static site generator with React 18
- **TypeScript** - Strict mode enabled with path aliases (`@/*` → `src/*`)
- **Tailwind CSS 4** - Utility-first styling with typography and forms plugins
- **MDX 2.3** - Markdown with embedded React components
- **Three.js & D3.js** - 3D anatomy visualizations and medical data charts
- **Framer Motion** - Animations for progressive content disclosure

### Project Structure
```
src/
├── components/
│   ├── Layout.tsx              # Main layout wrapper
│   ├── SEO.tsx                # SEO meta tags
│   ├── MDXProvider.tsx        # MDX component mapping
│   └── medical/               # 28+ lazy-loaded medical components
│       ├── index.ts           # Component exports and collection
│       └── types/             # TypeScript interfaces
├── content/                   # MDX content files
│   ├── about/                # Site information
│   ├── cancer-types/         # Cancer-specific content
│   │   └── {type}/
│   │       ├── index.mdx     # Cancer type hub page
│   │       ├── journey/      # Treatment journey phases
│   │       └── treatments/   # Treatment options
│   └── shared/               # Reusable medical content
├── templates/                # Page templates
│   ├── default.tsx          # Standard MDX page
│   └── cancer-type-hub.tsx # Cancer type landing page
├── pages/                   # Gatsby pages
├── styles/                  # Global CSS
└── utils/                   # Utility functions
```

### Key Architectural Patterns

#### Component Lazy Loading
All medical components are lazy-loaded via `src/components/medical/index.ts` to optimize initial bundle size. Components are split into:
- **Anatomy & Visualization**: AnatomyDiagram, DoseDistribution, TreatmentTimeline
- **Patient Journey**: PatientJourney, JourneyPhase, JourneyChecklist
- **Evidence & Information**: Evidence, EvidenceCard, CitationManager
- **Interactive Tools**: DecisionTree, RiskCalculator, OutcomePredictor
- **Content Enhancement**: GlossaryTerm, MedicalDiagram, ProgressiveContent

#### Bundle Optimization
Webpack configuration in `gatsby-node.ts` creates optimized chunks:
- `medical-components`: All medical React components
- `visualization-libs`: Three.js, D3.js, and related libraries
- `vendor`: React, Gatsby core dependencies
- `commons`: Shared utilities and smaller libraries

#### MDX Integration
- MDX files in `src/content/` automatically generate pages
- Frontmatter required: `slug`, `category`, `cancerType` (optional)
- Medical components available in MDX via lazy imports
- Images processed through gatsby-remark-images with WebP/AVIF support

#### Progressive Content Disclosure
Content adapts to user expertise level:
- **Essential**: Basic patient-friendly information
- **Detailed**: Comprehensive explanations
- **Technical**: Clinical/medical professional level

## Medical Content Guidelines

### Evidence Standards
- All medical claims must include citations via Evidence component
- Include PMID/DOI when available
- Specify evidence levels (1A, 1B, 2A, etc.)
- Use CitationManager for bibliography generation

### Component Usage in MDX
```mdx
import { PatientJourney, Evidence, TreatmentComparison } from '@/components/medical'

<PatientJourney cancerType="prostate" stage="T2a" />

<Evidence 
  level="1A"
  pmid="35835857"
  summary="SBRT shows equivalent outcomes to conventional fractionation"
/>

<TreatmentComparison 
  treatments={['SBRT', 'IMRT', 'Surgery']}
  outcomes={['5-year survival', 'Side effects', 'Quality of life']}
/>
```

### Content Creation Scripts
Use the provided scripts to maintain consistency:
```bash
# Create new treatment page with template
pnpm run content:treatment prostate/sbrt

# Create journey phase with checklist
pnpm run content:journey diagnosis

# Interactive wizard for complex content
pnpm run content:wizard
```

## Environment Configuration

### Development
- **PORT**: Set in `.env` file (default 8526)
- **Hot Reload**: Enabled with Gatsby's development server
- **GraphQL Playground**: Available at `http://localhost:8526/___graphql`

### Production Build
- Static site generation with automatic code splitting
- Image optimization via Sharp with WebP/AVIF formats
- Sitemap generation with medical content prioritization
- PWA manifest for offline capabilities

## TypeScript Configuration

- **Strict Mode**: All strict checks enabled
- **Path Aliases**: `@/*` maps to `src/*`
- **GraphQL Types**: Auto-generated via `graphqlTypegen: true`
- **Component Props**: Use interfaces, not type aliases

## Performance Considerations

### Image Optimization
- Use gatsby-plugin-image for responsive images
- Configure in MDX: `maxWidth: 1200`, `quality: 90`
- Lazy loading enabled by default
- WebP and AVIF formats auto-generated

### Code Splitting
- Medical components lazy-loaded on demand
- Three.js/D3 in separate visualization bundle
- Maximum chunk sizes: Entry 500KB, Assets 300KB

### SEO Optimization
- Sitemap with medical content prioritization
- Structured data for medical content
- Meta tags managed via SEO component
- robots.txt configured for search engines

## Testing & Quality

### Type Checking
```bash
pnpm run typecheck   # Run TypeScript compiler without emit
```

### Bundle Analysis
```bash
pnpm run build:analyze   # Visualize bundle composition
```

### Performance Testing
```bash
pnpm run lighthouse   # Generate Lighthouse report
```

## Common Development Tasks

### Adding a New Medical Component
1. Create component in `src/components/medical/`
2. Add lazy import to `src/components/medical/index.ts`
3. Export both named and in MedicalComponents collection
4. Use TypeScript interfaces for props
5. Follow progressive disclosure pattern

### Creating Cancer Type Content
1. Create directory: `src/content/cancer-types/{type}/`
2. Add `index.mdx` with frontmatter
3. Use cancer-type-hub template for landing pages
4. Organize treatments and journey phases in subdirectories

### Implementing Interactive Features
1. Use Three.js via @react-three/fiber for 3D visualizations
2. D3.js for medical data charts and graphs
3. Framer Motion for content animations
4. Maintain performance with lazy loading

## Deployment Notes

- Build outputs to `public/` directory
- All assets optimized and hashed for caching
- Supports deployment to Gatsby Cloud, Netlify, Vercel
- Environment variables loaded via dotenv

## Medical Compliance

- **HIPAA**: No patient data stored or processed
- **Disclaimer**: MedicalDisclaimer component required on all pages
- **Evidence-Based**: All content must cite medical literature
- **Accessibility**: WCAG 2.1 AA compliance for medical content
- remeber to always use 192.168.1.71 instead of localhost for playwright mcp
- Use SequentialThinking MCP with every task, use context7 mcp whenever you are about to code to find similar examples and see if they are pertinent prior to beginning for reference.
- everytime you make a change to the website, check the formatting and look is as you expected with playwright and playwright screenshots. Use 192.168.1.71 instead of localhost