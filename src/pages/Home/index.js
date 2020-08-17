import React from 'react';
import HomeNavbar from '../../components/HomeNavbar';
// reactstrap components
import {Container} from 'reactstrap';
import HomePageHeader from 'components/HomeHeaders';
export default function Home() {
  return (
    <>
      <HomeNavbar />
      <HomePageHeader />
      <div className='main text-center'>
        <div className='section'>
          <Container>
            <h1>HOME PAGE</h1>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </Container>
        </div>
      </div>
    </>
  );
}
