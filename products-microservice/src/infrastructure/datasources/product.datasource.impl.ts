import { PrismaAdapter } from "../../config";
import { CreateProductDto, Product, ProductDatasource, UpdateProductDto } from "../../domain";

export class ProductDatasourceImpl implements ProductDatasource {
    async reduceStock(idProduct: number, quantity: number): Promise<boolean> {
        try {
            const productDB = await this.findById(idProduct)
            if (!productDB) throw new Error()
            const prisma = PrismaAdapter.crearConexion()
            await prisma.product.update({
                data: { stock: quantity },
                where: { id: idProduct }
            })
            return true
        } catch (error) {
            return false
        }
    }
    async increaseStock(idProduct: number, quantity: number): Promise<boolean> {
        try {
            const productDB = await this.findById(idProduct)
            if (!productDB) throw new Error()
            const prisma = PrismaAdapter.crearConexion()
            await prisma.product.update({
                data: { stock: quantity },
                where: { id: idProduct }
            })
            return true
        } catch (error) {
            return false
        }
    }


    async findAll(): Promise<Product[]> {
        try {
            const prisma = PrismaAdapter.crearConexion()
            return await prisma.product.findMany({
                where: { isActive: true }
            }) as Product[]
        } catch (error) {
            return []
        }
    }
    async findById(idProduct: number): Promise<Product | null> {
        try {
            const prisma = PrismaAdapter.crearConexion()
            return await prisma.product.findFirst({
                where: { id: idProduct, isActive: true }
            }) as Product
        } catch (error) {
            throw new Error('Nombre de error')
        }
    }
    async create(createProductDto: CreateProductDto): Promise<Product> {
        try {
            const prisma = PrismaAdapter.crearConexion()
            return await prisma.product.create({
                data: createProductDto
            }) as Product
        } catch (error) {
            throw new Error()
        }
    }
    async update(idProduct: number, updateProductDto: UpdateProductDto): Promise<Product> {
        try {
            const productDB = await this.findById(idProduct)
            if (!productDB) throw new Error()
            const prisma = PrismaAdapter.crearConexion()
            return await prisma.product.update({
                data: {
                    name: updateProductDto.name || productDB.name,
                    description: updateProductDto.description || productDB.description,
                    price: updateProductDto.price || productDB.price,
                    stock: updateProductDto.stock || productDB.stock,
                    minStock: updateProductDto.minStock || productDB.minStock,
                    categoryId: updateProductDto.categoryId || productDB.categoryId,
                    imageUrl: updateProductDto.imageUrl || productDB.imageUrl,
                },
                where: { id: idProduct, isActive: true }
            }) as Product
        } catch (error) {
            throw new Error()
        }
    }
    async delete(idProduct: number): Promise<boolean> {
        try {
            const productDB = await this.findById(idProduct)
            if (!productDB) throw new Error()
            const prisma = PrismaAdapter.crearConexion()
            await prisma.product.update({
                data: { isActive: !productDB.isActive },
                where: { id: idProduct }
            })
            return true
        } catch (error) {
            return false
        }
    }
    async updateStock(idProduct: number, quantity: number): Promise<Product> {
        try {
            const productDB = await this.findById(idProduct)
            if (!productDB) throw new Error()
            const prisma = PrismaAdapter.crearConexion()
            return await prisma.product.update({
                data: { stock: quantity },
                where: { id: idProduct, isActive: true }
            }) as Product
        } catch (error) {
            throw new Error();
        }
    }
    async getStock(idProduct: number): Promise<{ productId: number; stock: number; available: boolean; }> {
        try {
            const productDB = await this.findById(idProduct)
            if (!productDB) throw new Error()
            return {
                productId: productDB.id,
                stock: productDB.stock,
                available: productDB.stock > productDB.minStock
            }
        } catch (error) {
            throw new Error("Method not implemented.");
        }
    }

}