const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ message: 'Name and email are required' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Email already exists' });

    const user = new User({ name, email });
    await user.save();
    return res.status(201).json({ message: 'User created', user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
