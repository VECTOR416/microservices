import { CreateProductDto, Product, ProductDatasource, ProductRepository, UpdateProductDto } from "../../domain";

export class ProductRepositoryImpl implements ProductRepository{

    constructor(
        private readonly productDatasource: ProductDatasource
    ){}
    reduceStock(idProduct: number, quantity: number): Promise<boolean> {
        return this.productDatasource.reduceStock(idProduct, quantity)
    }
    increaseStock(idProduct: number, quantity: number): Promise<boolean> {
        return this.productDatasource.increaseStock(idProduct, quantity)
    }
    findAll(): Promise<Product[]> {
        return this.productDatasource.findAll();
    }
    findById(idProduct: number): Promise<Product | null> {
        return this.productDatasource.findById(idProduct);
    }
    create(createProductDto: CreateProductDto): Promise<Product> {
        return this.productDatasource.create(createProductDto);
    }
    update(idProduct: number, updateProductDto: UpdateProductDto): Promise<Product> {
        return this.productDatasource.update(idProduct, updateProductDto);
    }
    delete(idProduct: number): Promise<boolean> {
        return this.productDatasource.delete(idProduct);
    }
    updateStock(idProduct: number, quantity: number): Promise<Product> {
        return this.productDatasource.updateStock(idProduct, quantity)
    }
    getStock(idProduct: number): Promise<{ productId: number; stock: number; available: boolean; }> {
        return this.productDatasource.getStock(idProduct);
    }

}