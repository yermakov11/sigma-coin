const express=require('express');
const app=express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const mongoose = require("mongoose");
const authRouter = require('./routes/authRoutes');

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);  

app.get('/api',(req,res)=>{
    res.json({message: "Welcome to our API"})
});

mongoose.connect("mongodb://localhost:27017/users",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(() => console.log("connect mongoDB"))
.catch((error) => {
    console.error(`Something wrong with DB ${error}`);
});
app.listen(PORT,()=>{
    console.log("listening on port",PORT);
})
