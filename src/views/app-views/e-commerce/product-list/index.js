import React, { useState, useEffect } from 'react'
import { Card, Table, Select, Input, Button, Badge, Menu } from 'antd';
//import ProductListData from "assets/data/product-list.data.json"
import { EyeOutlined, SearchOutlined, PlusCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex'
import NumberFormat from 'react-number-format';
import { useHistory } from "react-router-dom";
import utils from 'utils';
import ls from 'local-storage'
import { getListaProdotti } from 'configs/axios/chiamate_axios'
import { toInteger } from 'lodash';
import Swal from 'sweetalert2';

const { Option } = Select
let ProductListData = []
const getStockStatus = stockCount => {
	if (stockCount >= 5) {
		return <><Badge status="success" /><span>Disponibili: {stockCount}</span></>
	}
	if (stockCount < 5 && stockCount > 0) {
		return <><Badge status="warning" /><span>In esaurimento: {stockCount}</span></>
	}
	if (stockCount === 0) {
		return <><Badge status="error" /><span>Terminati: {stockCount}</span></>
	}
	return null
}

const categories = ['Cloths', 'Bags', 'Shoes', 'Watches', 'Devices']

const ProductList = () => {
	let history = useHistory();
	const [list, setList] = useState([])
	const [selectedRows, setSelectedRows] = useState([])
	const [selectedRowKeys, setSelectedRowKeys] = useState([])
	const [ricerca, set_ricerca] = useState(false)

	useEffect(() => {
		getListaProdotti(res => {
			console.log("lista-all-prodotti: ", res)
			let filtraggio = []
			let trovato = false
			for (let i = 0; i < res.length; i++) {
				trovato = false
				filtraggio.push({
					id: res[i].idArticolo,
					name: res[i].nomeArticolo,
					image: '',
					category: res[i].categoria,
					price: res[i].prezzo,
					stock: 0,
					numeroDisp: res[i].numeroDisponibili,
					sottocategoria: res[i].sottoCategoria
				})
				for (let j = 0; j < res[i].coloriDisp.length; j++) {
					for (let k = 0; k < Object.keys(res[i].coloriDisp[j].size).length; k++)  {
						filtraggio[i].stock = filtraggio[i].stock + toInteger(res[i].coloriDisp[j].size[Object.keys(res[i].coloriDisp[j].size)[k]].stock)

					}
				}
				for (let j = 0; j < res[i].coloriDisp.length; j++) {
					if (res[i].coloriDisp[j].image.length != 0 && !trovato) {
						filtraggio[i].image = res[i].coloriDisp[j].image[0]
						trovato = true
					}
				}
			}

			ProductListData = filtraggio
			setList(filtraggio)
		});
	}, []);

	const dropdownMenu = row => (
		<Menu>
			<Menu.Item onClick={() => viewDetails(row)}>
				<Flex alignItems="center">
					<EyeOutlined />
					<span className="ml-2">Modifica articolo</span>
				</Flex>
			</Menu.Item>
		</Menu>
	);

	const addProduct = () => {
		history.push(`/Dashboard/app/ecommerce/aggiungi-prodotto`)
	}

	//qui al click di Views Details parte la modifica dell'i-esimo prodotto
	const viewDetails = row => {
		history.push(`/Dashboard/app/ecommerce/modifica-prodotto/${row.id}`)
	}


	const tableColumns = [
		{
			title: 'ID',
			dataIndex: 'id',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'id')

		},
		{
			title: 'Prodotto',
			dataIndex: 'name',
			render: (_, record) => (
				<div className="d-flex">
					<AvatarStatus size={60} type="square" src={record.image} name={record.name} />
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
		},
		{
			title: 'Categoria',
			dataIndex: 'category',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'category')
		}, {
			title: 'Sottocategoria',
			dataIndex: 'sottocategoria',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'sottocategoria')
		},
		{
			title: 'Prezzo',
			dataIndex: 'price',
			render: price => (
				<div>
					<NumberFormat
						displayType={'text'}
						value={(Math.round(price * 100) / 100).toFixed(2)}
						prefix={'€'}
						thousandSeparator={true}
					/>
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'price')
		},
		{
			title: 'Disponibilità',
			dataIndex: 'stock',
			render: stock => (
				<Flex alignItems="center">{getStockStatus(stock)}</Flex>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'stock')
		},
		{
			title: '',
			dataIndex: 'actions',
			render: (_, elm) => (
				<div className="text-right">
					<EllipsisDropdown menu={dropdownMenu(elm)} />
				</div>
			)
		}
	];

	const onSearch = e => {
		const value = e.currentTarget.value
		const searchArray = e.currentTarget.value ? list : ProductListData
		const data = utils.wildCardSearch(searchArray, value)
		setList(data)
		set_ricerca(true)
		setSelectedRowKeys([])
	}

	return (
		<div>
			{
			/*list.length == 0 && !ricerca ?

				<LoadingOutlined />

				: 
				*/
			}

			<Card>
				<Flex alignItems="center" justifyContent="between" mobileFlex={false}>
					<Flex className="mb-1" mobileFlex={false}>
						<div className="mr-md-3 mb-3">
							<Input placeholder="Cerca.." prefix={<SearchOutlined />} onChange={e => onSearch(e)} />
						</div>
					</Flex>
					<div>
						<Button onClick={addProduct} type="primary" icon={<PlusCircleOutlined />} block>Aggiungi un nuovo prodotto</Button>
					</div>
				</Flex>
				<div className="table-responsive">
					<Table
						columns={tableColumns}
						dataSource={list}
						rowKey='id'

					/>
				</div>
			</Card>
		</div>
	)
}

export default ProductList
