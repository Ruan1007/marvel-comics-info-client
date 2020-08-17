import React from 'react';
import {Row, Container} from 'reactstrap';
export default function Footer() {
  return (
    <footer className='footer footer-black footer-white'>
      <Container>
        <Row>
          <nav className='footer-nav'>
            <ul>
              <li className='copyright' style={{fontWeight: 'bold'}}>
                © COPYRIGHT - MARVEL
              </li>
            </ul>
          </nav>
          <div className='credits ml-auto'>
            <span className='copyright' style={{fontWeight: 'bold'}}>
              © {new Date().getFullYear()} Ruan de Oliveira
            </span>
          </div>
        </Row>
      </Container>
    </footer>
  );
}
