export interface User {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  website?: string;
  address?: string;
  password?: string;
  image?: string;
  role: 'user' | 'admin';
  createdAt?: string;
  updatedAt?: string;
}
