// Backend/routes/bookingRoutes.js
import express from 'express';
import { createBooking, getBooking, getAllBookings, getBookingByUser, getBookingsByFacility } from '../controllers/bookingController.js';

const router = express.Router();

router.post('/', createBooking);
router.get('/:id', getBooking);
router.get('/', getAllBookings);
router.get('/user/:userId', getBookingByUser);
router.get('/facility/:facilityId', getBookingsByFacility);

export default router;