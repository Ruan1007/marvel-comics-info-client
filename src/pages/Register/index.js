import React, {useCallback, useState} from 'react';
import {useHistory} from 'react-router-dom';
import * as Yup from 'yup';
import api from 'services/api';
import {setUser, setToken} from 'services/auth';
import {toast} from 'react-toastify';
import {Formik, Form, Field} from 'formik';
import {getValidationErrors} from 'utils/ValidationErrors';
import {Container, Row, Col, Card, Button} from 'reactstrap';
import DatePicker from 'reactstrap-date-picker';

export default function Register() {
  const [date, setDate] = useState();
  const [formattedDate, setFormattedDate] = useState();
  const history = useHistory();

  const handleChange = (value, formattedValue) => {
    setDate(value);
    setFormattedDate(formattedValue);
  };

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Password must match'
    ),
    birthDate: Yup.date().required('Date is required')
  });

  const register = async ({
    name,
    email,
    password,
    confirmPassword,
    birthDate
  }) => {
    const response = await api.post('auth/register', {
      name,
      email,
      password,
      confirmPassword,
      birthDate
    });

    const {token, user} = response.data;
    setUser(JSON.stringify(user));
    setToken(token);
  };

  const handleSubmit = useCallback(
    async (data) => {
      console.log('register');
      try {
        await RegisterSchema.validate(data, {
          abortEarly: false
        });

        await register({
          name: data.name,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
          birthDate: data.birthDate
        });

        toast.success('Register Successfully', {
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
        return false;
      }
    },
    [register, history]
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
                <h3 className='title mx-auto'>Register</h3>
                <Formik
                  initialValues={{
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    birthDate: ''
                  }}
                  validationSchema={RegisterSchema}
                  onSubmit={handleSubmit}>
                  {({errors, touched, setFieldValue}) => (
                    <Form>
                      <label>Name</label>
                      <Field
                        className='form-control'
                        placeholder='Name'
                        name='name'
                      />
                      {errors.name && touched.name ? (
                        <div style={{color: 'red'}}>{errors.name}</div>
                      ) : null}
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
                      <label>Confirm Password</label>
                      <Field
                        className='form-control'
                        placeholder='Confirm Password'
                        name='confirmPassword'
                        type='password'
                      />
                      {errors.confirmPassword && touched.confirmPassword ? (
                        <div style={{color: 'red'}}>
                          {errors.confirmPassword}
                        </div>
                      ) : null}
                      <label>Birth Date</label>
                      <DatePicker
                        id='birthDate'
                        name='birthDate'
                        value={date}
                        onChange={(v, f) => {
                          handleChange(v, f);
                          setFieldValue('birthDate', v);
                        }}
                      />
                      {errors.birthDate && touched.birthDate ? (
                        <div style={{color: 'red'}}>{errors.birthDate}</div>
                      ) : null}
                      <Button
                        block
                        type='submit'
                        className='btn-round'
                        style={{backgroundColor: '#E62429'}}>
                        Register
                      </Button>
                    </Form>
                  )}
                </Formik>
                <div className='text-center'>
                  <Button
                    className='btn-link'
                    href='/login'
                    style={{color: '#FFF'}}>
                    Login
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
