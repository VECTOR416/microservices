import { CreateProductDto, Product, ProductRepository } from "../..";


interface CreateProductUseCase{
    execute(createProductDto: CreateProductDto): Promise<Product>
}

export class CreateProduct implements CreateProductUseCase{
    constructor(private readonly productRepository: ProductRepository) { }

    async execute(createProductDto: CreateProductDto): Promise<Product> {
        return this.productRepository.create(createProductDto);
    }
}