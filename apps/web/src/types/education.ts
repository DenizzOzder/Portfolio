export interface EducationItem {
  id?: string | number;
  institution: string;
  institution_en?: string;
  degree: string;
  degree_en?: string;
  date: string;
  date_en?: string;
  grade: string;
  status: string;
  status_en?: string;
  techStacks: string[];
  badges?: { text: string; text_en?: string; color: string }[];
  emphasizeSchool?: boolean;
  sortOrder?: number;
}
