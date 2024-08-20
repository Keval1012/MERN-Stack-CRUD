import React, { useEffect, useState } from 'react';
import '../styles/user.css';
import { useNavigate } from 'react-router-dom';
import { Col, message, Modal, Row, Table } from 'antd';
import AppButton from './generic-components/AppButton';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { deleteUser, getAllUser } from '../API/Api';

const User = () => {

    const userColumns = [
        {
            key: 'fname',
            title: 'First name',
            dataIndex: 'fname',
            render: (val) => val ? <div>{val}</div> : <div>-</div>
        },
        {
            key: 'lname',
            title: 'Last name',
            dataIndex: 'lname',
            render: (val) => val ? <div>{val}</div> : <div></div>
        },
        {
            key: 'email',
            title: 'Email',
            dataIndex: 'email',
            render: (val) => val ? <div>{val}</div> : <div>-</div>
        },
        {
            key: 'action',
            title: 'Action',
            dataIndex: 'action',
            width: '6%',
            render: (index, record) => <div className='d-flex-between'>
                <EditOutlined className='tableEditIcon' onClick={() => onEditRow(record)}/>
                <DeleteOutlined className='tableDeleteIcon' onClick={() => onEditRow(record, true)} />
            </div>
        },
    ];

    const navigate = useNavigate();
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        let res = await getAllUser();
        if (res?.data?.success) {
            setUserList(res?.data?.userData);
        }
    };

    const showDeleteConfirm = (record) => {
        Modal.confirm({
            title: `User name: ${record?.fname} `,
            content: 'Are you sure you want to remove this User?',
            okText: 'Remove',
            okType: 'danger',
            onOk: async () => {
                try {
                    const res = await deleteUser(record._id);
                    if (res.data?.success) {
                        message.success(record?.fname + ' User Deleted Successfully !!!');
                        fetchUsers();
                    } else {
                        message.error(res?.data?.message);
                    }
                } catch (error) {
                    message.error(error.response.data.message);
                }
            },
            onCancel() { },
        });
    };
    
    const onEditRow = async (record, isDelete = false) => {
        if (!isDelete) {
            navigate(`/user-form/${record?._id}`, {
                state: {
                    isEditUser: true,
                    defaultUser: record
                }
            });
        }
        if (isDelete) {
            showDeleteConfirm(record);
            return;
        }
    };

    return (
        <div>
            <Row align='middle' justify='space-between'>
                <Col xl={14} lg={14} md={14} sm={14} xs={14}>
                    <h2>Users</h2>
                </Col>
                <Col xl={10} lg={10} md={10} sm={10} xs={10} className='text-right'>
                    <AppButton
                        label='+ Add User'
                        className='addUserBtn appPrimaryButton'
                        onClick={() => {
                            navigate('/user-form', {
                                state: {
                                    isEditUser: false,
                                    defaultUser: null
                                }
                            })
                        }}
                    />
                </Col>
            </Row><br />

            <Table
                columns={userColumns}
                dataSource={userList}
                pagination={{ showSizeChanger: true }}
            />
        </div>
    );
}

export default User;