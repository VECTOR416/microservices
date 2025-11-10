export interface ReduceProductStockRequest
{
    execute(idSale: number, quantity: number): Promise<boolean>
}