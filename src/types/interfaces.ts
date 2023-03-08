export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  role: "admin" | "user";
}

export interface StressLevel {
  id: number;
  name: string;
}

export interface Stress {
  id: string;
  userId: string;
  stressLevelId: number;
  stressLevel?: StressLevel;
  isAnonymous?: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export interface Image {
  id: string;
  stressId: string;
  originalPath: string;
  createdAt: Date;
  name: string;
}

export interface Thumbnail {
  id: string;
  name: string;
  imageId: string;
  path: string;
  type: "pc" | "mobile";
  height: number;
  width: number;
  size: string;
}

export interface UserLogged {
  user: User;
  token: string;
}
