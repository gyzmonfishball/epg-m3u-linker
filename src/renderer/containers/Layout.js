import React, { useState } from 'react';

import { Layout, Menu, Icon } from 'antd';
import 'antd/dist/antd.css';

const { Header, Sider, Content } = Layout;

const RootLayout = ({children}) => {

    const [collapsed, setCollapsed] = useState(false);

    const toggle = () => setCollapsed(!collapsed); 
 
    return (
        <Layout style={{minHeight: '100vh'}}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div style={styles.logo} />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
                <Icon type="dashboard" />
                <span>Dashboard</span>
            </Menu.Item>
            <Menu.Item key="2">
                <Icon type="file" />
                <span>M3U</span>
            </Menu.Item>
            <Menu.Item key="3">
                <Icon type="file" />
                <span>XMLTV</span>
            </Menu.Item>
            </Menu>
        </Sider>
        <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
                style={styles.trigger}
                type={collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={toggle}
            />
            </Header>
            <Content
            style={{
                margin: '24px 16px',
                padding: 24,
                background: '#fff',
                minHeight: 280,
            }}
            >
                {children}
            </Content>
        </Layout>
        </Layout>
    );
  
}

const styles = {
    trigger: {
        fontSize: '18px',
        lineHeight: '64px',
        padding: '0 24px',
        cursor: 'pointer',
        transition: 'color 0.3s'
    },
    triggerHover: {
        color: '#1890ff',
    },
    logo: {
        height: '32px',
        background: 'rgba(255, 255, 254, 0.2)',
        margin: '16px',
    }
}

export default RootLayout;