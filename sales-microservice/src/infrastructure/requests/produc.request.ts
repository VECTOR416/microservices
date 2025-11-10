import { ResilientHttpClient } from "..";
import { envs } from "../../config";

export class Product {
  constructor(
    public readonly id: number,
    public name: string,
    public description: string | null,
    public price: number,
    public stock: number,
    public minStock: number,
    public categoryId: string,
    public imageUrl: string | null,
    public isActive: boolean,
    public readonly createdAt: Date,
    public updatedAt: Date
  ) {}
}

export class ProductRequest{
    static async prueba(){
        const validationResponse = await new ResilientHttpClient().get<Product[]>(
            `${envs.PRODUCT_MICROSERVICE_URL}/`
        );
        return validationResponse;
    }
}