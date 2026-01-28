// Judge0 API client for code execution
// Supports both RapidAPI hosted version and self-hosted instances

export interface ExecutionRequest {
  sourceCode: string;
  language: 'java' | 'python' | 'javascript';
  stdin?: string;
  timeLimit?: number; // seconds
  memoryLimit?: number; // KB
}

export interface ExecutionResult {
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  status: {
    id: number;
    description: string;
  };
  time: string | null; // seconds
  memory: number | null; // KB
  token?: string;
}

// Language IDs for Judge0
const LANGUAGE_IDS: Record<string, number> = {
  java: 62, // Java (OpenJDK 13.0.1)
  python: 71, // Python (3.8.1)
  javascript: 63, // JavaScript (Node.js 12.14.0)
};

// Status codes
export const STATUS = {
  IN_QUEUE: 1,
  PROCESSING: 2,
  ACCEPTED: 3,
  WRONG_ANSWER: 4,
  TIME_LIMIT_EXCEEDED: 5,
  COMPILATION_ERROR: 6,
  RUNTIME_ERROR_SIGSEGV: 7,
  RUNTIME_ERROR_SIGXFSZ: 8,
  RUNTIME_ERROR_SIGFPE: 9,
  RUNTIME_ERROR_SIGABRT: 10,
  RUNTIME_ERROR_NZEC: 11,
  RUNTIME_ERROR_OTHER: 12,
  INTERNAL_ERROR: 13,
  EXEC_FORMAT_ERROR: 14,
};

class Judge0Client {
  private baseUrl: string;
  private apiKey: string | null;
  private useRapidApi: boolean;

  constructor() {
    // Check for environment variables
    this.baseUrl = process.env.JUDGE0_API_URL || 'https://judge0-ce.p.rapidapi.com';
    this.apiKey = process.env.JUDGE0_API_KEY || process.env.RAPIDAPI_KEY || null;
    this.useRapidApi = this.baseUrl.includes('rapidapi.com');
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.useRapidApi && this.apiKey) {
      headers['X-RapidAPI-Key'] = this.apiKey;
      headers['X-RapidAPI-Host'] = 'judge0-ce.p.rapidapi.com';
    }

    return headers;
  }

  async submit(request: ExecutionRequest): Promise<ExecutionResult> {
    const languageId = LANGUAGE_IDS[request.language];

    if (!languageId) {
      throw new Error(`Unsupported language: ${request.language}`);
    }

    // Submit the code
    const submitResponse = await fetch(`${this.baseUrl}/submissions?base64_encoded=false&wait=true`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({
        source_code: request.sourceCode,
        language_id: languageId,
        stdin: request.stdin || '',
        cpu_time_limit: request.timeLimit || 5,
        memory_limit: request.memoryLimit || 128000,
      }),
    });

    if (!submitResponse.ok) {
      const errorText = await submitResponse.text();
      throw new Error(`Judge0 API error: ${submitResponse.status} - ${errorText}`);
    }

    const result: ExecutionResult = await submitResponse.json();
    return result;
  }

  async submitAsync(request: ExecutionRequest): Promise<string> {
    const languageId = LANGUAGE_IDS[request.language];

    if (!languageId) {
      throw new Error(`Unsupported language: ${request.language}`);
    }

    const submitResponse = await fetch(`${this.baseUrl}/submissions?base64_encoded=false`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({
        source_code: request.sourceCode,
        language_id: languageId,
        stdin: request.stdin || '',
        cpu_time_limit: request.timeLimit || 5,
        memory_limit: request.memoryLimit || 128000,
      }),
    });

    if (!submitResponse.ok) {
      throw new Error(`Judge0 API error: ${submitResponse.status}`);
    }

    const { token } = await submitResponse.json();
    return token;
  }

  async getSubmission(token: string): Promise<ExecutionResult> {
    const response = await fetch(
      `${this.baseUrl}/submissions/${token}?base64_encoded=false`,
      {
        method: 'GET',
        headers: this.getHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error(`Judge0 API error: ${response.status}`);
    }

    return response.json();
  }

  async pollSubmission(token: string, maxAttempts = 10): Promise<ExecutionResult> {
    for (let i = 0; i < maxAttempts; i++) {
      const result = await this.getSubmission(token);

      if (result.status.id > STATUS.PROCESSING) {
        return result;
      }

      // Wait before polling again
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    throw new Error('Execution timed out');
  }
}

export const judge0Client = new Judge0Client();

// Helper function to format execution result for display
export function formatExecutionResult(result: ExecutionResult): {
  output: string;
  error: string | null;
  success: boolean;
} {
  const { stdout, stderr, compile_output, status } = result;

  // Compilation error
  if (status.id === STATUS.COMPILATION_ERROR) {
    return {
      output: '',
      error: `Compilation Error:\n${compile_output || 'Unknown compilation error'}`,
      success: false,
    };
  }

  // Runtime error
  if (status.id >= STATUS.RUNTIME_ERROR_SIGSEGV && status.id <= STATUS.RUNTIME_ERROR_OTHER) {
    return {
      output: stdout || '',
      error: `Runtime Error (${status.description}):\n${stderr || 'Unknown runtime error'}`,
      success: false,
    };
  }

  // Time limit exceeded
  if (status.id === STATUS.TIME_LIMIT_EXCEEDED) {
    return {
      output: stdout || '',
      error: 'Time Limit Exceeded: Your code took too long to execute.',
      success: false,
    };
  }

  // Success
  if (status.id === STATUS.ACCEPTED) {
    return {
      output: stdout || '(no output)',
      error: stderr || null,
      success: true,
    };
  }

  // Other status
  return {
    output: stdout || '',
    error: `${status.description}\n${stderr || compile_output || ''}`,
    success: false,
  };
}
