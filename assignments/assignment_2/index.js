const http =require("http");
const fs =require("fs")
fs.writeFile("index.html","<h1>Hello world <h1>",err =>{
    console.log(err)
})
const server =http.createServer((req,res) =>{
    fs.readFile("index.html",{encoding:"utf-8"},(err,data)=>{
        res.end(data);
    })
})
server.listen(3000,()=>{
    console.log("server is responding")
})