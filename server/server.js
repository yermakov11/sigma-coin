require('dotenv').config();
const express=require('express');
const app = express();
const cors=require('cors');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT||3000;
const userRoutes = require('./routers/authRoutes');
const logoutRoutes=require('./routers/logoutRoutes');
const balanceRoutes=require('./routers/gameRoutes');
const verifyRoutes=require('./routers/verifyRoutes');
const connectDB=require('./config/db');


app.use(express.json());
app.use(cors({credentials: true,origin: process.env.CLIENT_URL}));
app.use(cookieParser());
app.use((req,res,next) => {
  console.log(req.path,req.method);
  next()
})

app.use('/auth', userRoutes);
app.use('/balance',balanceRoutes);
app.use('/logout', logoutRoutes);
app.use('/',verifyRoutes);

const start = async () => {
  try {
    await connectDB();  
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
      console.log('db error',error);
  }
}

start()