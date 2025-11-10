import { SaleStatus } from "../..";

export class CreateSaleDto {
    private constructor(
        public total: number,
        public status: SaleStatus,
        public customerName: string | null,
    ) { }

    static create(object: { [key: string]: any }): [string | undefined, CreateSaleDto | undefined] {

        let {
            total = 0,
            status = SaleStatus.PENDING,
            customerName
        } = object;

        if (!customerName) return ["El identificador de producto es necesario", undefined]


        return [undefined, new CreateSaleDto(
            total,
            status,
            customerName
        )]
    }
} 