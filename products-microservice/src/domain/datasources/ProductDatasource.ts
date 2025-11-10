import { CreateProductDto, Product, UpdateProductDto } from "..";

export interface ProductDatasource {
    findAll(): Promise<Product[]>;
    findById(idProduct: number): Promise<Product | null>;
    create(createProductDto: CreateProductDto): Promise<Product>;
    update(idProduct: number, updateProductDto: UpdateProductDto): Promise<Product>;
    delete(idProduct: number): Promise<boolean>;
    updateStock(idProduct: number, quantity: number): Promise<Product>;
    getStock(idProduct: number): Promise<{productId: number, stock: number, available: boolean}>
    reduceStock(idProduct: number, quantity: number): Promise<boolean>
    increaseStock(idProduct: number, quantity: number): Promise<boolean>
}