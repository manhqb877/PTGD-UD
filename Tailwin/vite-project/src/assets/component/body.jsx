import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Stack, Table} from 'react-bootstrap';
import anh1 from '../image/Avatar (1).png'
import anh2 from '../image/Avatar (2).png'
import anh3 from '../image/Avatar (3).png'
import anh4 from '../image/Avatar (4).png'
import anh5 from '../image/Avatar (5).png'
import anh6 from '../image/Avatar 313.png'
import anh7 from '../image/create.png'
import './body.css'
import { useState } from 'react';

function NavScrollExample() {
    const [listTable] = useState([
        {'id': 1,'image': anh1, 'name' : 'Elizabeth Lee', 'company': 'AvatarSystern', 'value': '$359', 'date':'10/07/2023', 'status': 'New', 'pen': anh7},
        {'id': 2,'image': anh2, 'name' : 'Carios Garcia', 'company': 'SmoozeShift', 'value': '$747', 'date':'10/07/2023', 'status': 'New', 'pen': anh7},
        {'id': 3,'image': anh3, 'name' : 'Elizabeth Bailey', 'company': 'Prime Time Telecom', 'value': '$564', 'date':'10/07/2023', 'status': 'New', 'pen': anh7},
        {'id': 4,'image': anh4, 'name' : 'Ryan Brown', 'company': 'OmniTechCorporation', 'value': '$541', 'date':'10/07/2023', 'status': 'New', 'pen': anh7},
        {'id': 5,'image': anh5, 'name' : 'Ryan Young', 'company': 'DataStream Inc', 'value': '$769', 'date':'10/07/2023', 'status': 'New', 'pen': anh7},
        {'id': 6,'image': anh6, 'name' : 'Halley Adams', 'company': 'FlowRush', 'value': '$922', 'date':'10/07/2023', 'status': 'New', 'pen': anh7}

    ])
  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary" fixed='top' >
      <Container fluid>
        <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle className="justify-content-end" />
        <Navbar.Collapse id="navbarScroll" fixed='bottom'>
          
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <h1>Overview</h1>
    <Stack direction="horizontal" gap={3}>
      <div className="p-4">First item</div>
      <div className="p-4">Second item</div>
      <div className="p-4">Third item</div>
    </Stack>
    <Table responsive="xl">
        <thead>
          <tr>
            <th><input type="checkbox" name="" id="" /></th>
            <th>CUSTOMER NAME</th>
            <th>COMPANY</th>
            <th>ORDER VALUE</th>
            <th>ORDER DATE</th>
            <th>STATUS</th>
            <th></th>
          </tr>
        </thead>
        {listTable.map((item) =>{
            <tbody key={item.id}>
                <tr>
                    <td><input type="checkbox" name="" id="" /></td>
                    <td>{item.image}</td>
                    <td>{item.name}</td>
                    <td>{item.company}</td>
                    <td>{item.value}</td>
                    <td>{item.date}</td>
                    <td>{item.status}</td>
                    <td>{item.pen}</td>
                </tr>    
            </tbody>
        })}
        
      </Table>
    </>
  );
}

export default NavScrollExample;