import { ResilientHttpClient } from "..";
import { envs } from "../../config";
import { ReduceProductStockRequest } from "../../domain";

export class ReduceProductRequestImpl implements ReduceProductStockRequest {
    async execute(idSale: number, quantity: number): Promise<boolean> {
        const validationResponse = await new ResilientHttpClient().put<boolean>(
            `${envs.PRODUCT_MICROSERVICE_URL}/product/reduce/${idSale}`,
            { quantity: quantity }
        );
        return validationResponse;
    }
}