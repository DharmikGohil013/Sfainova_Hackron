import { Schema, model } from 'mongoose';

const facilitySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  capacity: {
    type: String,
    required: true,
  },
  lon: {
    type: Number,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

export const Facility = model('Facility', facilitySchema);
