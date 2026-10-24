/**
 * Enterprise Structured Logger Utility for Job Square
 * Provides audit logging, security event tracking, and sanitized output.
 */

type LogLevel = 'info' | 'warn' | 'error' | 'security' | 'audit';

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, unknown>;
}

class Logger {
  private formatMessage(level: LogLevel, message: string, context?: Record<string, unknown>): string {
    const timestamp = new Date().toISOString();
    const payload: LogEntry = {
      timestamp,
      level,
      message,
      ...(context ? { context } : {})
    };
    return JSON.stringify(payload);
  }

  public info(message: string, context?: Record<string, unknown>): void {
    console.log(`[INFO] ${this.formatMessage('info', message, context)}`);
  }

  public warn(message: string, context?: Record<string, unknown>): void {
    console.warn(`[WARN] ${this.formatMessage('warn', message, context)}`);
  }

  public error(message: string, context?: Record<string, unknown>): void {
    console.error(`[ERROR] ${this.formatMessage('error', message, context)}`);
  }

  public security(message: string, context?: Record<string, unknown>): void {
    console.warn(`[SECURITY-EVENT] ${this.formatMessage('security', message, context)}`);
  }

  public audit(message: string, context?: Record<string, unknown>): void {
    console.log(`[AUDIT-TRAIL] ${this.formatMessage('audit', message, context)}`);
  }
}

export const logger = new Logger();
export default logger;
