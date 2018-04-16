//1. 导入 react
import React from 'react'

import { Layout, Menu, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

import MovieList from './MovieList'

import {
    Route,
    Link
} from 'react-router-dom'



//2. 导出组件
export default class MovieContainer extends React.Component {
    render() {
        return (
            <Layout>
                <Sider width={200} style={{ background: '#fff' }}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        <Menu.Item key="1"><Link to='/movie/in_theaters'>正在热映</Link></Menu.Item>
                        <Menu.Item key="2"><Link to='/movie/coming_soon'>即将上映</Link></Menu.Item>
                        <Menu.Item key="3"><Link to='/movie/top250'>Top250</Link></Menu.Item>
                    </Menu>
                </Sider>
                <Layout style={{  }}>
                    <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                    <Route  path='/movie/:movieType' component={ MovieList }></Route>
          </Content>
                </Layout>
            </Layout>
        )
    }
}