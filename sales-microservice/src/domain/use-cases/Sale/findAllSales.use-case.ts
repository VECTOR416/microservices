import { Sale, SaleRepository } from "../.."
import { ProductRequest } from "../../../infrastructure/requests/produc.request"

interface FindAllSalesUseCase{
    execute(): Promise<Sale[]>
}

export class FindAllSales implements FindAllSalesUseCase{
    constructor(private readonly saleRepository: SaleRepository) { }

    async execute(): Promise<Sale[]> {

        const prueba = await ProductRequest.prueba()
        console.log(prueba)

        return this.saleRepository.findAllSales()
    }
}