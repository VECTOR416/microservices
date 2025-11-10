// sales-service/src/infrastructure/http/CircuitBreaker.ts

enum CircuitState {
  CLOSED = 'CLOSED',     // Funcionando normal
  OPEN = 'OPEN',         // Cortado, rechazando llamadas
  HALF_OPEN = 'HALF_OPEN' // Probando si el servicio se recuperó
}

interface CircuitBreakerConfig {
  failureThreshold: number;    // Fallos antes de abrir
  successThreshold: number;    // Éxitos para cerrar
  timeout: number;             // Tiempo en OPEN antes de HALF_OPEN
}

export class CircuitBreaker {
  private state: CircuitState = CircuitState.CLOSED;
  private failureCount: number = 0;
  private successCount: number = 0;
  private nextAttempt: number = Date.now();
  
  private config: CircuitBreakerConfig = {
    failureThreshold: 5,      // Abrir después de 5 fallos
    successThreshold: 2,      // Cerrar después de 2 éxitos
    timeout: 60000            // 60 segundos en OPEN
  };

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === CircuitState.OPEN) {
      if (Date.now() < this.nextAttempt) {
        throw new Error('Circuit breaker is OPEN - service unavailable');
      }
      // Cambiar a HALF_OPEN para probar
      this.state = CircuitState.HALF_OPEN;
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess(): void {
    this.failureCount = 0;

    if (this.state === CircuitState.HALF_OPEN) {
      this.successCount++;
      
      if (this.successCount >= this.config.successThreshold) {
        this.state = CircuitState.CLOSED;
        this.successCount = 0;
        console.log('Circuit breaker CLOSED - service recovered');
      }
    }
  }

  private onFailure(): void {
    this.failureCount++;
    this.successCount = 0;

    if (this.failureCount >= this.config.failureThreshold) {
      this.state = CircuitState.OPEN;
      this.nextAttempt = Date.now() + this.config.timeout;
      console.log(`Circuit breaker OPEN - too many failures (${this.failureCount})`);
    }
  }

  getState(): CircuitState {
    return this.state;
  }
}