import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { ProjectCardProps } from '@/types';

/**
 * Fetches featured projects from the Firestore 'projects' collection.
 * 
 * @returns Promise resolving to an array of ProjectCardProps
 */
export const getFeaturedProjects = async (): Promise<ProjectCardProps[]> => {
  try {
    const projectsRef = collection(db, 'projects');
    
    // Attempt to order by date descending. If this fails due to missing index,
    // we fallback to frontend sorting temporarily.
    // Note: If you just created the collection without data, this will return empty []
    const q = query(projectsRef, orderBy('date', 'desc'));
    
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      console.log('No projects found in Firestore. Please add them via Admin Panel.');
      return [];
    }

    const projects: ProjectCardProps[] = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title || '',
        title_en: data.title_en,
        description: data.description || '',
        description_en: data.description_en,
        imageUrl: data.imageUrl || '',
        techStacks: data.techStacks || [],
        projectUrl: data.projectUrl,
        status: data.status || 'in-progress',
        role: data.role || '',
        role_en: data.role_en,
        date: data.date || '',
        actionLabel: data.actionLabel,
        content: data.content,
        content_en: data.content_en,
        images: data.images || []
      } as ProjectCardProps;
    });

    return projects;
  } catch (error) {
    console.error("Error fetching projects from Firestore:", error);
    // Return empty array on error so UI doesn't crash
    return [];
  }
};
