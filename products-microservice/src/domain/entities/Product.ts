export class Product {
  constructor(
    public readonly id: number,
    public name: string,
    public description: string | null,
    public price: number,
    public stock: number,
    public minStock: number,
    public categoryId: string,
    public imageUrl: string | null,
    public isActive: boolean,
    public readonly createdAt: Date,
    public updatedAt: Date
  ) {}

  public isLowStock(): boolean {
    return this.stock <= this.minStock;
  }

  public canFulfillOrder(quantity: number): boolean {
    return this.isActive && this.stock >= quantity;
  }

  public updateStock(quantity: number): void {
    this.stock += quantity;
    if (this.stock < 0) {
      throw new Error('Stock cannot be negative');
    }
    this.updatedAt = new Date();
  }
}