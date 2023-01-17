const express=require('express');
const dotenv=require('dotenv');
const colors=require('colors');

//Morgan is a HTTP req logger
const morgan=require('morgan');
const connectDB=require('./config/db');


//load env vars
dotenv.config({path: './config/config.env'});

//Connect to database
connectDB();

//Route files
const bootcamps =require('./routes/bootcamps');

const app=express();

//Body Parser
app.use(express.json());

//dev login middleware
if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'));
}

//Mount routers
app.use('/api/v1/bootcamps',bootcamps);


const PORT =process.env.PORT || 5000;

// mongoose.set("strictQuery", false);

const server=app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port${PORT}`.yellow.bold));

process.on('UnhandledRejection',(err, Promise)=>{
    console.log(`Error:${err.message}`.red);

    //Close server & Exit process
    server.close(()=> process.exit(1));
});