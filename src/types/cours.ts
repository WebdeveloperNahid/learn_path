export type TCourse = {
  _id: string;
  title: string;
  category: string;
  level: string;
  instructor: string;
  language: string;
  price: number;
  originalPrice: number | null;
  duration: string;
  totalLectures: number;
  certificate: boolean;
  startDate: string;
  mode: string;
  location: string;
  image: string;
  shortDescription: string;
  description: string;
  rating: number;
  studentsEnrolled: number;
  createdBy: string;
  gallery: string[];
  learnings: string[];
  requirements: string[];
};

export type TCreateCours = Omit<TCourse, "_id">;

export type TMutationResponse = {
  acknowledged: boolean;
  insertedId?: string;
  modifiedCount?: number;
  deletedCount?: number;
};