import { CreateSaleDto, Sale, UpdateSaleDto } from "..";

export interface SaleDatasource{
    createSale(createSaleDto: CreateSaleDto): Promise<Sale>
    updateSale(idSale: number, updateSaledto: UpdateSaleDto): Promise<Sale>
    findAllSales(): Promise<Sale[]>
    findSaleById(idSale: number): Promise<Sale | null>
    cancelSale(idSale: number): Promise<boolean>
    
}


