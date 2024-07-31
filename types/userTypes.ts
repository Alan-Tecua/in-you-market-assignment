import { ReactNode } from 'react';

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  phone: ReactNode;
  website: ReactNode;
  address: any;
  company: any;
}
