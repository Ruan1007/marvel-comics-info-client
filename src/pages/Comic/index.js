import React, {useCallback, useState} from 'react';
import HomeNavbar from 'components/HomeNavbar';

import comicsImg from 'assets/img/comic/comics.png';
import PagesHeader from 'components/PagesHeader';
import Footer from 'components/Footer';
import {Container, Row, Col, Button} from 'reactstrap';
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import {searchComicByTitle} from 'services/apiMarvel';
import {getValidationErrors} from 'utils/ValidationErrors';
import {toast} from 'react-toastify';
import CardComic from 'components/CardComic';
import Loader from 'components/Loader';

export default function Comic() {
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const SearchSchema = Yup.object().shape({
    title: Yup.string().required(`Search can't be empty`)
  });

  const searchComics = async (title) => {
    const response = await searchComicByTitle(title).get();
    const data = response.data.data.results;
    if (JSON.stringify(data) !== '[]') {
      setComics(data);
    }
  };

  const handleSubmit = useCallback(async (data) => {
    try {
      setComics([]);
      await SearchSchema.validate(data, {
        abortEarly: false
      });

      await searchComics({title: data.title});
      toast.success('Search Successfully', {
        position: 'top-right',
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true
      });
      setIsLoading(false);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        let message = [];
        errors.map((error) => {
          message.push(error.message);
        });
      }
      toast.error(err.message, {
        position: 'top-right',
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true
      });
      setIsLoading(false);
      return false;
    }
  });

  return (
    <>
      {isLoading && <Loader />}
      <HomeNavbar />
      <PagesHeader img={comicsImg} title='SEARCH COMICS' />
      <div className='main text-center'>
        <div className='section section-dark'>
          <Container>
            <Formik
              initialValues={{
                title: ''
              }}
              validationSchema={SearchSchema}
              onSubmit={handleSubmit}>
              {({errors, touched}) => (
                <Form>
                  <label>SEARCH BY TITLE</label>
                  <Row>
                    <Col md='10'>
                      <Field
                        placeholder='Search by title'
                        className='form-control'
                        name='title'
                      />
                      {errors.title && touched.title ? (
                        <Row style={{color: 'red', alignItems: 'flex-start'}}>
                          <Col style={{textAlign: 'left'}}>{errors.title}</Col>
                        </Row>
                      ) : null}
                    </Col>
                    <Col md='2'>
                      <Button
                        style={{backgroundColor: '#E62429'}}
                        type='submit'
                        onClick={() => setIsLoading(true)}>
                        SEARCH
                      </Button>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </Container>
        </div>
        <div className='section section-dark' style={{minHeight: '30vh'}}>
          <Container>
            <Row className='col-sm-12 text-center'>
              {comics.length > 0 ? (
                comics.map((comic) => {
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
