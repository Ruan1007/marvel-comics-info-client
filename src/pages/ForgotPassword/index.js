import React, {useCallback} from 'react';
import {Container, Row, Col, Card, Button} from 'reactstrap';
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import api from 'services/api';
import {toast} from 'react-toastify';
import {useHistory} from 'react-router-dom';

export default function ForgotPassword() {
  const history = useHistory();

  const ForgotSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid')
  });

  const forgot = async ({email}) => {
    const response = await api.post('auth/reset-password', {email});
    return response.data;
  };

  const handleSubmit = useCallback(
    async (data) => {
      try {
        await ForgotSchema.validate(data, {
          abortEarly: false
        });

        await forgot({email: data.email});

        toast.success('A new password was sent in the email', {
          position: 'top-right',
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true
        });

        return history.push('/login');
      } catch (err) {
        toast.error(err.message, {
          position: 'top-right',
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true
        });
        return false;
      }
    },
    [history, ForgotSchema]
  );

  return (
    <>
      <div
        className='page-header'
        style={{
          backgroundImage:
            'url(' + require('assets/img/login/marvel_comics.jpg') + ')'
        }}>
        <div className='filter' />
        <Container>
          <Row>
            <Col className='ml-auto mr-auto' lg='4'>
              <Card className='card-register ml-auto mr-auto'>
                <h3 className='title mx-auto'>FORGOT PASSWORD</h3>
                <Formik
                  initialValues={{
                    email: ''
                  }}
                  validationSchema={ForgotSchema}
                  onSubmit={handleSubmit}>
                  {({errors, touched}) => (
                    <Form>
                      <label>Email</label>
                      <Field
                        className='form-control'
                        placeholder='Email'
                        name='email'
                        type='email'
                      />
                      {errors.email && touched.email && (
                        <div style={{color: 'red'}}>{errors.email}</div>
                      )}
                      <Button
                        block
                        type='submit'
                        className='btn btn-danger btn-round'>
                        Send new password
                      </Button>
                    </Form>
                  )}
                </Formik>
                <div className='text-center'>
                  <Button className='btn-link' href='/' style={{color: '#FFF'}}>
                    Go to Home
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
