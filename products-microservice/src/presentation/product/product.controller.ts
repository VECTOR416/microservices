import { Request, Response } from "express"
import {
    CreateProduct,
    CreateProductDto,
    DeleteProduct,
    FindAllProduct,
    FindProductById,
    GetProductStock,
    IncreaseStock,
    ProductRepository,
    ReduceseStock,
    UpdateProduct,
    UpdateProductDto,
    UpdateProductStock
} from "../../domain"

export class ProductController {

    constructor(
        private readonly productRepository: ProductRepository
    ) { }


    createProduct = async (req: Request, res: Response) => {
        const [error, createProductDto] = CreateProductDto.create(req.body)
        if (error) return res.status(502).json(error)

        new CreateProduct(this.productRepository)
            .execute(createProductDto!)
            .then(data => res.json(data))
            .catch(error => res.status(502).json(error))
    }

    deleteProduct = async (req: Request, res: Response) => {
        const idProduct = req.params.id ? +req.params.id : null
        if (!idProduct) return res.status(502).json({ error: "El identificador de producto es necesario" })
        new DeleteProduct(this.productRepository)
            .execute(idProduct)
            .then(data => res.json(data))
            .catch(error => res.status(502).json(error))
    }

    findAllProducts = async (req: Request, res: Response) => {
        new FindAllProduct(this.productRepository)
            .execute()
            .then(data => res.json(data))
            .catch(error => res.json(error))
    }

    findProductById = async (req: Request, res: Response) => {
        const idProduct = req.params.id ? +req.params.id : null
        if (!idProduct) return res.status(502).json({ error: "El identificador de producto es necesario" })

        new FindProductById(this.productRepository)
            .execute(idProduct)
            .then(data => res.json(data))
            .catch(error => res.status(502).json(error))
    }

    getProductStock = async (req: Request, res: Response) => {
        const idProduct = req.params.id ? +req.params.id : null
        if (!idProduct) return res.status(502).json({ error: "El identificador de producto es necesario" })


        new GetProductStock(this.productRepository)
            .execute(idProduct)
            .then(data => res.json(data))
            .catch(error => res.status(502).json(error))
    }

    updateProduct = async (req: Request, res: Response) => {
        const idProduct = req.params.id ? +req.params.id : null
        if (!idProduct) return res.status(502).json({ error: "El identificador de producto es necesario" })

        const [error, updateProductDto] = UpdateProductDto.create(req.body)
        if (error) return res.status(502).json(error)

        new UpdateProduct(this.productRepository)
            .execute(idProduct, updateProductDto!)
            .then(data => res.json(data))
            .catch(error => res.status(502).json(error))
    }

    updateProductStock = async (req: Request, res: Response) => {

        const idProduct = req.params.id ? +req.params.id : null
        if (!idProduct) return res.status(502).json({ error: "El identificador de producto es necesario" })
        const quantity = req.body.quantity ? +req.body.quantity : null
        if (!quantity) return res.status(502).json({ error: "La cantidad de stock es necesaria" })
            
        new UpdateProductStock(this.productRepository)
            .execute(idProduct, quantity)
            .then(data => res.json(data))
            .catch(error => res.status(502).json(error))
    }

    increaseStock = async (req: Request, res: Response) => {
        const idProduct = req.params.id ? +req.params.id : null
        if (!idProduct) return res.status(502).json({ error: "El identificador de producto es necesario" })

        const quantity = req.body.quantity ? +req.body.quantity : null
        if (!quantity) return res.status(502).json({ error: "La cantidad de stock es necesaria" })
        
        new IncreaseStock(this.productRepository)
            .execute(idProduct, quantity)
            .then(data => res.json(data))
            .catch(error => res.status(502).json(error))
    }

    reduceStock = async (req: Request, res: Response) => {
        const idProduct = req.params.id ? +req.params.id : null
        if (!idProduct) return res.status(502).json({ error: "El identificador de producto es necesario" })

        const quantity = req.body.quantity ? +req.body.quantity : null
        if (!quantity) return res.status(502).json({ error: "La cantidad de stock es necesaria" })
        
        new ReduceseStock(this.productRepository)
            .execute(idProduct, quantity)
            .then(data => res.json(data))
            .catch(error => res.status(502).json(error))
    }
}