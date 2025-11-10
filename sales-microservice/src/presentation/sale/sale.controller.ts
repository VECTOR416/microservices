import { Request, Response } from "express"
import { CancelSale, CreateSale, CreateSaleDto, FindAllSales, FindSaleById, IncreaseProductStockRequest, SaleItemRepository, SaleRepository, UpdateSale, UpdateSaleDto } from "../../domain"

export class SaleController {

    constructor(
        private readonly saleRepository: SaleRepository,
        private readonly saleItemRepository: SaleItemRepository,
        private readonly increaseProductStockRequest: IncreaseProductStockRequest
    ) { }


    cancelSale = async (req: Request, res: Response) => {
        const idSale = req.params.id ? +req.params.id : null
        if (!idSale) return res.status(502).json({ error: "El identificador de la venta es necesario" })
        
        new CancelSale(this.saleRepository, this.saleItemRepository, this.increaseProductStockRequest)
            .execute(idSale)
            .then(data => res.json(data))
            .catch(error => res.status(502).json(error))
    }

    createSale = async (req: Request, res: Response) => {
        const [ error, createSaleDto ] = CreateSaleDto.create(req.body)
        if( error ) return res.status(502).json(error)
        
        new CreateSale(this.saleRepository)
            .execute(createSaleDto!)
            .then(data => res.json(data))
            .catch(error => res.status(502).json(502))
    }

    findAllSales= async (req: Request, res: Response) => {
        new FindAllSales(this.saleRepository)
            .execute()
            .then(data => res.json(data))
            .catch(error => res.status(502).json(error))
    }

    findSaleById = async (req: Request, res: Response) => {
        const idSale = req.params.id ? +req.params.id : null
        if (!idSale) return res.status(502).json({ error: "El identificador de la venta es necesario" })
        
        new FindSaleById(this.saleRepository)
            .execute(idSale)
            .then(data => res.json(data))
            .catch(error => res.status(502).json(error))
    }

    updateSale = async (req: Request, res: Response) => {
        const idSale = req.params.id ? +req.params.id : null
        if (!idSale) return res.status(502).json({ error: "El identificador de la venta es necesario" })

        const [error, updateSaleDto] = UpdateSaleDto.create(req.body)
        if( error ) return res.status(502).json(error)

        new UpdateSale(this.saleRepository)
            .execute(idSale, updateSaleDto!)
            .then(data => res.json(data))
            .catch(error => res.status(502).json(error))
    }
}