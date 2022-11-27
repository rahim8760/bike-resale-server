const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

async function run(){
    try{
        const db=client.db('Bike_Resale')
        const UserCollection=db.collection('Users');
        app.post('/users', async(req, res) => {
            const user = req.body;
            const result= await UserCollection.insertOne(user)
            res.send(result); 
        })
        app.get('/users/:id', async(req, res)=>{
            const id =req.params.id;
            const serQuery={role:id}
            const productCursor=UserCollection.find(serQuery)
            const product=await productCursor.toArray()
            res.send(product)
        })
        app.delete('/usersDelete/:id',async(req,res)=>{
            const id =req.params.id;
            const query ={_id:ObjectId(id)}
            const result =await UserCollection.deleteOne(query)
            res.send(result)
        });
        app.get('/myProfile/:id', async(req, res)=>{
            const id =req.params.id;
            const serQuery={email:id}
            const productCursor=UserCollection.find(serQuery)
            const product=await productCursor.toArray()
            res.send(product)
        })
        const CategoryCollection=db.collection('Category');
        app.post('/category', async(req, res) => {
            const category = req.body;
            const result= await CategoryCollection.insertOne(category)
            res.send(result); 
        })
        app.get('/category', async(req, res)=>{
            const serQuery={}
            const categoryCursor=CategoryCollection.find(serQuery)
            const category=await categoryCursor.toArray()
            res.send(category)
        })
        const ProductCollection=db.collection('Products');
        app.post('/product', async(req, res) => {
            const product = req.body;
            const result= await ProductCollection.insertOne(product)
            res.send(result); 
        })
        app.get('/product', async(req, res)=>{
            const serQuery={}
            const productCursor=ProductCollection.find(serQuery)
            const product=await productCursor.toArray()
            res.send(product)
        })
        app.get('/product/:id', async(req, res)=>{
            const id =req.params.id;
            const serQuery={category:id}
            const productCursor=ProductCollection.find(serQuery)
            const product=await productCursor.toArray()
            res.send(product)
        })
        app.get('/myProduct/:id', async(req, res)=>{
            const id =req.params.id;
            const serQuery={email:id}
            const productCursor=ProductCollection.find(serQuery)
            const product=await productCursor.toArray()
            res.send(product)
        })
        app.put('/updateProduct/:id', async(req, res)=>{
            const id =req.params.id;
            const filter={_id:ObjectId(id)}
            const reviews=req.body;
            console.log(reviews);
            const option ={upsert:true}
            const updateReview={
                $set:{
                    Status:reviews.Status,
                }
            }
            const result= await ProductCollection.updateOne(filter, updateReview, option)
            res.send(result)
        })
        app.delete('/productDelete/:id',async(req,res)=>{
            const id =req.params.id;
            const query ={_id:ObjectId(id)}
            const result =await ProductCollection.deleteOne(query)
            res.send(result)
        });
        // booking 
        const bookingCollection=db.collection('Booking');
        app.post('/booking', async(req, res) => {
            const product = req.body;
            const result= await bookingCollection.insertOne(product)
            res.send(result); 
        })
        app.delete('/bookingDelete/:id',async(req,res)=>{
            const id =req.params.id;
            const query ={_id:ObjectId(id)}
            const result =await bookingCollection.deleteOne(query)
            res.send(result)
        });
        app.get('/myBooking/:id', async(req, res)=>{
            const id =req.params.id;
            const serQuery={byerEmail:id}
            const productCursor=bookingCollection.find(serQuery)
            const product=await productCursor.toArray()
            res.send(product)
        })
        
    }finally{

    }
}
run().catch(error => console.log(error));


app.get('/', (req, res) => {
    res.send('welcome to Bike-Resale server')
});
app.listen(port, () => {
    console.log(`server running on port ${port}`);
})