import React from 'react';
import {Button, Container} from 'reactstrap';

export default function HomePageHeader() {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth < 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          'translate3d(0,' + windowScrollTop + 'px,0)';
      };
      window.addEventListener('scroll', updateScroll);
      return function cleanup() {
        window.removeEventListener('scroll', updateScroll);
      };
    }
  });

  return (
    <>
      <div
        style={{
          backgroundImage:
            'url(' + require('assets/img/home/all_heroes.jpg') + ')',
          backgroundPosition: '50% 0%'
        }}
        className='page-header'
        data-parallax={true}
        ref={pageHeader}>
        <div className='filter' />
        <div className='content-center'>
          <Container>
            <div className='motto text-center'>
              <span style={{fontFamily: 'italic', fontSize: '40px'}}>
                MARVEL COMICS
              </span>
              <h3>"With great power comes great responsibility!"</h3>
              <br />
              <Button
                href='/character'
                className='btn-round'
                color='neutral'
                type='button'
                outline>
                See more
              </Button>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}
