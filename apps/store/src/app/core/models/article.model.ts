import { Tag } from "./tag.model";

export interface Article {
  seo_title: string;
  seo_description: string;
  user_name: string;
  tags: Tag[];
  image: string;
  id: number;
  title: string;
  brief: string;
  slug: string;
  available_on: string;
  content: string;
}

export interface ArticleList {
  total: number;
  current_page: number;
  page_size: number;
  total_page: number;
  next_page?: number;
  prev_page?: number;
  page_list: any[];
  results: Article[];
}