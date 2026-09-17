const express = require('express');
const router = express.Router();
const Claim = require('../models/Claim');

router.post('/', async (req, res) => {
  try {
    const { userId, claimType, amount, description } = req.body;
    const claim = await Claim.create({ userId, claimType, amount, description });
    res.status(201).json(claim);
  } catch (error) {
    if (error.name === 'ValidationError' || error.name === 'CastError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const claims = await Claim.find()
      .populate('userId', 'fullName email')
      .sort({ createdAt: -1 });
    res.status(200).json(claims);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;