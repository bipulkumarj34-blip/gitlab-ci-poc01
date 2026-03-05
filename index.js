const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ENV_NAME = process.env.APP_ENV || 'Local';
const SECRET_VAL = process.env.API_KEY || 'no-secret-found';

const server = http.createServer((req, res) => {
    // Read the HTML file
    fs.readFile(path.join(__dirname, 'index.html'), 'utf8', (err, data) => {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
        }

        // Inject the environment variables into the HTML string
        let result = data
            .replace('{{ENV_NAME}}', ENV_NAME)
            .replace('{{SECRET_KEY}}', SECRET_VAL);

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(result);
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log(`Environment: ${ENV_NAME}`);
});