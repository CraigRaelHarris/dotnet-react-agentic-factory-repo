import { useEffect, useState } from 'react';
import { getStatus, type ApiStatus } from './api';

export default function App() {
  const [status, setStatus] = useState<ApiStatus | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    void getStatus(controller.signal).then(
      (result) => {
        if (!controller.signal.aborted) setStatus(result);
      },
      () => {
        if (!controller.signal.aborted) setFailed(true);
      },
    );
    return () => controller.abort();
  }, []);

  return (
    <main>
      <h1>.NET + React starter</h1>
      <p>Build your next project from a verified starting point.</p>
      {failed ? (
        <p role="alert">API unavailable. Start the API and refresh this page.</p>
      ) : (
        <p role="status">{status ? `${status.name}: ${status.status}` : 'Connecting to API…'}</p>
      )}
    </main>
  );
}
