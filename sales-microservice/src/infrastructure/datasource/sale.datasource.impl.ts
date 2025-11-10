import { PrismaAdapter } from "../../config";
import { CreateSaleDto, Sale, SaleDatasource, SaleItem, UpdateSaleDto } from "../../domain";

export class SaleDatasourceImpl implements SaleDatasource{
    async createSale(createSaleDto: CreateSaleDto): Promise<Sale> {
        try {
            const prisma = PrismaAdapter.crearConexion()
            return await prisma.sale.create({
                data: createSaleDto
            }) as Sale
        } catch (error) { 
            throw new Error();
        }
    }
    async updateSale(idSale: number, updateSaledto: UpdateSaleDto): Promise<Sale> {
        try {
            const saleBD = await this.findSaleById(idSale)
            if( !saleBD ) throw new Error()
            const prisma = PrismaAdapter.crearConexion()
            return await prisma.sale.update({
                data: {
                    total: updateSaledto.total ?? saleBD.total,
                    status: updateSaledto.status || saleBD.status,
                    customerName: updateSaledto.customerName || saleBD.customerName
                },
                where: { id: idSale }
            }) as Sale
        } catch (error) {     
            throw new Error();
        }
    }
    async findAllSales(): Promise<Sale[]> {
        try {
            const prisma = PrismaAdapter.crearConexion()
            return await prisma.sale.findMany() as Sale[]
        } catch (error) {
            return []
        }
    }
    async findSaleById(idSale: number): Promise<Sale | null> {
        try {
            const prisma = PrismaAdapter.crearConexion()
            return await prisma.sale.findFirst({
                where: { id: idSale }
            }) as Sale
        } catch (error) {
            throw new Error()       
        }
    }
    async cancelSale(idSale: number): Promise<boolean> {
        try {
            const saleDB = await this.findSaleById(idSale)
            if( !saleDB ) throw new Error()
            const prisma = PrismaAdapter.crearConexion()
            await prisma.sale.update({
                data: { status: "CANCELLED" },
                where: { id: idSale }
            })
            return true
        } catch (error) {
            return false
        }
    }

}