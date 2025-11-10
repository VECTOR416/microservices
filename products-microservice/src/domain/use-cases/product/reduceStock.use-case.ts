import { ProductRepository } from "../..";

interface ReduceStockUseCase {
    execute(idProduct: number, quantity: number): Promise<boolean>
}

export class ReduceseStock implements ReduceStockUseCase {
    constructor(private readonly productRepository: ProductRepository) { }

    async execute(idProduct: number, quantity: number): Promise<boolean> {
        try {
            const productDB = await this.productRepository.findById(idProduct)
            if (!productDB) throw new Error()
            if ((productDB.stock - quantity) <= productDB.minStock ) throw new Error()
            await this.productRepository.updateStock(idProduct, productDB.stock - quantity)
            return true
        } catch (error) {
            return false
        }
    }
}