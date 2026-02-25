export interface EducationItem {
  id: number;
  institution: string;
  degree: string;
  date: string;
  grade: string;
  status: string;
  techStacks: string[];
  badges?: { text: string; color: string }[];
  emphasizeSchool?: boolean;
}
