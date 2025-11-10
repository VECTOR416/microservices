import { CreateSaleDto, Sale, SaleDatasource, SaleRepository, UpdateSaleDto } from "../../domain";

export class SaleRepositoryImpl implements SaleRepository{

    constructor(
        private readonly saleDatasource: SaleDatasource
    ){}
    createSale(createSaleDto: CreateSaleDto): Promise<Sale> {
        return this.saleDatasource.createSale(createSaleDto)
    }
    updateSale(idSale: number, updateSaledto: UpdateSaleDto): Promise<Sale> {
        return this.saleDatasource.updateSale(idSale, updateSaledto)
    }
    findAllSales(): Promise<Sale[]> {
        return this.saleDatasource.findAllSales()
    }
    findSaleById(idSale: number): Promise<Sale | null> {
        return this.saleDatasource.findSaleById(idSale)
    }
    cancelSale(idSale: number): Promise<boolean> {
        return this.saleDatasource.cancelSale(idSale)
    }
}