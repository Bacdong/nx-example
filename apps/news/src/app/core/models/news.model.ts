import { Pagination } from "./pagination.model";

export interface News {
  tenDanhMuc: string;
  ghiChu: string;
  cssClass: string;
  soThuTu: number;
  isSuDung: boolean;
  isBinhLuan: boolean;
  idTemplate: number;
  nameTemplate: string;
  cultureId: number;
  cultureName: string;
  cultureIdMap: number;
  forWeb: number;
}

export interface NewsList {
  items: News[];
  pagingInfo: Pagination;
}