import express from 'express';
import { addProject, getProject } from './services.js';

const projectRouter = express.Router();

// Add middleware to parse JSON bodies
projectRouter.use(express.json());

projectRouter.patch('/project/:uid', addProject);
projectRouter.get('/project/:uid', getProject);

export default projectRouter;
