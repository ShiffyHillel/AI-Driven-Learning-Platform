export interface Category {
    id: string;
    name: string;
}

export interface CategoryWithId extends Category {
    _id?: any;
}

export interface SubCategory {
    id: string;
    name: string;
    categoryId: string;
}

export interface SubCategoryWithId extends SubCategory {
    _id?: any;
}