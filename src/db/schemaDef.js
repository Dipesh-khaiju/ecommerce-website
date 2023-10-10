const { default: mongoose } = require("mongoose");
const bcrypt=require('bcrypt');

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String},
    c_password:{type:String}
})

userSchema.pre("save",async function(next){
    if (this.isModified("password")){
        // const hashPass = await brycpt.hash(password,10);
        console.log(`The password is ${this.password}`);
        this.password = await bcrypt.hash(this.password,10);
        console.log(`The password is ${this.password}`);

        this.c_password = await bcrypt.hash(this.password,10);
    }
    next();
})

const user = new mongoose.model('user',userSchema);
module.exports = user;