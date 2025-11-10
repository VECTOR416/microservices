import { Sale, SaleRepository } from "../.."


interface FindSaleByIdUseCase{
    execute(idSale: number): Promise<Sale | null>
}

export class FindSaleById implements FindSaleByIdUseCase{
    constructor(private readonly saleRepository: SaleRepository) { }

    async execute(idSale: number): Promise<Sale | null> {
        return this.saleRepository.findSaleById(idSale)
    }
}