export interface Entry {
  id?: string;
  title: string;
  description: string;
  created_at: Date | string;
  scheduled_at?: Date | string;
}
