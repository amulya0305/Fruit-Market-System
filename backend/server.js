const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/fruitMarketDB")
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

app.use("/products", require("./routes/productRoutes"));

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`);
});
