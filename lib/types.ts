export interface Memory {
  id: string;
  image: string;
  year: string;
  title: string;
  shortStory: string;
  alt: string;
}

export interface TimelineYear {
  year: number;
  image: string;
  title: string;
  memory: string;
  alt: string;
}

export interface GuestbookEntry {
  id: string;
  message: string;
  createdAt: string;
}
