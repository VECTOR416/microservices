import { CreateProductDto, Product, ProductRepository } from "../..";


interface FindAllProductsUseCase{
    execute(): Promise<Product[]>
}

export class FindAllProduct implements FindAllProductsUseCase{
    constructor(private readonly productRepository: ProductRepository) { }

    async execute(): Promise<Product[]> {
        return this.productRepository.findAll();
    }
}

