export type PaginationMetaData = {
  pages: number;
  prev: boolean;
  next: boolean;
  total: number;
  page: number;
  limit: number;
};

export type PaginatedRes<T> = {
  data: T[];
  meta: PaginationMetaData;
  pagination: PaginationMetaData;
  status: string;
};
