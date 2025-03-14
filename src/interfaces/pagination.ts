export type PaginatedRes<T> = {
  data: T[];
  meta: {
    pages: number;
    prev: boolean;
    next: boolean;
    total: number;
    page: number;
    limit: number;
  };
  status: string;
};
