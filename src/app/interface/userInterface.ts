export interface User {
    id?: number;           
    email: string;
    password?: string;     
    version?: number;      
    roles: string[];       
  }