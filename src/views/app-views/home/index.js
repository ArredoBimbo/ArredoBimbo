import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Card, Avatar, Dropdown, Table, Tag, Select, Badge } from 'antd';
import utils from 'utils';
import Flex from 'components/shared-components/Flex'
import AvatarStatus from 'components/shared-components/AvatarStatus';
import NumberFormat from 'react-number-format';
import { getListaProdotti, topAcquisti, getOrdiniOdierni, getAcquistiTmp, deleteTmp } from 'configs/axios/chiamate_axios'
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
	const [pulisci_tmp, set_pulisci_tmp] = useState([])

	useEffect(() => {
		getListaProdotti(res => {
			console.log("lista-prodotti-dashboard", res)
			set_all_prodotti(res)
			topAcquisti(res, 'week', top_acquisti => {
				console.log("top-acquisti : ", top_acquisti)
				getOrdiniOdierni(res, odierni => {
					set_top_acquisti(top_acquisti)
					set_odierni_acquisti(odierni)
					console.log("ordini odierni", odierni)
					getAcquistiTmp(temporanei => {
						console.log("acquisti temporanei", temporanei)
						set_pulisci_tmp(temporanei)
					})
				})
			})
		})
	}, []);

	const onChange = (e) => {
		//console.log(e)
		set_top_acquisti([])
		topAcquisti(all_prodotti, e, top_acquisti => {
			set_top_acquisti(top_acquisti)
		})
	}

	const delete_tmp = () => {
		deleteTmp(cancellati => {
			if (cancellati === "ELIMINATI") {
				set_pulisci_tmp([])
			}
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
				<Col xs={18} sm={18} md={18} lg={18}>
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
				<Col xs={6} sm={6} md={6} lg={6}>
					<Card title="Pulizia acquisti incompleti" >
						{pulisci_tmp.length != 0 ?
							<Button onClick={() => delete_tmp()}>Pulisci acquisti incompleti </Button>
							:
							<Button disabled>Non ci sono acquisti interrotti </Button>
						}
					</Card>
				</Col>
			</Row>

		</div>


	)
}

export default Home
