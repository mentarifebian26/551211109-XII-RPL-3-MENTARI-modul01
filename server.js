/*
const todos =[
{id: 1, Text: 'Todo One'},
{id: 2, Text: 'Todo Two'},
{id: 3, Text: 'Todo Three'},
];

const server = http.createServer ((req, res)=> {
  res.setHeader('Content-Type','application/json');
  res.setHeader('X-Powered-By', 'Node.js');

    const data = JSON.stringify({
    succes: true,
    data: todos,
    });
    res.end(data);
})

const PORT = 5080;

server.listen(PORT,() => console.log('Server running on port ${PORT}'));
/*


//HTTPS STATUS CODES
/*
const http = require('http');

const server = http.createServer ((req, res)=> {
    res.statusCode = 404;
    res.setHeader('Content-Type','application/json');
    res.setHeader('X-Powered-By', 'Node.js');

    const data = JSON.stringify({
        succes: false,
        error: 'not found',
        data: null,
    });
    res.end(data);
})

const PORT = 5080;
server.listen(PORT,() => console.log('Server running on port ${PORT}'));


*/
/*
const http = require('http');

const server = http.createServer ((req, res)=> {
    res.setHeader('Content-Type','application/json');
    res.setHeader('X-Powered-By', 'Node.js');

    res.writeHead(404,{
        'Content-Type':'application/json',
        'X-Powered-By': 'Node.js',


    });

    let body =[];

    req
    .on('data',chunk => {
        body.push(chunk);
    })

    .on('end', () =>{
        body = Buffer.concat(body).toString();
        console.log(body);
    })

    const data = JSON.stringify({
        succes: true,
        error: 'not found',
        data: null,
    });
    res.end(data);
})

const PORT = 5080;
server.listen(PORT,() => console.log('Server running on port ${PORT}'));
*/

const http = require('http');

const todos = [
    {id: 1, text: 'Todo One'},
    {id: 2, text: 'Todo Two'},
    {id: 3, text: 'Todo Three'}, 
];

const server = http.createServer((req, res) => {
    //listneing data from client
    const{method, url} = req;
    let body =[];

    req.on('data', chunk => {
        body.push(chunk);
    }).on ('end',() => {
        body = Buffer.concat(body).toString();

        let status = 404;
        const response = {
        success: false, 
        results: [],
        error : ''
        };
        
if (method === 'GET' && url === '/todos') {
    
    status = 200;
    response.success = true;
    response.results = todos;

} else if (method === 'POST' &&  url === '/todos') {
    
    const { id, text } = JSON.parse (body);

    if (!id || !text) {
       status = 400;
       response.error = 'Please add id and text';
    }  else {
       todos.push({id, text});
       status = 201;
       response.success =true
       response.results = todos;
    }
}
    res.writeHead(status, {
    'Content-Type': 'application/json',
    'X-Powered-By': 'Node.js'
    });

    res.end (JSON. stringify (response));
  });
});

    const PORT = 8080;
    server.listen(PORT, () => console.log(`server running on port ${PORT}`));
