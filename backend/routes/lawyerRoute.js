import express from 'express';
import { lawyerList } from '../controllers/lawyerController.js';

const lawyerRouter = express.Router();

lawyerRouter.get('/list', lawyerList); // This should be mapped correctly

export default lawyerRouter;
