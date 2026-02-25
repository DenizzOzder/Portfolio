export interface AdminSettings {
  contactEmail: string;
  resumePdfUrl: string;
  socialLinks: {
    github: string;
    linkedin: string;
    [key: string]: string;
  };
}
