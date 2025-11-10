import { ProductRepository } from "../..";

interface GetProductStockUseCase {
    execute(idProduct: number):
        Promise<{
            productId: number;
            stock: number;
            available: boolean;
        }>
}

export class GetProductStock implements GetProductStockUseCase {
    constructor(private readonly productRepository: ProductRepository) { }

    async execute(idProduct: number):
        Promise<{
            productId: number;
            stock: number;
            available: boolean;
        }> {
        return this.productRepository.getStock(idProduct);
    }
}