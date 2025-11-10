export class SaleItem {
  constructor(
    public id: number,
    public saleId: number,
    public productId: string,
    public productName: string,
    public quantity: number,
    public unitPrice: number,
    public subtotal: number,
  ) {}
}