import { ProductRepository } from "../..";

interface DeleteProductUseCase{
    execute(idProduct: number): Promise<boolean>
}

export class DeleteProduct implements DeleteProductUseCase{
    constructor(private readonly productRepository: ProductRepository) { }

    async execute(idProduct: number): Promise<boolean> {
        return this.productRepository.delete(idProduct);
    }
}