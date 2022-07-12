const http = require('http');
const Users = require('./users');

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 8080

function handleGetReq(req, res) {
    if (req.url !== '/users') {
        return handleError(res, 404)
    }
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    return res.end(JSON.stringify(Users.getUsers()))
}

function handleError (res, code) { 
    res.statusCode = code 
    res.end(`{"error": "${http.STATUS_CODES[code]}"}`) 
}

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        return handleGetReq(req, res)
    }
});

server.listen(port, host, () => {
  console.log(`The server start on http://${host}:${port}/`);
});
