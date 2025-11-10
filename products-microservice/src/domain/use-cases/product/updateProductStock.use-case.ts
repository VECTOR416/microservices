import { Product, ProductRepository } from "../..";

interface UpdateProductStockUseCase{
    execute(idProduct: number, quantity: number): Promise<Product>
}

export class UpdateProductStock implements UpdateProductStockUseCase{
    constructor(private readonly productRepository: ProductRepository) { }

    async execute(idProduct: number, quantity: number): Promise<Product> {
        try {
            const productDB = await this.productRepository.findById(idProduct)
            if( !productDB ) throw new Error()
            if( productDB.minStock > quantity ) throw new Error()
            return this.productRepository.updateStock(idProduct, quantity); 
        } catch (error) {
            throw new Error()
        }
    }
}