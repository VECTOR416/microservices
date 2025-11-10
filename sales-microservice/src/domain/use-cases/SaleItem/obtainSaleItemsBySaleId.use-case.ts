import { SaleItem, SaleItemRepository } from "../.."

interface ObtainSaleItemsBySaleIdUseCase {
    execute(idSale: number): Promise<SaleItem[]>
}

export class ObtainSaleItemsBySaleId implements ObtainSaleItemsBySaleIdUseCase {
    constructor(
        private readonly saleItemRepository: SaleItemRepository,
    ) { }

    async execute(idSale: number): Promise<SaleItem[]> {
        return this.saleItemRepository.obtainSaleItemsByIdSale(idSale)
    }
}