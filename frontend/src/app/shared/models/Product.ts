export class Product {
    id!: string;
    name!: string;
    price!: number;
    favorite!: boolean;
    stars!: number;
    imageUrl!: string;
    categorys!: string[];
    description!: string;
    state!: string[];
    material!: string[];
    tags?: string[];
}