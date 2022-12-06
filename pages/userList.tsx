
import React, { useEffect, useState } from 'react';
import Axios from "axios";
import { Card, List, Avatar, Image, Input, Form, Rate, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, HeartOutlined, MailOutlined, PhoneOutlined, ChromeFilled, HeartFilled } from '@ant-design/icons';
import { UserListType, UserType } from './userType';

const { Meta } = Card;

export async function getStaticProps() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    const users = await res.json()
    return {
        props: {
            users,
        },
    }
}


function UserList() {

    const [isEditing, setIsEditing] = useState(false);
    const [editingUser, setEditingUser] = useState<any>(null);
    const [userData, setUserData] = useState<UserType>([]);


    const getData = async () => {
        await Axios.get("https://jsonplaceholder.typicode.com/users").then(
            res => {
                setUserData(res.data);
            }
        );
    };

    const Delete = (record: UserListType) => {
        Modal.confirm({
            title: "Are you sure you want to delete this",
            onOk: () => {
                setUserData((user) => {
                    return user.filter((details) => details?.id != record.id);
                });
            },
        });
    };

    const onEditUser = (record: any) => {
        setIsEditing(true);
        setEditingUser({ ...record });
    };
    const resetEditing = () => {
        setIsEditing(false);
        setEditingUser(null);
    };

    useEffect(() => {
        getData();
    }, []);

    return <>
        <List
            grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 6,
                xxl: 4,
            }}
            dataSource={userData}
            renderItem={(item: UserListType) => (
                <List.Item>
                    <Card
                        hoverable
                        size="small"
                        cover={
                            <Image
                                alt="example"
                                style={{ height: "10%" }}
                                src="https://banner2.cleanpng.com/20180329/zue/kisspng-computer-icons-user-profile-person-5abd85306ff7f7.0592226715223698404586.jpg"
                            />
                        }
                        actions={[
                            <Rate character={<HeartFilled key="favorites" />} key="favorites" count={1} style={{ color: "red" }} />,
                            <EditOutlined key="edit" onClick={() => { onEditUser(item); }} />,
                            <DeleteOutlined key="delete" style={{ color: "red" }} onClick={() => Delete(item)} />
                        ]}
                    >
                        <Meta
                            title={item?.name}
                        />
                        <Meta
                            avatar={<MailOutlined />}
                            description={item.email}

                        />
                        <Meta
                            avatar={<PhoneOutlined />}
                            description={item.phone}
                        />
                        <Meta
                            avatar={<ChromeFilled />}
                            description={item.website}
                        />
                    </Card>
                </List.Item >
            )
            }
        />
        <Modal
            title="Edit User Details"
            visible={isEditing}
            okText="Update"
            onCancel={() => {
                resetEditing();
            }}
            onOk={() => {
                setUserData((pre) => {
                    return pre.map((User) => {
                        if (User.id === editingUser?.id) {
                            return editingUser;
                        } else {
                            return User;
                        }
                    });
                });
                resetEditing();
            }}
        >
            <Form>
                <Form.Item label="Name" >
                    <Input
                        value={editingUser?.name}
                        onChange={(e) => {
                            setEditingUser((pre: any) => {
                                return { ...pre, name: e.target.value };
                            });
                        }}
                    />
                </Form.Item>
                <Form.Item label="Phone" >
                    <Input
                        value={editingUser?.phone}
                        onChange={(e) => {
                            setEditingUser((pre: any) => {
                                return { ...pre, phone: e.target.value };
                            });
                        }}
                    />
                </Form.Item>
                <Form.Item label="Email" >
                    <Input
                        value={editingUser?.email}
                        onChange={(e) => {
                            setEditingUser((pre: any) => {
                                return { ...pre, email: e.target.value };
                            });
                        }}
                    />
                </Form.Item>
                <Form.Item label="website" >
                    <Input
                        value={editingUser?.website}
                        onChange={(e) => {
                            setEditingUser((pre: any) => {
                                return { ...pre, website: e.target.value };
                            });
                        }}
                    />
                </Form.Item>
            </Form>

        </Modal>
    </>
}


export default UserList