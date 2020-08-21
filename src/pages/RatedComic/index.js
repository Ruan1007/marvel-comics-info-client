import React, {useState, useEffect} from 'react';
import HomeNavbar from 'components/HomeNavbar';
import ProfileHeader from 'components/ProfileHeader';
import {Container, Row} from 'reactstrap';
import CardComic from 'components/CardComic';
import {getRatedComics} from 'services/auth';
import Footer from 'components/Footer';

export default function RatedComic() {
  const [myRatedComics, setMyRatedComics] = useState(getRatedComics());

  useEffect(() => {
    const ratedComics = getRatedComics();
    setMyRatedComics(
      ratedComics.filter((comics) => {
        return comics.isLiked !== undefined;
      })
    );
  }, []);

  return (
    <>
      <HomeNavbar />
      <ProfileHeader />
      <div className='main text-center'>
        <div className='section section-dark'>
          <Container>
            <h2 className='title' style={{color: '#FFF'}}>
              MY RATED COMICS
            </h2>
            <Row className='col-sm-12 text-center'>
              {myRatedComics.length > 0 ? (
                myRatedComics.map((comic) => {
                  return (
                    <CardComic
                      comic={comic}
                      comicId={comic.comicId}
                      key={comic._id}
                    />
                  );
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
