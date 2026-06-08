// User Types
export interface User {
  id: string;
  phone: string;
  email: string;
  name: string;
  age: number;
  university: string;
  rollNumber: string;
  degree: string;
  course: string;
  graduationYear: number;
  bio: string;
  hobbies: string[];
  relationshipType: string[];
  genderPreference: string[];
  connectionMode: 'online' | 'offline' | 'both';
  photos: string[];
  gender: 'male' | 'female' | 'other';
  verificationBadges: {
    phone: boolean;
    email: boolean;
    id: boolean;
    university: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

// Auth Types
export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
}

export interface OTPRequest {
  phone?: string;
  email?: string;
}

export interface OTPVerification {
  phone?: string;
  email?: string;
  otp: string;
}

// Profile Types
export interface Profile extends User {}

// Request Types
export interface ConnectionRequest {
  id: string;
  senderId: string;
  sender: User;
  recipientId: string;
  recipient: User;
  status: 'pending' | 'accepted' | 'rejected';
  message?: string;
  createdAt: string;
  updatedAt: string;
}

// Match Types
export interface Match {
  id: string;
  userId1: string;
  user1: User;
  userId2: string;
  user2: User;
  createdAt: string;
}

// Message Types
export interface Message {
  id: string;
  matchId: string;
  senderId: string;
  sender: User;
  content: string;
  type: 'text' | 'image';
  imageUrl?: string;
  createdAt: string;
  readAt?: string;
}

// Onboarding Types
export interface OnboardingStep {
  step: number;
  completed: boolean;
  data?: Record<string, any>;
}

export interface OnboardingData {
  phone?: string;
  email?: string;
  name?: string;
  age?: number;
  university?: string;
  rollNumber?: string;
  degree?: string;
  course?: string;
  graduationYear?: number;
  bio?: string;
  hobbies?: string[];
  relationshipType?: string[];
  genderPreference?: string[];
  connectionMode?: 'online' | 'offline' | 'both';
  photos?: string[];
  gender?: 'male' | 'female' | 'other';
}

// Filter Types
export interface DiscoverFilters {
  ageMin?: number;
  ageMax?: number;
  university?: string;
  course?: string;
  graduationYear?: number;
  relationshipType?: string[];
  genderPreference?: string[];
  connectionMode?: 'online' | 'offline' | 'both';
  hobbies?: string[];
  gender?: 'male' | 'female' | 'other';
}

export interface DiscoverSort {
  field: 'newest' | 'verified' | 'nearest';
  order: 'asc' | 'desc';
}
