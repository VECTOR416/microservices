import { CreateSaleItemDto, SaleItem, SaleItemDatasource, SaleItemRepository } from "../../domain";

export class SaleItemRepositoryImpl implements SaleItemRepository{

    constructor(
        private readonly saleItemDatasource: SaleItemDatasource
    ){}

    addSaleItem(createSaleItemDto: CreateSaleItemDto): Promise<SaleItem> {
        return this.saleItemDatasource.addSaleItem(createSaleItemDto)
    }
    removeSaleItem(idSaleItem: number): Promise<SaleItem> {
        return this.saleItemDatasource.removeSaleItem(idSaleItem)
    }
    obtainSaleItemsByIdSale(idSale: number): Promise<SaleItem[]> {
        return this.saleItemDatasource.obtainSaleItemsByIdSale(idSale)
    }

}