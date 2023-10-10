const express=require('express');
const app=express();
const path=require('path');
const bcrypt=require('bcrypt');

const port = process.env.port || 4000;

//Database connection ko lagi
require("./db/conn.js");
const user= require('./db/schemaDef.js')

//external css ko lagi
app.use(express.static(path.join(__dirname,"../public")));

//ejs use garna lai
app.set("view engine","ejs");

//For showing database ko data
// app.use(express.json); // error aayo esle garda
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.render('index')
});
app.get("/home-02",(req,res)=>{
    res.render('home-02')
});
app.get("/home-03",(req,res)=>{
    res.render('home-03')
});
app.get("/product",(req,res)=>{
    res.render('product.ejs')
});
app.get("/product-detail",(req,res)=>{
    res.render('product-detail.ejs')
});
app.get("/shoping-cart",(req,res)=>{
    res.render('shoping-cart.ejs')
});
app.get("/blog",(req,res)=>{
    res.render('blog.ejs')
});
app.get("/blog-detail",(req,res)=>{
    res.render('blog-detail.ejs')
});
app.get("/about",(req,res)=>{
    res.render('about.ejs')
});
app.get("/contact",(req,res)=>{
    res.render('contact.ejs')
});

//Registering USer
app.get("/regForm",(req,res)=>{
    res.render('regForm');

});

app.post("/regForm",async(req,res)=>{
     try{
        const pass = req.body.password;
        const c_pass=req.body.c_password;
        if(pass===c_pass){
            const registerUser = new user({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password,
                c_password:req.body.c_password
            })
          const detail =  await registerUser.save();
          console.log("Saved following in DB"+detail);
          res.redirect('/');
        }
        else{
            res.send('passwords should be same');
        }
     }
     catch(err){
        res.status(404).send(err);
     }
})

//loggin in User
app.get("/login",(req,res)=>{
    res.render('login');
})
app.get("/regForm/login",(req,res)=>{
    res.render('login');
})
app.post("/regForm/login",async(req, res)=>{
    try{
        const abc = await user.findOne({email: req.body.email});
        // const check = req.body.password === abc.password;
        const check = await bcrypt.compare(req.body.password,abc.password);
        if(check){
            res.redirect('/');
            
        }
        else{
            res.send("login Failed")
        }
    }
    catch(err){
        res.status(404).send(err);
    } 
})

app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})

