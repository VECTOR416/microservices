export enum SaleStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export class Sale {
  constructor(
    public id: number,
    public total: number,
    public status: SaleStatus,
    public customerName: string | null,
  ) {}
}