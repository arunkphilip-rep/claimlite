const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Claim must be associated with a user']
  },
  claimType: {
    type: String,
    required: true,
    enum: ['Auto', 'Home', 'Health']
  },
  amount: {
    type: Number,
    required: [true, 'Claim amount is required'],
    min: [0.01, 'Amount must be greater than 0'],
    max: [1000000, 'Amount cannot exceed 1,000,000']
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 500
  }
}, { timestamps: true });

module.exports = mongoose.model('Claim', claimSchema);