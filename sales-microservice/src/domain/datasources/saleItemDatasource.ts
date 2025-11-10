import { CreateSaleItemDto, SaleItem } from "..";

export interface SaleItemDatasource{
    addSaleItem(createSaleItemDto: CreateSaleItemDto): Promise<SaleItem>
    removeSaleItem(idSaleItem: number): Promise<SaleItem>
    obtainSaleItemsByIdSale(idSale: number): Promise<SaleItem[]>
}