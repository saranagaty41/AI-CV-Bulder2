import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from './client';
import { CvData } from '@/types';

const CV_COLLECTION = 'cvs';

export const saveCvData = async (userId: string, data: CvData): Promise<void> => {
  try {
    const docRef = doc(db, CV_COLLECTION, userId);
    await setDoc(docRef, data, { merge: true });
  } catch (error) {
    console.error("Error saving CV data:", error);
    throw new Error("Could not save CV data.");
  }
};

export const loadCvData = async (userId: string): Promise<CvData | null> => {
  try {
    const docRef = doc(db, CV_COLLECTION, userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as CvData;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error loading CV data:", error);
    throw new Error("Could not load CV data.");
  }
};
