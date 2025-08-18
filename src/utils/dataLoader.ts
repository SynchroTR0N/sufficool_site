// Utility for loading medical data safely
export const loadMedicalData = async (dataFile: string) => {
  try {
    const data = await import(`../data/${dataFile}.json`);
    return data.default || data;
  } catch (error) {
    console.warn(`Failed to load medical data: ${dataFile}`, error);
    return null;
  }
};

// Default fallback data for components
export const defaultData = {
  evidence: {
    title: "Clinical Evidence",
    studies: []
  },
  timeline: {
    title: "Treatment Timeline",
    events: []
  },
  sideEffects: {
    title: "Side Effects",
    effects: []
  },
  questions: {
    title: "Questions to Ask",
    categories: []
  }
};

// Type definitions for medical data
export interface Study {
  title: string;
  journal: string;
  year: number;
  pmid: string;
  summary: string;
  patientPopulation: string;
  primaryEndpoint: string;
  results: string;
}

export interface TimelineEvent {
  phase: string;
  duration: string;
  description: string;
  tasks: string[];
}

export interface SideEffect {
  name: string;
  frequency: string;
  severity: string;
  onset: string;
  duration: string;
  management: string;
}

export interface QuestionCategory {
  category: string;
  questions: string[];
}