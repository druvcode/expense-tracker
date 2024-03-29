import db from "../db/database.js"

const currentUserId=1;

// async function getCurrentUser(){
//     try {
//         const result= await db.query("select * from users")
//         const users= result.rows;
//         return users.find((user)=>user.user_id===currentUserId)
//     } catch (error) {
//         res.status(500).json({message:"server error"})
//         console.log(error)
//     }
// }
async function UserIncome(currentUserId){
    try {
        const result = await db.query("SELECT income_id, amount, category_name, description, income_date, created_at, username FROM incomes LEFT JOIN categories ON incomes.category_id = categories.category_id LEFT JOIN users ON incomes.user_id = users.user_id where incomes.user_id=$1",[currentUserId]);
        const userIncomeDetail=result.rows;
        return userIncomeDetail;

    } catch (error) {
        console.log(error)
    }
}

async function addCategory(category){
    try {
        const result = await db.query("select * from categories")
        const category_name=result.rows;
        // console.log(result.rows,category_name)
        const categoryExist = category_name.find((cat)=>cat.category_name===category);
        // console.log(categoryExist)
        if(!categoryExist){
            const result = await db.query("insert into categories (category_name) values($1) returning *",[category])
            var category_id= result.rows[0].category_id;
            return category_id
        }else{
           return categoryExist.category_id
        }
    } catch (error) {
        console.log(error)
    }
}

export const addIncome = async(req,res)=>{
    // console.log(req.body);
    const {amount,category,description,income_date}=req.body;
    try {
        if(!category){
            return res.status(400).json({message:"all field required,and category"})
        }else{
           var category_id= await addCategory(category);
           console.log(category_id)
        }
        try {
            if(!amount||!description||!income_date){
                return res.status(400).json({message:"all field required"})
            }
            if(amount<0){
                return res.status(400).json({message:"Amount must be a positive number"})
            }
            console.log(amount,description,income_date)
            const date=new Date(income_date);
            const amountInFloat= parseFloat(amount).toFixed(2);
            console.log("after",date,amount)
            await db.query("Insert into incomes (user_id, amount, category_id, description, income_date) values($1,$2,$3,$4,$5)",[currentUserId,amountInFloat,category_id,description,date]);

            res.status(200).json({message:"Income added"})

        } catch (error) {
            res.status(500).json({message:"server error"})
            console.log(error)
        }
    } catch (error) {
        res.status(500).json({message:"server error"})
        console.log(error,"last catch")
    }


}

export const getIncome=async(req,res)=>{
    try {
    // const currentUser= await getCurrentUser();
    // console.log(currentUser)

    const income= await UserIncome(currentUserId);
    res.status(200).json(income)
    } catch (error) {
        res.status(400).json({message:"something went wrong"})
    }
    
    
}

export const deleteIncome=async(req,res)=>{
    
    try {
        const id = req.params["id"]
        await db.query("delete from incomes where income_id=$1",[id])
        res.status(200).json({message:"delete sucessful"})
    } catch (error) {
        console.log(error)
        res.status(400).json({message:"error in deleting"})
    }
}