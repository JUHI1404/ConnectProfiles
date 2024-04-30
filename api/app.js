import express from "express";
const app= express();

app.use("/api/test", (req, res) => {
    res.send("IT works");
});

app.listen(5500,() =>{
    console.log("Server is running");
});