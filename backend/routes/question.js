//make question router here: look at the answer.js
import express from 'express';
import { extract } from '../utils/extractor.js'
import { callOllama } from '../utils/ollama_helper.js'

const router = express.Router();

export { router as questionRouter }

