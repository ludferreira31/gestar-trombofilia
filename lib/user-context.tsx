import { createContext, useContext, useEffect, useState } from 'react';
import { storage, UserProfile, calculateGestationalWeek } from './storage';

interface UserContextType {
  profile: UserProfile | null;
  isLoading: boolean;
  gestationalWeek: number;
  gestationalDay: number;
  setProfile: (profile: UserProfile) => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  activatePremium: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  isPremium: boolean;
  isAdmin: boolean;
}

const UserContext = createContext<UserContextType>({
  profile: null,
  isLoading: true,
  gestationalWeek: 0,
  gestationalDay: 0,
  setProfile: async () => {},
  updateProfile: async () => {},
  activatePremium: async () => {},
  refreshProfile: async () => {},
  isPremium: false,
  isAdmin: false,
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfileState] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshProfile = async () => {
    const p = await storage.getUserProfile();
    setProfileState(p);
    setIsLoading(false);
  };

  useEffect(() => {
    refreshProfile();
  }, []);

  const setProfile = async (p: UserProfile) => {
    await storage.setUserProfile(p);
    setProfileState(p);
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!profile) return;
    const updated = { ...profile, ...updates };
    await storage.setUserProfile(updated);
    setProfileState(updated);
  };

  const activatePremium = async () => {
    if (!profile) return;
    const updated = { ...profile, isPremium: true };
    await storage.setUserProfile(updated);
    setProfileState(updated);
  };

  let gestationalWeek = 0;
  let gestationalDay = 0;
  if (profile?.dum) {
    const calc = calculateGestationalWeek(profile.dum);
    gestationalWeek = calc.week;
    gestationalDay = calc.day;
  } else if (profile?.gestationalWeek) {
    gestationalWeek = profile.gestationalWeek;
    gestationalDay = profile.gestationalDay || 0;
  }

  return (
    <UserContext.Provider
      value={{
        profile,
        isLoading,
        gestationalWeek,
        gestationalDay,
        setProfile,
        updateProfile,
        activatePremium,
        refreshProfile,
        isPremium: profile?.isPremium ?? false,
        isAdmin: profile?.isAdmin ?? false,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
