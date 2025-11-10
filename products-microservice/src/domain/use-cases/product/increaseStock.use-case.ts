import { ProductRepository } from "../.."


interface IncreaseStockUseCase {
    execute(idProduct: number, quantity: number): Promise<boolean>
}

export class IncreaseStock implements IncreaseStockUseCase {
    constructor(private readonly productRepository: ProductRepository) { }

    async execute(idProduct: number, quantity: number): Promise<boolean> {
        try {
            const productDB = await this.productRepository.findById(idProduct)
            if (!productDB) throw new Error()
            await this.productRepository.updateStock(idProduct, productDB.stock + quantity)
            return true
        } catch (error) {
            return false
        }
    }
}