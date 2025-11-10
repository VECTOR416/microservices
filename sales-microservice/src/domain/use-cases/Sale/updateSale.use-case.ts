import { Sale, SaleRepository, UpdateSaleDto } from "../.."

interface UpdateSaleUseCase{
    execute(idSale:number, updateSaleDto: UpdateSaleDto): Promise<Sale>
}

export class UpdateSale implements UpdateSaleUseCase{
    constructor(private readonly saleRepository: SaleRepository) { }

    async execute(idSale:number, updateSaleDto: UpdateSaleDto): Promise<Sale> {
        return this.saleRepository.updateSale(idSale, updateSaleDto)
    }
}