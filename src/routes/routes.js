import { Router } from 'express';
import fetchRecords from '../controllers/record';
import validateField from '../middleware/validateField';
import validateRecordInput from '../middleware/validateRecordInput';

const router = Router();

router.post('/records', validateField(validateRecordInput), fetchRecords);

export default router;
