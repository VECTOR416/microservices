import { Request, Response } from "express"
import {
    AddSaleItem,
    CreateSaleItemDto,
    IncreaseProductStockRequest,
    ObtainSaleItemsBySaleId,
    ReduceProductStockRequest,
    RemoveSaleItem,
    SaleItemRepository,
    SaleRepository
} from "../../domain"


export class SaleItemController {

    constructor(
        private readonly saleItemRepository: SaleItemRepository,
        private readonly saleRepository: SaleRepository,
        private readonly increaseProductStockRequest: IncreaseProductStockRequest,
        private readonly reduceProductStockRequest: ReduceProductStockRequest
        
    ) { }


    addSaleItem = async (req: Request, res: Response) => {
        const [error, createSaleItemDto] = CreateSaleItemDto.create(req.body)
        if (error) return res.status(502).json(error)

        new AddSaleItem(this.saleItemRepository, this.saleRepository, this.reduceProductStockRequest)
            .execute(createSaleItemDto!)    
            .then(data => res.json(data))
            .catch(error => res.status(502).json(error))
    }

    obtainSaleItemsBySaleId = async (req: Request, res: Response) => {
        const idSale = req.params.id ? +req.params.id : null
        if (!idSale) return res.status(502).json({ error: "El identificador de la venta es necesario" })

        new ObtainSaleItemsBySaleId(this.saleItemRepository)
            .execute(idSale)
            .then(data => res.json(data))
            .catch(error => res.status(502).json(error))
    }

    removeSaleItem = async (req: Request, res: Response) => {
        const idSaleItem = req.params.id ? +req.params.id : null
        if (!idSaleItem) return res.status(502).json({ error: "El identificador del subitem" })

        new RemoveSaleItem(this.saleItemRepository, this.saleRepository, this.increaseProductStockRequest)
            .execute(idSaleItem)
            .then(data => res.json(data))
            .catch(error => res.status(502).json(error))
    }


}