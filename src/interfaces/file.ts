export interface IFile {
  bytes: number;
  created_at: number;
  filename: string;
  id: string;
  object: string;
  purpose: string;
  access_policy?: "private" | "public";
}