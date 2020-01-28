const express = require('express');

const server = express();

server.use(express.json());

//Log and time execution Example
server.use((req, res, next) => {
    console.time('Request');

    console.log(`Method: ${req.method}; URL: ${req.url}`);

    next();

    console.timeEnd('Request');
});

// (Middleware) Verification Products Exists, returning error 400.
function checkUserExists(req, res, next){
    if (!req.body.description){
        return res.status(400).json({ error: 'Product not found on request body!' });  
    }

    return next();
}

function checkUserInArray(req, res, next){
    if (!products[req.params.index]){
        return res.status(400).json({ error: 'Product does not exists!' });
    }

    return next();
}

function VerifyUserArray(req, res, next){
    const product = products[req.params.index];

    if (!product){
        return res.status(400).json({ error: 'Product does not exists!' });
    }
    req.product = product;

    return next();
}

// Query Params = ?test=1 
// Route params = /users/1
// Request body = { name: "Leonardo" }

// Query Params Example
server.get('/test', (req, res) => {
    const name = req.query.name;
    //const { name } = req.params;

    return res.json({
        message: `Hello ${name}` //Query Params example: http://localhost:2323/test?name=Leonardo
        // console.log('teste'); //Example terminal response;
        // return res.send('Hello'); //Example message/text response; 
        // message: "Hello" //Simple Json return;
    });
});

// Route Params Example
server.get('/users/:id', (req, res) => {
    const id = req.params.id;

    return res.json( {
        message : `Searching user ${id}` }); // Route example: http://localhost:2323/users/leonardo
});

const products = ['Computer', 'Mouse Wireless', 'Keyboard'];

// List Product by Index
server.get('/products/:index', checkUserInArray, VerifyUserArray,(req, res) => {
    //const { index } = req.params;
    
    //return res.json(products[index]); // Route example: http://localhost:2323/products/0

    return res.json(req.product);
});

//List all Products
server.get('/products', (req, res) => {
    return res.json(products);  // Route example: http://localhost:2323/products
});

// Create Product
server.post('/products', checkUserExists, (req, res) =>{
    const { description } = req.body;  // Route example: http://localhost:2323/products with body {"description" : "Headset"}

    products.push(description);

    return res.json(products);
});

// Ater Product by index
server.put('/products/:index', checkUserInArray, VerifyUserArray, checkUserExists,(req, res) => {
    const { index } = req.params; // Route example: http://localhost:2323/products/3 with body {"description" : "Headset Wireless"}
    const { description } = req.body; 

    products[index] = description;

    return res.json(products);
});

// Delete Product by Index
server.delete('/products/:index', checkUserInArray, VerifyUserArray, (req, res) => {
    const { index } = req.params; // Route example: http://localhost:2323/products/1

    products.splice(index, 1);

    return res.json(products);
});

// Listen Port App
server.listen(2323);
