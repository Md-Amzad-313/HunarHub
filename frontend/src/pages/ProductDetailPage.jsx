import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Rating from '../components/common/Rating';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import PageHeader from '../components/common/PageHeader';
import ProductCard from '../components/cards/ProductCard';
import ProductOrderModal from '../components/modals/ProductOrderModal';
import { useMarketplace } from '../context/MarketplaceContext';
import { formatCurrency } from '../utils/helpers';

function ProductDetailPage() {
  const { id } = useParams();
  const { products, getEntrepreneurById, reviews, addToCart } = useMarketplace();

  const product = products.find((p) => p.id === id) || products[0];
  const entrepreneur = getEntrepreneurById(product?.entrepreneurId) || {
    id: 'ent-1',
    name: product?.entrepreneurName || 'Master Artisan',
    businessName: product?.businessName || 'Local Studio',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    rating: 4.9,
    location: product?.location || 'India',
  };

  const [quantity, setQuantity] = useState(1);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  // Reviews matching this product or entrepreneur
  const productReviews = reviews.filter(
    (r) => r.targetId === product.id || r.targetId === entrepreneur.id
  );

  // Related products: same entrepreneur or same category
  const sameEntrepreneurProducts = products
    .filter((p) => p.id !== product.id && p.entrepreneurId === product.entrepreneurId)
    .slice(0, 3);

  const similarCategoryProducts = products
    .filter(
      (p) =>
        p.id !== product.id &&
        p.entrepreneurId !== product.entrepreneurId &&
        (p.categoryId === product.categoryId || p.category === product.category)
    )
    .slice(0, 3);

  const isOutOfStock = product.stock !== undefined && product.stock <= 0;

  return (
    <div className="space-y-8 pb-16">
      <PageHeader
        title={product.name}
        subtitle={`${product.category} • Handcrafted in ${entrepreneur.location || product.location}`}
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Products', to: '/products' },
          { label: product.name },
        ]}
      />

      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Image */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl overflow-hidden border border-neutral-200 shadow-sm relative group">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[400px] sm:h-[480px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-neutral-700 shadow-sm">
                🔍 Verified Authentic Craft
              </div>
              {isOutOfStock && (
                <div className="absolute inset-0 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center">
                  <span className="bg-red-500 text-white text-sm font-bold px-4 py-2 rounded-full uppercase tracking-wider">
                    Currently Out of Stock
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Product details & Action */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="primary">{product.category}</Badge>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                    isOutOfStock
                      ? 'bg-red-50 text-red-700 border-red-200'
                      : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                  }`}
                >
                  ✓ {product.availability || (isOutOfStock ? 'Out of Stock' : 'In Stock')}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-heading font-bold text-neutral-900">
                {product.name}
              </h1>

              <div className="flex items-center gap-3">
                <Rating value={product.rating} count={product.reviewCount} size="md" />
                <span className="text-xs text-neutral-400">|</span>
                <span className="text-xs text-neutral-500">📍 {entrepreneur.location || product.location}</span>
              </div>

              <div className="py-4 border-y border-neutral-200">
                <span className="text-xs text-neutral-400 block uppercase tracking-wider font-semibold">Total Price</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-heading font-bold text-neutral-900">
                    {formatCurrency(product.price)}
                  </span>
                  <span className="text-xs text-emerald-600 font-medium">Free delivery over ₹3,000</span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-neutral-900 mb-1">Description & Craftsmanship</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {product.tags.map((tag) => (
                    <span key={tag} className="text-[11px] bg-neutral-100 text-neutral-600 px-2.5 py-0.5 rounded-lg font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 pt-2">
                <span className="text-xs font-semibold text-neutral-700">Quantity:</span>
                <div className="flex items-center border border-neutral-300 rounded-xl px-3 py-1 bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={isOutOfStock}
                    className="text-neutral-500 hover:text-neutral-900 text-sm font-bold w-6 h-6 flex items-center justify-center disabled:opacity-30"
                  >
                    −
                  </button>
                  <span className="font-bold text-xs w-6 text-center">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(product.stock || 20, q + 1))}
                    disabled={isOutOfStock}
                    className="text-neutral-500 hover:text-neutral-900 text-sm font-bold w-6 h-6 flex items-center justify-center disabled:opacity-30"
                  >
                    +
                  </button>
                </div>
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
                    <h4 className="text-sm font-heading font-semibold text-neutral-900">
                      {entrepreneur.businessName}
                    </h4>
                    <p className="text-xs text-neutral-500">By {entrepreneur.name} • {entrepreneur.rating}★</p>
                  </div>
                </div>
                <Link
                  to={`/entrepreneurs/${entrepreneur.id}`}
                  className="text-xs font-semibold text-primary-600 hover:underline no-underline"
                >
                  View Profile →
                </Link>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-neutral-200">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  disabled={isOutOfStock}
                  className="w-full text-sm font-bold flex items-center justify-center gap-2"
                  onClick={() => addToCart(product, quantity)}
                >
                  🛒 Add to Cart
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  disabled={isOutOfStock}
                  className="w-full shadow-lg text-sm font-bold flex items-center justify-center gap-2"
                  onClick={() => setIsOrderModalOpen(true)}
                >
                  ⚡ Buy Now
                </Button>
              </div>
              <div className="flex items-center justify-center gap-4 text-[11px] text-neutral-500">
                <span>🛡️ HunarHub Buyer Protection</span>
                <span>•</span>
                <span>📦 Direct From Artisan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 pt-10 border-t border-neutral-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-heading font-bold text-neutral-900">
              Customer Reviews ({productReviews.length})
            </h2>
            <span className="text-xs text-neutral-500">
              Verified feedback from completed transactions
            </span>
          </div>
          {productReviews.length === 0 ? (
            <p className="text-xs text-neutral-500 py-4">No reviews submitted yet for this product.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {productReviews.map((rev) => (
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
          )}
        </div>

        {/* More products from same artisan */}
        {sameEntrepreneurProducts.length > 0 && (
          <div className="mt-16 pt-10 border-t border-neutral-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading font-bold text-neutral-900">
                More Handcrafted Items by {entrepreneur.name}
              </h2>
              <Link
                to={`/entrepreneurs/${entrepreneur.id}`}
                className="text-xs font-semibold text-primary-600 hover:underline no-underline"
              >
                View Full Studio ({sameEntrepreneurProducts.length}) →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sameEntrepreneurProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* Similar Category Products */}
        {similarCategoryProducts.length > 0 && (
          <div className="mt-16 pt-10 border-t border-neutral-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading font-bold text-neutral-900">
                Similar Items in {product.category}
              </h2>
              <Link
                to={`/explore?category=${product.category.toLowerCase()}`}
                className="text-xs font-semibold text-primary-600 hover:underline no-underline"
              >
                Explore Category →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarCategoryProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Interactive Purchase Modal */}
      <ProductOrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        product={product}
      />
    </div>
  );
}

export default ProductDetailPage;
