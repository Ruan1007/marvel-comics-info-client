import React, {createRef, useEffect, useState} from 'react';
import {Button, Container, Modal, CardImg} from 'reactstrap';
import uncleBen from 'services/mockUncleBen.json';

export default function HomePageHeader() {
  let pageHeader = createRef();

  const [title, setTitle] = useState('CHARACTER');
  const [description, setDescription] = useState('');
  const [modal, setModal] = useState(false);
  const [characterImage, setCharacterImage] = useState('');

  const [character, setCharacter] = useState({});

  const getCharacterUncleBen = () => {
    console.log(uncleBen.data.results[0]);
    const character = uncleBen.data.results[0];

    setCharacterImage(
      character.thumbnail.path + '.' + character.thumbnail.extension
    );

    return character;
  };

  const toggle = () => {
    setCharacter(getCharacterUncleBen());
    setModal(!modal);
  };

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
                className='btn-round'
                color='neutral'
                type='button'
                outline
                onClick={toggle}>
                See more
              </Button>
            </div>
          </Container>
        </div>
      </div>

      <div>
        <Modal isOpen={modal} toggle={toggle}>
          <div className='modal-header'>
            <h5 className='modal-title' id='exampleModalLiveLabel'>
              {title}
            </h5>
            <button
              aria-label='Close'
              className='close'
              data-dismiss='modal'
              type='button'
              onClick={() => setModal(false)}>
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className='modal-body'>
            <div className='text-center'>
              <CardImg top src={characterImage} alt='...' />
              <b>{character.name}</b>
              <p>
                <b>Description:</b> Benjamin Franklin Parker, usually called
                Uncle Ben, is a fictional character appearing in American comic
                books published by Marvel Comics, usually in association with
                the superhero Spider-Man. He is the husband of May Parker and
                the paternal uncle and father figure of Peter Parker. Uncle Ben
                first appeared in Strange Tales #97 (June 1962), and was created
                by writer Stan Lee and artist Steve Ditko. He was modeled after
                American founding father Benjamin Franklin.
              </p>
            </div>
          </div>
          <div className='modal-footer'>
            <div className='left-side'>
              <Button
                className='btn-link'
                color='danger'
                type='button'
                onClick={() => setModal(false)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}
