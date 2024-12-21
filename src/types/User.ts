export interface User {
    id: string;
    email: string;
    role: string;
    city?: string;
    
    emailVerified?: boolean;
    isAnonymous?: boolean;
    providerData?: unknown[];
  
  }
  