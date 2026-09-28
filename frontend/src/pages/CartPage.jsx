import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { EmptyState } from '../components/common/States';
import { useMarketplace } from '../context/MarketplaceContext';
import { formatCurrency } from '../utils/helpers';

const CITIES = [
  'Bangalore',
  'Hyderabad',
  'Delhi',
  'Jaipur',
  'Kolkata',
  'Patna',
  'Amritsar',
  'Ahmedabad',
  'Jodhpur',
  'Kolhapur',
  'Madurai',
  'Moradabad',
  'Other',
];

function CartPage() {
  const navigate = useNavigate();
  const {
    cart,
    cartCount,
    cartSubtotal,
    cartDeliveryFee,
    cartTotal,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    customerProfile,
    placeProductOrder,
  } = useMarketplace();

  // Checkout form states
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [customerName, setCustomerName] = useState(customerProfile?.name || 'Fatima Ahmed');
  const [customerPhone, setCustomerPhone] = useState(customerProfile?.phone || '+91 98765 43210');
  const [customerEmail, setCustomerEmail] = useState(customerProfile?.email || 'fatima.ahmed@example.com');
  const [shippingAddress, setShippingAddress] = useState(customerProfile?.address || 'Flat 402, Green Glen Layout, Bellandur');
  const [city, setCity] = useState(customerProfile?.city || 'Bangalore');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs = {};
    if (!customerName.trim()) errs.customerName = 'Please enter your full name.';
    if (!customerPhone.trim() || customerPhone.trim().length < 9) {
      errs.customerPhone = 'Valid contact phone number is required.';
    }
    if (!shippingAddress.trim()) errs.shippingAddress = 'Shipping delivery address is required.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (cart.length === 0) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const createdOrder = placeProductOrder({
        items: cart,
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress,
        city,
        paymentMethod,
        notes,
      });

      setIsSubmitting(false);

      if (createdOrder) {
        navigate('/customer/orders');
      }
    }, 400);
  };

  if (cart.length === 0 && !isCheckingOut) {
    return (
      <div className="space-y-8 pb-16">
        <PageHeader
          title="Shopping Cart"
          subtitle="Your selected handcrafted products from local micro-entrepreneurs."
          breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Cart' }]}
        />
        <div className="container-custom">
          <EmptyState
            icon="🛒"
            title="Your cart is currently empty"
            description="Discover unique creations by local potters, tailors, cobblers, and artisans."
            actionLabel="Explore Products"
            onAction={() => navigate('/products')}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      <PageHeader
        title={isCheckingOut ? 'Checkout & Place Order' : 'Shopping Cart'}
        subtitle={
          isCheckingOut
            ? 'Confirm delivery destination and choose simulated payment.'
            : `Review your ${cartCount} item(s) before proceeding to checkout.`
        }
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Products', to: '/products' },
          { label: isCheckingOut ? 'Checkout' : 'Cart' },
        ]}
      />

      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-6">
            {!isCheckingOut ? (
              // ── Cart Items View ──
              <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm p-6 space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                  <h2 className="text-lg font-heading font-bold text-neutral-900">
                    Cart Items ({cartCount})
                  </h2>
                  <button
                    onClick={clearCart}
                    className="text-xs text-red-500 hover:text-red-700 font-medium hover:underline"
                  >
                    Clear All
                  </button>
                </div>

                <div className="divide-y divide-neutral-100">
                  {cart.map((item) => (
                    <div key={item.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4 min-w-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-2xl object-cover flex-shrink-0 border border-neutral-200"
                        />
                        <div className="min-w-0">
                          <Link
                            to={`/products/${item.id}`}
                            className="font-heading font-semibold text-sm text-neutral-900 hover:text-primary-600 truncate block no-underline"
                          >
                            {item.name}
                          </Link>
                          <p className="text-xs text-neutral-500 mt-0.5">
                            By {item.businessName || 'Local Artisan'}
                          </p>
                          <p className="text-xs font-bold text-neutral-900 mt-1">
                            {formatCurrency(item.price)} each
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 pt-2 sm:pt-0">
                        {/* Quantity Counter */}
                        <div className="flex items-center border border-neutral-300 rounded-xl bg-neutral-50 px-2 py-1">
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 text-neutral-600 hover:text-neutral-900 font-bold flex items-center justify-center"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-neutral-900">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 text-neutral-600 hover:text-neutral-900 font-bold flex items-center justify-center"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        {/* Item Total */}
                        <div className="text-right min-w-[80px]">
                          <span className="text-sm font-heading font-bold text-neutral-900 block">
                            {formatCurrency(item.price * item.quantity)}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-[11px] text-neutral-400 hover:text-red-500 hover:underline mt-0.5"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
                  <Link
                    to="/products"
                    className="text-xs text-primary-600 font-semibold hover:underline no-underline"
                  >
                    ← Continue Shopping
                  </Link>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => setIsCheckingOut(true)}
                  >
                    Proceed to Checkout →
                  </Button>
                </div>
              </div>
            ) : (
              // ── Checkout Form View ──
              <form onSubmit={handlePlaceOrder} className="bg-white rounded-3xl border border-neutral-200 shadow-sm p-6 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                  <h2 className="text-lg font-heading font-bold text-neutral-900">
                    Delivery & Customer Information
                  </h2>
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="text-xs text-primary-600 hover:underline font-semibold"
                  >
                    ← Edit Cart
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Recipient name"
                    error={errors.customerName}
                    required
                  />
                  <Input
                    label="Phone Number"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    error={errors.customerPhone}
                    required
                  />
                </div>

                <Input
                  label="Email Address"
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <Input
                      label="Street Address / House #"
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      placeholder="Door / Flat #, Building, Street, Area"
                      error={errors.shippingAddress}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      City
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full py-2.5 px-3 bg-white border border-neutral-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary-200"
                    >
                      {CITIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Order / Delivery Notes <span className="text-neutral-400 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={2}
                    className="w-full p-2.5 bg-white border border-neutral-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary-200 resize-none"
                    placeholder="Gate instructions, gift packaging preference, or delivery timing..."
                  />
                </div>

                {/* Simulated Payment Methods */}
                <div className="space-y-3 pt-2 border-t border-neutral-200">
                  <h3 className="text-xs font-heading font-bold uppercase text-neutral-500 tracking-wider">
                    Payment Method (Prototype Simulation)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: 'Cash on Delivery', label: '💵 Cash on Delivery', desc: 'Pay cash when items arrive' },
                      { id: 'Demo Online Payment', label: '💳 Demo Online Payment', desc: 'Simulate instant UPI / Card success' },
                    ].map((method) => (
                      <label
                        key={method.id}
                        className={`flex flex-col p-3 rounded-2xl border cursor-pointer transition-all ${
                          paymentMethod === method.id
                            ? 'border-primary-500 bg-primary-50/50 ring-1 ring-primary-500'
                            : 'border-neutral-200 hover:border-neutral-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-neutral-900">{method.label}</span>
                          <input
                            type="radio"
                            name="cartPayment"
                            value={method.id}
                            checked={paymentMethod === method.id}
                            onChange={() => setPaymentMethod(method.id)}
                            className="accent-primary-600"
                          />
                        </div>
                        <span className="text-[11px] text-neutral-500 mt-1">{method.desc}</span>
                      </label>
                    ))}
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    * HunarHub uses simulated payments in this prototype. No real bank or card data is collected.
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-200 flex items-center justify-end gap-3">
                  <Button
                    variant="outline"
                    size="md"
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                  >
                    Back to Cart
                  </Button>
                  <Button
                    variant="primary"
                    size="md"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Placing Order...' : 'Place Order Now 🛍️'}
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-neutral-200 shadow-sm p-6 space-y-5 sticky top-24">
            <h3 className="font-heading font-bold text-base text-neutral-900 pb-3 border-b border-neutral-200">
              Order Summary
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>Items Subtotal ({cartCount})</span>
                <span className="font-semibold text-neutral-900">{formatCurrency(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Shipping / Delivery</span>
                <span className={cartDeliveryFee === 0 ? 'text-emerald-600 font-semibold' : 'text-neutral-900 font-semibold'}>
                  {cartDeliveryFee === 0 ? 'FREE (Orders ₹3,000+)' : formatCurrency(cartDeliveryFee)}
                </span>
              </div>
              <div className="flex justify-between text-base font-heading font-bold text-neutral-900 pt-3 border-t border-neutral-200">
                <span>Total Amount</span>
                <span className="text-primary-600">{formatCurrency(cartTotal)}</span>
              </div>
            </div>

            {/* Mini Items Checklist */}
            <div className="space-y-2 pt-2 border-t border-neutral-100 max-h-48 overflow-y-auto">
              <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">
                Cart Items
              </span>
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-xs py-1">
                  <span className="truncate max-w-[180px] text-neutral-700">
                    {item.name} <strong className="text-neutral-900">×{item.quantity}</strong>
                  </span>
                  <span className="font-semibold text-neutral-900">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {!isCheckingOut && (
              <Button
                variant="primary"
                size="lg"
                className="w-full text-sm font-bold shadow-md"
                onClick={() => setIsCheckingOut(true)}
              >
                Proceed to Checkout ({formatCurrency(cartTotal)})
              </Button>
            )}

            <div className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-1.5 text-[11px] text-neutral-500">
              <div className="flex items-center gap-2">
                <span>🛡️</span>
                <span>Direct artisan purchase guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📦</span>
                <span>Estimated dispatch: 2-3 business days</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🔄</span>
                <span>Easy exchange / direct artisan contact</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
