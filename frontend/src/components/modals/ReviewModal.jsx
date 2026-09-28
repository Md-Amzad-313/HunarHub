import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Rating from '../common/Rating';
import { useMarketplace } from '../../context/MarketplaceContext';

function ReviewModal({ isOpen, onClose, target, orderId, requestId, targetType = 'entrepreneur' }) {
  const { addReview, customerProfile } = useMarketplace();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [author, setAuthor] = useState(customerProfile?.name || 'Fatima Ahmed');
  const [error, setError] = useState('');

  if (!isOpen || !target) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      setError('Please share a short comment about your experience.');
      return;
    }

    const success = addReview({
      targetId: target.id,
      targetType,
      rating,
      comment: comment.trim(),
      author: author.trim() || 'Verified Customer',
      orderId,
      requestId,
    });

    if (success) {
      setComment('');
      setError('');
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Rate & Review Experience"
      footer={
        <div className="w-full flex items-center justify-end gap-2">
          <Button variant="outline" size="sm" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={handleSubmit} type="button">
            Submit Review
          </Button>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200">
          <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">
            Reviewing
          </span>
          <h4 className="font-heading font-bold text-neutral-900 text-sm mt-0.5">
            {target.businessName || target.name || target.title}
          </h4>
          <p className="text-neutral-500 text-[11px] mt-0.5">
            Verified completed transaction {orderId ? `Order #${orderId}` : `Request #${requestId}`}
          </p>
        </div>

        {/* Rating Stars Selection */}
        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
            Your Rating <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="text-2xl focus:outline-none transition-transform hover:scale-110"
              >
                {star <= rating ? '⭐' : '☆'}
              </button>
            ))}
            <span className="text-xs font-bold text-neutral-700 ml-2">
              {rating} of 5 Stars
            </span>
          </div>
        </div>

        {/* Author Name */}
        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1">
            Display Name
          </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full py-2 px-3 bg-white border border-neutral-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary-200"
            placeholder="Your name"
            required
          />
        </div>

        {/* Review Comment */}
        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1">
            Your Feedback <span className="text-red-500">*</span>
          </label>
          <textarea
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
              if (error) setError('');
            }}
            rows={3}
            className={`w-full p-2.5 bg-white border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary-200 resize-none ${
              error ? 'border-red-400' : 'border-neutral-300'
            }`}
            placeholder="How was the product craftsmanship, delivery time, or service visit?"
            required
          />
          {error && <p className="text-[11px] text-red-500 mt-1">{error}</p>}
        </div>
      </form>
    </Modal>
  );
}

export default ReviewModal;
