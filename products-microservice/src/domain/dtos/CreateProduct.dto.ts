export class CreateProductDto {
    private constructor(
        public name: string,
        public price: number,
        public stock: number,
        public minStock: number,
        public categoryId: string,
        public description: string | null,
        public imageUrl: string | null,
        public isActive: boolean,
    ) { }

    static create(object: { [key: string]: any }): [string | undefined, CreateProductDto | undefined] {

        let {
            name,
            price,
            stock,
            minStock,
            categoryId,
            description,
            imageUrl,
            isActive = true
        } = object;

        if( !name ) return ["El nombre es requerido", undefined]
        if( !price ) return ["El nombre es requerido", undefined]
        if( !stock ) return ["El nombre es requerido", undefined]
        if( !minStock ) return ["El nombre es requerido", undefined]
        if( !categoryId ) return ["El nombre es requerido", undefined]

        return [undefined, new CreateProductDto(
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