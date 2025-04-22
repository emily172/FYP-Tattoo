const express = require('express');
const router = express.Router();
const FAQ = require('../models/faqModel'); // Import FAQ schema

// GET all FAQs
router.get('/faqs', async (req, res) => {
  try {
    const faqs = await FAQ.find();
    res.status(200).json(faqs);
  } catch (err) {
    console.error('Error fetching FAQs:', err);
    res.status(500).json({ error: 'Failed to fetch FAQs' });
  }
});

// POST a new FAQ
router.post('/faqs', async (req, res) => {
  const { category, question, answer } = req.body;
  try {
    const newFAQ = new FAQ({ category, question, answer });
    await newFAQ.save();
    res.status(201).json(newFAQ);
  } catch (err) {
    console.error('Error creating FAQ:', err);
    res.status(500).json({ error: 'Failed to create FAQ' });
  }
});

// PUT (Update an FAQ)
router.put('/faqs/:id', async (req, res) => {
  const { id } = req.params;
  const { category, question, answer } = req.body;
  try {
    const updatedFAQ = await FAQ.findByIdAndUpdate(
      id,
      { category, question, answer },
      { new: true }
    );
    if (!updatedFAQ) return res.status(404).json({ error: 'FAQ not found' });
    res.status(200).json(updatedFAQ);
  } catch (err) {
    console.error('Error updating FAQ:', err);
    res.status(500).json({ error: 'Failed to update FAQ' });
  }
});

// DELETE an FAQ
router.delete('/faqs/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedFAQ = await FAQ.findByIdAndDelete(id);
    if (!deletedFAQ) return res.status(404).json({ error: 'FAQ not found' });
    res.status(200).json({ message: 'FAQ deleted successfully' });
  } catch (err) {
    console.error('Error deleting FAQ:', err);
    res.status(500).json({ error: 'Failed to delete FAQ' });
  }
});

module.exports = router;
