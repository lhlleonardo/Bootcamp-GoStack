const express = require('express');

const server = express();

server.use(express.json());

var i = 1;

server.use((req, res, next) => {
    console.log(i);
    i ++;
    return next();
});

function checkProjectExists(req, res, next){
    if (!projects[req.params.index]){
        return res.status(400).json( {error: "Project not found. Please, verify your body."} )
    }
    return next();
}

const projects = [ {id: "1", tittle: "ReactJS", tasks: ["Frontend", "Docs"]}, 
                   {id: "2", tittle: "React Native", tasks: ["Mobile", "Docs"]}, 
                   {id: "3", tittle: "NodeJS", tasks: ["backend", "Docs"]}];

server.post('/projects', (req, res) => {
    const { id } = req.body;
    const { tittle } = req.body;
    const { tasks } = req.body;

    projects.push( { id, tittle, tasks} );

    return res.json(projects);
});

server.get('/projects', (req, res) => {
    return res.json(projects);
});

server.put('/projects/:index', checkProjectExists, (req, res) => {
    const { index } = req.params;
    const { id } = req.body;
    const { tittle } = req.body;
    const { tasks } = req.body;

    projects[index] = { id, tittle, tasks };

    return res.json(projects);
});

server.delete('/projects/:index', checkProjectExists, (req, res) => {
    const { index } = req.params;

    projects.splice(index, 1);

    return res.json(projects);
});

server.listen('3333');