const express = require('express')
const app = express();
const PORT = process.env.PORT || 3000



app.get('/',(req,res)=>{
    res.send("Hello Node API")
})



app.listen(PORT ,()=>{
    console.log(`API running in port :${PORT}`)
})
