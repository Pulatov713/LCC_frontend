import React, {Fragment} from "react";
import {Component} from "react";
import {Button, Space, Table} from "antd";
import axios from "axios";
import {DeleteOutlined, EditOutlined, FormOutlined, EyeOutlined} from "@ant-design/icons";
import CreateStudentModal from "./createStudent.js";
import UpdateStudentModal from "./updateStudent.js";
import DeleteStudentModal from "./deleteStudent.js";
import ViewGroupsOfStudent from "./ViewGroupsOfStudent.js";
import {serverURL} from "../../../../server/consts/serverConsts.js";
import Search from "antd/es/input/Search.js";
import {getToken} from "../../../../util/TokenUtil.js";
import {formatDate} from "../../../../App.js";

class ReadStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            totalPages: 0,
            page: 0,
            size: 10,
            searchText: '',
            isAddModalVisible: false,
            isEditModalVisible: false,
            isDeleteModalVisible: false,
            isViewGroupsModalVisible: false,
            record: {},
            deleteId: '',
            deleteName: "student",
            viewGroupsId: '',
            studentName: "student",

        };
    }

    hideModal = () => {
        this.setState({
            isAddModalVisible: false,
            isEditModalVisible: false,
            isDeleteModalVisible: false,
            isViewGroupsModalVisible: false,
        })
    };

    onSearch = (searchText) => {
        this.setState({
            searchText: searchText,
            page: 0,
        }, () => this.getData())
    }
    handlePagination = (e) => {
        this.setState({
            page: e - 1
        }, () => this.getData())
    }

    getData() {
        const {page, size, searchText} = this.state;
        axios({
            url: searchText ? `${serverURL}admin/student/search?searching=${searchText}&page=${page}&size=${size}`
                : `${serverURL}admin/student/list?page=${page}&size=${size}`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
            .then((res) => {
                let dto = res.data;
                if (dto.success) {
                    console.log(dto,'rres')
                    this.setState({
                        dataSource: dto.data.content,
                    })

                } else {
                    alert("studentlar, get mapping :" + dto.message)
                }
            })
            .catch((err) => {
                alert("getData() function is " + err.message)
            });
    }

    componentDidMount() {
        this.getData();
    }

    handleSuccess = () => {
        this.getData();
    };
    handleAdd = () => {
        this.setState({
            isAddModalVisible: true,
        });
    };

    handleEdit = (record) => {
        this.setState({
            isEditModalVisible: true,
            record: record,
        });
    };

    handleDelete = (id, firstName) => {
        this.setState({
            isDeleteModalVisible: true,
            deleteId: id,
            deleteName: firstName,
        });
    };
    handleViewGroup = (record) => {
        this.setState({
            isViewGroupsModalVisible: true,
            studentName: record.firstName,
            viewGroupsId: record.id,
        });
        return <ViewGroupsOfStudent/>
    }

    render() {
        const columns = [
            {
                title: 'No',
                dataIndex: 'index',
                key: 'index',
                render: (text, record, index) => index + 1,
            },
            {
                title: 'First name',
                dataIndex: 'firstName',
                key: 'firstName',
            },
            {
                title: 'Last name',
                dataIndex: 'lastName',
                key: 'lastName',
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: 'Phone number',
                dataIndex: 'phone',
                key: 'phone',
            },
            {
                title: 'Birth date',
                dataIndex: 'birthDate',
                key: 'birthDate',
            },
            {
                title: 'Address',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: 'Username',
                dataIndex: 'username',
                key: 'username',
            },
            {
                title: 'Added at',
                dataIndex: 'createAt',
                key: 'createAt',
                render: createAt => formatDate(createAt),
            },
            {
                title: 'Edited at',
                dataIndex: 'updateAt',
                key: 'updateAt',
                render: updateAt => formatDate(updateAt),
            },
            // {
            //     title: 'Password',
            //     dataIndex: 'password',
            //     key: 'password',
            // },
            // {
            //     title: 'Groups',
            //     dataIndex: 'groups',
            //     key: 'groups',
            //     render: (record) => (
            //         <Space size="middle" align={"center"}>
            //
            //         </Space>
            //     ),
            // },
            {
                title: 'Action',
                key: 'action',
                render: (record) => (
                    <Space size="middle">
                        <a onClick={() => this.handleViewGroup(record)}><EyeOutlined/></a>
                        <a onClick={() => this.handleEdit(record)}><EditOutlined/></a>
                        <a onClick={() => this.handleDelete(record.id, record.firstName)}><DeleteOutlined/></a>
                    </Space>
                ),
            },
        ];

        const {
            dataSource,
            isAddModalVisible,
            isEditModalVisible,
            isDeleteModalVisible,
            isViewGroupsModalVisible
        } = this.state;
        return (
            <Fragment>
                <div style={{width: '100%', display: "flex", justifyContent: "space-between"}}>
                    <h2>Students</h2>
                    <div style={{width: '400px', float: "right", marginTop: '15px'}}>
                        <Search onSearch={(value) => this.onSearch(value)}/>
                    </div>
                </div>
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={{
                        pageSize: this.state.size,
                        total: this.state.totalPages,
                        onChange: this.handlePagination,
                    }}
                >
                </Table>
                <Button type="primary" onClick={this.handleAdd} icon={<FormOutlined/>}>
                    New Student
                </Button>

                {isAddModalVisible && (<CreateStudentModal
                    isAddModalVisible={isAddModalVisible}
                    onSuccess={this.handleSuccess}
                    onCancel={this.hideModal}
                    onClose={this.hideModal}
                />)}
                {isEditModalVisible && (<UpdateStudentModal
                    isEditModalVisible={isEditModalVisible}
                    record={this.state.record}
                    onClose={this.hideModal}
                    onSuccess={this.handleSuccess}
                />)}
                {isDeleteModalVisible && (<DeleteStudentModal
                    isDeleteModalVisible={isDeleteModalVisible}
                    id={this.state.deleteId}
                    name={this.state.deleteName}
                    onClose={this.hideModal}
                    onSuccess={this.handleSuccess}
                />)}
                {isViewGroupsModalVisible && (<ViewGroupsOfStudent
                    isViewGroupsModalVisible={isViewGroupsModalVisible}
                    studentId={this.state.viewGroupsId}
                    name={this.state.studentName}
                    onClose={this.hideModal}
                />)}
            </Fragment>
        );
    }
}

export default ReadStudent;