import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { AboutRowItem } from '@/types';

export const getAboutData = async (): Promise<AboutRowItem[]> => {
  const q = query(collection(db, 'about'), orderBy('order', 'asc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as AboutRowItem[];
};
