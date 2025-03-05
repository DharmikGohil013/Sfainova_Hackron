// Backend/routes/facilityRoutes.js
import express from 'express';
import { getAllFacilities, getFacilityById, addFacility } from '../controllers/facilityController.js';

const router = express.Router();

router.get('/', getAllFacilities);
router.get('/:id', getFacilityById);
router.post('/', addFacility);

export default router;