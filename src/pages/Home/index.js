import React, {useState, useEffect} from 'react';
import HomeNavbar from '../../components/HomeNavbar';
// reactstrap components
import {Container, Row} from 'reactstrap';
import HomePageHeader from 'components/HomeHeaders';
import Footer from 'components/Footer';
import CardComic from 'components/CardComic';

import {marvelApiComics} from 'services/apiMarvel';

export default function Home() {
  const [lastestComics, setLastestComics] = useState([]);

  const getThisWeekComics = async () => {
    const response = await marvelApiComics().get();
    const data = response.data.data.results;
    if (JSON.stringify(data) !== '[]') {
      setLastestComics(data);
    }
  };

  useEffect(() => {
    getThisWeekComics();
  }, []);

  return (
    <>
      <HomeNavbar />
      <HomePageHeader />
      <div className='main text-center'>
        <div className='section section-dark'>
          <Container>
            <h2 className='title' style={{color: '#FFF'}}>
              THIS WEEK COMICS
            </h2>
            <Row className='col-sm-12 text-center'>
              {lastestComics.length > 0 ? (
                lastestComics.map((comic) => {
                  return <CardComic comic={comic} key={comic.id} />;
                })
              ) : (
                <div>Nothing to show...</div>
              )}
            </Row>
          </Container>
        </div>
      </div>
      <Footer />
    </>
  );
}
