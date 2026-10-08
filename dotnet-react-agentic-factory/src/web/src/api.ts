export interface ApiStatus {
  name: string;
  status: string;
}

export async function getStatus(signal: AbortSignal): Promise<ApiStatus> {
  const response = await fetch('/api/status', { signal });
  if (!response.ok) throw new Error('API request failed');
  const data: unknown = await response.json();
  if (
    typeof data !== 'object' ||
    data === null ||
    !('name' in data) ||
    !('status' in data) ||
    typeof data.name !== 'string' ||
    typeof data.status !== 'string'
  ) {
    throw new Error('Invalid API response');
  }
  return { name: data.name, status: data.status };
}
