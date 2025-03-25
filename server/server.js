require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routers/authRoutes");
const logoutRoutes = require("./routers/logoutRoutes");
const gameRoutes = require("./routers/gameRoutes");
const verifyRoutes = require("./routers/verifyRoutes");
const userRoutes = require("./routers/userRoutes");
const connectDB = require("./config/db");
const refreshRoutes=require('./routers/refreshRoutes');
const verifyJWT=require('./middleware/verifyToken');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(cookieParser());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use("/auth", authRoutes);
app.use("/balance", gameRoutes);
app.use("/logout", logoutRoutes);
app.use("/verify", verifyRoutes);
app.use("/users", userRoutes);
app.use('/refresh', refreshRoutes);

app.use(verifyJWT);

const start = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (error) {
        console.log("DB Connection Error:", error);
    }
};

start();
