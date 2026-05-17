import CategoryDal, { CATEGORY_NOT_FOUND_ERROR, SUBCATEGORY_NOT_FOUND_ERROR } from "./category-dal";
import { Category, SubCategory } from "./category-models";

export default class CategoryService {
    constructor(private categoryDal: CategoryDal) {}

    async getAllCategories(): Promise<Array<Category>> {
        return this.categoryDal.getAllCategories();
    }

    async getCategoryById(id: string): Promise<Category | null> {
        try {
            return await this.categoryDal.getCategoryById(id);
        } catch (err: any) {
            if (err.message === CATEGORY_NOT_FOUND_ERROR) {
                return null;
            }
            throw err;
        }
    }

    async getSubCategoriesByCategoryId(categoryId: string): Promise<Array<SubCategory>> {
        return this.categoryDal.getSubCategoriesByCategoryId(categoryId);
    }

    async seedData(): Promise<void> {
        await this.categoryDal.seedData();
    }
}