import React, {useState} from 'react'
import LayoutContentWrapper from '../components/utility/layoutWrapper'
import LayoutContent from '../components/utility/layoutContent'
import { Col, Row, Divider, Form, Input, Button, Table, Image } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { getGithubUser } from '../components/lib/api'
import { getGithubUserRepos } from '../components/lib/api'

function Dashboard () {
	
	const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
	const [expandedRowKeys, setExpandedRowKeys] = useState([])
  const [loadingExpand, setLoadingExpand] = useState({})
	const [users, setUsers] = useState()
	const [repos, setRepos] = useState()

	const layout = {
		labelCol: { span: 8 },
		wrapperCol: { span: 16 },
	};

	const onFinish = (values) => {
		setLoading(true)
	 	getGithubUser(values.githubUserName).then(users => {
			setUsers(users)
			setLoading(false)
		})
		
  }

	const columns = [
		{
			title: 'Avatar',
			dataIndex: 'avatar_url',
			render: (url) => <Image
				width={50}
				src={url}
			/>
		},
		{
			title: 'User Name',
			dataIndex: 'login',
			sorter: true
		},
		{
			title: 'Profile',
			dataIndex: 'html_url',
			render: (profileUrl) => <a href={profileUrl}> {profileUrl} </a>
		},
	]

	const expandedRowRender = record => {
    const repoColumns = [
      {
				title: 'Repository Name',
				dataIndex: 'name',
				key: 'name',
			},
			{
				title: 'Description',
				dataIndex: 'description',
				key: 'description',
			}
    ]

    return (<Table 
			columns={repoColumns} 
			loading={loadingExpand[record.key] && repos}
			dataSource={repos}
			pagination={false}
		/>)
  };


	const handleExpand = (expanded, record) => {
		setRepos([])
    if(expanded){
			setExpandedRowKeys(record.key)
    }

    setLoadingExpand({
      [record.key]: true
    })
 
      getGithubUserRepos(record.login).then(userRepos => {
				setRepos(userRepos)

				setLoadingExpand({
					[record.key]: false
				})
			})

  }

  return (
    <LayoutContentWrapper style={{ height: '100%' }}>
      <LayoutContent>
				<Row justify={'center'}>
					<Col justify={'center'} span={18}>
						<Form
							{...layout}
							form={form} 
							name="control-hooks"
							onFinish={onFinish}
						>
							<Form.Item
								name="githubUserName"
								rules={[{ required: true, message: 'Please input your username!' }]}
							>
								<Input placeholder='Enter Github Username' />
							</Form.Item> 
							<Button type="primary" htmlType="submit" icon={<SearchOutlined/>}>Search</Button>
						</Form>
						<Divider />
					</Col>
				</Row>
				<Row justify={'center'}>
					<Col justify={'center'} span={18}>
						<Table
							columns={columns}
							dataSource={users}
							loading={loading}
							expandable={{
								expandedRowRender,
								expandedRowKeys: expandedRowKeys,
								onExpand: handleExpand
							}}	
						/>
					</Col>
				</Row>       
			</LayoutContent>
    </LayoutContentWrapper>
  )
}

export default Dashboard