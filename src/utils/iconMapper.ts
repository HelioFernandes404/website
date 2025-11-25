import { LucideIcon, Github, Linkedin, Mail, Twitter, Globe } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Github,
  Linkedin,
  Mail,
  Twitter,
  Globe,
};

export function getIcon(iconName: string): LucideIcon {
  return iconMap[iconName] || Globe; // Default to Globe if icon not found
}
