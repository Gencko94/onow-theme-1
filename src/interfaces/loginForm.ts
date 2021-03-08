export interface LoginForm {
  phoneNumber: string;
  password: string;
}
export interface RegisterForm {
  phoneNumber: string;
  password: string;
  email: string;
}
export type SocialAuth = 'facebook' | 'instagram' | 'twitter' | 'apple';
