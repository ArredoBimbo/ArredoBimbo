import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Card, Avatar, Dropdown, Table, Tag, Select, Badge } from 'antd';
import utils from 'utils';
import Flex from 'components/shared-components/Flex'
import AvatarStatus from 'components/shared-components/AvatarStatus';
import NumberFormat from 'react-number-format';
import { getListaProdotti, topAcquisti, getOrdiniOdierni } from 'configs/axios/chiamate_axios'
import {
	CloudDownloadOutlined,
	ArrowUpOutlined,
	ArrowDownOutlined,
	UserSwitchOutlined,
	FileDoneOutlined,
	SyncOutlined,
	BarChartOutlined
} from '@ant-design/icons';
import { Value } from 'devextreme-react/range-selector';
const { Option } = Select;

export const customerChartData = [
	{
		name: 'Store Customers',
		data: [28, 25, 64, 40, 75, 45, 70]
	},
	{
		name: 'Online Customers',
		data: [25, 15, 41, 25, 44, 12, 36]
	}
]

const RecentTransactionData = [
	{
		id: '#5331',
		name: 'Clayton Bates',
		date: '8 May 2020',
		amount: '$137.00',
		status: 'Approved',
		avatarColor: '#04d182'
	},
	{
		id: '#5332',
		name: 'Gabriel Frazier',
		date: '6 May 2020',
		amount: '$322.00',
		status: 'Approved',
		avatarColor: '#fa8c16'
	},
	{
		id: '#5333',
		name: 'Debra Hamilton',
		date: '1 May 2020',
		amount: '$543.00',
		status: 'Pending',
		avatarColor: '#1890ff'
	},
	{
		id: '#5334',
		name: 'Stacey Ward',
		date: '28 April 2020',
		amount: '$876.00',
		status: 'Rejected',
		avatarColor: '#ffc542'
	},
	{
		id: '#5335',
		name: 'Troy Alexander',
		date: '28 April 2020',
		amount: '$241.00',
		status: 'Approved',
		avatarColor: '#ff6b72'
	}, {
		id: '#5335',
		name: 'Troy Alexander',
		date: '28 April 2020',
		amount: '$241.00',
		status: 'Approved',
		avatarColor: '#ff6b72'
	}, {
		id: '#5335',
		name: 'Troy Alexander',
		date: '28 April 2020',
		amount: '$241.00',
		status: 'Approved',
		avatarColor: '#ff6b72'
	}, {
		id: '#5336',
		name: 'Troy Alexander',
		date: '28 April 2020',
		amount: '$241.00',
		status: 'Approved',
		avatarColor: '#ff6b72'
	}, {
		id: '#5335',
		name: 'Troy Alexander',
		date: '28 April 2020',
		amount: '$241.00',
		status: 'Approved',
		avatarColor: '#ff6b72'
	},
];

const tableColumns = [
	{
		title: 'Cliente',
		dataIndex: 'name',
		key: 'name',
		render: (text, record) => (
			<div className="d-flex align-items-center">
				<Avatar size={30} className="font-size-sm" style={{ backgroundColor: record.avatarColor }}>
					{utils.getNameInitial(text)}
				</Avatar>
				<span className="ml-2">{text}</span>
			</div>
		),
	},
	{
		title: 'Articolo acquistato',
		dataIndex: 'articolo',
		key: 'articolo',
	},
	{
		title: 'Spesa effettuata',
		dataIndex: 'amount',
		key: 'amount',
	},
	{
		title: 'Numero acquisti',
		dataIndex: 'numero_acquisti',
		key: 'numero_acquisti',
	},
];


const Home = () => {

	const [top_acquisti, set_top_acquisti] = useState([])
	const [odierni_acquisti, set_odierni_acquisti] = useState([])
	const [all_prodotti, set_all_prodotti] = useState([])

	useEffect(() => {
		getListaProdotti(res => {
			console.log(res)
			set_all_prodotti(res)
			topAcquisti(res, 'week', top_acquisti => {
				console.log("top-acquisti : ", top_acquisti)
				getOrdiniOdierni(res, odierni => {
					set_top_acquisti(top_acquisti)
					set_odierni_acquisti(odierni)
					console.log("ordini odierni", odierni)
				})
			})
		})
	}, []);

	const onChange = (e) => {
		console.log(e)
		set_top_acquisti([])
		topAcquisti(all_prodotti, e, top_acquisti => {
			console.log("dentro on change! -> top-acquisti : ", top_acquisti)			
			set_top_acquisti(top_acquisti)
		})

	}

	return (
		<div>
			<Row gutter={16}>
				<Col xs={24} sm={24} md={24} lg={24}>
					<Card title="Ordini del giorno">
						<Table
							className="no-border-last"
							columns={tableColumns}
							dataSource={odierni_acquisti}
							rowKey='id'
							pagination={true}
						/>
					</Card>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col xs={24} sm={24} md={18} lg={18}>

					<Card
						title="I prodotti più venduti"
						extra={
							<Select onChange={onChange} defaultValue="week" size="small" style={{ minWidth: 110 }}>
								<Option value="week">Questa settimana</Option>
								<Option value="month">Questo mese</Option>
								<Option value="year">Questo anno</Option>
							</Select>
						}
					>
						{top_acquisti.map(elm => (
								<Flex className="w-100 py-3" justifyContent="between" alignItems="center" key={elm.name}>
									<AvatarStatus shape="square" src={elm.image} name={elm.name} subTitle={elm.category} />
									<Flex>
										<div className="mr-3 text-right">
											<span className="mb-0 h5 font-weight-bold">Guadagno totale / Numero totale venduti</span>
											<div className="text-muted">
												<NumberFormat prefix={'Guadagno: €'} value={elm.sales + "/ Pezzi venduti: "} thousandSeparator={true} displayType="text" />
												<NumberFormat prefix={'/ Pezzi venduti: '} value={elm.venduti} thousandSeparator={true} displayType="text" />
											</div>
										</div>
									</Flex>
								</Flex>
							))}

					</Card>
				</Col>
			</Row>

		</div>


	)
}

export default Home
