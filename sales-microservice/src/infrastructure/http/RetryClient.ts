interface RetryConfig {
  maxRetries: number;
  retryDelay: number;
  retryableStatuses: number[];
}

export class RetryClient {
  private config: RetryConfig = {
    maxRetries: 3,
    retryDelay: 1000, // 1 segundo
    retryableStatuses: [408, 429, 500, 502, 503, 504]
  };

  async request<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> {
    let lastError: Error;
    
    for (let attempt = 0; attempt <= this.config.maxRetries; attempt++) {
      try {
        const response = await fetch(url, options);
        
        if (response.ok) {
          return await response.json();
        }
        
        // Si no es un status retryable, lanzar error inmediatamente
        if (!this.config.retryableStatuses.includes(response.status)) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        // Si es retryable y no es el último intento, reintentar
        if (attempt < this.config.maxRetries) {
          await this.delay(this.config.retryDelay * Math.pow(2, attempt)); // Backoff exponencial
          continue;
        }
        
        throw new Error(`HTTP ${response.status} after ${attempt + 1} attempts`);
        
      } catch (error) {
        lastError = error as Error;
        
        if (attempt < this.config.maxRetries) {
          console.log(`Retry attempt ${attempt + 1}/${this.config.maxRetries} for ${url}`);
          await this.delay(this.config.retryDelay * Math.pow(2, attempt));
          continue;
        }
      }
    }
    
    throw lastError!;
  }
  
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}