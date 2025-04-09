import Nav from 'react-bootstrap/Nav';
import './heade.css'
function StackedExample() {
  return (
    
    <Nav defaultActiveKey="/home" className=" nav flex-column" fixed = "top" >
      <Nav.Link href="/home">Active</Nav.Link>
      <Nav.Link eventKey="link-1">Link</Nav.Link>
      <Nav.Link eventKey="link-2">Link</Nav.Link>
      <Nav.Link eventKey="disabled" disabled>
        Disabled
      </Nav.Link>
    </Nav>
  );
}

export default StackedExample;