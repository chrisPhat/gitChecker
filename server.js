const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');

let port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res)=>{
    res.sendFile('index.html');
});

app.post('/queryGit', async (req, res)=>{
    //console.log(req.body);
    try {
        const response = await axios.get(`https://api.github.com/users/${req.body.username}`);
        //console.log(response.data);
        res.json(response.data.login);
    }
    catch (err) {
        next(err)
    }
});

app.listen(port, ()=> console.log(`Server listening on Port: ${port}`));