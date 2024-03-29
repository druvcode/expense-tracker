import express from "express"
import cors from "cors"
import 'dotenv/config'
import fs from "fs"
import db from "./db/database.js"
import session from "express-session";
import bcrypt from "bcrypt"
import passport from "passport"
import { Strategy } from "passport-local"
const port = process.env.PORT
const app = express()

// database

db.connect();

  //middlewares
app.use(express.json())
app.use(cors())
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true
}))
app.use(passport.initialize());
app.use(passport.session())

// routes
const routeFiles = fs.readdirSync('./routes');

// Convert routeFiles to an array
const routes = Array.from(routeFiles);

// Iterate over each route file
routes.forEach(async route => {
  // Import the route module dynamically
  const routeModule = await import(`./routes/${route}`);
  // Use the route middleware
  app.use('/api/v1', routeModule.default); // Assuming routes are exporting default
});

//oneliner for above code
// readdirSync('./routes').map(async(route)=>app.use('/api/v1',await import(`./routes/${route}`).default))

passport.use(new Strategy(async function verify(username,password,cb){
  console.log(username,password);
  try {
    const result = await db.query("select * from users where username=$1",[username])
    console.log(result.rows)
    if(result.rows.length!=0){

      const user=result.rows[0];
      const hash=user.password_hash;
      bcrypt.compare(password,hash,function(err,result){
        if(err){
          return cb(err)
        }else{
          if(result){
            return cb(null,user)
        }else{
            return cb(null,false)
        }}
      })
    }else{
      result.send(400).json({message:"User is not registred"})
      return cb("User not found")
    }
  } catch (error) {
    return cb(error)
  }
}))

passport.serializeUser((user, cb)=>{
  cb(null,user)
})
passport.deserializeUser((user, cb)=>{
  cb(null,user)
})


app.listen(port,()=>{
    console.log(`Server running at port: ${port}`);
});

