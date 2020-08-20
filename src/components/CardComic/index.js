import React, {useState, useEffect} from 'react';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Button,
  Col,
  Modal
} from 'reactstrap';

export default function CardComic(props) {
  const [comic] = useState(props.comic);
  const [imageCover, setImageCover] = useState('');
  const [modal, setModal] = useState(false);
  const title = 'COMIC';

  useEffect(() => {
    let image = comic.images[0];
    if (image) {
      setImageCover(image.path + '.' + image.extension);
    } else {
      setImageCover(
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
      );
    }
  }, [comic.images]);

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <Col sm='3' md='3'>
      <Card style={{width: '15rem', height: '32rem'}}>
        <CardImg top src={imageCover} alt='...' />
        <CardBody>
          <CardTitle>{comic.title}</CardTitle>
        </CardBody>
        <Button className='btn btn-danger' onClick={toggle}>
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
                src={imageCover}
                alt='...'
              />
              <CardTitle>{comic.title}</CardTitle>
              {comic.description ? (
                <p>
                  <b>Description:</b> {comic.description}
                </p>
              ) : null}
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
