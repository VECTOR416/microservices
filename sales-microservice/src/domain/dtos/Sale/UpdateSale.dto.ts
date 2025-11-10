import { SaleStatus } from "../..";

export class UpdateSaleDto {
    private constructor(
        public total: number | null,
        public status: SaleStatus | null,
        public customerName: string | null,
    ) { }

    static create(object: { [key: string]: any }): [string | undefined, UpdateSaleDto | undefined] {

        let {
            total,
            status,
            customerName
        } = object;


        return [undefined, new UpdateSaleDto(
            total,
            status,
            customerName
        )]
    }
} 