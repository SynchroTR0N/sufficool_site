# Contributing to Dr. Sufficool Medical Education Platform

This guide explains how to use the AI-assisted content creation workflow to generate high-quality medical education content for the platform.

## 🚀 Quick Start

### Using the Interactive Wizard (Recommended)

```bash
pnpm run content:wizard
```

The wizard will guide you through creating any type of content with prompts for all required information.

### Direct Content Creation

```bash
# Create a treatment page
pnpm run content:treatment prostate "SBRT" radiation

# Create a journey phase
pnpm run content:journey prostate diagnosis 1 "1-2 weeks"

# Create a cancer type hub
pnpm run content:hub bladder

# Create a calculator
pnpm run content:calculator prostate "Nomogram Risk Calculator"

# Create shared medical content
pnpm run content:shared medical-concept "Radiation Basics"
```

### List Available Templates

```bash
pnpm run content:list
```

## 📋 Content Types and Templates

### 1. Treatment Pages

**Purpose**: Detailed information about specific cancer treatments  
**Location**: `/src/content/cancer-types/{cancer-type}/treatments/`  
**Template**: `scripts/templates/treatment.mdx`

**Usage:**
```bash
pnpm run content:treatment <cancer-type> <treatment-name> [treatment-type]
```

**Example:**
```bash
pnpm run content:treatment prostate "Stereotactic Body Radiation Therapy" radiation
```

**Generates:**
- Progressive content (Essential → Detailed → Technical)
- Evidence component with supporting research
- Anatomy diagram specifications
- Treatment timeline
- Treatment comparison table
- Side effects table
- Question generator presets

### 2. Patient Journey Phases

**Purpose**: Guide patients through specific phases of their cancer journey  
**Location**: `/src/content/cancer-types/{cancer-type}/journey/`  
**Template**: `scripts/templates/journey-phase.mdx`

**Usage:**
```bash
pnpm run content:journey <cancer-type> <phase-name> <order> [duration]
```

**Example:**
```bash
pnpm run content:journey lung "treatment planning" 2 "2-3 weeks"
```

**Generates:**
- Journey phase component with progress indicator
- Comprehensive task checklist
- Common concerns and coping strategies
- Phase-specific questions for medical team

### 3. Cancer Type Hubs

**Purpose**: Central navigation and overview pages for each cancer type  
**Location**: `/src/content/cancer-types/{cancer-type}/index.mdx`  
**Template**: `scripts/templates/hub.mdx`

**Usage:**
```bash
pnpm run content:hub <cancer-type>
```

**Example:**
```bash
pnpm run content:hub colorectal
```

**Generates:**
- Patient journey overview
- Treatment options navigation
- Interactive decision tree
- Stage selector component
- Risk assessment tools

### 4. Interactive Calculators

**Purpose**: Risk assessment and outcome prediction tools  
**Location**: `/src/content/cancer-types/{cancer-type}/calculators/`  
**Template**: `scripts/templates/calculator.mdx`

**Usage:**
```bash
pnpm run content:calculator <cancer-type> <calculator-name> [calculator-type]
```

**Example:**
```bash
pnpm run content:calculator breast "Adjuvant Chemotherapy Benefit Calculator" outcome-predictor
```

**Generates:**
- Interactive calculator interface
- Supporting clinical evidence
- Result interpretation guidance
- Medical disclaimers and limitations

### 5. Shared Medical Content

**Purpose**: Universal medical concepts and patient concerns  
**Location**: `/src/content/shared/{medical-concepts|universal-concerns}/`  
**Template**: `scripts/templates/shared-content.mdx`

**Usage:**
```bash
pnpm run content:shared <content-type> <topic-name>
```

**Examples:**
```bash
pnpm run content:shared medical-concept "Immunotherapy Basics"
pnpm run content:shared universal-concern "Managing Treatment Fatigue"
```

**Content Types:**
- `medical-concept`: Clinical concepts and treatment basics
- `universal-concern`: Common patient worries and practical issues

## 🤖 AI Prompt Integration

### How It Works

1. **Template Generation**: Scripts create MDX template files with proper frontmatter and structure
2. **AI Prompt Display**: After file creation, the system displays a customized AI prompt
3. **Content Creation**: Copy the prompt to your AI assistant to generate medical content
4. **Content Population**: Paste the AI-generated content into the created template file

### AI Prompt Features

**Medical Content Optimization:**
- Evidence-based information requirements
- Progressive content disclosure (Essential → Detailed → Technical)
- Medical component integration
- Proper medical disclaimers and review standards

**Content Quality Assurance:**
- Specific medical accuracy requirements
- Patient-centered language guidelines
- Citation and evidence requirements
- Regulatory compliance considerations

### Example Workflow

1. **Create Template:**
   ```bash
   pnpm run content:treatment prostate "Proton Therapy"
   ```

2. **Copy AI Prompt:** The system displays a customized prompt for proton therapy content

3. **Generate Content:** Use the prompt with your AI assistant (Claude, ChatGPT, etc.)

4. **Populate Template:** Replace template placeholders with AI-generated content

5. **Review and Refine:** Ensure medical accuracy and proper component integration

## 📝 Content Standards

### Medical Accuracy Requirements

**Evidence-Based Content:**
- All medical claims must cite peer-reviewed sources
- Include PMID numbers for research studies
- Specify evidence levels (1A, 1B, 2A, etc.)
- Regular content review and updates

**Clinical Review:**
- Content reviewed by board-certified oncologists
- Adherence to current clinical guidelines (NCCN, ASCO, ESMO)
- Regular updates with latest research

### Writing Guidelines

**Progressive Content Structure:**
- **Essential Level**: Patient-friendly explanation (2-3 paragraphs)
- **Detailed Level**: Comprehensive information (4-6 paragraphs)
- **Technical Level**: Clinical details and research (3-4 paragraphs)

**Tone and Style:**
- Compassionate and supportive
- Clear and accessible language
- Active voice and direct communication
- Specific percentages and timelines when available

**Patient-Centered Approach:**
- Address common concerns directly
- Include practical preparation information
- Emphasize shared decision-making
- Provide realistic expectations

### Component Integration

**Required Medical Components:**
- `ProgressiveContent`: Multi-level information disclosure
- `Evidence`: Supporting research and citations
- `QuestionGenerator`: Relevant questions for medical team
- `MedicalDisclaimer`: Appropriate disclaimers and limitations

**Interactive Elements:**
- `AnatomyDiagram`: Visual treatment explanations
- `TreatmentTimeline`: Step-by-step process visualization
- `TreatmentComparison`: Side-by-side treatment options
- `SideEffectsTable`: Frequency and management information

## 🔧 Customization and Extension

### Adding New Content Types

1. **Create New Template:** Add MDX template to `scripts/templates/`
2. **Create AI Prompt:** Add prompt template to `scripts/ai-prompts/`
3. **Update Generator:** Add new method to `ContentGenerator` class
4. **Add CLI Command:** Update CLI interface and package.json scripts

### Modifying Existing Templates

1. **Edit Template File:** Update MDX structure in `scripts/templates/`
2. **Update AI Prompt:** Modify corresponding prompt in `scripts/ai-prompts/`
3. **Test Generation:** Verify template produces correct structure

### Custom AI Prompts

**Prompt Customization:**
- Modify prompts for specific medical specialties
- Adjust for different patient populations
- Customize component requirements
- Add institution-specific guidelines

**Template Variables:**
- `{{cancerType}}`: Cancer type (e.g., "prostate")
- `{{treatmentName}}`: Treatment name (e.g., "SBRT")
- `{{slug}}`: URL-friendly identifier
- `{{date}}`: Current date for lastUpdated field

## 📊 Quality Assurance

### Content Review Process

1. **Template Review:** Ensure proper structure and components
2. **Medical Review:** Verify accuracy and evidence base
3. **Patient Review:** Test accessibility and clarity
4. **Technical Review:** Validate component integration

### Validation Checklist

**Medical Accuracy:**
- [ ] All medical claims properly cited
- [ ] Current guidelines followed
- [ ] Appropriate evidence levels specified
- [ ] Medical disclaimers included

**Content Quality:**
- [ ] Progressive content structure implemented
- [ ] Patient-centered language used
- [ ] Practical information included
- [ ] Common concerns addressed

**Technical Integration:**
- [ ] All required components included
- [ ] Proper frontmatter structure
- [ ] Valid MDX syntax
- [ ] Component props correctly specified

## 🆘 Troubleshooting

### Common Issues

**Template Generation Fails:**
- Check that all required parameters are provided
- Verify template files exist in `scripts/templates/`
- Ensure proper directory permissions

**AI Prompt Not Displaying:**
- Verify prompt files exist in `scripts/ai-prompts/`
- Check for JavaScript syntax errors in prompt files
- Ensure proper module exports

**MDX Syntax Errors:**
- Validate component prop syntax
- Check for unescaped special characters
- Verify frontmatter YAML format

**Component Integration Issues:**
- Ensure all referenced components exist
- Check component import paths
- Verify component prop requirements

### Getting Help

**Documentation:**
- Review component documentation in `/src/components/medical/`
- Check existing content examples for patterns
- Refer to Gatsby MDX documentation

**Support:**
- Open issues for bugs or feature requests
- Review existing issues for similar problems
- Contact development team for complex issues

## 🚀 Advanced Usage

### Batch Content Creation

Create multiple related pieces of content:

```bash
# Create complete treatment section
pnpm run content:treatment prostate "Surgery" surgery
pnpm run content:treatment prostate "Radiation Therapy" radiation  
pnpm run content:treatment prostate "Hormone Therapy" systemic

# Create journey phases
pnpm run content:journey prostate diagnosis 1
pnpm run content:journey prostate planning 2
pnpm run content:journey prostate treatment 3
```

### Integration with Development Workflow

**Content Development Cycle:**
1. Create templates using scripts
2. Generate content with AI assistance
3. Review and refine content
4. Test with development server
5. Validate component integration
6. Deploy to production

**Continuous Improvement:**
- Regular template updates based on feedback
- AI prompt refinement for better content
- Component enhancement and new features
- Medical guideline updates and content refresh

---

## 📚 Resources

**Medical Guidelines:**
- [NCCN Guidelines](https://www.nccn.org/guidelines)
- [ASCO Guidelines](https://www.asco.org/practice-patients/guidelines)
- [ESMO Guidelines](https://www.esmo.org/guidelines)

**Development Resources:**
- [Gatsby MDX Documentation](https://www.gatsbyjs.com/docs/how-to/routing/mdx/)
- [React Component Documentation](../src/components/medical/README.md)
- [Medical Content Standards](./MEDICAL_STANDARDS.md)

**Content Creation Tools:**
- AI Prompt Templates (`scripts/ai-prompts/`)
- MDX Templates (`scripts/templates/`)
- Content Generator (`scripts/create-content.js`)

---

*This workflow is designed to streamline medical content creation while maintaining the highest standards of accuracy, accessibility, and patient-centered care.*