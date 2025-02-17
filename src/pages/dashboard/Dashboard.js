import React from 'react';
import {
    ArrowLeftOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ProfileOutlined,
    SettingOutlined,
    BellOutlined
} from '@ant-design/icons';
import {Layout, Menu, Button, Avatar, Space, Dropdown} from 'antd';
import {userInfo} from "../../server/config/User.js";
import ReadCourse from "../content/admin/course/readCourse.js";
import ReadGroup from "../content/admin/group/readGroup.js";
import ReadTeacher from "../content/admin/teacher/readTeacher.js";
import ReadStudent from "../content/admin/student/readStudent.js";
import GroupsList from "../content/teacher/GroupsList.js";
import {getItems} from "../../server/consts/serverConsts.js";
import NotFound from "../not_found/NotFound.js";
import GroupsOfStudent from "../content/student/GroupsOfStudent.js";
import {deleteToken} from "../../util/TokenUtil.js";
import Clock from "../const/Clock.js";


const imagePath = `./logo.png`;

const {Header, Sider, Content} = Layout;


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemNumber: '1',
            collapsed: false,
            selectedKey: '1',
            visible: false,
            user: null,
            userRoles: [],
            items: [],
            group: null,
        }
        this.getUserInfo();
    }

    getUserInfo = () => {

        userInfo().then(res => {
            if (res && res.data) {
                let dto = res.data;
                this.setState({
                    user: dto.data,
                    items: getItems(dto.data ? dto.data.roleName : ''),
                });
            } else {
                alert('user mavjud emas');
            }
        })

    }


    renderContent = () => {
        const {user, itemNumber} = this.state;
        if (user) {
            let role = user.roleName;
            if (role === 'ROLE_TEACHER') {
                if (itemNumber === '1') return <GroupsList/>
            } else if (role === 'ROLE_ADMIN') {
                switch (itemNumber) {
                    case '1':
                        return <ReadCourse/>
                    case '2':
                        return <ReadGroup/>
                    case '3':
                        return <ReadStudent/>
                    case '4':
                        return <ReadTeacher/>
                    default:
                        return <NotFound/>
                }
            } else if (role === 'ROLE_STUDENT') {
                switch (itemNumber) {
                    case '1':
                        return <GroupsOfStudent/>;
                    default:
                        return <NotFound/>
                }
            } else {
                return <NotFound/>;
            }
        }
    };


    handleMenuClick = (item) => {
        this.setState({
            selectedKey: item.key,
            visible: true,
        })
    };

    handleMenuHide = () => {
        this.setState({
            visible: false,
        })
    };

    onClick = (e) => {
        this.setState({
            itemNumber: e.key,
        })
    }

    handleLogOut = () => {
        deleteToken();
        window.location.reload();
    };


    render() {
        const {user, collapsed} = this.state;
        const items=[
            {
                key: '1',
                label: (
                    <a  >
                        <SettingOutlined />&nbsp;&nbsp;Sozlamalar
                    </a>
                ),
            },
            {
                key: '2',
                label:(
                    <a onClick={this.handleLogOut}>
                        <ArrowLeftOutlined />&nbsp;&nbsp;Chiqish
                    </a>
                )
            },
        ]
        return (

            <Layout style={{minHeight: '100vh', margin: 0, padding: 0}}>

                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <Space direction="vertical" size={16}>
                        <Space
                            // onClick={() => window.location.href = "/"}
                            style={{
                                display: "flex",
                                justifyContent: "space-around",
                                alignItems: "center",
                                flexDirection: "column",
                                paddingTop: '10%',
                                height: '100%',
                            }}
                            wrap size={16}>
                            <Avatar style={{
                                width: '100%',
                                alignItems: "center",
                            }} size={64} icon={collapsed ?
                                <img
                                    style={{
                                        width: '100%',
                                        height: '100%'
                                    }}
                                    src={imagePath}
                                    alt=""/>
                                : <img
                                    style={{
                                        width: '100%',
                                        height: '100%'
                                    }}
                                    src={imagePath}
                                    alt="Farobiy logo"/>
                            }/>
                            <h2
                                style={{
                                    color: 'white',
                                    textAlign: "center",
                                    float: "center",
                                }}>
                                {
                                    collapsed ? `${user?.firstName.charAt(0)}${user?.lastName.charAt(0)}` :
                                        `${user?.firstName} ${user?.lastName}`
                                }
                            </h2>
                            <h2
                                style={{
                                    color: 'white',
                                    textAlign: "center",
                                    float: "center",
                                }}> {collapsed ? '' : user?.roleName}
                            </h2>
                        </Space>

                    </Space>
                    <div className="demo-logo-vertical"/>

                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={[this.state.itemNumber]}
                        onSelect={this.handleMenuClick}
                        onClick={(e) => {
                            this.onClick(e)
                        }}
                        items={this.state.items}
                    >
                    </Menu>
                </Sider>
                <Layout style={{minHeight: '100%'}}>
                    <Header style={{
                        height: "10vh",
                        padding: 0,
                        background: '#ffffff',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div>
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                                onClick={() => this.setState({collapsed: !collapsed})}
                                style={{
                                    fontSize: '16px',
                                    width: 64,
                                    height: 64,
                                }}
                            />
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', marginRight: "5vh", height: "2vh"}}>
                            {user?.roleName === 'ROLE_STUDENT' ? <BellOutlined style={{fontSize:"3vh"}}/> : ''}
                            <Clock/>
                            <Dropdown
                                menu={{
                                    items,
                                }}
                                placement="bottomRight"
                            >
                                <a style={{fontSize: "4vh"}}><ProfileOutlined/> </a>
                            </Dropdown>
                        </div>
                    </Header>


                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            background: '#ffffff',
                            borderRadius: 8,
                        }}
                    >
                        {this.renderContent()}
                    </Content>
                    {/*<Routes*/}
                    {/*    style={{*/}
                    {/*        margin: '24px 16px',*/}
                    {/*        padding: 24,*/}
                    {/*        minHeight: 280,*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    {routesData.map((value) => (*/}
                    {/*        <Route*/}
                    {/*            path={value.path}*/}
                    {/*            element={value.component}*/}
                    {/*            key={value.path}*/}
                    {/*        />*/}
                    {/*    ))}*/}
                    {/*    /!*<Route path="*" element={<NotFound/>}/>*!/*/}
                    {/*</Routes>*/}
                </Layout>
            </Layout>
        );
    }
}

export default Dashboard;