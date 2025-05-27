import express from 'express';
import { setLimit, getLimit } from '../controllers/limitController.js';

const router = express.Router();

router.post('/', setLimit);
router.get('/', getLimit);

export default router;
