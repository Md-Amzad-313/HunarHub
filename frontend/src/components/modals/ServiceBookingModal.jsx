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

const TIME_SLOTS = [
  { id: 'morning', label: 'Morning', time: '09:00 AM – 12:00 PM' },
  { id: 'afternoon', label: 'Afternoon', time: '01:00 PM – 05:00 PM' },
  { id: 'evening', label: 'Evening', time: '05:00 PM – 08:00 PM' },
];

function ServiceBookingModal({ isOpen, onClose, service }) {
  const navigate = useNavigate();
  const { customerProfile, requestService, getEntrepreneurById } = useMarketplace();

  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const today = new Date().toISOString().split('T')[0];

  const [requestedDate, setRequestedDate] = useState(tomorrow);
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[0].time);
  const [locationType, setLocationType] = useState('Home Visit');
  const [customerName, setCustomerName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Bangalore');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});

  const [confirmedRequest, setConfirmedRequest] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setRequestedDate(tomorrow);
      setTimeSlot(TIME_SLOTS[0].time);
      setLocationType('Home Visit');
      setCustomerName(customerProfile?.name || 'Fatima Ahmed');
      setContactPhone(customerProfile?.phone || '+91 98765 43210');
      setAddress(customerProfile?.address || 'Flat 402, Green Glen Layout, Bellandur');
      setCity(customerProfile?.city || 'Bangalore');
      setNotes('');
      setErrors({});
      setConfirmedRequest(null);
    }
  }, [isOpen, customerProfile, tomorrow]);

  if (!service) return null;

  const ent = getEntrepreneurById(service.entrepreneurId);
  const displayBusinessName = ent?.businessName || service?.businessName || 'Service Provider';

  const validate = () => {
    const newErrors = {};
    if (!customerName.trim()) newErrors.customerName = 'Please enter your name.';
    if (!contactPhone.trim() || contactPhone.trim().length < 9) {
      newErrors.contactPhone = 'Please provide a valid contact number.';
    }
    if (locationType === 'Home Visit' && !address.trim()) {
      newErrors.address = 'Service location address is required for doorstep visits.';
    }
    if (!requestedDate) {
      newErrors.requestedDate = 'Please select a preferred date.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const created = requestService({
      serviceId: service.id,
      requestedDate,
      timeSlot,
      locationType,
      address,
      city,
      contactPhone,
      customerName,
      customerEmail: customerProfile?.email,
      notes,
    });

    setConfirmedRequest(created);
  };

  const handleGoToRequests = () => {
    onClose();
    navigate('/customer/requests');
  };

  // If request confirmed, show success screen
  if (confirmedRequest) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Appointment Requested! 🛠️">
        <div className="text-center py-4 space-y-5">
          <div className="w-16 h-16 bg-purple-100 text-purple-700 rounded-full mx-auto flex items-center justify-center text-3xl shadow-sm animate-bounce">
            🗓️
          </div>

          <div>
            <span className="text-xs uppercase font-bold tracking-wider px-3 py-1 bg-purple-50 text-purple-800 rounded-full border border-purple-200">
              Request ID: {confirmedRequest.id}
            </span>
            <h2 className="text-xl font-heading font-bold text-neutral-900 mt-2">
              Appointment Sent to {confirmedRequest.businessName}
            </h2>
            <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
              The service provider will review your schedule and confirm your appointment shortly.
            </p>
          </div>

          {/* Details Card */}
          <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200 text-left text-xs space-y-2">
            <div className="flex justify-between items-center pb-2 border-b border-neutral-200 font-semibold text-neutral-800">
              <span>Service</span>
              <span>{confirmedRequest.serviceName}</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Preferred Date & Time</span>
              <span className="font-semibold text-neutral-900">
                {confirmedRequest.requestedDate} ({confirmedRequest.timeSlot})
              </span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Estimated Rate</span>
              <span className="font-bold text-neutral-900">{confirmedRequest.estimatedCost}</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Location Mode</span>
              <span className="font-medium text-neutral-800">{confirmedRequest.locationType}</span>
            </div>
            {confirmedRequest.locationType === 'Home Visit' && (
              <div className="flex justify-between text-neutral-600">
                <span>Address</span>
                <span className="font-medium text-neutral-800 text-right truncate max-w-[200px]">
                  {confirmedRequest.address}, {confirmedRequest.city}
                </span>
              </div>
            )}
            <div className="flex justify-between text-neutral-600 pt-1">
              <span>Initial Status</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-yellow-100 text-yellow-800">
                Pending
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button variant="outline" size="md" className="w-full" onClick={onClose}>
              Explore More Services
            </Button>
            <Button variant="secondary" size="md" className="w-full" onClick={handleGoToRequests}>
              View My Requests →
            </Button>
          </div>
        </div>
      </Modal>
    );
  }

  // Booking Form
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Request Service Appointment"
      footer={
        <div className="w-full flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-bold text-neutral-400 block">Estimated Fee</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-heading font-bold text-neutral-900">
                {formatCurrency(service.price)}
              </span>
              <span className="text-[11px] text-neutral-500">({service.pricingType || service.priceUnit || 'standard'})</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button variant="secondary" size="sm" onClick={handleSubmit} type="button">
              Submit Request
            </Button>
          </div>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Service Mini-preview */}
        <div className="flex items-center gap-3 p-3 bg-secondary-50/50 rounded-2xl border border-secondary-200">
          <img
            src={service.image}
            alt={service.name}
            className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
          />
          <div className="flex-grow min-w-0">
            <h4 className="font-heading font-semibold text-xs text-neutral-900 truncate">{service.name}</h4>
            <p className="text-[11px] text-neutral-500">Provider: {displayBusinessName}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs font-bold text-neutral-900">{formatCurrency(service.price)}</span>
              <span className="text-[10px] bg-secondary-100 text-secondary-800 font-semibold px-2 py-0.5 rounded-full">
                ⚡ {service.availability || 'Available'}
              </span>
            </div>
          </div>
        </div>

        {/* Date and Time Selection */}
        <div className="space-y-3">
          <h4 className="text-xs font-heading font-bold uppercase text-neutral-500 tracking-wider">
            Schedule Your Appointment
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                Preferred Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                min={today}
                value={requestedDate}
                onChange={(e) => setRequestedDate(e.target.value)}
                className={`w-full py-2.5 px-3 bg-white border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-secondary-300 ${
                  errors.requestedDate ? 'border-red-400' : 'border-neutral-300'
                }`}
                required
              />
              {errors.requestedDate && <p className="text-[11px] text-red-500 mt-1">{errors.requestedDate}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">Time Slot Preference</label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full py-2.5 px-3 bg-white border border-neutral-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-secondary-300"
              >
                {TIME_SLOTS.map((slot) => (
                  <option key={slot.id} value={slot.time}>
                    {slot.label} ({slot.time})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Location Mode */}
          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1">Service Location Mode</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'Home Visit', label: '🏠 Doorstep / Home Visit', desc: 'Provider visits your address' },
                { id: 'Provider Workshop', label: '🏬 Provider Workshop', desc: 'You visit provider studio' },
              ].map((loc) => (
                <label
                  key={loc.id}
                  className={`flex flex-col p-2.5 rounded-xl border cursor-pointer transition-all ${
                    locationType === loc.id
                      ? 'border-secondary-500 bg-secondary-50/50 ring-1 ring-secondary-500'
                      : 'border-neutral-200 hover:border-neutral-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-900">{loc.label}</span>
                    <input
                      type="radio"
                      name="locationType"
                      value={loc.id}
                      checked={locationType === loc.id}
                      onChange={() => setLocationType(loc.id)}
                      className="accent-secondary-600 text-xs"
                    />
                  </div>
                  <span className="text-[10px] text-neutral-500 mt-0.5">{loc.desc}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Customer & Address Details */}
        <div className="space-y-3">
          <h4 className="text-xs font-heading font-bold uppercase text-neutral-500 tracking-wider">
            Your Information
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Contact Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="e.g. Fatima Ahmed"
              error={errors.customerName}
              required
            />
            <Input
              label="Contact Phone"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              placeholder="+91 98765 43210"
              error={errors.contactPhone}
              required
            />
          </div>

          {locationType === 'Home Visit' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <Input
                  label="Service Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street / House #, Sector / Area"
                  error={errors.address}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">City</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full py-2.5 px-3 bg-white border border-neutral-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-secondary-300"
                >
                  {CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1">
              Job Requirements & Details <span className="text-neutral-400 font-normal">(Optional)</span>
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="Describe your requirement, issue symptoms, or specific measurements..."
              className="w-full p-2.5 bg-white border border-neutral-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-secondary-300 resize-none"
            />
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default ServiceBookingModal;
