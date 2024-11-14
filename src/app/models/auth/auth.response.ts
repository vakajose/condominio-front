import {Usuario} from './usuario.model';

export interface AuthResponse{
  access_token:string
  refresh_token:string
  user:Usuario
}
