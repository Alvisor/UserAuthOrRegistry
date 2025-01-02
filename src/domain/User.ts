export interface User {
    id: string;
    email: string;
    password?: string; //For local users only
    googleId?: string; //For Google users only
    name?: string;
  }
  