import React, { useState } from 'react';
import axios from 'axios';
import { Search, Package, MapPin, Clock } from 'lucide-react';

const TrackOrder = () => {
    const [orderId, setOrderId] = useState('');
    const [order, setOrder] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleTrack = async (e) => {
        e.preventDefault();
        if (!orderId) return;

        setLoading(true);
        setError('');
        setOrder(null);

        try {
            const res = await axios.get(`http://localhost:5000/api/orders/${orderId}`);
            setOrder(res.data);
        } catch (err) {
            setError('Order not found. Please check the ID.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem' }}>Track <span className="gradient-text">Your Order</span></h1>
                <p style={{ color: 'var(--text-muted)' }}>Enter your order ID to see the latest status</p>
            </header>

            <div className="glass-panel" style={{ marginBottom: '2rem' }}>
                <form onSubmit={handleTrack} style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ flex: 1 }}>
                        <input
                            type="text"
                            placeholder="Order ID (e.g. 1)"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-primary" disabled={loading}>
                        <Search size={20} /> {loading ? 'Checking...' : 'Track'}
                    </button>
                </form>
                {error && <p style={{ color: '#ef4444', marginTop: '1rem', fontSize: '0.9rem' }}>{error}</p>}
            </div>

            {order && (
                <div className="glass-panel animate-fade-in">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                        <div>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>ORDER ID</p>
                            <h3 style={{ margin: 0 }}>#{order.id}</h3>
                        </div>
                        <span className={`badge badge-${order.status.toLowerCase()}`}>
                            {order.status}
                        </span>
                    </div>

                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Package className="text-muted" size={20} color="var(--text-muted)" />
                            <div>
                                <p style={{ fontWeight: 600 }}>{order.product_name}</p>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Quantity: {order.quantity} units</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <MapPin className="text-muted" size={20} color="var(--text-muted)" />
                            <div>
                                <p style={{ fontWeight: 600 }}>Delivery Address</p>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{order.delivery_address}</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Clock className="text-muted" size={20} color="var(--text-muted)" />
                            <div>
                                <p style={{ fontWeight: 600 }}>Ordered On</p>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                    {new Date(order.created_at).toLocaleDateString()} at {new Date(order.created_at).toLocaleTimeString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TrackOrder;
