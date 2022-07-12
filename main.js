const http = require('http');
const Users = require('./users');

const port = process.env.PORT || 8081

function handleGetReq(req, res) {
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    if (req.url === '/') {
        return res.end(`{"live": "ok"}`) 
    } else if (req.url === '/users') {
        return res.end(JSON.stringify(Users.getUsers()))
    }
    return handleError(res, 404)
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

server.listen(port, () => {
  console.log(`The server start on port ${port}`);
});
