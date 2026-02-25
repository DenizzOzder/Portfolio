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
        description: data.description || '',
        imageUrl: data.imageUrl || '',
        techStacks: data.techStacks || [],
        projectUrl: data.projectUrl,
        status: data.status || 'in-progress',
        role: data.role || '',
        date: data.date || '',
        actionLabel: data.actionLabel,
        content: data.content,
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
