import React, { Component } from 'react'
import { Layout } from 'antd'
import AppHolder from './commonStyle'
import { GithubOutlined } from '@ant-design/icons'
import Dashboard from './Page/Dashboard'

const { Content, Header, Footer } = Layout
export class App extends Component {
  render() {
    const { height } = this.props
    const appHeight = window.innerHeight
    return (
        <AppHolder>
          <Layout style={{ height: appHeight }}>
            <Layout style={{ flexDirection: 'row', overflowX: 'hidden' }}>
              <Layout
                 className="layout"
                style={{
                  height: height
                }}
              >
                <Header>
                  <GithubOutlined /> <b>Github Repository Explorer</b>
                </Header>
                <Content
                  className='isomorphicContent'
                  style={{
                    padding: '70px 0 0',
                    flexShrink: '0',
                    background: '#F4F6FF',
                    position: 'relative'
                  }}
                >
                  <Dashboard/>
                </Content>
                <Footer>Nov 2022</Footer>
              </Layout>
            </Layout>
          </Layout>
        </AppHolder>
    )
  }
}

export default App
