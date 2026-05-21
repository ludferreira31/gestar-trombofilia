import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserProfile {
  name: string;
  profileType: string;
  dum?: string; // Data da Última Menstruação
  dpp?: string; // Data Provável do Parto
  gestationalWeek?: number;
  gestationalDay?: number;
  isPremium: boolean;
  isAdmin: boolean;
  createdAt: string;
}

export interface Medication {
  id: string;
  name: string;
  dose: string;
  frequency: string;
  times: string[];
  startDate: string;
  endDate?: string;
  notes?: string;
  active: boolean;
}

export interface Exam {
  id: string;
  type: string;
  date: string;
  result?: string;
  notes?: string;
  fileUri?: string;
}

export interface DopplerRecord {
  id: string;
  date: string;
  gestationalWeek: number;
  arteriaUterinaDireita?: string;
  arteriaUterinaEsquerda?: string;
  arteriaUmbilical?: string;
  arteriaCerebralMedia?: string;
  ductoVenoso?: string;
  notes?: string;
}

export interface SymptomRecord {
  id: string;
  date: string;
  symptoms: string[];
  intensity: number;
  notes?: string;
}

export interface DiaryEntry {
  id: string;
  date: string;
  title?: string;
  content: string;
  mood: string;
  gestationalWeek?: number;
}

export interface FIVRecord {
  id: string;
  phase: string;
  date: string;
  notes?: string;
  betaHCG?: string;
  medications?: string[];
}

export interface BirthPost {
  id: string;
  babyName: string;
  birthDate: string;
  gestationalWeek: number;
  weight?: string;
  message: string;
  authorName: string;
  createdAt: string;
}

const KEYS = {
  USER_PROFILE: '@gestar:user_profile',
  MEDICATIONS: '@gestar:medications',
  EXAMS: '@gestar:exams',
  DOPPLERS: '@gestar:dopplers',
  SYMPTOMS: '@gestar:symptoms',
  DIARY: '@gestar:diary',
  FIV: '@gestar:fiv',
  ONBOARDING_DONE: '@gestar:onboarding_done',
  BIRTH_POSTS: '@gestar:birth_posts',
  COMMUNITY_POSTS: '@gestar:community_posts',
};

async function get<T>(key: string): Promise<T | null> {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

async function set<T>(key: string, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch {
    // silent fail
  }
}

export const storage = {
  // User Profile
  getUserProfile: () => get<UserProfile>(KEYS.USER_PROFILE),
  setUserProfile: (profile: UserProfile) => set(KEYS.USER_PROFILE, profile),

  // Onboarding
  isOnboardingDone: async () => {
    const val = await AsyncStorage.getItem(KEYS.ONBOARDING_DONE);
    return val === 'true';
  },
  setOnboardingDone: () => AsyncStorage.setItem(KEYS.ONBOARDING_DONE, 'true'),

  // Medications
  getMedications: () => get<Medication[]>(KEYS.MEDICATIONS),
  setMedications: (meds: Medication[]) => set(KEYS.MEDICATIONS, meds),
  addMedication: async (med: Medication) => {
    const meds = (await get<Medication[]>(KEYS.MEDICATIONS)) || [];
    await set(KEYS.MEDICATIONS, [...meds, med]);
  },
  updateMedication: async (id: string, updates: Partial<Medication>) => {
    const meds = (await get<Medication[]>(KEYS.MEDICATIONS)) || [];
    await set(KEYS.MEDICATIONS, meds.map(m => m.id === id ? { ...m, ...updates } : m));
  },
  deleteMedication: async (id: string) => {
    const meds = (await get<Medication[]>(KEYS.MEDICATIONS)) || [];
    await set(KEYS.MEDICATIONS, meds.filter(m => m.id !== id));
  },

  // Exams
  getExams: () => get<Exam[]>(KEYS.EXAMS),
  addExam: async (exam: Exam) => {
    const exams = (await get<Exam[]>(KEYS.EXAMS)) || [];
    await set(KEYS.EXAMS, [...exams, exam]);
  },
  deleteExam: async (id: string) => {
    const exams = (await get<Exam[]>(KEYS.EXAMS)) || [];
    await set(KEYS.EXAMS, exams.filter(e => e.id !== id));
  },

  // Dopplers
  getDopplers: () => get<DopplerRecord[]>(KEYS.DOPPLERS),
  addDoppler: async (doppler: DopplerRecord) => {
    const dopplers = (await get<DopplerRecord[]>(KEYS.DOPPLERS)) || [];
    await set(KEYS.DOPPLERS, [...dopplers, doppler]);
  },
  deleteDoppler: async (id: string) => {
    const dopplers = (await get<DopplerRecord[]>(KEYS.DOPPLERS)) || [];
    await set(KEYS.DOPPLERS, dopplers.filter(d => d.id !== id));
  },

  // Symptoms
  getSymptoms: () => get<SymptomRecord[]>(KEYS.SYMPTOMS),
  addSymptom: async (symptom: SymptomRecord) => {
    const symptoms = (await get<SymptomRecord[]>(KEYS.SYMPTOMS)) || [];
    await set(KEYS.SYMPTOMS, [...symptoms, symptom]);
  },

  // Diary
  getDiary: () => get<DiaryEntry[]>(KEYS.DIARY),
  addDiaryEntry: async (entry: DiaryEntry) => {
    const entries = (await get<DiaryEntry[]>(KEYS.DIARY)) || [];
    await set(KEYS.DIARY, [...entries, entry]);
  },
  updateDiaryEntry: async (id: string, updates: Partial<DiaryEntry>) => {
    const entries = (await get<DiaryEntry[]>(KEYS.DIARY)) || [];
    await set(KEYS.DIARY, entries.map(e => e.id === id ? { ...e, ...updates } : e));
  },
  deleteDiaryEntry: async (id: string) => {
    const entries = (await get<DiaryEntry[]>(KEYS.DIARY)) || [];
    await set(KEYS.DIARY, entries.filter(e => e.id !== id));
  },

  // FIV
  getFIV: () => get<FIVRecord[]>(KEYS.FIV),
  addFIVRecord: async (record: FIVRecord) => {
    const records = (await get<FIVRecord[]>(KEYS.FIV)) || [];
    await set(KEYS.FIV, [...records, record]);
  },

  // Birth Posts (local community)
  getBirthPosts: () => get<BirthPost[]>(KEYS.BIRTH_POSTS),
  addBirthPost: async (post: BirthPost) => {
    const posts = (await get<BirthPost[]>(KEYS.BIRTH_POSTS)) || [];
    await set(KEYS.BIRTH_POSTS, [...posts, post]);
  },
};

// Utility: calculate gestational week from DUM
export function calculateGestationalWeek(dum: string): { week: number; day: number } {
  const dumDate = new Date(dum);
  const today = new Date();
  const diffMs = today.getTime() - dumDate.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const week = Math.floor(diffDays / 7);
  const day = diffDays % 7;
  return { week, day };
}

// Utility: generate unique ID
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
