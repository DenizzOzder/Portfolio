import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { CareerItem } from '@/types/career';

export const getCareers = async (): Promise<CareerItem[]> => {
  const q = query(collection(db, 'careers'), orderBy('sortOrder', 'asc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as CareerItem[];
};
