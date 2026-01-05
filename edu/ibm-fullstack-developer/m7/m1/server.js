const http = require('http');

const host = '0.0.0.0';
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Paradise Nursery says hello!\n');
});

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});
