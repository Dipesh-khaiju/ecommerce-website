const mongoose = require('mongoose');
const dotenv =require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family:4,

})
.then(() => {
    console.log("connected to database successfully")
})
.catch((err)=>{
    console.log(err);
})
