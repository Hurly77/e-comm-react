export interface CategoryModel {
  id: number;
  name: string;

  children: CategoryModel[] | null;
  parent: CategoryModel | null;
}
