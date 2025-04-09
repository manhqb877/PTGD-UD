import React from 'react';
import { Image } from 'react-bootstrap';
import {
  HouseFill,
  FolderFill,
  PeopleFill,
  BarChartFill,
  ChatLeftTextFill,
  CodeSlash
} from 'react-bootstrap-icons'; 
import left from '../image/Group.png'
import logo from '../image/Image 1858.png'

export default function Sidebar() {
  return (
    <div className="d-flex flex-column justify-content-between bg-white border-end" style={{ width: '250px', height: '100vh', padding: '1rem' }}>
      
      <div>
        <div className="d-flex align-items-center mb-4">
          <Image src={logo} className="me-2" style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: 'linear-gradient(to right, #ec4899, #8b5cf6, #3b82f6)'
          }} />
          <h5 className="mb-0 fw-bold">Logo</h5>
        </div>

        
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <a href="#" className="nav-link active text-white bg-pink rounded d-flex align-items-center px-3 py-2" style={{ backgroundColor: '#ec4899' }}>
              <HouseFill className="me-2" /> Dashboard
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link text-dark d-flex align-items-center px-3 py-2">
              <FolderFill className="me-2" /> Projects
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link text-dark d-flex align-items-center px-3 py-2">
              <PeopleFill className="me-2" /> Teams
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link text-dark d-flex align-items-center px-3 py-2">
              <BarChartFill className="me-2" /> Analytics
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link text-dark d-flex align-items-center px-3 py-2">
              <ChatLeftTextFill className="me-2" /> Messages
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link text-dark d-flex align-items-center px-3 py-2">
              <CodeSlash className="me-2" /> Integrations
            </a>
          </li>
        </ul>
      </div>

      
      <div className="bg-light p-3 rounded text-center mt-4">
        <img
          src= {left}
          alt="banner"
          className="img-fluid mb-2"
          style={{ height: '100px', objectFit: 'contain' }}
        />
        <p className="mb-1 fw-semibold">V2.0 is available</p>
        <button className="btn btn-primary btn-sm">Try now</button>
      </div>
    </div>
  );
}
