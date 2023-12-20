import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yub from 'yup'
function CreateUser() {
    const submitForm = (data) => {
        console.log(data)
    }
    const validationSchema = Yub.object().shape({
        username: Yub.string().min(5).max(15).required(),
        email: Yub.string().email().required(),
        phone_number: Yub.string().min(11, 'phone number must be at least 11 characters').max(13, 'phone number must be at most 13 characters').required('phone number is a required field'),
        password: Yub.string().min(7).max(15).required(),
    });
    return (
        <div className='card'>
            <center>
                <Formik onSubmit={submitForm} initialValues={{ username: "", phone_number: "", email: "", password: "" }} validationSchema={validationSchema}>
                    <Form>
                        <label>Username :</label>
                        <Field type="text" id="username" placeholder="john" name="username" />
                        <ErrorMessage className='invalid' name='username' component='span' />
                        <label>Email :</label>
                        <Field type="email" id="email" placeholder="john@jhon.com" name="email" />
                        <ErrorMessage className='invalid' name='email' component='span' />
                        <label>Phone Number :</label>
                        <Field type="text" id="phone_number" placeholder="890-31...." name="phone_number" />
                        <ErrorMessage className='invalid' name='phone_number' component='span' />
                        <label>Password :</label>
                        <Field type="password" id="password" placeholder="password" name="password" />
                        <ErrorMessage className='invalid' name='password' component='span' />
                        <button type='submit'>Create User</button>
                    </Form>
                </Formik>
            </center>
        </div>
    )
}

export default CreateUser
