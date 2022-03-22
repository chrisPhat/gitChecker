const express = require('express');
const app = express();
const axios = require('axios');

let port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res)=>{
    res.sendFile('index.html');
});

app.post('/queryGit', async (req, res)=>{
    //console.log(req.body);
    try {
        const response = await axios.get(`https://api.github.com/users/${req.body.username}`);
        console.log(response.data);
        if(response.data.public_repos <= 5){
            res.send('What an Amatuer')
        } else if (response.data.public_repos > 5 && response.data.public_repos <= 10){
            res.send('Getting There')
        } else if(response.data.public_repos > 10 && response.data.public_repos <= 20) {
            res.send('Pro')
        } else {
            res.send('God Tier')
        }
        
    }
    catch (err) {
        next(err)
    }
});

app.listen(port, ()=> console.log(`Server listening on Port: ${port}`));
