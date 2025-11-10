import { IncreaseProductStockRequest, RemoveSaleItem, SaleItemRepository, SaleRepository } from "../.."

interface CancelSaleUseCase{
    execute(idSale: number): Promise<boolean>
}

export class CancelSale implements CancelSaleUseCase{
    constructor(
        private readonly saleRepository: SaleRepository,
        private readonly saleItemRepository: SaleItemRepository,
        private readonly increaseProductStock: IncreaseProductStockRequest
    ) { }

    async execute(idSale: number): Promise<boolean> {
        const saleItemsDB = await this.saleItemRepository.obtainSaleItemsByIdSale(idSale)
        saleItemsDB.forEach(async saleItem => {
            await new RemoveSaleItem(this.saleItemRepository, this.saleRepository, this.increaseProductStock).execute(saleItem.id)
        })
        return this.saleRepository.cancelSale(idSale)
    }
}