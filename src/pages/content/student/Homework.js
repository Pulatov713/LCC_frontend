import React, {Fragment} from "react";
import {Component} from "react";
import {Button, Space, Table, Tooltip,Typography } from "antd";
import axios from "axios";
import {
    ArrowLeftOutlined,
    DownloadOutlined,
    UploadOutlined
} from "@ant-design/icons";
import {serverURL} from "../../../server/consts/serverConsts.js";
import {getToken} from "../../../util/TokenUtil.js";
import UploadHomeworkModal from "./UploadHomeworkModal.js";

const { Title, Text } = Typography;

class Homework extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            totalPages: 0,
            page: 0,
            size: 10,
            record: {},
            currentBall: 0,
            maxBall:2,
            percentBall:0,
            currentGrade:0,
            isHomeworkVisible: props.isHomeworkVisible,
            isUploadHomeworkModalVisible: false,
            homeworkId: null,
            taskId: null,
        };
    }

    hideModal = () => {
        this.setState({
            isUploadHomeworkModalVisible: false,
        })
    };
    handlePagination = (e) => {
        this.setState({
            page: e - 1
        }, () => this.getData())
    }
    getStatistics() {
        let currentBall = 0;
        let maxBall = 0;
        let currentGrade = 0;
        this.state.dataSource.forEach((item) => {
            currentBall += item.homeworkBall;
            maxBall += item.maxBall;
        });
        const percentBall = (currentBall / maxBall * 100).toFixed(2);
        if (percentBall >= 90) {
            currentGrade = 5;
        }else if (percentBall >= 70 && percentBall < 90) {
            currentGrade = 4;
        }else if (percentBall >= 60 && percentBall < 70) {
            currentGrade = 3;
        } else {
            currentGrade = 2;
        }
        this.setState({
            currentBall: currentBall,
            maxBall: maxBall,
            percentBall: percentBall,
            currentGrade: currentGrade,
        });
    }

    getData() {
        const groupId = this.props.record.id;
        let url = `${serverURL}student/homework/${groupId}`;
        axios({
                url: url,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            }
        )
            .then((res) => {
                let dto = res.data;
                if (dto.success) {
                    this.setState({
                        dataSource: dto.data,
                    }, () => {
                        this.getStatistics();
                    });
                } else {
                    alert(dto.message)
                }

            })
            .catch((err) => {
                alert("muammo : " + err.message)
            });
    }

    componentDidMount() {
        this.getData();
    }

    handleSuccess = () => {
        this.getData();
        this.setState({
            record: this.props.record,
        })
    };
    handleUpload = (homeworkId,taskId) => {
        this.setState({
            isUploadHomeworkModalVisible: true,
            homeworkId: homeworkId,
            taskId: taskId,

        });
    };

    handleBack = () => {
        this.props.onClose();
    };
    render() {
        const columns = [
            {
                title: 'No',
                dataIndex: 'index',
                key: 'index',
                render: (text, record, index) => index + 1,
            },
            {
                title: 'Topshiriq',
                dataIndex: 'taskName',
                key: 'taskName',

            },
            {
                title: 'Topshiriq fayli',
                key: 'taskFileName',
                render: (record) => {
                    const fileSize = record.taskFileSize;
                    const displaySize = fileSize < 1024 ? `${fileSize} Bytes` :
                        fileSize < 1024 * 1024 ? `${(fileSize / 1024).toFixed(2)} KB` :
                            `${(fileSize / (1024 * 1024)).toFixed(2)} MB`;

                    return (
                        record.taskFileName == null ?
                            <Button type="default" disabled={true}>
                                Yuklanmagan
                            </Button> :
                            <Tooltip title={record.taskFileName}>
                                <Button
                                    type="default"
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: "15vh"
                                    }}
                                    onClick={() => this.handleDownload(record.taskPathUrl)}
                                >
                                    <div style={{ display: "flex", alignItems: 'center' }}>
                                        <DownloadOutlined />&nbsp;
                                        <div style={{ marginRight: '5px' }}>{displaySize}</div>
                                    </div>
                                </Button>
                            </Tooltip>
                    );
                },
            },
            {
                title: 'Topshiriq muddati',
                dataIndex: 'deadline',
                key: 'deadline',
            },
            {
                title: 'Ball | Maks',
                key: 'homeworkBall',
                render: (record) => {
                    const maxBall = record.maxBall;
                    const ball = record.homeworkBall;

                    return (
                        <div style={{ display: "flex" }}>
                            <div style={{ borderRadius: '0.5vh 0 0 0.5vh', border: '1px solid #1890ff', marginRight: '-1px' }}>
                                <Tooltip title={record?.description}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            width: "4.5vh",
                                            height: "4.5vh",
                                            border: '1px solid #ccc',
                                            borderRadius: '0.5vh 0 0 0.5vh',
                                            backgroundColor: 'white',
                                            color: 'black',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            cursor: 'pointer',
                                            userSelect: 'none'
                                        }}
                                    >
                                        {ball != null ? ball : '\u00A0'}
                                    </div>
                                </Tooltip>
                            </div>
                            <div style={{ borderRadius: '0 0.5vh 0.5vh 0', border: '1px solid #1890ff', marginLeft: '-1px' }}>
                                <Tooltip title={record?.description}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            width: "4.5vh",
                                            height: "4.5vh",
                                            borderRadius: '0 0.5vh 0.5vh 0',
                                            backgroundColor: '#1890ff',
                                            color: "white",
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            cursor: 'pointer',
                                            userSelect: 'none'
                                        }}
                                    >
                                        {maxBall}
                                    </div>
                                </Tooltip>
                            </div>
                        </div>
                    );
                },
            },
            {
                title: 'Vazifa fayli',
                key: 'homeworkName',
                render: (record) => {
                    const fileSize = record.homeworkFileSize;
                    const displaySize = fileSize < 1024 ? `${fileSize} Bytes` :
                        fileSize < 1024 * 1024 ? `${(fileSize / 1024).toFixed(2)} KB` :
                            `${(fileSize / (1024 * 1024)).toFixed(2)} MB`;
                    return (record.homeworkFileName == null ? <Button
                                type={"default"}
                                style={{width: "20vh"}}
                                onClick={()=>this.handleUpload(record?.homeworkId,record.taskId)}
                            >
                               <UploadOutlined/> Vazifa yuklash
                            </Button> :
                            <div>
                                <Tooltip title={record?.homeworkFileName} >
                                <Button
                                    type="primary"
                                    style={{
                                        width: "20vh",
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                    onClick={() => this.handleDownload(record?.homeworkPathUrl)}
                                >
                                    <div style={{ display: "flex" }}>
                                            <DownloadOutlined />
                                        <div>{displaySize}</div>

                                    </div>
                                </Button>
                            </Tooltip>
                                <Button
                                    type="default"
                                    style={{
                                        width: "20vh",
                                        height: "3vh",
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                    onClick={()=>this.handleUpload(record?.homeworkId,record.taskId)}
                                >
                                    Qayta yuklash
                                </Button>
                            </div>
                    );
                },
            },
        ];

        const {dataSource, isHomeworkVisible, isUploadHomeworkModalVisible, currentBall, maxBall, percentBall, currentGrade} = this.state;

        return (
            <div>
                {isHomeworkVisible && (<Fragment>
                        <Title style={{fontSize: "4vh"}}>{this.props.record.groupName} <Button
                            type="dashed" onClick={this.handleBack} icon={<ArrowLeftOutlined/>}
                            style={{float: "right", marginBottom: '5px'}}>
                            Orqaga
                        </Button></Title>
                        <Space size={"large"} style={{
                            border: "1px solid #1890ff",
                            display: "flex",
                            justifyContent: "space-around",
                            marginTop: "3vh",
                            marginBottom: "3vh",
                            paddingTop: "2vh",
                            paddingBottom: "2vh"
                        }}>
                            <div style={{textAlign: "center"}}><Text style={{fontSize: "2.5vh"}}>To'plangan ball</Text>
                                <br/>
                                <Text style={{fontSize: "2.5vh"}}>{currentBall}</Text></div>
                            <div style={{textAlign: "center"}}><Text style={{fontSize: "2.5vh"}}>Maks ball</Text>
                                <br/>
                                <Text style={{fontSize: "2.5vh"}}>{maxBall}</Text></div>
                            <div style={{textAlign: "center"}}><Text style={{fontSize: "2.5vh"}}>O'zlashtirish</Text>
                                <br/>
                                <Text style={{fontSize: "2.5vh"}}>{percentBall}%</Text></div>
                            <div style={{textAlign: "center"}}><Text style={{fontSize: "2.5vh"}}>Hozirgi bahosi:</Text>
                                <br/>
                                <Text style={{fontSize: "2.5vh"}}>{currentGrade}</Text></div>
                        </Space>
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
                    </Fragment>
                )}
                {isUploadHomeworkModalVisible && (<UploadHomeworkModal
                    isUploadHomeworkVisible={isUploadHomeworkModalVisible}
                    onClose={this.hideModal}
                    onSuccess={this.handleSuccess}
                    taskId={this.state.taskId}
                    homeworkId={this.state.homeworkId}
                />)}
            </div>
        );
    }
}

export default Homework;