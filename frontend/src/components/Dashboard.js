import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemTable from './ItemTable';
import './Dashboard.css';
import api from '../api.js';

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phoneNumber: '' });
  const [editId, setEditId] = useState(null);
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line
  }, []);

  const fetchItems = async () => {
    try {
      const res = await api.get('/api/items', {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Show newest at bottom
      setItems([...res.data].reverse());
    } catch (err) {
      setMsg(err.response?.data?.message || 'Failed to fetch items');
    }
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg('');
    try {
      if (editId) {
        await api.put(`/api/items/${editId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMsg('Item updated!');
      } else {
        await api.post('/api/items', form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMsg('Item added!');
      }
      setForm({ firstName: '', lastName: '', email: '', phoneNumber: '' });
      setEditId(null);
      fetchItems();
    } catch (err) {
      setMsg(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = item => {
    setForm({
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email,
      phoneNumber: item.phoneNumber,
    });
    setEditId(item._id);
    setMsg('');
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this item?')) return;
    try {
      await api.delete(`/api/items/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMsg('Item deleted!');
      fetchItems();
    } catch (err) {
      setMsg(err.response?.data?.message || 'Delete failed');
    }
  };

  const handleClear = () => {
    setForm({ firstName: '', lastName: '', email: '', phoneNumber: '' });
    setEditId(null);
    setMsg('');
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <div className="dashboard-title">Dashboard</div>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
        <form className="item-form" onSubmit={handleSubmit}>
          <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required />
          <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required />
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input name="phoneNumber" placeholder="Phone Number" value={form.phoneNumber} onChange={handleChange} required />
          <button className="item-btn" type="submit">{editId ? 'Update' : 'Add'}</button>
          <button className="item-btn clear-btn" type="button" onClick={handleClear}>Clear</button>
        </form>
        {msg && <div className="dashboard-msg">{msg}</div>}
        <ItemTable items={items} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
}