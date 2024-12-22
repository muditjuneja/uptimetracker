import { Router } from 'express';
import {
  createEndpoint,
  getEndpoints,
  getEndpoint,
  updateEndpoint,
  deleteEndpoint,
} from '../controllers/endpoints.controller.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.use(authenticate);

router.post('/', createEndpoint);
router.get('/', getEndpoints);
router.get('/:id', getEndpoint);
router.put('/:id', updateEndpoint);
router.delete('/:id', deleteEndpoint);

export default router;
