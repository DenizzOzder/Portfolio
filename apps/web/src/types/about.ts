export interface AboutRowItem {
  id: string;
  order: number; // For admin sorting
  title?: string; // Optional section title
  content: string; // Markdown or plain text content
  imageUrl: string;
  imagePosition: 'left' | 'right'; // Dictates the zig-zag layout
}
