import { ResilientHttpClient } from "..";
import { envs } from "../../config";
import { IncreaseProductStockRequest } from "../../domain";

export class IncreaseProductRequestImpl implements IncreaseProductStockRequest {
    async execute(idSale: number, quantity: number): Promise<boolean> {
        const validationResponse = await new ResilientHttpClient().put<boolean>(
            `${envs.PRODUCT_MICROSERVICE_URL}/product/increase/${idSale}`,
            { quantity: quantity }
        );
        return validationResponse;
    }
}