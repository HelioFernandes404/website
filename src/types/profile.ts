import { LucideIcon } from "lucide-react";

export interface ProfileLink {
  id: number;
  label: string;
  url: string;
  iconName: string; // Icon name as string, will be resolved to component
  primary?: boolean;
}

export interface ProfileData {
  name: string;
  role: string;
  bio: string;
  image: string;
  links: ProfileLink[];
}
