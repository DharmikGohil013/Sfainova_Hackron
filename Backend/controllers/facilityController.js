import { Facility } from '../models/Facility.js';

export const getAllFacilities = async (req, res) => {
  try {
    const facilities = await Facility.find();
    res.json(facilities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFacilityById = async (req, res) => {
  const { id } = req.params;
  try {
    const facility = await Facility.findById(id);
    if (facility) {
      res.json(facility);
    } else {
      res.status(404).json({ message: 'Facility not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addFacility = async (req, res) => {
  const { name, capacity, lon, lat, contact, time } = req.body;
  try {
    const newFacility = new Facility({
      name,
      capacity,
      lon,
      lat,
      contact,
      time,
    });
    const savedFacility = await newFacility.save();
    res.status(201).json(savedFacility);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
