export type RelationshipType = 'Serious' | 'Casual' | 'Friends' | 'Not sure';
export type ConnectionMode = 'Online' | 'Offline' | 'Both';

export interface DiscoverProfile {
  id: string;
  name: string;
  age: number;
  university: string;
  course: string;
  graduationYear: number;
  bio: string;
  hobbies: string[];
  relationshipType: RelationshipType;
  connectionMode: ConnectionMode;
  photos: string[];
  verified: { phone: boolean; email: boolean; university: boolean };
  contact: { email: string; phone: string };
}

export const mockProfiles: DiscoverProfile[] = [
  {
    id: '1',
    name: 'Aisha Khan',
    age: 20,
    university: 'Mumbai University',
    course: 'Computer Science',
    graduationYear: 2026,
    bio: 'Bookworm, product design enthusiast, and chai lover.',
    hobbies: ['Reading', 'Design', 'Cafes'],
    relationshipType: 'Serious',
    connectionMode: 'Both',
    photos: ['📸', '🎨', '☕', '🌆'],
    verified: { phone: true, email: true, university: true },
    contact: { email: 'aisha@example.com', phone: '+91 9000000001' },
  },
  {
    id: '2',
    name: 'Riya Das',
    age: 21,
    university: 'Delhi University',
    course: 'Economics',
    graduationYear: 2025,
    bio: 'Debate society lead who also loves street photography.',
    hobbies: ['Debates', 'Photography', 'Travel'],
    relationshipType: 'Friends',
    connectionMode: 'Offline',
    photos: ['📷', '🚌', '🎤', '🌸'],
    verified: { phone: true, email: true, university: true },
    contact: { email: 'riya@example.com', phone: '+91 9000000002' },
  },
  {
    id: '3',
    name: 'Megha Sharma',
    age: 22,
    university: 'IIT Bombay',
    course: 'Electrical Engineering',
    graduationYear: 2024,
    bio: 'Hackathons, indie music, and late night coding sessions.',
    hobbies: ['Music', 'Coding', 'Badminton'],
    relationshipType: 'Casual',
    connectionMode: 'Online',
    photos: ['🎧', '💻', '🏸', '🌙'],
    verified: { phone: true, email: true, university: true },
    contact: { email: 'megha@example.com', phone: '+91 9000000003' },
  },
  {
    id: '4',
    name: 'Sneha Verma',
    age: 19,
    university: 'Christ University',
    course: 'Psychology',
    graduationYear: 2027,
    bio: 'Mental health advocate and amateur guitarist.',
    hobbies: ['Music', 'Writing', 'Volunteering'],
    relationshipType: 'Not sure',
    connectionMode: 'Both',
    photos: ['🎸', '📓', '🌿', '🫶'],
    verified: { phone: true, email: true, university: true },
    contact: { email: 'sneha@example.com', phone: '+91 9000000004' },
  },
];

export interface RequestItem {
  id: string;
  profileId: string;
  name: string;
  message: string;
  time: string;
}

export const receivedRequests: RequestItem[] = [
  { id: 'r1', profileId: '2', name: 'Riya Das', message: 'Loved your profile vibe ✨', time: '2h ago' },
  { id: 'r2', profileId: '3', name: 'Megha Sharma', message: 'Want to connect over music?', time: '1d ago' },
];

export const sentRequests: RequestItem[] = [
  { id: 's1', profileId: '1', name: 'Aisha Khan', message: 'Hey, we share similar interests!', time: '4h ago' },
];

export interface MatchItem {
  id: string;
  profileId: string;
  name: string;
  lastMessage: string;
  unreadCount: number;
  online: boolean;
}

export const mockMatches: MatchItem[] = [
  { id: 'm1', profileId: '1', name: 'Aisha Khan', lastMessage: 'Let’s meet at the campus cafe?', unreadCount: 2, online: true },
  { id: 'm2', profileId: '2', name: 'Riya Das', lastMessage: 'Sent you my debate notes!', unreadCount: 0, online: false },
];
