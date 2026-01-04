import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Truck, CheckCircle, ArrowLeft } from 'lucide-react';

const PlaceOrder = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const selectedProduct = location.state?.product;

    const [formData, setFormData] = useState({
        product_name: selectedProduct?.name || '',
        quantity: 10,
        buyer_name: '',
        delivery_address: ''
    });

    const [submitted, setSubmitted] = useState(false);
    const [orderId, setOrderId] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/orders', formData);
            setOrderId(res.data.orderId);
            setSubmitted(true);
        } catch (err) {
            alert("Error placing order. Please check all fields.");
        }
    };

    if (submitted) {
        return (
            <div className="glass-panel animate-fade-in" style={{ maxWidth: '500px', margin: '4rem auto', textAlign: 'center', padding: '3rem' }}>
                <CheckCircle size={64} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
                <h2>Order Successful!</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                    Your order has been placed successfully. Please save your order ID for tracking.
                </p>
                <div style={{ background: 'var(--glass)', padding: '1rem', borderRadius: '0.5rem', marginBottom: '2rem' }}>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ORDER ID</p>
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>#{orderId}</p>
                </div>
                <button className="btn btn-primary" onClick={() => navigate('/')}>Back to Catalogue</button>
            </div>
        );
    }

    return (
        <div className="animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <button onClick={() => navigate(-1)} className="btn btn-outline" style={{ marginBottom: '2rem', padding: '0.5rem 1rem' }}>
                <ArrowLeft size={18} /> Back
            </button>

            <div className="glass-panel">
                <h2 style={{ marginBottom: '2rem' }}>Place <span className="gradient-text">Bulk Order</span></h2>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Product Name</label>
                        <input
                            type="text"
                            value={formData.product_name}
                            readOnly
                            style={{ background: 'var(--glass)', cursor: 'not-allowed' }}
                        />
                    </div>

                    <div className="form-group">
                        <label>Quantity (Units)</label>
                        <input
                            type="number"
                            min="1"
                            value={formData.quantity}
                            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Your Name</label>
                        <input
                            type="text"
                            placeholder="Enter your full name"
                            value={formData.buyer_name}
                            onChange={(e) => setFormData({ ...formData, buyer_name: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Delivery Address</label>
                        <textarea
                            rows="4"
                            placeholder="Streeet, City, Pin Code"
                            value={formData.delivery_address}
                            onChange={(e) => setFormData({ ...formData, delivery_address: e.target.value })}
                            required
                        ></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                        <Truck size={20} /> Confirm Order
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PlaceOrder;
