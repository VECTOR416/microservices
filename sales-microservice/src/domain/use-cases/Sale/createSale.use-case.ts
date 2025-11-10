import { CreateSaleDto, Sale, SaleRepository } from "../..";


interface CreateSaleUseCase{
    execute(createSaleDto: CreateSaleDto): Promise<Sale>
}

export class CreateSale implements CreateSaleUseCase{
    constructor(private readonly saleRepository: SaleRepository) { }

    async execute(createSaleDto: CreateSaleDto): Promise<Sale> {
        return this.saleRepository.createSale(createSaleDto)
    }
}