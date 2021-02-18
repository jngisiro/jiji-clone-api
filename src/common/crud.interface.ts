export interface CRUD {
  list: (limit: number, page: number) => any;
  create: (resource: any) => number;
  updateById: (resourceId: any) => string;
  readById: (resourceId: any) => any;
  deleteById: (resourceId: any) => string;
  patchById: (resourceId: any) => string;
}
