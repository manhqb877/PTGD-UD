// EditModal.js
import React, { useState } from 'react';
import { updateUser } from '../api/userApi';

const EditModal = ({ user }) => {
  const [form, setForm] = useState(user);

  const handleSave = () => {
    updateUser(form.id, form).then(() => window.location.reload());
  };

  return (
    <div className="modal fade" id="editModal" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content p-3">
          <h5>Edit User</h5>
          <input className="form-control my-2" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          {/* other fields */}
          <button className="btn btn-primary" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};
