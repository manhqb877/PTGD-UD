// AddUserModal.js
import React, { useState } from 'react';
import { addUser } from '../api/userApi';

const AddUserModal = () => {
  const [form, setForm] = useState({ name: '', company: '' });

  const handleAdd = () => {
    addUser(form).then(() => window.location.reload());
  };

  return (
    <div className="modal fade" id="addUserModal" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content p-3">
          <h5>Add New User</h5>
          <input className="form-control my-2" placeholder="Name" onChange={e => setForm({...form, name: e.target.value})} />
          <input className="form-control my-2" placeholder="Company" onChange={e => setForm({...form, company: e.target.value})} />
          <button className="btn btn-success" onClick={handleAdd}>Add</button>
        </div>
      </div>
    </div>
  );
};
