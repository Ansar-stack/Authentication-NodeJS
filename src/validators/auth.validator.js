import { body } from "express-validator"
// Register validations
export const registerValidations = [
    body('name')
    .notEmpty().withMessage("User name is required")
    .isLength({min: 3}).withMessage("Password should be atleast 8 characters")
    .isLength({max: 50}).withMessage('User name must be less then 50 characters')
    .matches(/^[a-zA-Z]$/).withMessage("User name should contain only letters"),
    body('email')
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email address"),
    body("password")
    .trim()
    .notEmpty().withMessage("Password is required")
    .isLength({min: 8}).withMessage("Password should be atleast 8 characters")
    .isLength({max: 100}).withMessage("Password should be less then 100 characters")
]
// Login validations
export const loginValidations = [
    body('email')
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email address"),
    body('password')
    .notEmpty().withMessage("Password is required")
    .isLength({min: 8, max: 100}).withMessage('Password is incorrect')
]