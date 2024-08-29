import React, {Component, Fragment} from "react";
import axios from "axios";
import {serverURL} from "../../../server/consts/serverConsts.js";
import {getToken} from "../../../util/TokenUtil.js";
import {Button, message, Table, Typography} from "antd";
import {ArrowRightOutlined} from "@ant-design/icons";
import TasksOfGroup from "./TasksOfGroup.js";
import Search from "antd/es/input/Search.js";

const {Title}=Typography
class GroupsList extends Component {
    constructor() {
        super();
        this.state = {
            teacher: null,
            page: 0,
            size: 10,
            totalPages: 0,
            dataSource: [],
            isStudentsOfGroupVisible: false,
            record: {},

        }
    }

    componentDidMount() {
        this.getData();
    }

    handlePagination = (e) => {
        this.setState({
            page: e - 1
        }, () => this.getData())
    }

    getData() {
        const {page, size} = this.state;
        let url = `${serverURL}teacher/my-groups?page=${page}&size=${size}`
        axios({
            url: url,
            method: "GET",
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
            .then((res) => {
                let data = res.data.data
                this.setState({
                    dataSource: data.content,
                    totalPages: data.totalPages,
                })
            })
            .catch((err) => {
                alert(err);
                message.error(err);
            });
    }

    hideModal = () => {
        this.setState({
            isStudentsOfGroupVisible: false,
        })
    };
    handleEnter = (record) => {
        this.setState({
            isStudentsOfGroupVisible: true,
            record: record,
        })
    }

    render() {
        const {totalPages,size,record,dataSource, isStudentsOfGroupVisible} = this.state;
        const columns = [
            {
                title: 'No',
                dataIndex: 'index',
                key: 'index',
                render: (text,record, index) => index + 1,
            },
            {
                title: 'Course',
                dataIndex: 'courseName',
                key: 'courseName',
            },
            {
                title: 'Groups',
                dataIndex: 'groupName',
                key: 'groupName'
            },
            {
                title: 'Students count',
                dataIndex: 'studentCount',
                key: 'studentCount'
            },
            {
                title: 'Enter to group',
                key: 'action',
                render: (record) => <Button onClick={() => this.handleEnter(record)}><ArrowRightOutlined/> Topshiriqlar</Button>
            }
        ]
        return (
            <div>
                {isStudentsOfGroupVisible ? <TasksOfGroup
                    record={record}
                    onClose={this.hideModal}
                /> : <Fragment>
                    <Title style={{fontSize:"4vh"}}>Mening guruhlarim</Title>
                    <div style={{width: '45vh', float: "right", marginBottom: '2vh'}}>
                        <Search />
                    </div>
                    <Table
                        columns={columns}
                        dataSource={dataSource}
                        pagination={{
                            pageSize: size,
                            total: totalPages,
                            onChange: this.handlePagination,
                        }}
                    />
                </Fragment>
                }

            </div>
        );
    }

}

export default GroupsList;