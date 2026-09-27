import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Rating from '../components/common/Rating';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import PageHeader from '../components/common/PageHeader';
import { PRODUCTS } from '../data/products';
import { ENTREPRENEURS } from '../data/entrepreneurs';
import { MOCK_REVIEWS } from '../data/reviews';
import { formatCurrency } from '../utils/helpers';

function ProductDetailPage() {
  const { id } = useParams();
  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];
  const entrepreneur = ENTREPRENEURS.find((e) => e.id === product.entrepreneurId) || ENTREPRENEURS[0];
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => setOrderPlaced(false), 4000);
  };

  return (
    <div className="space-y-8 pb-16">
      <PageHeader
        title={product.name}
        subtitle={`${product.category} • Handcrafted in ${product.location}`}
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Products', to: '/products' },
          { label: product.name },
        ]}
      />

      <div className="container-custom">
        {orderPlaced && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center justify-between animate-fade-in">
            <div className="flex items-center gap-3">
              <span className="text-xl">✅</span>
              <div>
                <p className="font-semibold text-sm">Order Request Submitted (Demo UI Only)</p>
                <p className="text-xs text-emerald-700">In Phase 2, this will save to MongoDB and notify the entrepreneur.</p>
              </div>
            </div>
            <button onClick={() => setOrderPlaced(false)} className="text-emerald-700 font-bold text-sm">✕</button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Image */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl overflow-hidden border border-neutral-200 shadow-sm">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[400px] sm:h-[480px] object-cover"
              />
            </div>
          </div>

          {/* Right Column: Product details & Action */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="primary">{product.category}</Badge>
                <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  {product.availability}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-heading font-bold text-neutral-900">
                {product.name}
              </h1>

              <div className="flex items-center gap-3">
                <Rating value={product.rating} count={product.reviewCount} size="md" />
                <span className="text-xs text-neutral-400">|</span>
                <span className="text-xs text-neutral-500">📍 {product.location}</span>
              </div>

              <div className="py-4 border-y border-neutral-200">
                <span className="text-xs text-neutral-400 block uppercase tracking-wider font-semibold">Total Price</span>
                <span className="text-3xl font-heading font-bold text-neutral-900">
                  {formatCurrency(product.price)}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-neutral-900 mb-1">Description</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Entrepreneur Info Card */}
              <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={entrepreneur.avatar}
                    alt={entrepreneur.name}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="text-sm font-heading font-semibold text-neutral-900">{entrepreneur.businessName}</h4>
                    <p className="text-xs text-neutral-500">By {entrepreneur.name} • {entrepreneur.rating}★</p>
                  </div>
                </div>
                <Link
                  to={`/entrepreneurs/${entrepreneur.id}`}
                  className="text-xs font-semibold text-primary-600 hover:underline no-underline"
                >
                  View Profile
                </Link>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-neutral-200">
              <Button
                variant="primary"
                size="lg"
                className="w-full shadow-lg"
                onClick={handleOrder}
              >
                🛒 Place Product Order
              </Button>
              <p className="text-[11px] text-center text-neutral-400">
                UI-Only: Ordering is simulated in Phase 1. Real payments/orders unlock in Phase 2+.
              </p>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 pt-10 border-t border-neutral-200">
          <h2 className="text-xl font-heading font-bold text-neutral-900 mb-6">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MOCK_REVIEWS.map((rev) => (
              <div key={rev.id} className="card bg-neutral-50 border border-neutral-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-sm text-neutral-900">{rev.author}</span>
                  <span className="text-xs text-neutral-400">{rev.date}</span>
                </div>
                <Rating value={rev.rating} showCount={false} />
                <p className="mt-2 text-xs text-neutral-600 leading-relaxed">{rev.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
