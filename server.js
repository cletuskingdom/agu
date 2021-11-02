require("dotenv").config();
const app = require("./app");
const mongoose = require('mongoose');
const catchAsync = require("./middleware/errors/catchAsync");

//DB Connection string
const DB = process.env.DB_URL

//initialize server port
port = process.env.PORT || 4000;


//connect to database
mongoose
.connect(DB)
.then(() => console.log(`DB connection successful!`))
.catch(err => console.log(err))

app.listen(port, () => {
  console.log(`server is listening on port ${port}...`);
});
