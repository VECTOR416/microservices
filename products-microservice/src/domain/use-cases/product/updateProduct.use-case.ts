import { Product, ProductRepository, UpdateProductDto } from "../..";

interface UpdateProductUseCase{
    execute(idProduct: number, updateProductDto: UpdateProductDto): Promise<Product>
}

export class UpdateProduct implements UpdateProductUseCase{
    constructor(private readonly productRepository: ProductRepository) { }

    async execute(idProduct: number, updateProductDto: UpdateProductDto): Promise<Product> {
        return this.productRepository.update(idProduct, updateProductDto);
    }
}