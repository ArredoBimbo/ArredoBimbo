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
import { Document, Page, pdfjs } from 'react-pdf';
import pdfjsWorker from "react-pdf/node_modules/pdfjs-dist/build/pdf.worker.entry";

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

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
	const [numPages] = useState(1);
	const [pageNumber, setPageNumber] = useState(1);

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
      <Document
        file="/Pdf.pdf"
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <p>Page {pageNumber} of {numPages}</p>
		</div>


	)
}

export default Home
