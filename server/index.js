import express from 'express';
import cors from "cors";



const app = express();
app.use(express.json()); 
app.use(express.urlencoded());
app.use(cors());

app.get('/', (req, res) => {
    res.send({ message: "it's a server!" })
})

app.get('/purchases/:hash', (req, res) => {
    const hash = req.params.hash;
    console.log("hash: ",  hash)
    res.send({info: { title: "Title", desc: "It's a description", supplierInfo: "https://www.lipsum.com/"}})
})

app.post('/purchases', (req, res) => {
    
})





const port = "3003";
app.listen(port, ()=> console.log(`Listening port ${port}`));