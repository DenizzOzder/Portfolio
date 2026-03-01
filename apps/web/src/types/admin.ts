export interface AdminSettings {
  contactEmail: string;
  resumePdfUrl?: string; // Legacy
  resumePdfUrlTr: string;
  resumePdfUrlEn: string;
  socialLinks: {
    github: string;
    linkedin: string;
    [key: string]: string;
  };
}
