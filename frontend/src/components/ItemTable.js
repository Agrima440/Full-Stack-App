import React from 'react';
import './ItemTable.css';

export default function ItemTable({ items, onEdit, onDelete }) {
  return (
    <table className="item-table">
      <thead>
        <tr>
          <th>Serial No.</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {items.length === 0 ? (
          <tr>
            <td colSpan={6} style={{ color: '#888' }}>No items found.</td>
          </tr>
        ) : (
          items.map((item, idx) => (
            <tr key={item._id}>
              <td>{idx + 1}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.email}</td>
              <td>{item.phoneNumber}</td>
              <td>
                <button className="action-btn edit" onClick={() => onEdit(item)}>Edit</button>
                <button className="action-btn delete" onClick={() => onDelete(item._id)}>Delete</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}