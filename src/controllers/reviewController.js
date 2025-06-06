const reviewUseCases = require('../useCases/reviews/reviewUseCases');
const asyncHandler = require('../utils/asyncHandler');

// Add a review
const addReview = asyncHandler(async (req, res) => {
  const review = await reviewUseCases.addReview({
    ...req.body,
    book_id: req.params.book_id,
    user_id: req.user.id
  });

  res.status(201).json({
    status: 'success',
    data: { review }
  });
});

// Get reviews for a book
const getBookReviews = asyncHandler(async (req, res) => {
  const result = await reviewUseCases.getBookReviews(
    req.params.book_id,
    req.query
  );

  res.json({
    status: 'success',
    data: result
  });
});

// Update a review
const updateReview = asyncHandler(async (req, res) => {
  const review = await reviewUseCases.updateReview(
    req.params.id,
    req.body,
    req.user.id
  );

  res.json({
    status: 'success',
    data: { review }
  });
});

// Delete a review
const deleteReview = asyncHandler(async (req, res) => {
  await reviewUseCases.deleteReview(req.params.id, req.user.id);
  res.status(204).send();
});

module.exports = {
  addReview,
  getBookReviews,
  updateReview,
  deleteReview
}; 