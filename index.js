const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express')
const cors = require('cors');
const app = express()
const port = process.env.Port || 5000;
require('dotenv').config()
// middleware using
app.use(cors());
app.use(express.json())



const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@cluster0.scxie4k.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




app.get('/', (req, res) => {
    res.send('welcome to Bike-Resale server')
});
app.listen(port, () => {
    console.log(`server running on port ${port}`);
})