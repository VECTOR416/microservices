export class CreateSaleItemDto {
    private constructor(
        public saleId: number,
        public productId: string,
        public productName: string,
        public quantity: number,
        public unitPrice: number,
        public subtotal: number,
    ) { }

    static create(object: { [key: string]: any }): [string | undefined, CreateSaleItemDto | undefined] {

        let {
            saleId,
            productId,
            productName,
            quantity,
            unitPrice,
            subtotal = quantity * unitPrice
        } = object;

        if (!saleId) return ["El identificador de producto es necesario", undefined]
        if (!productId) return ["El identificador de producto es necesario", undefined]
        if (!productName) return ["El identificador de producto es necesario", undefined]
        if (!quantity) return ["El identificador de producto es necesario", undefined]
        if (!unitPrice) return ["El identificador de producto es necesario", undefined]

        return [undefined, new CreateSaleItemDto(
            saleId,
            productId,
            productName,
            quantity,
            unitPrice,
            subtotal
        )]
    }
} 