/**
 * AI Prompt Template for Treatment Pages
 * Used to generate comprehensive treatment information pages with medical components
 */

const TREATMENT_PAGE_PROMPT = `
Create a comprehensive MDX page for {{treatmentName}} treating {{cancerType}} cancer. This should be evidence-based medical content for patient education.

**Required Structure:**

1. **Frontmatter (YAML):**
\`\`\`yaml
---
title: "{{treatmentName}} for {{cancerType}} Cancer"
description: "Evidence-based information about {{treatmentName}} for {{cancerType}} cancer treatment, including benefits, side effects, and patient considerations."
slug: "{{slug}}"
category: "treatment"
cancerType: "{{cancerType}}"
treatmentType: "{{treatmentType}}"
lastUpdated: "{{date}}"
evidenceLevel: "1A"
reviewedBy: "Dr. Daniel Sufficool, MD"
---
\`\`\`

2. **Progressive Content Block:**
Use the ProgressiveContent component with three levels:
- **Essential**: Basic patient-friendly explanation (2-3 paragraphs)
- **Detailed**: More comprehensive information including process, timeline, expectations (4-6 paragraphs)
- **Technical**: Clinical details, mechanisms, research data (3-4 paragraphs with statistics)

3. **Evidence Component:**
Include 2-3 recent key studies with:
- Study design and patient population
- Primary endpoints and results
- Clinical significance
- PMID numbers when available
- Confidence intervals and p-values

4. **Treatment Components Required:**
- **AnatomyDiagram**: Show treatment area and approach
- **TreatmentTimeline**: 5-10 key events from decision to recovery
- **TreatmentComparison**: Compare with 2-3 alternative treatments
- **SideEffectsTable**: Common, less common, and rare side effects with frequencies
- **OutcomePredictor**: If applicable, include relevant calculators
- **QuestionGenerator**: Treatment-specific questions for doctor visits

5. **Content Guidelines:**
- Use active voice and clear, compassionate language
- Include specific percentages for outcomes when available
- Mention typical duration/frequency of treatment
- Address common patient concerns directly
- Link to relevant journey phases (diagnosis, planning, treatment, recovery)
- Include preparation and recovery information
- Emphasize shared decision-making

6. **Medical Standards:**
- All statistics must be evidence-based
- Include treatment contraindications and warnings
- Mention alternative options
- Provide realistic expectations
- Include quality of life considerations

**Component Integration Examples:**

\`\`\`mdx
<ProgressiveContent>
  <div data-level="essential">
    {{treatmentName}} is a {{treatmentType}} approach for treating {{cancerType}} cancer...
  </div>
  <div data-level="detailed">
    The treatment process involves... Typically takes X weeks/months...
  </div>
  <div data-level="technical">
    Clinical studies show... mechanism of action... biomarkers...
  </div>
</ProgressiveContent>

<Evidence 
  title="Key Research Supporting {{treatmentName}}"
  studies={[
    {
      title: "Study title here",
      journal: "Journal name",
      year: 2024,
      pmid: "PMID number",
      summary: "Key findings...",
      patientPopulation: "Patient characteristics",
      primaryEndpoint: "Endpoint description",
      results: "Statistical results with CI"
    }
  ]}
/>

<TreatmentComparison 
  treatments={[
    {
      name: "{{treatmentName}}",
      efficacy: "X% success rate",
      sideEffects: "Common side effects",
      timeline: "Treatment duration",
      suitability: "Best for patients who..."
    }
  ]}
/>
\`\`\`

Generate content that is:
- Medically accurate and evidence-based
- Patient-centered and accessible
- Comprehensive yet digestible
- Emotionally supportive
- Practically useful for decision-making

Focus on helping patients understand what to expect, how to prepare, and how this treatment fits into their overall care plan.
`;

const JOURNEY_PHASE_PROMPT = `
Create an MDX page for the {{phaseName}} phase of {{cancerType}} cancer patient journey.

**Required Structure:**

1. **Frontmatter:**
\`\`\`yaml
---
title: "{{phaseName}} Phase - {{cancerType}} Cancer Journey"
description: "Guide to the {{phaseName}} phase of {{cancerType}} cancer treatment, including what to expect, tasks to complete, and questions to ask."
slug: "{{slug}}"
category: "journey-phase"
cancerType: "{{cancerType}}"
phase: "{{phaseName}}"
phaseOrder: {{order}}
lastUpdated: "{{date}}"
estimatedDuration: "{{duration}}"
---
\`\`\`

2. **Phase Overview:**
- What happens during this phase
- Typical duration and timeline
- Key goals and milestones
- Who's involved in your care team

3. **Required Components:**
- **JourneyPhase**: Visual progress indicator
- **JourneyChecklist**: Actionable tasks with priorities
- **ProgressiveContent**: Detailed phase explanation
- **QuestionGenerator**: Phase-specific questions for medical team
- **Evidence**: If relevant research supports phase approaches

4. **Content Sections:**
- What to expect emotionally and physically
- Important tasks and preparations
- Communication with care team
- Support resources
- Next steps and transitions

Generate practical, empathetic content that helps patients navigate this specific phase successfully.
`;

const HUB_PAGE_PROMPT = `
Create a comprehensive cancer type hub page for {{cancerType}} cancer.

**Required Structure:**

1. **Frontmatter:**
\`\`\`yaml
---
title: "{{cancerType}} Cancer Treatment Guide"
description: "Comprehensive information about {{cancerType}} cancer treatment options, patient journey, and decision support tools."
slug: "{{cancerType}}"
category: "cancer-type"
cancerType: "{{cancerType}}"
lastUpdated: "{{date}}"
---
\`\`\`

2. **Hub Components:**
- **PatientJourney**: Overview of treatment phases
- **ProgressiveContent**: Cancer type explanation
- **Evidence**: Key research and guidelines
- **StageSelector**: Interactive staging information
- **DecisionTree**: Treatment decision support

3. **Navigation Sections:**
- Understanding Your Diagnosis
- Treatment Options
- Patient Journey
- Interactive Tools
- Questions and Resources

Generate a comprehensive hub that serves as the central navigation point for all {{cancerType}} cancer content.
`;

const CALCULATOR_PAGE_PROMPT = `
Create an interactive calculator page for {{calculatorName}} for {{cancerType}} cancer.

**Required Structure:**

1. **Frontmatter:**
\`\`\`yaml
---
title: "{{calculatorName}} - {{cancerType}} Cancer"
description: "Interactive {{calculatorName}} calculator for {{cancerType}} cancer patients and healthcare providers."
slug: "{{slug}}"
category: "calculator"
cancerType: "{{cancerType}}"
calculatorType: "{{calculatorType}}"
lastUpdated: "{{date}}"
evidenceLevel: "1A"
---
\`\`\`

2. **Calculator Components:**
- **OutcomePredictor**: Interactive calculator interface
- **Evidence**: Supporting research for calculator validity
- **ProgressiveContent**: How to interpret results
- **MedicalDisclaimer**: Important limitations and disclaimers

3. **Content Guidelines:**
- Explain what the calculator predicts
- How to use it effectively
- Limitations and considerations
- When to discuss results with healthcare team

Generate educational content that helps patients and providers use the calculator appropriately.
`;

module.exports = {
  TREATMENT_PAGE_PROMPT,
  JOURNEY_PHASE_PROMPT,
  HUB_PAGE_PROMPT,
  CALCULATOR_PAGE_PROMPT
};