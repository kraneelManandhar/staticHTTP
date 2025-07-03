const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 5000;

const server = http.createServer((req, res) => {
    console.log(`Request for ${req.url}`);

    let filepath = path.join(
        __dirname,
            'public',
            req.url === '/' ? 'index.html' : req.url
        );

    const extname = path.extname(filepath);
    let contentType = 'text/html';

    switch (extname) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
    }

    fs.readFile(filepath, (err, content) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 Not Found</h1>');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf8');
        }
    });
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});