import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/api/products')
            .then(res => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="container" style={{ display: 'flex', justifyContent: 'center', paddingTop: '4rem' }}><div className="loader"></div></div>;

    return (
        <div className="animate-fade-in">
            <header style={{ marginBottom: '4rem', textAlign: 'center', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: -1 }}></div>
                <h1 style={{ marginBottom: '1rem' }}>
                    Fresh Produce, <br />
                    <span className="gradient-text">Wholesale Prices</span>
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
                    Premium quality vegetables and fruits directly from farmers to your business doorstep.
                </p>
            </header>

            <div className="product-grid">
                {products.map((product) => (
                    <motion.div
                        key={product.id}
                        className="glass-panel product-card"
                        whileHover={{ y: -5 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '1rem 1rem 0 0' }}>
                            <img src={product.image_url} alt={product.name} />
                            <div className="badge badge-delivered" style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', border: 'none', color: '#fff' }}>
                                {product.category}
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginTop: 'auto' }}>
                            <div>
                                <h3 style={{ marginBottom: '0.5rem', fontSize: '1.4rem' }}>{product.name}</h3>
                                <p style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '1.1rem' }}>₹{product.price} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>/ unit</span></p>
                            </div>
                            <button
                                className="btn btn-primary"
                                onClick={() => navigate('/order', { state: { product } })}
                            >
                                <Plus size={18} /> Buy
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Home;
