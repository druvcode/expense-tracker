import db from "../db/database.js"

const currentUserId=1;
async function UserExpense(currentUserId){
    try {
        const result = await db.query("SELECT expense_id, amount, category_name, description, expense_date, created_at, username FROM expenses LEFT JOIN categories ON expenses.category_id = categories.category_id LEFT JOIN users ON expenses.user_id = users.user_id where expenses.user_id=$1",[currentUserId]);
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

export const addExpense = async(req,res)=>{
    // console.log(req.body);
    const {amount,category,description,expense_date}=req.body;
    try {
        if(!category){
            return res.status(400).json({message:"all field required,and category"})
        }else{
           var category_id= await addCategory(category);
           console.log(category_id)
        }
        try {
            if(!amount||!description||!expense_date){
                return res.status(400).json({message:"all field required"})
            }
            if(amount<0){
                return res.status(400).json({message:"Amount must be a positive number"})
            }
            // console.log(amount,description,expense_date)
            const date=new Date(expense_date);
            const amountInFloat= parseFloat(amount).toFixed(2);
            console.log("after",date,amount)
            await db.query("Insert into expenses (user_id, amount, category_id, description, expense_date) values($1,$2,$3,$4,$5)",[currentUserId,amountInFloat,category_id,description,date]);

            res.status(200).json({message:"expense added"})

        } catch (error) {
            res.status(500).json({message:"server error"})
            console.log(error)
        }
    } catch (error) {
        res.status(500).json({message:"server error"})
        console.log(error,"last catch")
    }


}

export const getExpense=async(req,res)=>{
    try {
    // const currentUser= await getCurrentUser();
    // console.log(currentUser)
    const expenses= await UserExpense(currentUserId);
    console.log(expenses)
    res.status(200).json(expenses)
    } catch (error) {
        res.status(400).json({message:"something went wrong"})
    }
    
    
}

export const deleteExpense=async(req,res)=>{
    
    try {
        const id = req.params["id"]
        await db.query("delete from expenses where expense_id=$1",[id])
        res.status(200).json({message:"delete sucessful"})
    } catch (error) {
        console.log(error)
        res.status(400).json({message:"error in deleting"})
    }
}