import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { TechStackItem } from '@/types/techstack';

export const getTechStacks = async (): Promise<TechStackItem[]> => {
  const q = query(collection(db, 'techstacks'), orderBy('sortOrder', 'asc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as TechStackItem[];
};
