require('dotenv').config();
const express=require('express');
const app = express();
const cors=require('cors');
const mongoose=require('mongoose');
const PORT = process.env.PORT||3000;

app.use(express.json());
app.use(cors({
  credentials: true,
  origin: process.env.PORT}));

const start = async () => {
  try {
      await mongoose.connect(process.env.DB_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true
      })
      app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (error) {
      console.log(error);
  }
}
start()