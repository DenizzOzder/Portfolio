export interface CertificateItem {
  id: string;
  title: string;
  title_en?: string;
  issuer: string;
  issuer_en?: string;
  image: string;
  hoverDescription: string;
  hoverDescription_en?: string;
  techStacks: string[];
}
