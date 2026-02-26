export interface ProjectCardProps {
  title: string; // Title in TR
  title_en?: string; // Title in EN
  description: string; // Description in TR
  description_en?: string; // Description in EN
  imageUrl: string;
  techStacks: string[];
  id?: string; // Optional unique identifier for routing
  projectUrl?: string; // Optional link to the live project or github repo
  status?: 'completed' | 'in-progress'; // Status indicator
  role?: string; // User's role in the project (TR)
  role_en?: string; // User's role in the project (EN)
  date?: string; // Project date for sorting (e.g. '2023-10' or '2024')
  actionLabel?: string; // Optional custom label for the action button
  content?: string; // HTML/Markdown formatted extensive project description (TR)
  content_en?: string; // HTML/Markdown formatted extensive project description (EN)
  images?: string[]; // Array of image URLs for slider/carousel
}
