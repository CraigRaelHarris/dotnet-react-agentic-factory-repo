import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import App from './App';

function response(data: unknown, ok = true) {
  return { ok, json: async () => data };
}

describe('starter status', () => {
  it('shows loading then the API result', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(response({ name: 'Starter API', status: 'ready' })),
    );
    render(<App />);
    expect(screen.getByRole('status')).toHaveTextContent('Connecting to API');
    expect(await screen.findByText('Starter API: ready')).toBeInTheDocument();
  });

  it('shows an actionable error when the API fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(response({}, false)));
    render(<App />);
    expect(await screen.findByRole('alert')).toHaveTextContent('Start the API');
  });

  it.each([null, 'wrong', {}, { name: 42, status: 'ready' }, { name: 'API', status: 42 }])(
    'rejects malformed response %j',
    async (data) => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue(response(data)));
      render(<App />);
      expect(await screen.findByRole('alert')).toBeInTheDocument();
    },
  );

  it('handles network failure', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
    render(<App />);
    expect(await screen.findByRole('alert')).toBeInTheDocument();
  });

  it('cancels the outstanding request on unmount', async () => {
    const fetchMock = vi.fn().mockImplementation((_url, options: { signal: AbortSignal }) => {
      return new Promise((_resolve, reject) => {
        options.signal.addEventListener('abort', () => reject(new Error('aborted')));
      });
    });
    vi.stubGlobal('fetch', fetchMock);
    const { unmount } = render(<App />);
    unmount();
    await waitFor(() => expect(fetchMock.mock.calls[0]?.[1].signal.aborted).toBe(true));
  });
});
