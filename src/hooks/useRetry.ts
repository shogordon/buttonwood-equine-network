import { useState, useCallback } from 'react';
import { toast } from 'sonner';

interface RetryOptions {
  maxRetries?: number;
  delay?: number;
  backoff?: 'linear' | 'exponential';
  onRetry?: (attempt: number) => void;
  onMaxRetriesReached?: () => void;
}

export const useRetry = () => {
  const [isRetrying, setIsRetrying] = useState(false);
  const [retryAttempt, setRetryAttempt] = useState(0);

  const withRetry = useCallback(async <T>(
    operation: () => Promise<T>,
    options: RetryOptions = {}
  ): Promise<T> => {
    const {
      maxRetries = 3,
      delay = 1000,
      backoff = 'exponential',
      onRetry,
      onMaxRetriesReached
    } = options;

    let attempt = 0;
    setRetryAttempt(0);

    const executeWithRetry = async (): Promise<T> => {
      try {
        setIsRetrying(attempt > 0);
        const result = await operation();
        setIsRetrying(false);
        setRetryAttempt(0);
        return result;
      } catch (error) {
        attempt++;
        setRetryAttempt(attempt);

        if (attempt >= maxRetries) {
          setIsRetrying(false);
          setRetryAttempt(0);
          onMaxRetriesReached?.();
          
          toast.error(
            `Operation failed after ${maxRetries} attempts. Please try again later.`,
            {
              description: error instanceof Error ? error.message : 'Unknown error occurred'
            }
          );
          
          throw error;
        }

        const waitTime = backoff === 'exponential' 
          ? delay * Math.pow(2, attempt - 1)
          : delay * attempt;

        console.log(`Retry attempt ${attempt}/${maxRetries} in ${waitTime}ms`);
        onRetry?.(attempt);

        toast.error(
          `Operation failed. Retrying in ${Math.round(waitTime / 1000)} seconds... (${attempt}/${maxRetries})`,
          {
            description: error instanceof Error ? error.message : 'Unknown error occurred'
          }
        );

        await new Promise(resolve => setTimeout(resolve, waitTime));
        return executeWithRetry();
      }
    };

    return executeWithRetry();
  }, []);

  return {
    withRetry,
    isRetrying,
    retryAttempt
  };
};