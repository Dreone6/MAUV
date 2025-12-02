
export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  IMAGE_EDITOR = 'IMAGE_EDITOR',
  CALENDAR = 'CALENDAR',
  CHAT = 'CHAT',
  PARTNER = 'PARTNER',
  TRIBAL_CHAT = 'TRIBAL_CHAT'
}

export interface LogOption {
  id: string;
  label: string;
}

export interface LogCategoryDefinition {
  id: string;
  label: string;
  icon: string;
  colorClass: string;
  type: 'selection' | 'number' | 'text';
  options?: LogOption[]; // For selection type
  unit?: string; // For number type
  multiSelect?: boolean; // For selection type
}

export interface QuickLogItem {
  id: string;
  icon: string;
  label: string;
  colorClass: string;
  isActive: boolean;
}

export interface InsightItem {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isTyping?: boolean;
}

export interface TribalComment {
  id: string;
  text: string;
  author: string;
  timestamp: Date;
  avatarColor: string;
}

export interface TribalPost {
  id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  timestamp: Date;
  likes: number;
  comments: TribalComment[];
  avatarColor: string;
}