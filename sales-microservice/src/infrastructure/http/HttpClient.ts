import { CircuitBreaker } from "./CircuitBreaker";
import { RetryClient } from "./RetryClient";

export class ResilientHttpClient {
  private retryClient: RetryClient;
  private circuitBreaker: CircuitBreaker;

  constructor() {
    this.retryClient = new RetryClient();
    this.circuitBreaker = new CircuitBreaker();
  }

  async get<T>(url: string): Promise<T> {
    return this.circuitBreaker.execute(() => 
      this.retryClient.request<T>(url, { method: 'GET' })
    );
  }

  async post<T>(url: string, data: any): Promise<T> {
    return this.circuitBreaker.execute(() =>
      this.retryClient.request<T>(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
    );
  }

  async put<T>(url: string, data: any): Promise<T> {
    return this.circuitBreaker.execute(() =>
      this.retryClient.request<T>(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
    );
  }

  async patch<T>(url: string, data: any): Promise<T> {
    return this.circuitBreaker.execute(() =>
      this.retryClient.request<T>(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
    );
  }
}