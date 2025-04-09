// DataTable.js
import React, { useEffect, useState } from 'react';
import { getUsers } from '../api/userApi';
import EditModal from './EditModal';
import AddUserModal from './AddUserModal';

const DataTable = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    getUsers().then(data => setUsers(data));
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between mb-2">
        <h5 className="fw-bold">Detailed report</h5>
        <div>
          <button className="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#addUserModal">Add User</button>
          <button className="btn btn-outline-secondary">Export</button>
        </div>
      </div>

      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Order Value</th>
            <th>Order Date</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.company}</td>
              <td>${u.orderValue}</td>
              <td>{u.orderDate}</td>
              <td><span className={`badge bg-${u.statusColor}`}>{u.status}</span></td>
              <td>
                <button className="btn btn-sm btn-outline-primary" data-bs-toggle="modal" data-bs-target="#editModal" onClick={() => setEditUser(u)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editUser && <EditModal user={editUser} />}
      <AddUserModal />
    </div>
  );
};

export default DataTable;
