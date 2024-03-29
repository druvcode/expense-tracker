import express from "express";
import { addIncome, deleteIncome, getIncome } from "../controllers/income.js";
import { addExpense, deleteExpense, getExpense } from "../controllers/expense.js";
import { registration } from "../controllers/register.js";
import passport from "passport";

const router= express.Router()

router.post("/add-income",addIncome)
router.get("/get-income",getIncome)
router.delete("/delete-income/:id",deleteIncome)
router.post("/add-expense",addExpense)
router.get("/get-expense",getExpense)
router.delete("/delete-expense/:id",deleteExpense)
router.post("/register",registration)
router.post('/login', passport.authenticate('local'), (req, res) => {
    res.status(200).json({ message: 'Login successful' });
  });
  
export default router