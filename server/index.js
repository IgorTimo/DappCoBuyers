import express from 'express';
const app = express();

app.get('/', (req, res) => {
    res.send({ message: "it's a server!" })
})

app.get('/purchase', (req, res) => {

})

app.post('/purchase', (req, res) => {
    
})





const port = "3003";
app.listen(port, ()=> console.log(`Listening port ${port}`));