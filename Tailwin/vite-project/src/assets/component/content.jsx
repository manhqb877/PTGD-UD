import React from 'react';
import { Search, Bell, QuestionCircle, Pencil } from 'react-bootstrap-icons';
import avatar1 from '../image/Avatar (1).png'; // ví dụ ảnh đại diện
import avatar2 from '../image/Avatar (2).png';
import avatar3 from '../image/Avatar (3).png'
import avatar4 from '../image/Avatar (4).png';
import avatar5 from '../image/Avatar (5).png';
import avatar6 from '../image/Avatar 313.png'
import anh7 from '../image/create.png'

export default function Dashboard() {
  const customers = [
    { name: "Elizabeth Lee", company: "AvatarSystems", value: "$359", date: "10/07/2023", status: "New", avatar: avatar1 },
    { name: "Carlos Garcia", company: "SmoozeShift", value: "$747", date: "24/07/2023", status: "New", avatar: avatar2 },
    { name: "Elizabeth Bailey", company: "Prime Time Telecom", value: "$564", date: "08/08/2023", status: "In-progress", avatar: avatar3 },
    { name: "Ryan Brown", company: "OmniTech Corporation", value: "$541", date: "31/08/2023", status: "In-progress", avatar: avatar4 },
    { name: "Ryan Young", company: "DataStream Inc.", value: "$769", date: "01/05/2023", status: "Completed", avatar: avatar5 },
    { name: "Hailey Adams", company: "FlowRush", value: "$922", date: "10/06/2023", status: "Completed", avatar: avatar6 },
  ];

  const getBadgeClass = (status) => {
    switch (status) {
      case 'New': return 'badge bg-primary';
      case 'In-progress': return 'badge bg-warning text-dark';
      case 'Completed': return 'badge bg-success';
      default: return 'badge bg-secondary';
    }
  };

  return (
    <div className="p-4">
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold text-pink">Dashboard</h4>
        <div className="d-flex align-items-center">
          <div className="input-group me-3">
            <span className="input-group-text bg-light"><Search /></span>
            <input type="text" className="form-control" placeholder="Search..." />
          </div>
          <QuestionCircle className="me-3" size={20} />
          <Bell className="me-3" size={20} />
          <img src={avatar1} alt="profile" className="rounded-circle" width={32} height={32} />
        </div>
      </div>

     
      <h6 className="fw-bold mb-3">Overview</h6>
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="border rounded bg-light p-3">
            <h6 className="text-muted">Turnover</h6>
            <h4 className="fw-bold">$92,405</h4>
            <p className="text-success mb-0">▲ 5.39% period of change</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="border rounded bg-light p-3">
            <h6 className="text-muted">Profit</h6>
            <h4 className="fw-bold">$32,218</h4>
            <p className="text-success mb-0">▲ 5.39% period of change</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="border rounded bg-light p-3">
            <h6 className="text-muted">New customer</h6>
            <h4 className="fw-bold">298</h4>
            <p className="text-success mb-0">▲ 6.84% period of change</p>
          </div>
        </div>
      </div>

     
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="fw-bold">Detailed report</h6>
        <div>
          <button className="btn btn-outline-danger btn-sm me-2">Export</button>
          <button className="btn btn-outline-pink btn-sm">Import</button>
        </div>
      </div>

      <table className="table align-middle">
        <thead className="table-light">
          <tr>
            <th scope="col"><input type="checkbox" /></th>
            <th scope="col">Customer Name</th>
            <th scope="col">Company</th>
            <th scope="col">Order Value</th>
            <th scope="col">Order Date</th>
            <th scope="col">Status</th>
            <th scope="col" />
          </tr>
        </thead>
        <tbody>
          {customers.map((c, idx) => (
            <tr key={idx}>
              <td><input type="checkbox" /></td>
              <td className="d-flex align-items-center">
                <img src={c.avatar} alt={c.name} className="rounded-circle me-2" width={32} height={32} />
                {c.name}
              </td>
              <td>{c.company}</td>
              <td>{c.value}</td>
              <td>{c.date}</td>
              <td><span className={getBadgeClass(c.status)}>{c.status}</span></td>
              <td><Pencil size={16} className="text-muted" /></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between">
        <small>63 results</small>
        <nav>
          <ul className="pagination pagination-sm mb-0">
            {[1, 2, 3, 4, 5].map((p) => (
              <li key={p} className={`page-item ${p === 1 ? 'active' : ''}`}>
                <button className="page-link">{p}</button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
