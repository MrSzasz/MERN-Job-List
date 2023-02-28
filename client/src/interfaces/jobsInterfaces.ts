export type statusVariants =
  | "success"
  | "rejected"
  | "processing"
  | "applied"
  | "later";

export interface statusColorsVariants {
  success: string;
  rejected: string;
  processing: string;
  applied: string;
  later: string;
}

export interface JobInterface {
  _id: string;
  title: string;
  link: string;
  description: string;
  status: statusVariants;
  date: string;
  company: string;
  requirements: string;
  extra?: string | null;
}

export interface UserInterface {
  email: string;
  password: string;
  jobs: [] | JobInterface[];
}
