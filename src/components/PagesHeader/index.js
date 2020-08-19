import React, {useEffect, createRef} from 'react';
import {Container} from 'reactstrap';

export default function PagesHeader(props) {
  let pageHeader = createRef();

  useEffect(() => {
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
          backgroundImage: 'url(' + props.img + ')',
          backgroundSize: 'cover'
        }}
        className='page-header page-header-xs'
        data-parallax={true}
        ref={pageHeader}>
        <div className='filter' />
        <div className='content-center'>
          <Container>
            <div className='motto text-center'>
              <span style={{fontFamily: 'italic', fontSize: '40px'}}>
                {props.title}
              </span>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}
