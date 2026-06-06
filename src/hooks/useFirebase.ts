import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, query, where, onSnapshot, doc, setDoc, serverTimestamp, getDocs, updateDoc, increment } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestore-utils';

export interface Registration {
  id?: string;
  email: string;
  sweepstakesId: string;
  tickets: number;
  dailyTickets: number;
  lastDailyUpdate: any;
  userId: string;
  createdAt: any;
  updatedAt: any;
}

export interface Campaign {
  id: string;
  name: string;
  imageUrl: string;
  createdAt: any;
}

export function useFirebase() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [allRegistrations, setAllRegistrations] = useState<Registration[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      setIsAdmin(false);
      return;
    }

    const checkAdmin = async () => {
      const adminDoc = doc(db, 'admins', user.uid);
      const unsubscribe = onSnapshot(adminDoc, (snapshot) => {
        setIsAdmin(snapshot.exists());
      });
      return unsubscribe;
    };
    
    let unsubAdmin: any;
    checkAdmin().then(u => unsubAdmin = u);
    return () => unsubAdmin && unsubAdmin();
  }, [user]);

  useEffect(() => {
    const q = query(collection(db, 'campaigns'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Campaign));
      setCampaigns(data);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'campaigns');
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      setRegistrations([]);
      return;
    }

    const q = query(collection(db, 'registrations'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Registration));
      setRegistrations(data);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'registrations');
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (!user || !isAdmin) {
      setAllRegistrations([]);
      return;
    }

    const q = query(collection(db, 'registrations'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Registration));
      setAllRegistrations(data);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'registrations');
    });

    return () => unsubscribe();
  }, [user, isAdmin]);

  const registerParticipation = async (email: string, sweepstakesId: string): Promise<{ limitReached: boolean }> => {
    if (!user) throw new Error("User not authenticated");

    const registrationId = `${user.uid}_${sweepstakesId}`;
    const registrationRef = doc(db, 'registrations', registrationId);

    try {
      const { getDoc } = await import('firebase/firestore');
      const snapshot = await getDoc(registrationRef);
      
      const POINTS_PER_ACTION = 1;
      const DAILY_LIMIT = 100; 
      
      if (!snapshot.exists()) {
        await setDoc(registrationRef, {
          email,
          sweepstakesId,
          tickets: POINTS_PER_ACTION,
          dailyTickets: POINTS_PER_ACTION,
          lastDailyUpdate: serverTimestamp(),
          userId: user.uid,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        return { limitReached: false };
      } else {
        const data = snapshot.data() as Registration;
        const now = new Date();
        const lastUpdate = data.lastDailyUpdate?.toDate ? data.lastDailyUpdate.toDate() : new Date(data.lastDailyUpdate);
        const isNewDay = now.toDateString() !== lastUpdate.toDateString();
        
        const currentDailyTickets = isNewDay ? 0 : (data.dailyTickets || 0);
        
        if (currentDailyTickets >= DAILY_LIMIT) {
          return { limitReached: true };
        }

        await updateDoc(registrationRef, {
          tickets: increment(POINTS_PER_ACTION),
          dailyTickets: isNewDay ? POINTS_PER_ACTION : increment(POINTS_PER_ACTION),
          lastDailyUpdate: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        return { limitReached: false };
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `registrations/${registrationId}`);
      throw error;
    }
  };

  const createCampaign = async (name: string, imageUrl: string) => {
    if (!user || !isAdmin) throw new Error("Unauthorized");
    const campaignId = name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    const campaignRef = doc(db, 'campaigns', campaignId);
    
    try {
      await setDoc(campaignRef, {
        name,
        imageUrl,
        createdAt: serverTimestamp()
      });
      return campaignId;
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `campaigns/${campaignId}`);
      throw error;
    }
  };

  return { user, loading, registrations, allRegistrations, campaigns, isAdmin, registerParticipation, createCampaign };
}
