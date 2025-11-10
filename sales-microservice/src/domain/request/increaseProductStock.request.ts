export interface IncreaseProductStockRequest
{
    execute(idSale: number, quantity: number): Promise<boolean>
}