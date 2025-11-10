import { CreateSaleItemDto, ReduceProductStockRequest, SaleItem, SaleItemRepository, SaleRepository, UpdateSaleDto } from "../.."

interface AddSaleItemUseCase {
    execute(createSaleItemDto: CreateSaleItemDto): Promise<SaleItem>
}

export class AddSaleItem implements AddSaleItemUseCase {
    constructor(
        private readonly saleItemRepository: SaleItemRepository,
        private readonly saleRepository: SaleRepository,
        private readonly reduceProductStock: ReduceProductStockRequest
    ) { }

    async execute(createSaleItemDto: CreateSaleItemDto): Promise<SaleItem> {
        try {
            
            const isProductReduced = await this.reduceProductStock.execute(
                +createSaleItemDto.productId, 
                +createSaleItemDto.quantity
            )
            if(!isProductReduced) throw new Error()
            const saleItem = await this.saleItemRepository.addSaleItem(createSaleItemDto)
            const saleDB = await this.saleRepository.findSaleById(+saleItem.saleId)
            console.log(`SaleItem: ${ saleItem }`)
            console.log(`Sale: ${ saleDB }`)
            await this.saleRepository.updateSale(
                +saleItem.saleId,
                { total: saleDB!.total + saleItem.subtotal } as UpdateSaleDto)
            return saleItem
        } catch (error) {
            console.log(error)
            throw new Error()
        }
    }
}