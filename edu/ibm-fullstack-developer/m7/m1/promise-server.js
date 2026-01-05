import http from 'node:http';

let axios;
try {
  const imported = await import('axios');
  axios = imported.default ?? imported;
} catch (err) {
  // Lightweight axios substitute so the demo still works without installing dependencies
  axios = {
    get: (url, options = {}) => {
      const timeout = options.timeout || 0;
      const simulateDelay = 200;

      return new Promise((resolve, reject) => {
        const timer = timeout > 0 ? setTimeout(() => {
          const timeoutError = new Error(`Timeout of ${timeout}ms exceeded`);
          timeoutError.code = 'ECONNABORTED';
          reject(timeoutError);
        }, timeout) : null;

        setTimeout(() => {
          if (timer) clearTimeout(timer);

          if (url.includes('/404')) {
            const error = new Error('Request failed with status 404');
            error.response = {
              status: 404,
              data: { message: 'Simulated not found error' },
            };
            reject(error);
            return;
          }

          resolve({
            status: 200,
            data: {
              id: 1,
              title: 'Simulated axios response',
              completed: false,
            },
          });
        }, simulateDelay);
      });
    },
  };
}

const host = '0.0.0.0';
const port = Number(process.env.PROMISE_PORT) || 3001;

const respond = (res, statusCode, payload) => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload, null, 2));
};

const resolveWithAxios = () => {
  return axios
    .get('https://jsonplaceholder.typicode.com/todos/1', { timeout: 3000 })
    .then((response) => ({
      status: response.status,
      data: response.data,
    }));
};

const rejectWithAxios = () => {
  return axios
    .get('https://jsonplaceholder.typicode.com/404', { timeout: 3000 })
    .then((response) => ({
      status: response.status,
      data: response.data,
    }));
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname !== '/demo') {
    respond(res, 404, { message: 'Try /demo?mode=resolve or /demo?mode=reject' });
    return;
  }

  const mode = url.searchParams.get('mode') || 'resolve';
  const handler = mode === 'reject' ? rejectWithAxios : resolveWithAxios;

  handler()
    .then((payload) => {
      respond(res, 200, {
        mode,
        outcome: 'resolved',
        payload,
      });
    })
    .catch((error) => {
      respond(res, 500, {
        mode,
        outcome: 'rejected',
        message: error.message,
        status: error.response?.status ?? null,
        data: error.response?.data ?? null,
      });
    });
});

server.listen(port, host, () => {
  console.log(`Promise demo server running at http://${host}:${port}/demo?mode=resolve`);
});
