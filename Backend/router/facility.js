import express from 'express';
import { addFacility, getAllFacilities, getFacilityById } from '../controllers/facilityController.js';


const facilityRouter = express.Router();

facilityRouter.post('/' ,addFacility);

facilityRouter.get('/:id', getFacilityById);

facilityRouter.get('/', getAllFacilities);


export default facilityRouter;
