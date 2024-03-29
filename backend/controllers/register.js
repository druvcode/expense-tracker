import bcrypt from "bcrypt";
import db from "../db/database.js";

const saltRounds=10;

export const registration =async(req,res)=>{
        const {username,password,email}=req.body;
        try {
            const result=await db.query("select (email) from users where email=$1",[email])
            if(result.rows.length===0){
                bcrypt.hash(password,saltRounds,async (err,hash)=>{
                    if(err){
                        console.log(err)
                        res.status(500).json({message:"Something went wrong in hashing."})
                    }else{
                        const storeData=await db.query("Insert into users (username,password_hash,email) values($1,$2,$3)",[username,hash,email])
                        return res.status(200).json({message:'User registred'})
                    }
                })
                
            }else{
                return res.status(400).json({message:"Email ready Registered. Try to login in"})
            }
        } catch (error) {
            console.log(500).json({message:"Something wrong"})
        }
}