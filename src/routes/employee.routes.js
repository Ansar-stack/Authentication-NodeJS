import express from 'express'
import { jwtAuth } from '../middlewares/jwtAuth.midleware.js';
import { addEmployee } from '../controllers/employee.controller.js';
const employeeRouter = express.Router();
employeeRouter.get('/add', jwtAuth, addEmployee)
export default employeeRouter