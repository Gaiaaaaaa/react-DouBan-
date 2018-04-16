import React from 'react'

import { Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;
import '../src/css/app.css'
import HomeContainer from './Home/HomeContainer'
import MovieContainer from './Movie/MovieContainer'
import AboutContainer from './About/AboutContainer'


import {
    HashRouter as Router,
    Route,
    Link
} from 'react-router-dom'

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <Layout className="layout" style={{ height: '100%' }}>
                    <Header>
                        <div className="logo" />
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['2']}
                            style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item key="1"><Link to='/'>首页</Link></Menu.Item>
                            <Menu.Item key="2"><Link to='/movie'>电影列表</Link></Menu.Item>
                            <Menu.Item key="3"><Link to='/about'>关于</Link></Menu.Item>
                        </Menu>
                    </Header>
                    <Content style={{}}>
                        <div style={{ background: '#fff', minHeight: 280 }}>
                            {/* exact ：绝对匹配 */}
                            <Route exact path='/' component={HomeContainer}></Route>
                            <Route path='/movie' component={MovieContainer}></Route>
                            <Route path='/about' component={AboutContainer}></Route>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        豆瓣小案例 2018/04/15
            </Footer>
                </Layout>
            </Router>
        )
    }
}