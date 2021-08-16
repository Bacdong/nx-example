import { Tag } from "./tag.model";

export interface Article {
  seo_title: string;
  seo_description: string;
  user_name: string;
  tags: Tag[];
  image: string;
  id: number;
  title: string;
  slug: string;
  available_on: string;
  content: string;
}