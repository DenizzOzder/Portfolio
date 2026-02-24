export interface TechStackItem {
  name: string;
  iconName: string; // Devicon path, e.g., 'react/react-original.svg'
}

export interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  techStack: TechStackItem[];
  id?: string; // Optional unique identifier for routing
  projectUrl?: string; // Optional link to the live project or github repo
  status?: 'completed' | 'in-progress'; // Status indicator
  role?: string; // User's role in the project
  date?: string; // Project date for sorting (e.g. '2023-10' or '2024')
  actionLabel?: string; // Optional custom label for the action button
}
