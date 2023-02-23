export interface JobInterface {
  title: string;
  link: string;
  description: string;
  status: "success" | "rejected" | "processing" | "applied" | "later";
  date: string;
  company: string;
  requirements: string;
  extra?: string;
}
