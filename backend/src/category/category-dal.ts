import { Collection } from "mongodb";
import DbConn from "../utils/db-conn";
import { Category, CategoryWithId, SubCategory, SubCategoryWithId } from "./category-models";

const CATEGORY_COLLECTION_NAME = "categories";
const SUBCATEGORY_COLLECTION_NAME = "sub_categories";

export const CATEGORY_NOT_FOUND_ERROR = "Category not found";
export const SUBCATEGORY_NOT_FOUND_ERROR = "SubCategory not found";

export default class CategoryDal {
    private categoryCollection: Collection<Category>;
    private subCategoryCollection: Collection<SubCategory>;

    constructor(dbConn: DbConn) {
        this.categoryCollection = dbConn.getDb().collection(CATEGORY_COLLECTION_NAME);
        this.subCategoryCollection = dbConn.getDb().collection(SUBCATEGORY_COLLECTION_NAME);
    }

    async getAllCategories(): Promise<Array<Category>> {
        const categories: Array<CategoryWithId> = await this.categoryCollection.find({}).toArray();
        categories.forEach(c => delete c._id);
        return categories;
    }

    async getCategoryById(id: string): Promise<Category> {
        const category: CategoryWithId | null = await this.categoryCollection.findOne({ id });
        if (!category) {
            throw new Error(CATEGORY_NOT_FOUND_ERROR);
        }
        delete category._id;
        return category;
    }

    async getSubCategoriesByCategoryId(categoryId: string): Promise<Array<SubCategory>> {
        const subCategories: Array<SubCategoryWithId> = await this.subCategoryCollection
            .find({ categoryId })
            .toArray();
        subCategories.forEach(s => delete s._id);
        return subCategories;
    }

    async seedData(): Promise<void> {
        const count = await this.categoryCollection.countDocuments();
        if (count > 0) return;

        const categories: Category[] = [
            { id: "1", name: "Science" },
            { id: "2", name: "Technology" },
            { id: "3", name: "History" },
        ];

        const subCategories: SubCategory[] = [
            { id: "1", name: "Space", categoryId: "1" },
            { id: "2", name: "Biology", categoryId: "1" },
            { id: "3", name: "Artificial Intelligence", categoryId: "2" },
            { id: "4", name: "Web Development", categoryId: "2" },
            { id: "5", name: "Ancient Rome", categoryId: "3" },
            { id: "6", name: "World War II", categoryId: "3" },
        ];

        await this.categoryCollection.insertMany(categories);
        await this.subCategoryCollection.insertMany(subCategories);

        console.log("Seed data inserted ✅");
    }
}