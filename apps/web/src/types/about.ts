export interface AboutRowItem {
  id: string;
  order: number; // For admin sorting
  title?: string; // Optional section title (TR)
  title_en?: string; // Optional section title (EN)
  content: string; // Markdown or plain text content (TR)
  content_en?: string; // Markdown or plain text content (EN)
  imageUrl: string;
  imagePosition: 'left' | 'right'; // Dictates the zig-zag layout
}
