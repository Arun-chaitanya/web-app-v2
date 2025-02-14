export interface HeaderProps {
  onBack?: () => void;
  type: 'users' | 'organizations';
  name: string;
  username?: string;
  img?: string;
  lastOnline?: string;
}
