import { CreateSaleItemDto, SaleItem } from "..";

export interface SaleItemRepository{
    addSaleItem(createSaleItemDto: CreateSaleItemDto): Promise<SaleItem>
    removeSaleItem(idSaleItem: number): Promise<SaleItem>
    obtainSaleItemsByIdSale(idSale: number): Promise<SaleItem[]>
}