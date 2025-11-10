import { Router } from "express";
import { SaleItemRoutes, SaleRoutes } from ".";

export class AppRoutes {
    static get routes(): Router {

        const router = Router();
        router.use('/api/v1/sale', SaleRoutes.routes);
        router.use('/api/v1/saleItem', SaleItemRoutes.routes);
        return router;
    }
}