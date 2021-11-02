const mongoose=require('mongoose');
//name,email, photo,password,passwordconfirm
const validator=require('validator');
const bcrypt=require('bcryptjs');

const userSchema=new mongoose.Schema({
  name:{
  type:String,
  required:[true,'please tell us your name']
},
email:{
  type:String,
  required:[true,'please provide your Email'],
  unique:true,
  lowercase:true,//transform the email to lowercase
// validate:[validator.isEmail,'Please provide a valid Email']
},
photo:String,
password:{
  type:String,
  required:[true,'please provide a password'],
  minlength:8,
  select:false//it not showup in the output
},
passwordConfirm:{
type:String,
required:[true,'please confirm your  password'],
validate:{
  //only works on save not on update
  //or on create new object usesing .create
  validator:function(el){
//   here el is the value of confirmPassword
     console.log("this is the passwword"+el)

    return el===this.password;
    // console.log(el)
  },
  message:"password are not the same "
  
}

}
});
//research about  this later
userSchema.pre('save',async function(next){
//  here we check if the password have been modufied just run the 
// the code 

//runs the function if only the password is modified

  if(!this.isModified('password'))return next(); 
//against blueforce attack
//hash the password with cost of 12
this.password=await bcrypt.hash(this.password,12)
//delete the passwordconfirm 
this.passwordConfirm=undefined;
//undefined because we want only the password field 
// to be stored in the db,

//note passwordconfirm is only used here to ,make sure the user input 
//corect password(two equal password)

next();
})
// instance  method that is going to be available in all the document
userSchema.methods.correctPassword=async function(
  candidates,
  userPassword)
  {
  return await bcrypt.compare(candidates,userPassword);
}
const User=new mongoose.model("Users",userSchema);
module.exports=User;
