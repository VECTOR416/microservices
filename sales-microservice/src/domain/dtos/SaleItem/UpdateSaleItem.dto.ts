export class UpdateSaleItemDto {
    private constructor(
        public saleId: number | null,
        public productId: string | null,
        public productName: string | null,
        public quantity: number | null,
        public unitPrice: number | null,
        public subtotal: number | null,
    ) { }

    static create(object: { [key: string]: any }): [string | undefined, UpdateSaleItemDto | undefined] {

        let {
            saleId,
            productId,
            productName,
            quantity,
            unitPrice,
            subtotal = quantity * unitPrice
        } = object;

        return [undefined, new UpdateSaleItemDto(
            saleId,
            productId,
            productName,
            quantity,
            unitPrice,
            subtotal
        )]
    }
} 