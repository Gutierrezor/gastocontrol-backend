import express from 'express';
import { createCategory, listCategories } from '../controllers/categoryController.js';

const router = express.Router();

router.post('/', createCategory);
router.get('/', listCategories);
// Ruta para mostrar todas las categorías
router.get('/all', listCategories);

export default router;