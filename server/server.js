require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routers/authRoutes");
const logoutRoutes = require("./routers/logoutRoutes");
const balanceRoutes = require("./routers/gameRoutes");
const verifyRoutes = require("./routers/verifyRoutes");
const userRoutes = require("./routers/userRoutes");
const connectDB = require("./config/db");

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
app.use("/balance", balanceRoutes);
app.use("/logout", logoutRoutes);
app.use("/verify", verifyRoutes);
app.use("/users", userRoutes);

const start = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (error) {
        console.log("DB Connection Error:", error);
    }
};

start();
