export class UpdateProductDto {
    private constructor(
        public name: string | null,
        public price: number | null,
        public stock: number | null,
        public minStock: number | null,
        public categoryId: string | null,
        public description: string | null,
        public imageUrl: string | null,
        public isActive: boolean | null,
    ) { }

    static create(object: { [key: string]: any }): [string | undefined, UpdateProductDto | undefined] {

        let {
            name,
            price,
            stock,
            minStock,
            categoryId,
            description,
            imageUrl,
            isActive
        } = object;

        return [undefined, new UpdateProductDto(
            name,
            price,
            stock,
            minStock,
            categoryId,
            description,
            imageUrl,
            isActive
        )]
    }
} 