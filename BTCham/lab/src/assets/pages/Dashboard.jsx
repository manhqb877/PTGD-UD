import React from 'react';
import OverviewCards from '../components/OverviewCards';
import DataTable from '../components/DataTable';

const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 bg-light min-vh-100">
          {/* Sidebar component */}
        </div>
        <div className="col-md-10 p-4">
          <h2 className="fw-bold">Dashboard</h2>
          <OverviewCards />
          <DataTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
