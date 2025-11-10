import { PrismaAdapter } from "../../config";
import { CreateSaleItemDto, SaleItem, SaleItemDatasource } from "../../domain";

export class SaleItemDatasourceImpl implements SaleItemDatasource{
    async addSaleItem(createSaleItemDto: CreateSaleItemDto): Promise<SaleItem> {
        try {
            const prisma = PrismaAdapter.crearConexion()
            return await prisma.saleItem.create({
                data: createSaleItemDto
            }) as SaleItem
        } catch (error) {
            console.log(error)
            throw new Error();
        }
    }
    async removeSaleItem(idSaleItem: number): Promise<SaleItem> {
        try {
            const prisma = PrismaAdapter.crearConexion()
            return await prisma.saleItem.delete({
                where: { id: idSaleItem }
            })
        } catch (error) {
            console.log(error)
            throw new Error();
        }
    }
    async obtainSaleItemsByIdSale(idSale: number): Promise<SaleItem[]> {
        const prisma = PrismaAdapter.crearConexion()
        return await prisma.saleItem.findMany({
            where: { saleId: idSale }
        })
    }

}