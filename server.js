//require("dotenv").config();
const app = require("./app");
const mongoose = require('mongoose');
const catchAsync = require("./middleware/errors/catchAsync");
const  dotenv=require('dotenv')
// const path  = require('./app')
dotenv.config({path:'./config.env'})
//DB Connection string
//const DB = process.env.DATABASE

//initialize server port
port = process.env.PORT || 4000;


//connect to database
// mongoose
// .connect(DB)
// .then(() => console.log(`DB connection successful!`))
// .catch(err => console.log(err))


const DB=process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB,{
// useNewUrlParser:true,
// useUnifiedTopology:true,
// useCreateIndex:true,
// useFindAndModify:false
} 
).then(con=>{
  // console.log(con.connection)
  console.log('DB CONNECTION SUCCESFULL')
})


app.listen(port, () => {
  console.log(`server is listening on port ${port}...`);
});
