import { Router } from "express"
import { ProductController } from "./product.controller"
import { ProductDatasourceImpl, ProductRepositoryImpl } from "../../infrastructure"

export class ProductRoutes{
    static get routes(): Router{

        const router = Router()
        const productDatasourceImpl = new ProductDatasourceImpl()
        const productRepositoryImpl = new ProductRepositoryImpl(productDatasourceImpl)
        const productController = new ProductController(productRepositoryImpl)
        
        router.post('/', productController.createProduct)
        router.delete('/', productController.deleteProduct)
        router.get('/', productController.findAllProducts)
        router.get('/:id', productController.findProductById)
        router.get('/product/:id', productController.getProductStock)
        router.put('/:id', productController.updateProduct)
        router.put('/product/:id', productController.updateProductStock)
        router.put('/product/increase/:id', productController.increaseStock)
        router.put('/product/reduce/:id', productController.reduceStock)

        return router
    }
}