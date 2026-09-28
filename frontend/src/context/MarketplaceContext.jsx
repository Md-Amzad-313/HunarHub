import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { PRODUCTS } from '../data/products';
import { SERVICES } from '../data/services';
import { ENTREPRENEURS } from '../data/entrepreneurs';
import { MOCK_ORDERS } from '../data/orders';
import { MOCK_SERVICE_REQUESTS } from '../data/requests';
import { MOCK_REVIEWS } from '../data/reviews';
import { getStorageItem, setStorageItem, removeStorageItem, STORAGE_KEYS } from '../services/storageService';

const MarketplaceContext = createContext(null);

const DEFAULT_CUSTOMER_PROFILE = {
  name: 'Fatima Ahmed',
  email: 'fatima.ahmed@example.com',
  phone: '+91 98765 43210',
  city: 'Bangalore',
  address: 'Flat 402, Green Glen Layout, Bellandur',
};

export function MarketplaceProvider({ children }) {
  // ── 1. Core State loaded from localStorage or seeded defaults ─────────────
  const [products, setProducts] = useState(() => {
    return getStorageItem(STORAGE_KEYS.PRODUCTS, PRODUCTS);
  });

  const [services, setServices] = useState(() => {
    return getStorageItem(STORAGE_KEYS.SERVICES, SERVICES);
  });

  const [entrepreneurs, setEntrepreneurs] = useState(() => {
    return getStorageItem(STORAGE_KEYS.ENTREPRENEURS, ENTREPRENEURS);
  });

  const [orders, setOrders] = useState(() => {
    return getStorageItem(STORAGE_KEYS.ORDERS, MOCK_ORDERS);
  });

  const [requests, setRequests] = useState(() => {
    return getStorageItem(STORAGE_KEYS.SERVICE_REQUESTS, MOCK_SERVICE_REQUESTS);
  });

  const [reviews, setReviews] = useState(() => {
    return getStorageItem(STORAGE_KEYS.REVIEWS, MOCK_REVIEWS);
  });

  const [cart, setCart] = useState(() => {
    return getStorageItem(STORAGE_KEYS.CART, []);
  });

  const [customerProfile, setCustomerProfile] = useState(() => {
    return getStorageItem(STORAGE_KEYS.CUSTOMER_PROFILE, DEFAULT_CUSTOMER_PROFILE);
  });

  // Current active entrepreneur for demo portal views
  const [currentEntrepreneurId, setCurrentEntrepreneurId] = useState('ent-6'); // Default Bhawani Blue Pottery

  const [toasts, setToasts] = useState([]);

  // ── 2. Sync to localStorage on updates ────────────────────────────────────
  useEffect(() => {
    setStorageItem(STORAGE_KEYS.PRODUCTS, products);
  }, [products]);

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.SERVICES, services);
  }, [services]);

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.ENTREPRENEURS, entrepreneurs);
  }, [entrepreneurs]);

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.ORDERS, orders);
  }, [orders]);

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.SERVICE_REQUESTS, requests);
  }, [requests]);

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.REVIEWS, reviews);
  }, [reviews]);

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.CART, cart);
  }, [cart]);

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.CUSTOMER_PROFILE, customerProfile);
  }, [customerProfile]);

  // ── 3. Toast Notifications ───────────────────────────────────────────────
  const addToast = useCallback(({ type = 'success', title, message, duration = 4000 }) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newToast = { id, type, title, message };
    setToasts((prev) => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // ── 4. Entity Lookup Helpers ──────────────────────────────────────────────
  const getEntrepreneurById = useCallback(
    (id) => {
      return entrepreneurs.find((e) => e.id === id) || null;
    },
    [entrepreneurs]
  );

  const getProductById = useCallback(
    (id) => {
      const prod = products.find((p) => p.id === id);
      if (!prod) return null;
      const ent = getEntrepreneurById(prod.entrepreneurId);
      return {
        ...prod,
        entrepreneur: ent,
        entrepreneurName: ent?.name || 'Local Artisan',
        businessName: ent?.businessName || 'Local Studio',
      };
    },
    [products, getEntrepreneurById]
  );

  const getServiceById = useCallback(
    (id) => {
      const serv = services.find((s) => s.id === id);
      if (!serv) return null;
      const ent = getEntrepreneurById(serv.entrepreneurId);
      return {
        ...serv,
        entrepreneur: ent,
        entrepreneurName: ent?.name || 'Service Provider',
        businessName: ent?.businessName || 'Local Workshop',
      };
    },
    [services, getEntrepreneurById]
  );

  // ── 5. Cart Management ────────────────────────────────────────────────────
  const addToCart = useCallback(
    (product, quantity = 1) => {
      const targetQuantity = Number(quantity) || 1;
      const availableStock = product.stock !== undefined ? product.stock : 99;

      if (availableStock <= 0) {
        addToast({
          type: 'warning',
          title: 'Out of Stock',
          message: `"${product.name}" is currently unavailable.`,
        });
        return false;
      }

      setCart((prev) => {
        const existingIndex = prev.findIndex((item) => item.id === product.id);
        if (existingIndex > -1) {
          const currentQty = prev[existingIndex].quantity;
          const newQty = Math.min(availableStock, currentQty + targetQuantity);
          const updated = [...prev];
          updated[existingIndex] = { ...updated[existingIndex], quantity: newQty };
          return updated;
        } else {
          const ent = getEntrepreneurById(product.entrepreneurId);
          const newItem = {
            id: product.id,
            name: product.name,
            price: Number(product.price) || 0,
            image: product.image,
            category: product.category,
            entrepreneurId: product.entrepreneurId,
            businessName: ent?.businessName || product.businessName || 'Local Artisan',
            stock: availableStock,
            quantity: Math.min(availableStock, targetQuantity),
          };
          return [...prev, newItem];
        }
      });

      addToast({
        type: 'success',
        title: 'Added to Cart! 🛒',
        message: `"${product.name}" added to your shopping cart.`,
      });
      return true;
    },
    [getEntrepreneurById, addToast]
  );

  const updateCartQuantity = useCallback((productId, quantity) => {
    const q = Number(quantity);
    if (q <= 0) {
      setCart((prev) => prev.filter((item) => item.id !== productId));
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === productId) {
          const maxStock = item.stock !== undefined ? item.stock : 99;
          return { ...item, quantity: Math.min(maxStock, q) };
        }
        return item;
      })
    );
  }, []);

  const removeFromCart = useCallback(
    (productId) => {
      setCart((prev) => prev.filter((item) => item.id !== productId));
      addToast({
        type: 'info',
        title: 'Item Removed',
        message: 'Product removed from your cart.',
      });
    },
    [addToast]
  );

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);
  const cartSubtotal = cart.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0);
  const cartDeliveryFee = cartSubtotal >= 3000 || cartSubtotal === 0 ? 0 : 150;
  const cartTotal = cartSubtotal + cartDeliveryFee;

  // ── 6. Order Placement & Status Lifecycle ─────────────────────────────────
  // Statuses: Pending -> Accepted -> In Progress -> Completed (or Cancelled)
  const placeProductOrder = useCallback(
    ({
      items,
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      city,
      paymentMethod = 'Cash on Delivery',
      notes = '',
    }) => {
      const orderItems = items && items.length > 0 ? items : cart;
      if (!orderItems || orderItems.length === 0) {
        addToast({
          type: 'error',
          title: 'Order Failed',
          message: 'Your cart is empty. Please add products before placing an order.',
        });
        return null;
      }

      const subtotal = orderItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
      const deliveryFee = subtotal >= 3000 ? 0 : 150;
      const totalAmount = subtotal + deliveryFee;

      const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
      const today = new Date().toISOString().split('T')[0];

      // Primary entrepreneur info for primary display
      const firstItem = orderItems[0];
      const ent = getEntrepreneurById(firstItem.entrepreneurId);

      const newOrder = {
        id: orderId,
        items: orderItems.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity || 1,
          image: item.image,
          entrepreneurId: item.entrepreneurId,
          businessName: item.businessName || ent?.businessName || 'Local Artisan',
        })),
        productId: firstItem.id,
        productName:
          orderItems.length === 1
            ? firstItem.name
            : `${firstItem.name} + ${orderItems.length - 1} other item(s)`,
        productImage: firstItem.image,
        category: firstItem.category,
        entrepreneurId: firstItem.entrepreneurId,
        entrepreneurName: ent?.name || 'Local Artisan',
        businessName: ent?.businessName || 'Local Artisan',
        customerName: customerName || customerProfile.name,
        customerEmail: customerEmail || customerProfile.email,
        customerPhone: customerPhone || customerProfile.phone,
        shippingAddress: shippingAddress || customerProfile.address,
        city: city || customerProfile.city,
        quantity: orderItems.reduce((acc, it) => acc + (it.quantity || 1), 0),
        unitPrice: firstItem.price,
        subtotal,
        deliveryFee,
        amount: totalAmount,
        date: today,
        createdAt: new Date().toISOString(),
        paymentMethod,
        notes,
        status: 'Pending',
        statusColor: 'bg-yellow-100 text-yellow-800',
        type: 'Product',
      };

      setOrders((prev) => [newOrder, ...prev]);

      // Deduct stock in products state
      setProducts((prev) =>
        prev.map((prod) => {
          const ordered = orderItems.find((it) => it.id === prod.id);
          if (ordered) {
            const currentStock = prod.stock !== undefined ? prod.stock : 10;
            const updatedStock = Math.max(0, currentStock - ordered.quantity);
            return {
              ...prod,
              stock: updatedStock,
              availability: updatedStock > 0 ? `In Stock (${updatedStock} left)` : 'Out of Stock',
            };
          }
          return prod;
        })
      );

      // Clear purchased items from cart if cart was used
      if (!items || items === cart) {
        setCart([]);
      } else {
        const itemIds = new Set(orderItems.map((i) => i.id));
        setCart((prev) => prev.filter((i) => !itemIds.has(i.id)));
      }

      addToast({
        type: 'success',
        title: 'Order Placed! 🎉',
        message: `Order #${orderId} created successfully. You can track fulfillment status anytime.`,
      });

      return newOrder;
    },
    [cart, customerProfile, getEntrepreneurById, addToast]
  );

  const updateOrderStatus = useCallback(
    (orderId, newStatus) => {
      let statusColor = 'bg-yellow-100 text-yellow-800';
      if (newStatus === 'Accepted') statusColor = 'bg-indigo-100 text-indigo-800';
      if (newStatus === 'In Progress') statusColor = 'bg-blue-100 text-blue-800';
      if (newStatus === 'Completed') statusColor = 'bg-emerald-100 text-emerald-800';
      if (newStatus === 'Cancelled' || newStatus === 'Rejected') statusColor = 'bg-red-100 text-red-800';

      setOrders((prev) =>
        prev.map((order) => {
          if (order.id === orderId) {
            return { ...order, status: newStatus, statusColor };
          }
          return order;
        })
      );

      addToast({
        type: 'info',
        title: 'Order Status Updated',
        message: `Order #${orderId} status updated to "${newStatus}".`,
      });
    },
    [addToast]
  );

  const cancelOrder = useCallback(
    (orderId, reason = 'Cancelled by customer') => {
      setOrders((prev) =>
        prev.map((order) => {
          if (order.id === orderId) {
            return {
              ...order,
              status: 'Cancelled',
              statusColor: 'bg-red-100 text-red-800',
              cancellationReason: reason,
            };
          }
          return order;
        })
      );

      addToast({
        type: 'warning',
        title: 'Order Cancelled',
        message: `Order #${orderId} has been cancelled.`,
      });
    },
    [addToast]
  );

  // ── 7. Service Booking & Request Lifecycle ────────────────────────────────
  // Statuses: Pending -> Accepted -> In Progress -> Completed (or Declined)
  const requestService = useCallback(
    ({
      serviceId,
      requestedDate,
      timeSlot = 'Morning (09:00 AM - 12:00 PM)',
      locationType = 'Home Visit',
      address,
      city,
      contactPhone,
      customerName,
      customerEmail,
      notes = '',
    }) => {
      const service = services.find((s) => s.id === serviceId) || services[0];
      const ent = getEntrepreneurById(service?.entrepreneurId);

      const requestId = `REQ-${Math.floor(1000 + Math.random() * 9000)}`;

      const newRequest = {
        id: requestId,
        serviceId: service?.id,
        serviceName: service?.name || 'Local Skill Service',
        serviceImage: service?.image,
        category: service?.category,
        entrepreneurId: service?.entrepreneurId || ent?.id || 'ent-1',
        entrepreneurName: ent?.name || 'Service Provider',
        businessName: ent?.businessName || 'Local Service Provider',
        customerName: customerName || customerProfile.name,
        customerEmail: customerEmail || customerProfile.email,
        customerPhone: contactPhone || customerProfile.phone,
        requestedDate: requestedDate || new Date(Date.now() + 86400000).toISOString().split('T')[0],
        timeSlot,
        locationType,
        address: address || customerProfile.address,
        city: city || customerProfile.city,
        estimatedCost: `₹${(service?.price || 1500).toLocaleString()}`,
        amount: Number(service?.price) || 1500,
        priceUnit: service?.pricingType || service?.priceUnit || 'standard service fee',
        notes,
        createdAt: new Date().toISOString(),
        status: 'Pending',
        statusColor: 'bg-yellow-100 text-yellow-800',
      };

      setRequests((prev) => [newRequest, ...prev]);

      addToast({
        type: 'success',
        title: 'Service Requested! 🛠️',
        message: `Appointment #${requestId} submitted to ${newRequest.businessName}.`,
      });

      return newRequest;
    },
    [services, getEntrepreneurById, customerProfile, addToast]
  );

  const updateRequestStatus = useCallback(
    (requestId, newStatus) => {
      let statusColor = 'bg-yellow-100 text-yellow-800';
      if (newStatus === 'Accepted') statusColor = 'bg-indigo-100 text-indigo-800';
      if (newStatus === 'In Progress') statusColor = 'bg-blue-100 text-blue-800';
      if (newStatus === 'Completed') statusColor = 'bg-emerald-100 text-emerald-800';
      if (newStatus === 'Declined' || newStatus === 'Rejected' || newStatus === 'Cancelled') {
        statusColor = 'bg-red-100 text-red-800';
      }

      setRequests((prev) =>
        prev.map((req) => {
          if (req.id === requestId) {
            return { ...req, status: newStatus, statusColor };
          }
          return req;
        })
      );

      addToast({
        type: 'info',
        title: 'Service Request Updated',
        message: `Request #${requestId} status set to "${newStatus}".`,
      });
    },
    [addToast]
  );

  const cancelRequest = useCallback(
    (requestId, reason = 'Cancelled by client') => {
      setRequests((prev) =>
        prev.map((req) => {
          if (req.id === requestId) {
            return {
              ...req,
              status: 'Declined',
              statusColor: 'bg-red-100 text-red-800',
              cancellationReason: reason,
            };
          }
          return req;
        })
      );

      addToast({
        type: 'warning',
        title: 'Service Request Cancelled',
        message: `Request #${requestId} has been cancelled.`,
      });
    },
    [addToast]
  );

  // ── 8. Rating & Review Flow (Completed Transactions Only) ─────────────────
  const addReview = useCallback(
    ({ targetId, targetType = 'entrepreneur', rating, comment, author, orderId, requestId }) => {
      const numRating = Number(rating) || 5;

      // Check if already reviewed for this transaction
      const alreadyReviewed = reviews.some(
        (r) => (orderId && r.orderId === orderId) || (requestId && r.requestId === requestId)
      );

      if (alreadyReviewed) {
        addToast({
          type: 'warning',
          title: 'Review Already Submitted',
          message: 'You have already submitted feedback for this completed transaction.',
        });
        return false;
      }

      const newReview = {
        id: `rev-${Date.now()}`,
        author: author || customerProfile.name,
        rating: numRating,
        date: 'Just now',
        comment,
        targetId,
        targetType,
        orderId: orderId || null,
        requestId: requestId || null,
        createdAt: new Date().toISOString(),
      };

      setReviews((prev) => [newReview, ...prev]);

      // Dynamically recalculate average rating for the target entity
      if (targetType === 'entrepreneur') {
        setEntrepreneurs((prev) =>
          prev.map((ent) => {
            if (ent.id === targetId) {
              const currentCount = ent.reviewCount || 0;
              const currentRating = ent.rating || 5;
              const newCount = currentCount + 1;
              const updatedRating = Number(
                ((currentRating * currentCount + numRating) / newCount).toFixed(1)
              );
              return { ...ent, reviewCount: newCount, rating: updatedRating };
            }
            return ent;
          })
        );
      } else if (targetType === 'product') {
        setProducts((prev) =>
          prev.map((p) => {
            if (p.id === targetId) {
              const currentCount = p.reviewCount || 0;
              const currentRating = p.rating || 5;
              const newCount = currentCount + 1;
              const updatedRating = Number(
                ((currentRating * currentCount + numRating) / newCount).toFixed(1)
              );
              return { ...p, reviewCount: newCount, rating: updatedRating };
            }
            return p;
          })
        );
      } else if (targetType === 'service') {
        setServices((prev) =>
          prev.map((s) => {
            if (s.id === targetId) {
              const currentCount = s.reviewCount || 0;
              const currentRating = s.rating || 5;
              const newCount = currentCount + 1;
              const updatedRating = Number(
                ((currentRating * currentCount + numRating) / newCount).toFixed(1)
              );
              return { ...s, reviewCount: newCount, rating: updatedRating };
            }
            return s;
          })
        );
      }

      addToast({
        type: 'success',
        title: 'Review Published! ⭐',
        message: 'Thank you for supporting our local micro-entrepreneurs with your feedback.',
      });

      return true;
    },
    [reviews, customerProfile, addToast]
  );

  // ── 9. Entrepreneur Dashboard Listings CRUD ───────────────────────────────
  const addProduct = useCallback(
    (productData) => {
      const ent = getEntrepreneurById(productData.entrepreneurId || currentEntrepreneurId);
      const newProduct = {
        id: `prod-${Date.now()}`,
        rating: 5.0,
        reviewCount: 0,
        stock: 10,
        availability: 'In Stock (10 left)',
        location: ent?.location || 'Jaipur',
        businessName: ent?.businessName || 'Local Craft Studio',
        entrepreneurId: ent?.id || currentEntrepreneurId,
        image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=600&q=80',
        tags: ['handcrafted', 'local'],
        ...productData,
      };

      setProducts((prev) => [newProduct, ...prev]);

      addToast({
        type: 'success',
        title: 'Product Published! 🛍️',
        message: `"${newProduct.name}" is now live in the marketplace.`,
      });

      return newProduct;
    },
    [getEntrepreneurById, currentEntrepreneurId, addToast]
  );

  const deleteProduct = useCallback(
    (productId) => {
      setProducts((prev) => prev.filter((p) => p.id !== productId));
      addToast({
        type: 'info',
        title: 'Product Removed',
        message: 'Product removed from your catalog.',
      });
    },
    [addToast]
  );

  const addService = useCallback(
    (serviceData) => {
      const ent = getEntrepreneurById(serviceData.entrepreneurId || currentEntrepreneurId);
      const newService = {
        id: `serv-${Date.now()}`,
        rating: 5.0,
        reviewCount: 0,
        availability: 'Available Today',
        location: ent?.location || 'Jaipur',
        businessName: ent?.businessName || 'Local Service Studio',
        entrepreneurId: ent?.id || currentEntrepreneurId,
        pricingType: 'per service',
        duration: '1 - 2 days',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
        skills: ['Doorstep Service', 'Custom Work'],
        tags: ['local', 'skill'],
        ...serviceData,
      };

      setServices((prev) => [newService, ...prev]);

      addToast({
        type: 'success',
        title: 'Service Listed! 🔧',
        message: `"${newService.name}" is now bookable by customers.`,
      });

      return newService;
    },
    [getEntrepreneurById, currentEntrepreneurId, addToast]
  );

  const deleteService = useCallback(
    (serviceId) => {
      setServices((prev) => prev.filter((s) => s.id !== serviceId));
      addToast({
        type: 'info',
        title: 'Service Removed',
        message: 'Service removed from your offerings.',
      });
    },
    [addToast]
  );

  // ── 10. Customer Profile & Demo Reset ─────────────────────────────────────
  const updateCustomerProfile = useCallback(
    (newProfileData) => {
      setCustomerProfile((prev) => ({ ...prev, ...newProfileData }));
      addToast({
        type: 'success',
        title: 'Profile Updated',
        message: 'Your personal details and delivery address were updated.',
      });
    },
    [addToast]
  );

  const resetDemoData = useCallback(() => {
    setProducts(PRODUCTS);
    setServices(SERVICES);
    setEntrepreneurs(ENTREPRENEURS);
    setOrders(MOCK_ORDERS);
    setRequests(MOCK_SERVICE_REQUESTS);
    setReviews(MOCK_REVIEWS);
    setCart([]);
    setCustomerProfile(DEFAULT_CUSTOMER_PROFILE);

    Object.values(STORAGE_KEYS).forEach((k) => removeStorageItem(k));

    addToast({
      type: 'info',
      title: 'Demo Data Reset',
      message: 'All marketplace data has been restored to default seeds.',
    });
  }, [addToast]);

  const value = {
    // Entities
    products,
    services,
    entrepreneurs,
    orders,
    requests,
    reviews,
    cart,
    customerProfile,
    currentEntrepreneurId,
    setCurrentEntrepreneurId,

    // Lookups
    getEntrepreneurById,
    getProductById,
    getServiceById,

    // Cart
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartCount,
    cartSubtotal,
    cartDeliveryFee,
    cartTotal,

    // Orders & Requests
    placeOrder: placeProductOrder,
    placeProductOrder,
    updateOrderStatus,
    cancelOrder,
    requestService,
    updateRequestStatus,
    cancelRequest,

    // Reviews
    addReview,

    // Listings CRUD
    addProduct,
    deleteProduct,
    addService,
    deleteService,

    // Profile & Utils
    updateCustomerProfile,
    resetDemoData,
    toasts,
    addToast,
    removeToast,
  };

  return <MarketplaceContext.Provider value={value}>{children}</MarketplaceContext.Provider>;
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
}

export default MarketplaceContext;
