import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd';
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'
import ls from 'local-storage';
import UploadImages from "./PhotoTabs/UploadImages";
import { getListaProdotti, updateArticolo, insertArticolo } from 'configs/axios/chiamate_axios'
import { colori } from 'configs/AppConfig'

const list_all_colors = colori
const { TabPane } = Tabs;

const ADD = 'ADD'
const EDIT = 'EDIT'

const ProductForm = props => {

	const { mode = ADD, param } = props

	const [form] = Form.useForm();
	const [submitLoading, setSubmitLoading] = useState(false)
	const [colori, setColori] = useState([])
	const [correlati, setCorrelati] = useState([])
	const [idArticolo, setidArticolo] = useState([])
	const [numColori, setDispColori] = useState([])
	const [vettFoto, setVettFoto] = useState([])
	const [numUltimiArrivi, setNumUltimiArrivi] = useState([])
	const [gratis, setGratis] = useState([])
	const [ultimiArrivi, setUltimiArrivi] = useState([])
	const [listaColori, setListaColori] = useState([])
	const [disable, setDisable] = useState(false)
	const [colori_disabilitati, setColori_disabilitati] = useState([])
	const [colori_totali, setColori_totali] = useState([])
	const [all_prodotti, set_all_prodotti] = useState([])
	const [disabilita_bottone, set_disabilita_bottone] = useState(false)

	const setField = (numColori, listaColori, stockColore, product, correlati) => {
		//console.log(correlati)
		let check_ultimi, gratis
		let check_personalizzazione
		if (product.ultimiArrivi) {
			check_ultimi = "Si"
		}
		else {
			check_ultimi = "No"
		}
		if (product.gratis) {
			gratis = "Si"
		}
		else {
			gratis = "No"
		}
		if (product.personalizzazione) {
			check_personalizzazione = "Si"
		}
		else {
			check_personalizzazione = "No"
		}
		if (product.correlati == "undefined") {
			correlati = []
		} else {
			for (let i = 0; i < correlati.length; i++) {
				for (let j = 0; j < all_prodotti.length; j++) {
					if (correlati[i] == all_prodotti[j].idArticolo) {
						correlati[i] = all_prodotti[j].nomeArticolo
					}
				}
			}
		}

		if (numColori == 1) {
			form.setFieldsValue({
				cost: product.prezzo,
				description: product.descrizione,
				category: product.categoria,
				Colori: listaColori,
				numColore0: stockColore[0],
				name: product.nomeArticolo,
				price: product.prezzo,
				gratis: gratis,
				sottocat: product.sottoCategoria,
				ultimiArrivi: check_ultimi,
				correlati: correlati,
				personalizzazione: check_personalizzazione,
				marca: product.marca,
				lunghezza: product.schedaTecnica[0].lunghezza,
				larghezza: product.schedaTecnica[0].larghezza,
				peso: product.schedaTecnica[0].peso,
				altezza: product.schedaTecnica[0].altezza,
				materiale: product.schedaTecnica[0].materiale,
				sconto: product.offerta
			});
		}
		else if (numColori == 2) {
			form.setFieldsValue({
				cost: product.prezzo,
				description: product.descrizione,
				category: product.categoria,
				Colori: listaColori,
				numColore0: stockColore[0],
				numColore1: stockColore[1],
				name: product.nomeArticolo,
				price: product.prezzo,
				sottocat: product.sottoCategoria,
				ultimiArrivi: check_ultimi,
				gratis: gratis,
				correlati: correlati,
				personalizzazione: check_personalizzazione,
				marca: product.marca,
				lunghezza: product.schedaTecnica[0].lunghezza,
				altezza: product.schedaTecnica[0].altezza,
				larghezza: product.schedaTecnica[0].larghezza,
				peso: product.schedaTecnica[0].peso,
				materiale: product.schedaTecnica[0].materiale,
				sconto: product.offerta
			});

		}
		else if (numColori == 3) {
			form.setFieldsValue({
				cost: product.prezzo,
				description: product.descrizione,
				category: product.categoria,
				Colori: listaColori,
				numColore0: stockColore[0],
				numColore1: stockColore[1],
				numColore2: stockColore[2],
				name: product.nomeArticolo,
				price: product.prezzo,
				sottocat: product.sottoCategoria,
				ultimiArrivi: check_ultimi,
				gratis: gratis,

				correlati: correlati,
				personalizzazione: check_personalizzazione,
				marca: product.marca,
				lunghezza: product.schedaTecnica[0].lunghezza,
				larghezza: product.schedaTecnica[0].larghezza,
				altezza: product.schedaTecnica[0].altezza,
				peso: product.schedaTecnica[0].peso,
				materiale: product.schedaTecnica[0].materiale,
				sconto: product.offerta
			});
		}
		else if (numColori == 4) {
			form.setFieldsValue({
				cost: product.prezzo,
				description: product.descrizione,
				category: product.categoria,
				Colori: listaColori,
				numColore0: stockColore[0],
				numColore1: stockColore[1],
				numColore2: stockColore[2],
				numColore3: stockColore[3],
				name: product.nomeArticolo,
				price: product.prezzo,
				sottocat: product.sottoCategoria,
				ultimiArrivi: check_ultimi,
				gratis: gratis,

				correlati: correlati,
				personalizzazione: check_personalizzazione,
				marca: product.marca,
				lunghezza: product.schedaTecnica[0].lunghezza,
				larghezza: product.schedaTecnica[0].larghezza,
				peso: product.schedaTecnica[0].peso,
				altezza: product.schedaTecnica[0].altezza,
				materiale: product.schedaTecnica[0].materiale,
				sconto: product.offerta
			});
		}
		else if (numColori == 5) {
			form.setFieldsValue({
				cost: product.prezzo,
				description: product.descrizione,
				category: product.categoria,
				Colori: listaColori,
				numColore0: stockColore[0],
				numColore1: stockColore[1],
				numColore2: stockColore[2],
				numColore3: stockColore[3],
				numColore4: stockColore[4],
				name: product.nomeArticolo,
				price: product.prezzo,
				sottocat: product.sottoCategoria,
				ultimiArrivi: check_ultimi,
				gratis: gratis,

				correlati: correlati,
				personalizzazione: check_personalizzazione,
				marca: product.marca,
				lunghezza: product.schedaTecnica[0].lunghezza,
				larghezza: product.schedaTecnica[0].larghezza,
				peso: product.schedaTecnica[0].peso,
				altezza: product.schedaTecnica[0].altezza,
				materiale: product.schedaTecnica[0].materiale,
				sconto: product.offerta
			});

		}
		else if (numColori == 6) {
			form.setFieldsValue({
				cost: product.prezzo,
				description: product.descrizione,
				category: product.categoria,
				Colori: listaColori,
				numColore0: stockColore[0],
				numColore1: stockColore[1],
				numColore2: stockColore[2],
				numColore3: stockColore[3],
				numColore4: stockColore[4],
				numColore5: stockColore[5],
				name: product.nomeArticolo,
				price: product.prezzo,
				sottocat: product.sottoCategoria,
				ultimiArrivi: check_ultimi,
				gratis: gratis,

				correlati: correlati,
				personalizzazione: check_personalizzazione,
				marca: product.marca,
				lunghezza: product.schedaTecnica[0].lunghezza,
				larghezza: product.schedaTecnica[0].larghezza,
				peso: product.schedaTecnica[0].peso,
				altezza: product.schedaTecnica[0].altezza,
				materiale: product.schedaTecnica[0].materiale,
				sconto: product.offerta
			});
		}
		else if (numColori == 7) {
			form.setFieldsValue({
				cost: product.prezzo,
				description: product.descrizione,
				category: product.categoria,
				Colori: listaColori,
				numColore0: stockColore[0],
				numColore1: stockColore[1],
				numColore2: stockColore[2],
				numColore3: stockColore[3],
				numColore4: stockColore[4],
				numColore5: stockColore[5],
				numColore6: stockColore[6],
				name: product.nomeArticolo,
				gratis: gratis,

				price: product.prezzo,
				sottocat: product.sottoCategoria,
				ultimiArrivi: check_ultimi,
				correlati: correlati,
				personalizzazione: check_personalizzazione,
				marca: product.marca,
				lunghezza: product.schedaTecnica[0].lunghezza,
				larghezza: product.schedaTecnica[0].larghezza,
				peso: product.schedaTecnica[0].peso,
				materiale: product.schedaTecnica[0].materiale,
				altezza: product.schedaTecnica[0].altezza,
				sconto: product.offerta
			});
		}
		else if (numColori == 8) {
			form.setFieldsValue({
				cost: product.prezzo,
				description: product.descrizione,
				category: product.categoria,
				Colori: listaColori,
				numColore0: stockColore[0],
				numColore1: stockColore[1],
				numColore2: stockColore[2],
				numColore3: stockColore[3],
				numColore4: stockColore[4],
				numColore5: stockColore[5],
				numColore6: stockColore[6],
				numColore7: stockColore[7],
				gratis: gratis,

				name: product.nomeArticolo,
				price: product.prezzo,
				sottocat: product.sottoCategoria,
				ultimiArrivi: check_ultimi,
				correlati: product.correlati.split(","),
				personalizzazione: check_personalizzazione,
				marca: product.marca,
				lunghezza: product.schedaTecnica[0].lunghezza,
				larghezza: product.schedaTecnica[0].larghezza,
				peso: product.schedaTecnica[0].peso,
				altezza: product.schedaTecnica[0].altezza,
				materiale: product.schedaTecnica[0].materiale,
				sconto: product.offerta
			});
		}
		else if (numColori == 9) {
			form.setFieldsValue({
				cost: product.prezzo,
				description: product.descrizione,
				category: product.categoria,
				Colori: listaColori,
				numColore0: stockColore[0],
				numColore1: stockColore[1],
				numColore2: stockColore[2],
				numColore3: stockColore[3],
				numColore4: stockColore[4],
				numColore5: stockColore[5],
				numColore6: stockColore[6],
				numColore7: stockColore[7],
				numColore8: stockColore[8],
				name: product.nomeArticolo,
				gratis: gratis,

				price: product.prezzo,
				sottocat: product.sottoCategoria,
				ultimiArrivi: check_ultimi,
				correlati: product.correlati.split(","),
				personalizzazione: check_personalizzazione,
				marca: product.marca,
				lunghezza: product.schedaTecnica[0].lunghezza,
				larghezza: product.schedaTecnica[0].larghezza,
				peso: product.schedaTecnica[0].peso,
				altezza: product.schedaTecnica[0].altezza,
				materiale: product.schedaTecnica[0].materiale,
				sconto: product.offerta
			});

		}
		else if (numColori == 10) {
			form.setFieldsValue({
				cost: product.prezzo,
				description: product.descrizione,
				category: product.categoria,
				Colori: listaColori,
				numColore0: stockColore[0],
				numColore1: stockColore[1],
				gratis: gratis,

				numColore2: stockColore[2],
				numColore3: stockColore[3],
				numColore4: stockColore[4],
				numColore5: stockColore[5],
				numColore6: stockColore[6],
				numColore7: stockColore[7],
				numColore8: stockColore[8],
				numColore9: stockColore[9],
				name: product.nomeArticolo,
				price: product.prezzo,
				sottocat: product.sottoCategoria,
				ultimiArrivi: check_ultimi,
				correlati: product.correlati.split(","),
				personalizzazione: check_personalizzazione,
				marca: product.marca,
				lunghezza: product.schedaTecnica[0].lunghezza,
				larghezza: product.schedaTecnica[0].larghezza,
				peso: product.schedaTecnica[0].peso,
				altezza: product.schedaTecnica[0].altezza,
				materiale: product.schedaTecnica[0].materiale,
				sconto: product.offerta
			});
		}
		else if (numColori == 11) {
			form.setFieldsValue({
				cost: product.prezzo,
				description: product.descrizione,
				category: product.categoria,
				Colori: listaColori,
				numColore0: stockColore[0],
				numColore1: stockColore[1],
				numColore2: stockColore[2],
				numColore3: stockColore[3],
				numColore4: stockColore[4],
				numColore5: stockColore[5],
				numColore6: stockColore[6],
				numColore7: stockColore[7],
				numColore8: stockColore[8],
				gratis: gratis,

				numColore9: stockColore[9],
				numColore10: stockColore[10],
				name: product.nomeArticolo,
				price: product.prezzo,
				sottocat: product.sottoCategoria,
				ultimiArrivi: check_ultimi,
				correlati: product.correlati.split(","),
				personalizzazione: check_personalizzazione,
				marca: product.marca,
				lunghezza: product.schedaTecnica[0].lunghezza,
				larghezza: product.schedaTecnica[0].larghezza,
				peso: product.schedaTecnica[0].peso,
				altezza: product.schedaTecnica[0].altezza,
				materiale: product.schedaTecnica[0].materiale,
				sconto: product.offerta
			});
		}
		else if (numColori == 12) {
			form.setFieldsValue({
				cost: product.prezzo,
				description: product.descrizione,
				category: product.categoria,
				Colori: listaColori,
				numColore0: stockColore[0],
				numColore1: stockColore[1],
				numColore2: stockColore[2],
				numColore3: stockColore[3],
				numColore4: stockColore[4],
				numColore5: stockColore[5],
				gratis: gratis,

				numColore6: stockColore[6],
				numColore7: stockColore[7],
				numColore8: stockColore[8],
				numColore9: stockColore[9],
				numColore10: stockColore[10],
				numColore11: stockColore[11],
				name: product.nomeArticolo,
				price: product.prezzo,
				sottocat: product.sottoCategoria,
				ultimiArrivi: check_ultimi,

				correlati: product.correlati.split(","),
				personalizzazione: check_personalizzazione,
				marca: product.marca,
				lunghezza: product.schedaTecnica[0].lunghezza,
				altezza: product.schedaTecnica[0].altezza,
				larghezza: product.schedaTecnica[0].larghezza,
				peso: product.schedaTecnica[0].peso,
				materiale: product.schedaTecnica[0].materiale,
				sconto: product.offerta
			});
		}
		else if (numColori == 13) {
			form.setFieldsValue({
				cost: product.prezzo,
				description: product.descrizione,
				category: product.categoria,
				Colori: listaColori,
				numColore0: stockColore[0],
				gratis: gratis,

				numColore1: stockColore[1],
				numColore2: stockColore[2],
				numColore3: stockColore[3],
				numColore4: stockColore[4],
				numColore5: stockColore[5],
				numColore6: stockColore[6],
				numColore7: stockColore[7],
				numColore8: stockColore[8],
				numColore9: stockColore[9],
				numColore10: stockColore[10],
				numColore11: stockColore[11],
				numColore12: stockColore[12],
				name: product.nomeArticolo,
				price: product.prezzo,
				sottocat: product.sottoCategoria,
				ultimiArrivi: check_ultimi,
				correlati: product.correlati.split(","),
				personalizzazione: check_personalizzazione,
				marca: product.marca,
				lunghezza: product.schedaTecnica[0].lunghezza,
				larghezza: product.schedaTecnica[0].larghezza,
				peso: product.schedaTecnica[0].peso,
				altezza: product.schedaTecnica[0].altezza,
				materiale: product.schedaTecnica[0].materiale,
				sconto: product.offerta
			});
		}
		else if (numColori == 14) {
			form.setFieldsValue({
				cost: product.prezzo,
				description: product.descrizione,
				category: product.categoria,
				Colori: listaColori,
				numColore0: stockColore[0],
				numColore1: stockColore[1],
				numColore2: stockColore[2],
				numColore3: stockColore[3],
				numColore4: stockColore[4],
				numColore5: stockColore[5],
				numColore6: stockColore[6],
				numColore7: stockColore[7],
				gratis: gratis,

				numColore8: stockColore[8],
				numColore9: stockColore[9],
				numColore10: stockColore[10],
				numColore11: stockColore[11],
				numColore12: stockColore[12],
				numColore13: stockColore[13],
				name: product.nomeArticolo,
				price: product.prezzo,
				sottocat: product.sottoCategoria,
				ultimiArrivi: check_ultimi,
				correlati: product.correlati.split(","),
				personalizzazione: check_personalizzazione,
				marca: product.marca,
				lunghezza: product.schedaTecnica[0].lunghezza,
				larghezza: product.schedaTecnica[0].larghezza,
				altezza: product.schedaTecnica[0].altezza,
				peso: product.schedaTecnica[0].peso,
				materiale: product.schedaTecnica[0].materiale,
				sconto: product.offerta
			});
		}
		else if (numColori == 15) {
			form.setFieldsValue({
				cost: product.prezzo,
				description: product.descrizione,
				category: product.categoria,
				Colori: listaColori,
				numColore0: stockColore[0],
				numColore1: stockColore[1],
				numColore2: stockColore[2],
				numColore3: stockColore[3],
				numColore4: stockColore[4],
				numColore5: stockColore[5],
				numColore6: stockColore[6],
				numColore7: stockColore[7],
				numColore8: stockColore[8],
				numColore9: stockColore[9],
				numColore10: stockColore[10],
				numColore11: stockColore[11],
				numColore12: stockColore[12],
				numColore13: stockColore[13],
				gratis: gratis,

				numColore14: stockColore[14],
				name: product.nomeArticolo,
				price: product.prezzo,
				sottocat: product.sottoCategoria,
				ultimiArrivi: check_ultimi,
				correlati: product.correlati.split(","),
				personalizzazione: check_personalizzazione,
				marca: product.marca,
				lunghezza: product.schedaTecnica[0].lunghezza,
				larghezza: product.schedaTecnica[0].larghezza,
				altezza: product.schedaTecnica[0].altezza,
				peso: product.schedaTecnica[0].peso,
				materiale: product.schedaTecnica[0].materiale,
				sconto: product.offerta
			});
		}
		else if (numColori == 16) {
			form.setFieldsValue({
				cost: product.prezzo,
				description: product.descrizione,
				category: product.categoria,
				Colori: listaColori,
				numColore0: stockColore[0],
				numColore1: stockColore[1],
				numColore2: stockColore[2],
				numColore3: stockColore[3],
				numColore4: stockColore[4],
				numColore5: stockColore[5],
				numColore6: stockColore[6],
				numColore7: stockColore[7],
				numColore8: stockColore[8],
				numColore9: stockColore[9],
				gratis: gratis,

				numColore10: stockColore[10],
				numColore11: stockColore[11],
				numColore12: stockColore[12],
				numColore13: stockColore[13],
				numColore14: stockColore[14],
				numColore15: stockColore[15],
				name: product.nomeArticolo,
				price: product.prezzo,
				sottocat: product.sottoCategoria,
				ultimiArrivi: check_ultimi,
				correlati: product.correlati.split(","),
				personalizzazione: check_personalizzazione,
				marca: product.marca,
				lunghezza: product.schedaTecnica[0].lunghezza,
				larghezza: product.schedaTecnica[0].larghezza,
				altezza: product.schedaTecnica[0].altezza,
				peso: product.schedaTecnica[0].peso,
				materiale: product.schedaTecnica[0].materiale,
				sconto: product.offerta
			});
		}
		else if (numColori == 17) {
			form.setFieldsValue({
				cost: product.prezzo,
				description: product.descrizione,
				category: product.categoria,
				Colori: listaColori,
				numColore0: stockColore[0],
				numColore1: stockColore[1],
				numColore2: stockColore[2],
				numColore3: stockColore[3],
				numColore4: stockColore[4],
				numColore5: stockColore[5],
				gratis: gratis,

				numColore6: stockColore[6],
				numColore7: stockColore[7],
				numColore8: stockColore[8],
				numColore9: stockColore[9],
				numColore10: stockColore[10],
				numColore11: stockColore[11],
				numColore12: stockColore[12],
				numColore13: stockColore[13],
				numColore14: stockColore[14],
				numColore15: stockColore[15],
				numColore16: stockColore[16],
				name: product.nomeArticolo,
				price: product.prezzo,
				sottocat: product.sottoCategoria,
				ultimiArrivi: check_ultimi,

				correlati: product.correlati.split(","),
				personalizzazione: check_personalizzazione,
				marca: product.marca,
				lunghezza: product.schedaTecnica[0].lunghezza,
				larghezza: product.schedaTecnica[0].larghezza,
				altezza: product.schedaTecnica[0].altezza,
				peso: product.schedaTecnica[0].peso,
				materiale: product.schedaTecnica[0].materiale,
				sconto: product.offerta
			});
		}
		else if (numColori == 18) {
			form.setFieldsValue({
				cost: product.prezzo,
				description: product.descrizione,
				category: product.categoria,
				Colori: listaColori,
				numColore0: stockColore[0],
				numColore1: stockColore[1],
				numColore2: stockColore[2],
				numColore3: stockColore[3],
				numColore4: stockColore[4],
				gratis: gratis,

				numColore5: stockColore[5],
				numColore6: stockColore[6],
				numColore7: stockColore[7],
				numColore8: stockColore[8],
				numColore9: stockColore[9],
				numColore10: stockColore[10],
				numColore11: stockColore[11],
				numColore12: stockColore[12],
				numColore13: stockColore[13],
				numColore14: stockColore[14],
				numColore15: stockColore[15],
				numColore16: stockColore[16],
				numColore17: stockColore[17],
				name: product.nomeArticolo,
				price: product.prezzo,
				sottocat: product.sottoCategoria,
				ultimiArrivi: check_ultimi,
				correlati: product.correlati.split(","),
				personalizzazione: check_personalizzazione,
				marca: product.marca,
				lunghezza: product.schedaTecnica[0].lunghezza,
				larghezza: product.schedaTecnica[0].larghezza,
				peso: product.schedaTecnica[0].peso,
				altezza: product.schedaTecnica[0].altezza,
				materiale: product.schedaTecnica[0].materiale,
				sconto: product.offerta
			});
		}
		else if (numColori == 19) {
			form.setFieldsValue({
				cost: product.prezzo,
				description: product.descrizione,
				category: product.categoria,
				Colori: listaColori,
				numColore0: stockColore[0],
				numColore1: stockColore[1],
				numColore2: stockColore[2],
				numColore3: stockColore[3],
				numColore4: stockColore[4],
				numColore5: stockColore[5],
				numColore6: stockColore[6],
				numColore7: stockColore[7],
				numColore8: stockColore[8],
				numColore9: stockColore[9],
				numColore10: stockColore[10],
				numColore11: stockColore[11],
				numColore12: stockColore[12],
				numColore13: stockColore[13],
				numColore14: stockColore[14],
				numColore15: stockColore[15],
				gratis: gratis,

				numColore16: stockColore[16],
				numColore17: stockColore[17],
				numColore18: stockColore[18],
				name: product.nomeArticolo,
				price: product.prezzo,
				sottocat: product.sottoCategoria,
				ultimiArrivi: check_ultimi,

				correlati: product.correlati.split(","),
				personalizzazione: check_personalizzazione,
				marca: product.marca,
				altezza: product.schedaTecnica[0].altezza,
				lunghezza: product.schedaTecnica[0].lunghezza,
				larghezza: product.schedaTecnica[0].larghezza,
				peso: product.schedaTecnica[0].peso,
				materiale: product.schedaTecnica[0].materiale,
				sconto: product.offerta
			});
		}
		else if (numColori == 20) {
			form.setFieldsValue({
				cost: product.prezzo,
				description: product.descrizione,
				category: product.categoria,
				Colori: listaColori,
				numColore0: stockColore[0],
				numColore1: stockColore[1],
				numColore2: stockColore[2],
				numColore3: stockColore[3],
				numColore4: stockColore[4],
				numColore5: stockColore[5],
				numColore6: stockColore[6],
				numColore7: stockColore[7],
				numColore8: stockColore[8],
				numColore9: stockColore[9],
				numColore10: stockColore[10],
				numColore11: stockColore[11],
				numColore12: stockColore[12],
				numColore13: stockColore[13],
				numColore14: stockColore[14],
				numColore15: stockColore[15],
				numColore16: stockColore[16],
				numColore17: stockColore[17],
				numColore18: stockColore[18],
				gratis: gratis,

				numColore19: stockColore[19],
				name: product.nomeArticolo,
				price: product.prezzo,
				sottocat: product.sottoCategoria,
				ultimiArrivi: check_ultimi,
				correlati: product.correlati.split(","),
				personalizzazione: check_personalizzazione,
				marca: product.marca,
				lunghezza: product.schedaTecnica[0].lunghezza,
				larghezza: product.schedaTecnica[0].larghezza,
				altezza: product.schedaTecnica[0].altezza,
				peso: product.schedaTecnica[0].peso,
				materiale: product.schedaTecnica[0].materiale,
				sconto: product.offerta
			});
		}
	}

	const onChangeTab = (valore) => {
		if (valore != "desc") {
			set_disabilita_bottone(true)
		}
		else {
			set_disabilita_bottone(false)

		}
	}

	/*
	const handler = (valore) => {
		console.log("dentro da child", valore)
	}
	*/

	useEffect(() => {
		//controllo subito il numero di "ultimiArrivi" (a prescindere se mi trovo in Add o Edit product)
		let somma = 0
		getListaProdotti(res => {
			console.log("[USE-EFFECT-RISPOSTA-AXIOS-ALL-PRODOTTI] lista-all-prodotti:", res)
			set_all_prodotti(res)
			for (let i = 0; i < res.length; i++) {
				if (res[i].ultimiArrivi == true) {
					somma = somma + 1
				}
			}
			setNumUltimiArrivi(somma)
			if (mode === EDIT) {
				//se sto in "EDIT" allora mi devo prendere tutti i campi del prodotto e settarli nelle form come campi già compilati
				//console.log('is edit')
				const { id } = param
				const productId = parseInt(id)
				const productData = res.filter(product => product.idArticolo === productId)
				const product = productData[0]
				console.log("[USE-EFFECT] prodotto-selezionato-edit: ", product)
				setProdotto(res.filter(product => product.idArticolo === productId)[0])

			}

		})


	}, [form, mode, param, props]);

	const setProdotto = (product) => {
		let lista_colori_totali = list_all_colors
		let correlati
		if (product.correlati != undefined) {
			//console.log("correlati", product.correlati)
			if (product.correlati.includes(",")) {
				correlati = product.correlati.split(",")
			} else {
				correlati = product.correlati
			}
		}


		let appoggio = []
		let appoggio_colori = []
		let appoggio_foto = []
		let appoggio_colori_disabilitati = []
		let appoggio_lista_colori = []
		for (let i = 0; i < product.coloriDisp.length; i++) {
			appoggio_colori_disabilitati.push({
				value: product.colore.split(",")[i],
				disabled: true
			})
			appoggio.push(product.coloriDisp[i].stock)
			appoggio_lista_colori.push(product.colore.split(",")[i])
			appoggio_colori.push({
				colore: product.colore.split(",")[i],
				indice: product.indiciColori[i].indice
			})
			appoggio_foto.push({ colore: product.colore.split(",")[i], foto: [] })
		}
		for (let i = 0; i < product.coloriDisp.length; i++) {
			for (let j = 0; j < product.coloriDisp[i].image.length; j++) {
				appoggio_foto[i].foto.push(product.coloriDisp[i].image[j])
			}
		}
		for (let i = 0; i < product.coloriDisp.length; i++) {
			const index = lista_colori_totali.indexOf(product.colore.split(",")[i]);

			if (index > -1) {
				lista_colori_totali.splice(index, 1);
			}
			if (i == product.coloriDisp.length - 1) {
				setColori_totali(lista_colori_totali)
				//console.log("colori totali", colori_totali)
			}
		}
		setVettFoto(appoggio_foto)
		setColori_disabilitati(appoggio_colori_disabilitati)
		setListaColori(appoggio_lista_colori)
		setColori(appoggio_colori)
		setidArticolo(product.idArticolo)
		setDispColori(appoggio)
		setCorrelati(correlati)


		if (product.ultimiArrivi) {
			setUltimiArrivi("Si")
		} else {
			setUltimiArrivi("No")
		}
		if (product.gratis) {
			setGratis("Si")
		} else {
			setGratis("No")
		}

		setField(product.coloriDisp.length, appoggio_lista_colori, appoggio, product, correlati)
	}

	const onFinish = () => {
		setSubmitLoading(true)
		form.validateFields().then(values => {
			let vettore = []
			for (let i = 0; i < values.Colori.length; i++) {
				let appoggio = "numColore" + i
				vettore.push({ colore: values.Colori[i], numColore: values[appoggio] })
				if (i == values.Colori.length - 1) {
					values.infoFotoColore = vettore
				}
			}
			if (values.ultimiArrivi == "Si") {
				values.ultimiArrivi = true
			}
			else {
				values.ultimiArrivi = false
			}
			if (values.gratis == "Si") {
				values.gratis = true
			}
			else {
				values.gratis = false
			}
			if (values.personalizzazione == "Si") {
				values.personalizzazione = true
			}
			else {
				values.personalizzazione = false
			}
			if (values.sconto == null) {
				values.sconto = 0
			}

			if (values.lunghezza == null) {
				values.lunghezza = 0
			}
			if (values.larghezza == null) {
				values.larghezza = 0
			}
			if (values.altezza == null) {
				values.altezza = 0
			}
			if (values.peso == null) {
				values.peso = 0
			}
			if (values.materiale == null) {
				values.materiale = "Nessuna informazione disponibile al momento"
			}


			//console.log("ttutt cosss", all_prodotti)

			if (values.correlati != undefined) {
				for (let i = 0; i < values.correlati.length; i++) {
					for (let j = 0; j < all_prodotti.length; j++) {
						if (all_prodotti[j].nomeArticolo == values.correlati[i]) {
							values.correlati[i] = all_prodotti[j].idArticolo
						}
					}
				}
			}

			setTimeout(() => {
				setSubmitLoading(false)
				if (mode === ADD) {
					console.log("values-ADD-conferma:", values)

					insertArticolo(values, res => {
						console.log(res)
						if (res.status === 200) {
							message.success(`Articolo ${values.name} inserito correttamente!`);

							getListaProdotti(res => {
								console.log("[ADD-BUTTON-AXIOS-ALL-PRODOTTI] risposta-get-lista-prodotti:", res)
								set_disabilita_bottone(true)

								//ordinamento degli articoli per prendermi sempre l'ultimo (ovvero quello appena inserito)
								res.sort(function (a, b) {
									var keyA = new Date(a.idArticolo),
										keyB = new Date(b.idArticolo);
									// Compare the 2 dates
									if (keyA < keyB) return -1;
									if (keyA > keyB) return 1;
									return 0;
								});
								for (let i = 0; i < res.length; i++) {
									if (i == res.length - 1) {
										//configuro gli stati per i tab da far uscire
										setidArticolo(res[i].idArticolo)
										let appoggio_colori = []
										for (let j = 0; j < res[i].coloriDisp.length; j++) {
											appoggio_colori.push(
												{
													colore: res[i].colore.split(",")[j],
													indice: res[i].indiciColori[j].indice
												}
											)
										}
										setColori(appoggio_colori)
									}
								}
							})
						}
						else if (res.status === 201) {
							message.error("Attenzione! Si sta utilizzando un nome già associato ad un altro articolo.")

						}
						else {
							message.error("Qualcosa è andato storto! Riprova.")
						}
					})
				}
				if (mode === EDIT) {
					console.log("values-EDIT-conferma:", values)
					getListaProdotti(lista_prodotti => {
						//se sto in "EDIT" allora mi devo prendere tutti i campi del prodotto e settarli nelle form come campi già compilati
						//console.log('is edit')
						const { id } = param
						const productId = parseInt(id)
						const productData = lista_prodotti.filter(product => product.idArticolo === productId)
						const product = productData[0]
						console.log("[PRIMA-UPDATE-EDIT] prodotto-selezionato-edit: ", product)
						setProdotto(lista_prodotti.filter(product => product.idArticolo === productId)[0])
						updateArticolo(idArticolo, vettFoto, values, res => {
							console.log("[RISPOSTA AXIOS UPDATE] articolo:", res)
							if (res.status === 200) {
								set_disabilita_bottone(true)
								let appoggio_colori = []
								let appoggio_foto = []

								for (let j = 0; j < res.data[0].coloriDisp.length; j++) {
									appoggio_colori.push(
										{
											colore: res.data[0].colore.split(",")[j],
											indice: res.data[0].indiciColori[j].indice
										}
									)
									appoggio_foto.push({ colore: res.data[0].colore.split(",")[0], foto: [] })

								}

								for (let i = 0; i < res.data[0].coloriDisp.length; i++) {

									for (let j = 0; j < res.data[0].coloriDisp[i].image.length; j++) {
										appoggio_foto[i].foto.push(res.data[0].coloriDisp[i].image[j])
									}
								}
								setVettFoto(appoggio_foto)
								setColori(appoggio_colori)
								setDisable(true)
								message.success(`Product saved`);
							}
						})
					});
				}
			}, 1500);
		}).catch(info => {
			setSubmitLoading(false)
			message.error('Per favore, inserisci tutti i cambi obbligatori ');
		});
	};

	return (
		<>
			<Form
				layout="vertical"
				form={form}
				name="advanced_search"
				className="ant-advanced-search-form"
				initialValues={{
					heightUnit: 'cm',
					widthUnit: 'cm',
					weightUnit: 'kg'
				}}
			>
				<PageHeaderAlt className="border-bottom" overlap>
					<div className="container">
						<Flex className="py-2" mobileFlex={false} justifyContent="between" alignItems="center">
							<h2 className="mb-3">{mode === 'ADD' ? 'Aggiungi un nuovo prodotto' : `Modifica l'articolo`} </h2>
							<div className="mb-3">
								{!disabilita_bottone &&
									<Button type="primary" onClick={() => onFinish()} htmlType="submit" loading={submitLoading} >
										{mode === 'ADD' ? 'Conferma' : `Conferma modifiche`}
									</Button>
								}
							</div>
						</Flex>
					</div>
				</PageHeaderAlt>
				<div className="container">
					<Tabs defaultActiveKey="1" style={{ marginTop: 30 }} onChange={onChangeTab}>
						{mode == ADD && colori.length == 0 &&
							<TabPane tab="Descrizioni generali" key="desc">
								<GeneralField
									colori={colori}
									listaColori={listaColori}
									numColori={numColori}
									numUltimiArrivi={numUltimiArrivi}
									gratis={gratis}
									ultimiArrivi={ultimiArrivi}
									colori_disabilitati={[]}
									all_prodotti={all_prodotti}
									correlati={correlati}
								/>
							</TabPane>
						}
						{mode == EDIT && colori.length != 0 && !disable && colori_disabilitati.length != 0 && all_prodotti.length != 0 &&
							<TabPane tab="Descrizioni generali" key="desc">
								<GeneralField
									colori={colori}
									listaColori={listaColori}
									numColori={numColori}
									numUltimiArrivi={numUltimiArrivi}
									ultimiArrivi={ultimiArrivi}
									gratis={gratis}
									colori_disabilitati={colori_disabilitati}
									colori_totali={colori_totali}
									all_prodotti={all_prodotti}
									correlati={correlati}
								/>
							</TabPane>
						}
						{mode == ADD && colori.length != 0 &&
							colori.map((elem, key) =>
								<TabPane tab={"Inserisci foto per il colore " + elem.colore} key={key}>
									<UploadImages id={idArticolo} colore={elem.colore} vettFoto={vettFoto} indice={elem.indice} />
								</TabPane>
							)
						}
						{mode == EDIT && colori.length != 0 && all_prodotti.length != 0 &&
							colori.map((elem, key) =>
								<TabPane tab={"Foto per il colore " + elem.colore} key={key}>
									<UploadImages id={idArticolo} colore={elem.colore} vettFoto={vettFoto} indice={elem.indice} />
								</TabPane>
							)

						}

					</Tabs>
				</div>
			</Form>
		</>
	)
}

export default ProductForm
