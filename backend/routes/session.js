const express = require('express');
const router = express.Router();
const Session = require('../models/session');
const verifyToken = require('../middleware/verifyToken');

// Publish a session
router.post('/my-sessions/publish', verifyToken, async (req, res) => {
  try {
    console.log("USER:", req.user); // 🔍 Check if token is decoded properly
    console.log("BODY:", req.body); // 🔍 Log what frontend is sending

    const { _id, title, description, content, thumbnailUrl } = req.body;

    if (!_id) {
      return res.status(400).json({ success: false, message: 'Session ID is required to publish.' });
    }

    const session = await Session.findOne({ _id, userId: req.user.id });

    if (!session) {
      return res.status(404).json({ success: false, message: 'Session not found or unauthorized.' });
    }

    // Update and publish the session
    session.title = title || session.title;
    session.description = description || session.description;
    session.content = content || session.content;
    session.thumbnailUrl = thumbnailUrl || session.thumbnailUrl;
    session.published = true;
    session.updatedAt = new Date();

    await session.save();

    res.status(200).json({ success: true, message: 'Session published successfully.' });
  } catch (error) {
    console.error('Publish Error:', error);
    res.status(500).json({ success: false, message: 'Server error while publishing.' });
  }
});

module.exports = router;
