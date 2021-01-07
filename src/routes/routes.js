import { Router } from 'express';
import fetchRecords from '../controllers/record';

const router = Router();

router.post('/records', fetchRecords);

export default router;
