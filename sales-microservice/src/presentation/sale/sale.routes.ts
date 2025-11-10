import { Router } from "express"
import { SaleDatasourceImpl, SaleRepositoryImpl } from "../../infrastructure"
import { SaleController } from "./sale.controller"
import { SaleItemDatasourceImpl } from "../../infrastructure/datasource/saleItem.datasource.impl"
import { SaleItemRepositoryImpl } from "../../infrastructure/repositories/saleItem.repository.impl"
import { IncreaseProductRequestImpl } from "../../infrastructure/requests/increaseProduct.request.impl"

export class SaleRoutes{
    static get routes(): Router{

        const router = Router()
        const saleDatasourceImpl = new SaleDatasourceImpl()
        const saleRepositoryImpl = new SaleRepositoryImpl(saleDatasourceImpl)

        const saleItemDatasource = new SaleItemDatasourceImpl()
        const saleItemRepository = new SaleItemRepositoryImpl(saleItemDatasource)

        const increaseProductRequest = new IncreaseProductRequestImpl()

        const saleController = new SaleController(saleRepositoryImpl, saleItemDatasource, increaseProductRequest)
        
        router.post('/', saleController.createSale)
        router.delete('/:id', saleController.cancelSale)
        router.get('/', saleController.findAllSales)
        router.get('/:id', saleController.findSaleById)
        router.put('/:id', saleController.updateSale)

        return router
    }
}