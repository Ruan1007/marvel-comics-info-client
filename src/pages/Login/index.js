import React, {useCallback, useState} from 'react';
import {Container, Row, Col, Card, Button} from 'reactstrap';
import api from 'services/api';
import * as Yup from 'yup';
import {useHistory} from 'react-router-dom';
import {getValidationErrors} from 'utils/ValidationErrors';
import {Formik, Form, Field} from 'formik';
import {toast} from 'react-toastify';
import {setUser, setToken} from 'services/auth';

export default function Login() {
  const history = useHistory();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string().required('Password is required')
  });

  const login = async ({email, password}) => {
    const response = await api.post('auth/login', {
      email,
      password
    });
    const {token, user} = response.data;
    setUser(JSON.stringify(user));
    setToken(token);
  };

  const handleSubmit = useCallback(
    async (data) => {
      try {
        await LoginSchema.validate(data, {
          abortEarly: false
        });

        await login({
          email: data.email,
          password: data.password
        });

        toast.success('Login Successfully', {
          position: 'top-right',
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true
        });

        return history.push('/');
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
    },
    [login, history]
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
                <h3 className='title mx-auto'>Welcome</h3>
                <Formik
                  initialValues={{
                    email: '',
                    password: ''
                  }}
                  validationSchema={LoginSchema}
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
                      {errors.email && touched.email ? (
                        <div style={{color: 'red'}}>{errors.email}</div>
                      ) : null}
                      <label>Password</label>
                      <Field
                        className='form-control'
                        placeholder='Password'
                        name='password'
                        type='password'
                      />
                      {errors.password && touched.password ? (
                        <div style={{color: 'red'}}>{errors.password}</div>
                      ) : null}
                      <Button
                        block
                        type='submit'
                        className='btn-round'
                        style={{backgroundColor: '#E62429'}}>
                        Login
                      </Button>
                    </Form>
                  )}
                </Formik>
                <div className='text-center'>
                  <Button
                    className='btn-link'
                    href='/register'
                    style={{color: '#FFF'}}>
                    Register
                  </Button>
                  <Button
                    className='btn-link'
                    href='#'
                    style={{color: '#FFF'}}
                    onClick={(e) => e.preventDefault()}>
                    Forgot password?
                  </Button>
                </div>
                <div className='text-center'>
                  <Button className='btn-link' href='/' style={{color: '#FFF'}}>
                    Go to Home
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
        <div className='footer register-footer text-center'>
          <h6>© {new Date().getFullYear()}, Ruan de Oliveira</h6>
        </div>
      </div>
    </>
  );
}
