console.log('Loading visit routes...');
const express = require('express');
const router = express.Router();
const Visit = require('../models/Visit');
const Notification = require('../models/Notifications');
const Listings = require('../models/Listings'); // Assumes property has sellerId

// Book visit and notify seller
router.post('/book', async (req, res) => {
  console.log('POST /book called with body:', req.body);
  const { name, email, date, time, propertyId } = req.body;
  console.log('propertyId:', propertyId);
  try {
    const property = await Listings.findById(propertyId);
    if (!property) {
      console.log('Property not found for id:', propertyId);
      return res.status(404).send('Property Not found');
    }

    const visit = new Visit({
      name,
      email,
      date,
      time,
      propertyId,
      sellerId: property.userId,
    });
    await visit.save();

    // Create a notification for the seller
    const notification = new Notification({
      sellerId: property.userId,
      visitId: visit._id,
      message: `New visit request from ${name} for property ${propertyId}`,
    });
    await notification.save();

    res.json({ appointmentId: visit._id });
  } catch (error) {
    console.error('Error in /book route:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Get seller notifications
router.get('/notifications/:sellerId', async (req, res) => {
  const { sellerId } = req.params;
  const notifications = await Notification.find({ sellerId }).sort({ timestamp: -1 }).populate('visitId');
  res.json(notifications);
});

// Assign agent to a visit
router.post('/assign-agent', async (req, res) => {
  const { visitId, agentId } = req.body;
  try {
    const visit = await Visit.findById(visitId);
    if (!visit) return res.status(404).send('Visit not found');

    visit.assignedAgent = agentId;
    await visit.save();

    res.send('Agent assigned successfully.');
  } catch (error) {
    console.error('Error in /assign-agent route:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;