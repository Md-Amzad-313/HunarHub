import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Input from '../common/Input';
import { useMarketplace } from '../../context/MarketplaceContext';
import { formatCurrency } from '../../utils/helpers';

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

function ProductOrderModal({ isOpen, onClose, product }) {
  const navigate = useNavigate();
  const { customerProfile, placeProductOrder, getEntrepreneurById } = useMarketplace();

  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [city, setCity] = useState('Bangalore');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});

  // Order success state
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setCustomerName(customerProfile?.name || 'Fatima Ahmed');
      setContactPhone(customerProfile?.phone || '+91 98765 43210');
      setDeliveryAddress(customerProfile?.address || 'Flat 402, Green Glen Layout, Bellandur');
      setCity(customerProfile?.city || 'Bangalore');
      setPaymentMethod('Cash on Delivery');
      setNotes('');
      setErrors({});
      setConfirmedOrder(null);
    }
  }, [isOpen, customerProfile]);

  if (!product) return null;

  const ent = getEntrepreneurById(product.entrepreneurId);
  const displayBusinessName = ent?.businessName || product?.businessName || 'Local Artisan';

  const unitPrice = Number(product.price) || 0;
  const subtotal = unitPrice * quantity;
  const deliveryFee = subtotal >= 3000 ? 0 : 150;
  const totalAmount = subtotal + deliveryFee;

  const validate = () => {
    const newErrors = {};
    if (!customerName.trim()) newErrors.customerName = 'Please enter your full name.';
    if (!contactPhone.trim() || contactPhone.trim().length < 9) {
      newErrors.contactPhone = 'Please provide a valid phone number.';
    }
    if (!deliveryAddress.trim()) newErrors.deliveryAddress = 'Delivery address is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const created = placeProductOrder({
      items: [
        {
          id: product.id,
          name: product.name,
          price: unitPrice,
          quantity,
          image: product.image,
          entrepreneurId: product.entrepreneurId,
          businessName: displayBusinessName,
        },
      ],
      customerName,
      customerEmail: customerProfile?.email,
      customerPhone: contactPhone,
      shippingAddress: deliveryAddress,
      city,
      paymentMethod,
      notes,
    });

    setConfirmedOrder(created);
  };

  const handleGoToOrders = () => {
    onClose();
    navigate('/customer/orders');
  };

  // If order placed, show Confirmation Screen
  if (confirmedOrder) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Order Confirmed! 🎉">
        <div className="text-center py-4 space-y-5">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full mx-auto flex items-center justify-center text-3xl shadow-sm animate-bounce">
            ✓
          </div>

          <div>
            <span className="text-xs uppercase font-bold tracking-wider px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200">
              Order ID: {confirmedOrder.id}
            </span>
            <h2 className="text-xl font-heading font-bold text-neutral-900 mt-2">
              Thank You for Supporting Local Talent!
            </h2>
            <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
              Your order for <strong className="text-neutral-800">{confirmedOrder.productName}</strong> has been
              forwarded to <span className="font-semibold text-primary-700">{confirmedOrder.businessName}</span>.
            </p>
          </div>

          {/* Order Snapshot Card */}
          <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200 text-left text-xs space-y-2">
            <div className="flex justify-between items-center pb-2 border-b border-neutral-200 font-semibold text-neutral-800">
              <span>Item & Qty</span>
              <span>
                {confirmedOrder.productName} (x{confirmedOrder.quantity})
              </span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Total Payable</span>
              <span className="font-bold text-neutral-900">{formatCurrency(confirmedOrder.amount)}</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Payment Method</span>
              <span className="font-medium text-neutral-800">{confirmedOrder.paymentMethod}</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Initial Status</span>
              <span className="font-semibold text-yellow-800 bg-yellow-100 px-2 py-0.5 rounded-full">
                Pending
              </span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Delivery Destination</span>
              <span className="font-medium text-neutral-800 text-right truncate max-w-[200px]">
                {confirmedOrder.shippingAddress}, {confirmedOrder.city}
              </span>
            </div>
            <div className="flex justify-between text-neutral-600 pt-1">
              <span>Estimated Delivery</span>
              <span className="text-emerald-700 font-semibold">3 – 5 Business Days</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button variant="outline" size="md" className="w-full" onClick={onClose}>
              Continue Browsing
            </Button>
            <Button variant="primary" size="md" className="w-full" onClick={handleGoToOrders}>
              Track in My Orders →
            </Button>
          </div>
        </div>
      </Modal>
    );
  }

  // Order Placement Form
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Complete Your Purchase"
      footer={
        <div className="w-full flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-bold text-neutral-400 block">Total Due</span>
            <span className="text-lg font-heading font-bold text-neutral-900">{formatCurrency(totalAmount)}</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleSubmit} type="button">
              Confirm & Place Order
            </Button>
          </div>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Product mini-preview */}
        <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-2xl border border-neutral-200">
          <img
            src={product.image}
            alt={product.name}
            className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
          />
          <div className="flex-grow min-w-0">
            <h4 className="font-heading font-semibold text-xs text-neutral-900 truncate">{product.name}</h4>
            <p className="text-[11px] text-neutral-500">By {displayBusinessName}</p>
            <p className="text-xs font-bold text-neutral-900 mt-0.5">{formatCurrency(unitPrice)} each</p>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-2 border border-neutral-300 rounded-xl px-2 py-1 bg-white flex-shrink-0">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="text-neutral-500 hover:text-neutral-900 text-sm font-bold w-5 h-5 flex items-center justify-center rounded"
            >
              −
            </button>
            <span className="font-bold text-xs w-4 text-center">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(product.stock || 20, q + 1))}
              className="text-neutral-500 hover:text-neutral-900 text-sm font-bold w-5 h-5 flex items-center justify-center rounded"
            >
              +
            </button>
          </div>
        </div>

        {/* Pricing Breakdown Summary */}
        <div className="bg-neutral-50 rounded-2xl p-3 border border-neutral-100 text-xs space-y-1.5">
          <div className="flex justify-between text-neutral-600">
            <span>Item Subtotal ({quantity} {quantity > 1 ? 'items' : 'item'})</span>
            <span className="font-semibold text-neutral-800">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between text-neutral-600">
            <span>Shipping / Delivery</span>
            <span className={deliveryFee === 0 ? 'text-emerald-600 font-semibold' : 'text-neutral-800 font-semibold'}>
              {deliveryFee === 0 ? 'FREE (Orders ₹3,000+)' : formatCurrency(deliveryFee)}
            </span>
          </div>
          <div className="flex justify-between text-neutral-900 font-bold border-t border-neutral-200 pt-1.5 text-sm">
            <span>Grand Total</span>
            <span className="text-primary-700">{formatCurrency(totalAmount)}</span>
          </div>
        </div>

        {/* Customer & Shipping Details */}
        <div className="space-y-3">
          <h4 className="text-xs font-heading font-bold uppercase text-neutral-500 tracking-wider">
            Delivery & Contact Details
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Recipient Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="e.g. Fatima Ahmed"
              error={errors.customerName}
              required
            />
            <Input
              label="Phone Number"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              placeholder="+91 98765 43210"
              error={errors.contactPhone}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <Input
                label="Street Address / Area"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="House #, Street name, Sector"
                error={errors.deliveryAddress}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">City</label>
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
            <label className="block text-xs font-medium text-neutral-700 mb-1">
              Delivery Notes / Instructions <span className="text-neutral-400 font-normal">(Optional)</span>
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="Any specific requests, gift packaging, or gate instructions..."
              className="w-full p-2.5 bg-white border border-neutral-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary-200 resize-none"
            />
          </div>
        </div>

        {/* Payment Method Selector */}
        <div className="space-y-2">
          <h4 className="text-xs font-heading font-bold uppercase text-neutral-500 tracking-wider">
            Payment Method
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'Cash on Delivery', label: '💵 Cash on Delivery', desc: 'Pay at your door' },
              { id: 'Demo Online Payment', label: '📱 Demo UPI / Card', desc: 'Simulated payment' },
            ].map((method) => (
              <label
                key={method.id}
                className={`flex flex-col p-2.5 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === method.id
                    ? 'border-primary-500 bg-primary-50/50 ring-1 ring-primary-500'
                    : 'border-neutral-200 hover:border-neutral-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-900">{method.label}</span>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    checked={paymentMethod === method.id}
                    onChange={() => setPaymentMethod(method.id)}
                    className="accent-primary-600 text-xs"
                  />
                </div>
                <span className="text-[10px] text-neutral-500 mt-0.5">{method.desc}</span>
              </label>
            ))}
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default ProductOrderModal;
