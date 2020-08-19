import React, {useState, useCallback} from 'react';
import HomeNavbar from 'components/HomeNavbar';
import PagesHeader from 'components/PagesHeader';
import {Container, Row, Col, Button} from 'reactstrap';
import {Formik, Form, Field} from 'formik';
import charactersImg from 'assets/img/character/characters.jpg';
import Footer from 'components/Footer';
import * as Yup from 'yup';
import {toast} from 'react-toastify';
import {getValidationErrors} from 'utils/ValidationErrors';
import {searchCharacterByName} from 'services/apiMarvel';
import CardCharacter from 'components/CardCharacter';

export default function Character() {
  const [characters, setCharacters] = useState([]);

  const SearchSchema = Yup.object().shape({
    name: Yup.string().required(`Search can't be empty`)
  });

  const searchCharacters = async (name) => {
    console.log(name);
    const response = await searchCharacterByName(name).get();
    const data = response.data.data.results;
    if (JSON.stringify(data) !== '[]') {
      setCharacters(data);
    }
  };

  const handleSubmit = useCallback(async (data) => {
    try {
      setCharacters([]);
      await SearchSchema.validate(data, {
        abortEarly: false
      });

      await searchCharacters({name: data.name});
      toast.success('Search Successfully', {
        position: 'top-right',
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true
      });
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
      return false;
    }
  });

  return (
    <>
      <HomeNavbar />
      <PagesHeader img={charactersImg} title='SEARCH CHARACTERS' />
      <div className='main text-center'>
        <div className='section section-dark'>
          <Container>
            <Formik
              initialValues={{
                name: ''
              }}
              validationSchema={SearchSchema}
              onSubmit={handleSubmit}>
              {({errors, touched}) => (
                <Form>
                  <label>SEARCH BY NAME</label>
                  <Row>
                    <Col md='10'>
                      <Field
                        placeholder='Search by name'
                        className='form-control'
                        name='name'
                      />
                      {errors.name && touched.name ? (
                        <Row style={{color: 'red', alignItems: 'flex-start'}}>
                          <Col style={{textAlign: 'left'}}>{errors.name}</Col>
                        </Row>
                      ) : null}
                    </Col>
                    <Col md='2'>
                      <Button
                        style={{backgroundColor: '#E62429'}}
                        type='submit'>
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
              {characters.length > 0 ? (
                characters.map((character) => {
                  return (
                    <CardCharacter character={character} key={character.id} />
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
