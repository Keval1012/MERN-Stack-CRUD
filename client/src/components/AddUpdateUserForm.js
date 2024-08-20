import React from 'react';
import '../styles/user.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Col, Divider, Form, message, Row } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import TextInput from '../components/generic-components/TextInput';
import AppButton from '../components/generic-components/AppButton';
import { addUser, updateUser } from '../API/Api';

const AddUpdateUserForm = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { isEditUser, defaultUser } = location?.state??{};
    const [userAddForm] = Form.useForm();

    const handleUserFormValues = async (form) => {
        const values = form.getFieldsValue();
        const { fname, lname, email, password } = values;

        if (fname && lname && email && password) {

            if (form.getFieldsError().filter(x => x.errors.length > 0).length > 0) {
                return;
            }
      
            let data = {
                fname: fname,
                lname: lname,
                email: email,
                password: password
            };
      
            if (isEditUser) {
                try {
                    const res = await updateUser(defaultUser?._id, data);
                    console.log(res)
                    if (res?.data?.success) {
                        message.success('User Updated Successfully !!!');
                        navigate('/');
                        return;
                    } else {
                        message.error(res?.data?.message);
                    }
                } catch (error) {
                    message.error(error.response.data.message);
                }
            }
      
            if (!isEditUser) {
                try {
                    const res = await addUser(data);
                    if (res?.data?.success) {
                        message.success('User Added Successfully !!!');
                        navigate('/');
                        return;
                    } else {
                        message.error(res?.data?.message);
                    }
                } catch (error) {
                    message.error(error.response.data.message);
                }
            }
        } else {
            message.error('Please add required fields');
        }
    };

    return (
        <div>
            <Row>
                <h3 className='back-btn' onClick={() => navigate(-1)}><LeftOutlined /> Back</h3>
            </Row>

            <Form
                preserve={false}
                form={userAddForm}
                name="addUserForm"
                className="addUserForm"
            >
                <Row align='middle' justify='space-between'>
                    <h2>{!isEditUser ? 'Add User' : 'Update User'}</h2>
                </Row>

                <Divider />

                <div>
                    <Row>
                        <Col xl={10} lg={10} md={10} sm={10} xs={10}>
                            <TextInput
                                label='First Name'
                                name='fname'
                                defaultVal={defaultUser?.fname}
                                type='text'
                                required={true}
                                requiredMsg='First Name is required'
                                typeMsg="Enter a valid First Name!"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={10} lg={10} md={10} sm={10} xs={10}>
                            <TextInput
                                label='Last Name'
                                name='lname'
                                defaultVal={defaultUser?.lname}
                                type='text'
                                required={true}
                                requiredMsg='Last Name is required'
                                typeMsg="Enter a valid Last Name!"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={10} lg={10} md={10} sm={10} xs={10}>
                            <TextInput
                                label='Email'
                                name='email'
                                defaultVal={defaultUser?.email}
                                type='email'
                                required={true}
                                requiredMsg='Email is required'
                                typeMsg="Enter a valid Emaile!"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={10} lg={10} md={10} sm={10} xs={10}>
                            <TextInput
                                label='Password'
                                name='password'
                                defaultVal={defaultUser?.password}
                                type='password'
                                required={true}
                                requiredMsg='Password is required'
                                typeMsg="Enter a valid Password!"
                            />
                        </Col>
                    </Row>
                </div>

                <div>
                    <Divider />
                    <Row justify='end' >
                        <Col xl={8} lg={8} md={8} sm={8} xs={8}>
                            <AppButton
                                onClick={() => {
                                    handleUserFormValues(userAddForm);
                                }}
                                className='appPrimaryButton formWidth'
                                label='Save'
                            />
                            <AppButton
                                label='Cancel'
                                className="appButton formWidth"
                                onClick={() => {
                                    userAddForm.resetFields();
                                    navigate(-1);
                                }}
                            />
                        </Col>
                    </Row>
                </div>
            </Form>
        </div>
    );
}

export default AddUpdateUserForm;