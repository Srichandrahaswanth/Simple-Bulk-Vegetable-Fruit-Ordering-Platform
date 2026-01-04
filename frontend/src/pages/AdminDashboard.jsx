import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LayoutDashboard, CheckCircle, Clock, RefreshCw } from 'lucide-react';

const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:5000/api/admin/orders');
            setOrders(res.data);
        } catch (err) {
            console.error("Failed to fetch orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === 'Pending' ? 'Delivered' : 'Pending';
        try {
            await axios.put(`http://localhost:5000/api/admin/orders/${id}`, { status: newStatus });
            fetchOrders();
        } catch (err) {
            alert("Failed to update status");
        }
    };

    return (
        <div className="animate-fade-in">
            <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem' }}>Admin <span className="gradient-text">Dashboard</span></h1>
                    <p style={{ color: 'var(--text-muted)' }}>Manage and track all bulk orders</p>
                </div>
                <button className="btn btn-outline" onClick={fetchOrders} disabled={loading}>
                    <RefreshCw size={20} className={loading ? 'spin' : ''} /> Refresh
                </button>
            </header>

            <div className="glass-panel admin-table-container">
                {orders.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                        No orders placed yet.
                    </div>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Buyer Name</th>
                                <th>Product</th>
                                <th>Qty</th>
                                <th>Address</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td>#{order.id}</td>
                                    <td style={{ fontWeight: 600 }}>{order.buyer_name}</td>
                                    <td>{order.product_name}</td>
                                    <td>{order.quantity} units</td>
                                    <td style={{ maxWidth: '200px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                        {order.delivery_address}
                                    </td>
                                    <td>
                                        <span className={`badge badge-${order.status.toLowerCase()}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td>
                                        {order.status === 'Pending' ? (
                                            <button
                                                className="btn btn-primary"
                                                style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                                                onClick={() => updateStatus(order.id, order.status)}
                                            >
                                                <CheckCircle size={14} /> Mark Delivered
                                            </button>
                                        ) : (
                                            <button
                                                className="btn btn-outline"
                                                style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                                                onClick={() => updateStatus(order.id, order.status)}
                                            >
                                                <Clock size={14} /> Set Pending
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div >
    );
};

export default AdminDashboard;
