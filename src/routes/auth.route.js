import express from 'express'
import { handleLogin, handleRegister} from '../controllers/auth.controller.js';
import { loginValidations, registerValidations } from '../validators/auth.validator.js';
import { handleValidationErrors } from '../middlewares/validationHandler.middleware.js';
const authRouter = express.Router();

authRouter.post('/register', registerValidations, handleValidationErrors, handleRegister);
authRouter.post('/login', loginValidations, handleValidationErrors, handleLogin);

export default authRouter;