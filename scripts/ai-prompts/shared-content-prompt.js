/**
 * AI Prompt Templates for Shared Medical Content
 * Used to generate universal medical concepts and patient resources
 */

const MEDICAL_CONCEPT_PROMPT = `
Create a comprehensive MDX page explaining the medical concept: {{conceptName}}.

**Required Structure:**

1. **Frontmatter:**
\`\`\`yaml
---
title: "Understanding {{conceptName}}"
description: "Clear explanation of {{conceptName}} for cancer patients and their families."
slug: "{{slug}}"
category: "medical-concept"
conceptType: "{{conceptType}}"
lastUpdated: "{{date}}"
medicallyReviewed: true
reviewedBy: "Dr. Daniel Sufficool, MD"
---
\`\`\`

2. **Progressive Content Structure:**
- **Essential**: Basic definition and why it matters (2-3 paragraphs)
- **Detailed**: How it works, when it's used, what to expect (4-5 paragraphs)
- **Technical**: Clinical details, mechanisms, research background (3-4 paragraphs)

3. **Required Components:**
- **ProgressiveContent**: Multi-level explanation
- **Evidence**: Supporting research and guidelines
- **GlossaryTerm**: Key terminology definitions
- **MedicalDiagram**: Visual representation when applicable
- **QuestionGenerator**: Relevant questions about the concept

4. **Content Guidelines:**
- Use analogies and simple language for complex concepts
- Address common misconceptions
- Explain relevance to different cancer types
- Include practical implications for patients
- Connect to treatment decisions and care planning

Generate content that demystifies medical concepts and empowers informed decision-making.
`;

const UNIVERSAL_CONCERN_PROMPT = `
Create an MDX page addressing the universal patient concern: {{concernTopic}}.

**Required Structure:**

1. **Frontmatter:**
\`\`\`yaml
---
title: "{{concernTitle}}"
description: "Practical guidance for cancer patients dealing with {{concernTopic}}."
slug: "{{slug}}"
category: "universal-concern"
concernType: "{{concernType}}"
lastUpdated: "{{date}}"
applicableTo: ["all-cancer-types"]
---
\`\`\`

2. **Content Sections:**
- **Understanding the Concern**: Why this is common and normal
- **Practical Strategies**: Actionable steps and coping mechanisms
- **When to Seek Help**: Warning signs and professional resources
- **Support Resources**: Organizations, hotlines, online communities
- **Patient Stories**: Anonymous examples of successful coping

3. **Required Components:**
- **ProgressiveContent**: Layered information delivery
- **JourneyChecklist**: Actionable steps and resources
- **Evidence**: Research on interventions and outcomes
- **QuestionGenerator**: Questions for healthcare team and support services

4. **Tone and Approach:**
- Empathetic and validating
- Practical and actionable
- Hope-focused while realistic
- Culturally sensitive
- Family and caregiver inclusive

Generate supportive content that acknowledges patient concerns while providing practical solutions.
`;

const CAREGIVER_RESOURCE_PROMPT = `
Create an MDX page for caregivers: {{resourceTopic}}.

**Required Structure:**

1. **Frontmatter:**
\`\`\`yaml
---
title: "For Caregivers: {{resourceTitle}}"
description: "Essential information and support for caregivers of {{cancerType}} cancer patients."
slug: "{{slug}}"
category: "caregiver-resource"
audience: "caregivers"
cancerType: "{{cancerType}}"
lastUpdated: "{{date}}"
---
\`\`\`

2. **Caregiver-Focused Content:**
- **Your Role and Responsibilities**: What's expected and what's not
- **Practical Care Tasks**: Step-by-step guidance
- **Emotional Support**: For both patient and caregiver
- **Self-Care**: Preventing caregiver burnout
- **Communication**: With patient, family, and medical team
- **Resources**: Practical tools and support networks

3. **Components:**
- **JourneyChecklist**: Caregiver tasks and responsibilities
- **ProgressiveContent**: Detailed guidance by care phase
- **QuestionGenerator**: Questions for medical appointments
- **Evidence**: Research on caregiver interventions

Generate practical, supportive content that recognizes the challenges and importance of caregiving.
`;

const PREPARATION_GUIDE_PROMPT = `
Create a preparation guide for {{procedureName}} for {{cancerType}} cancer patients.

**Required Structure:**

1. **Frontmatter:**
\`\`\`yaml
---
title: "Preparing for {{procedureName}}"
description: "Complete preparation guide for {{procedureName}} for {{cancerType}} cancer patients."
slug: "{{slug}}"
category: "preparation-guide"
cancerType: "{{cancerType}}"
procedureType: "{{procedureType}}"
lastUpdated: "{{date}}"
---
\`\`\`

2. **Timeline-Based Preparation:**
- **2-4 Weeks Before**: Initial preparations and arrangements
- **1 Week Before**: Final preparations and confirmations
- **Day Before**: Last-minute checklist
- **Day Of**: What to expect and bring
- **After**: Recovery and follow-up expectations

3. **Components:**
- **TreatmentTimeline**: Preparation timeline
- **JourneyChecklist**: Comprehensive preparation tasks
- **QuestionGenerator**: Questions for pre-procedure consultations
- **ProgressiveContent**: Detailed vs. essential preparation information

Generate thorough preparation guidance that reduces anxiety through comprehensive planning.
`;

module.exports = {
  MEDICAL_CONCEPT_PROMPT,
  UNIVERSAL_CONCERN_PROMPT,
  CAREGIVER_RESOURCE_PROMPT,
  PREPARATION_GUIDE_PROMPT
};