import { IncreaseProductStockRequest, SaleItem, SaleItemRepository, SaleRepository, UpdateSaleDto } from "../.."

interface RemoveSaleItemUseCase {
    execute(idSaleItem: number): Promise<SaleItem>
}

export class RemoveSaleItem implements RemoveSaleItemUseCase {
    constructor(
        private readonly saleItemRepository: SaleItemRepository,
        private readonly saleRepository: SaleRepository,
        private readonly increaseProductStock: IncreaseProductStockRequest
    ) { }

    async execute(idSaleItem: number): Promise<SaleItem> {
        try {
            const saleItem = await this.saleItemRepository.removeSaleItem(idSaleItem)
            const saleDB = await this.saleRepository.findSaleById(+saleItem.saleId)
            const isProductIncreased = await this.increaseProductStock.execute(+saleItem.productId, saleItem.quantity)
            if(!isProductIncreased) throw new Error()
            console.log(`Total: ${ saleDB!.total }`)
            console.log(`Subtotal: ${ saleItem.subtotal }`)
            console.log(`SaleId: ${ saleItem.saleId}`)
            const total = saleDB!.total - saleItem.subtotal
            const sale = await this.saleRepository.updateSale(
                saleDB!.id,
                { total: 0 } as UpdateSaleDto)
            console.log(`Sale: ${ JSON.stringify(sale) }`)
            return saleItem
        } catch (error) {
            console.log(error)
            throw new Error()
        }
    }
}