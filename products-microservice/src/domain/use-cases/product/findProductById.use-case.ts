import { Product, ProductRepository } from "../..";

interface FindProductByIdUseCase{
    execute(idProduct: number): Promise<Product | null>
}

export class FindProductById implements FindProductByIdUseCase{
    constructor(private readonly productRepository: ProductRepository) { }

    async execute(idProduct: number): Promise<Product | null> {
        return this.productRepository.findById(idProduct);
    }
}