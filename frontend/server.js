const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, 'index.html');
  
  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Access-Control-Allow-Origin': '*'
  });
  
  fs.createReadStream(filePath).pipe(res);
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`🌐 Frontend running at http://localhost:${PORT}`);
  console.log('📡 Make sure backend is running on port 3001');
});