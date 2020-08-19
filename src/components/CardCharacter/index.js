import React, {useEffect, useState} from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Modal
} from 'reactstrap';

export default function CardCharacter({...props}) {
  const [character] = useState(props.character);
  const [characterImg, setCharacterImg] = useState('');
  const [modal, setModal] = useState(false);
  const title = 'CHARACTER';
  console.log(character);

  useEffect(() => {
    let image = character.thumbnail;
    if (image) {
      setCharacterImg(image.path + '.' + image.extension);
    } else {
      setCharacterImg(
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
      );
    }
  }, [character.images]);

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <Col sm='3' md='3'>
      <Card style={{width: '15rem', height: '25rem'}}>
        <CardImg
          top
          src={characterImg}
          alt='...'
          style={{width: '240px', height: '240px'}}
        />
        <CardBody>
          <CardTitle>{character.name}</CardTitle>
        </CardBody>
        <Button style={{backgroundColor: '#E62429'}} onClick={toggle}>
          Info
        </Button>
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
              <CardImg
                style={{width: '15rem'}}
                top
                src={characterImg}
                alt='...'
              />
              <CardTitle>{character.name}</CardTitle>
              <p>
                <b>Description:</b> {character.description}
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
      </Card>
    </Col>
  );
}
