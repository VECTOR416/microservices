import { Router } from "express"
import { SaleDatasourceImpl, SaleRepositoryImpl } from "../../infrastructure"
import { SaleItemDatasourceImpl } from "../../infrastructure/datasource/saleItem.datasource.impl"
import { SaleItemRepositoryImpl } from "../../infrastructure/repositories/saleItem.repository.impl"
import { SaleItemController } from "./saleItem.controller"
import { IncreaseProductRequestImpl } from "../../infrastructure/requests/increaseProduct.request.impl"
import { ReduceProductRequestImpl } from "../../infrastructure/requests/reduceProduct.request.impl"


export class SaleItemRoutes{
    static get routes(): Router{

        const router = Router()
        const saleItemDatasource = new SaleItemDatasourceImpl()
        const saleItemRepository = new SaleItemRepositoryImpl(saleItemDatasource)

        const saleDatasourceImpl = new SaleDatasourceImpl()
        const saleRepositoryImpl = new SaleRepositoryImpl(saleDatasourceImpl)

        const increaseProductRequest = new IncreaseProductRequestImpl()
        const reduceProductRequest = new ReduceProductRequestImpl()

        const saleItemController = new SaleItemController(
            saleItemRepository, 
            saleRepositoryImpl, 
            increaseProductRequest, 
            reduceProductRequest
        )
        
        router.post('/', saleItemController.addSaleItem)
        router.get('/:id', saleItemController.obtainSaleItemsBySaleId)
        router.delete('/:id', saleItemController.removeSaleItem)
 

        return router
    }
}