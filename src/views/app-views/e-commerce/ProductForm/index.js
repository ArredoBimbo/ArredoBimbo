import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd';
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'
import ls from 'local-storage';
import UploadImages from "./PhotoTabs/UploadImages";
import { getListaProdotti, updateArticolo, insertArticolo } from 'configs/axios/chiamate_axios'
import { colori, taglie_tutte } from 'configs/AppConfig'

const list_all_colors = colori
const list_all_taglie = taglie_tutte
const { TabPane } = Tabs;

const ADD = 'ADD'
const EDIT = 'EDIT'

const ProductForm = props => {

	const { mode = ADD, param } = props

	const [form] = Form.useForm();
	const [submitLoading, setSubmitLoading] = useState(false)

	const [colori, setColori] = useState([])
	const [taglie, setTaglie] = useState([])

	const [correlati, setCorrelati] = useState([])
	const [idArticolo, setidArticolo] = useState([])
	const [numColori, setDispColori] = useState([])
	const [vettFoto, setVettFoto] = useState([])
	const [numUltimiArrivi, setNumUltimiArrivi] = useState([])
	const [personalizzazione, set_personalizzazione] = useState([])
	const [gratis, setGratis] = useState([])
	const [ultimiArrivi, setUltimiArrivi] = useState([])

	const [listaColori, setListaColori] = useState([])
	const [listaTaglie, setListaTaglie] = useState([])

	const [disable, setDisable] = useState(false)
	const [colori_disabilitati, setColori_disabilitati] = useState([])
	const [taglie_disabilitate, setTaglie_disabilitate] = useState([])

	const [colori_totali, setColori_totali] = useState([])
	const [taglie_totali, setTaglie_totali] = useState([])

	const [all_prodotti, set_all_prodotti] = useState([])
	const [disabilita_bottone, set_disabilita_bottone] = useState(false)



	const setFieldsAllValues_1 = (product, check_ultimi, gratis, check_personalizzazione, correlati, numColori, num_taglie, taglie_disab, taglie) => {
		if (taglie[0].value.length == 1) {
			form.setFieldsValue({
				cost: product.prezzo,
				costo_personalizzazione: product.costo_personalizzazione,
				description: product.descrizione,
				category: product.categoria,
				Colori: listaColori,

				numTaglia0: taglie_disab,
				numColore0numStock0: num_taglie[0],

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
		} else if (taglie[0].value.length == 2) {
			form.setFieldsValue({
				cost: product.prezzo,
				costo_personalizzazione: product.costo_personalizzazione,
				description: product.descrizione,
				category: product.categoria,
				Colori: listaColori,

				numTaglia0: taglie_disab,
				numColore0numStock0: num_taglie[0],
				numColore0numStock1: num_taglie[1],

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
		} else if (taglie[0].value.length == 3) {
			form.setFieldsValue({
				cost: product.prezzo,
				costo_personalizzazione: product.costo_personalizzazione,
				description: product.descrizione,
				category: product.categoria,
				Colori: listaColori,
				numTaglia0: taglie_disab,
				numColore0numStock0: num_taglie[0],
				numColore0numStock1: num_taglie[1],
				numColore0numStock2: num_taglie[2],

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
		} else if (taglie[0].value.length == 4) {
			form.setFieldsValue({
				cost: product.prezzo,
				costo_personalizzazione: product.costo_personalizzazione,
				description: product.descrizione,
				category: product.categoria,
				Colori: listaColori,

				numTaglia0: taglie_disab,
				numColore0numStock0: num_taglie[0],
				numColore0numStock1: num_taglie[1],
				numColore0numStock2: num_taglie[2],
				numColore0numStock3: num_taglie[3],

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
		} else if (taglie[0].value.length == 5) {
			form.setFieldsValue({
				cost: product.prezzo,
				costo_personalizzazione: product.costo_personalizzazione,
				description: product.descrizione,
				category: product.categoria,
				Colori: listaColori,

				numTaglia0: taglie_disab,
				numColore0numStock0: num_taglie[0],
				numColore0numStock1: num_taglie[1],
				numColore0numStock2: num_taglie[2],
				numColore0numStock3: num_taglie[3],
				numColore0numStock4: num_taglie[4],

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
		} else if (taglie[0].value.length == 6) {

		} else if (taglie[0].value.length == 7) {

		} else if (taglie[0].value.length == 8) {

		} else if (taglie[0].value.length == 9) {

		} else if (taglie[0].value.length == 10) {

		} else if (taglie[0].value.length == 11) {

		} else if (taglie[0].value.length == 12) {

		} else if (taglie[0].value.length == 13) {

		}
	}

	const setFieldsAllValues = (product, listaColori, check_ultimi, gratis, check_personalizzazione, correlati, stringa_taglia, my_json) => {

		my_json["cost"] = product.prezzo
		my_json["costo_personalizzazione"] = product.costo_personalizzazione
		my_json["description"] = product.descrizione
		my_json["category"] = product.categoria
		my_json["Colori"] = listaColori
		my_json["name"] = product.nomeArticolo
		my_json["price"] = product.prezzo
		my_json["gratis"] = gratis
		my_json["sottocat"] = product.sottoCategoria
		my_json["correlati"] = correlati
		my_json["ultimiArrivi"] = check_ultimi
		my_json["personalizzazione"] = check_personalizzazione
		my_json["marca"] = product.marca
		my_json["lunghezza"] = product.schedaTecnica[0].lunghezza
		my_json["larghezza"] = product.schedaTecnica[0].larghezza
		my_json["peso"] = product.schedaTecnica[0].peso
		my_json["altezza"] = product.schedaTecnica[0].altezza
		my_json["materiale"] = product.schedaTecnica[0].materiale
		my_json["sconto"] = product.offerta
	
		console.log("stringa_taglia", stringa_taglia)
		console.log("listaColori", listaColori)
		form.setFieldsValue(my_json);
		console.log("form", form.getFieldsValue())
	}

	const setField = (numColori, listaColori, stockColore, taglie, product, correlati) => {
		//console.log(correlati)
		let check_ultimi, gratis
		let check_personalizzazione

		let num_taglie = []
		let appoggio_taglie_disab = []
		let taglie_disab = []
		let all_stock = []
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
			set_personalizzazione("Si")

		}
		else {
			check_personalizzazione = "No"
			set_personalizzazione("No")

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

		console.log("taglie", taglie)
		console.log("stockColore", stockColore)
		let stringa_taglia = ""
		console.log("taglie", taglie)

		for (let i = 0; i < taglie.length; i++) {
			appoggio_taglie_disab = []
			for (let j = 0; j < taglie[i].value.length; j++) {
				appoggio_taglie_disab.push(taglie[i].value[j].taglia)
				if (j == taglie[i].value.length - 1) {
					taglie_disab.push(appoggio_taglie_disab)
				}
			}
		}
		
		let my_json = {}

		for (let i = 0; i < taglie.length; i++) {
			my_json["numTaglia"+i] = taglie_disab[i]
			stringa_taglia += `numTaglia` + i + ` :'` + taglie_disab[i] + `',`
			for (let j = 0; j < taglie[i].value.length; j++) {
				stringa_taglia += `numColore` + i + `numStock` + j + ` :'` + taglie[i].value[j].stock + `',`
				my_json["numColore" + i + "numStock" + j ] = taglie[i].value[j].stock
			}
		}
		console.log(JSON.parse(JSON.stringify(stringa_taglia)))
		console.log("my_json",my_json)
		
		setFieldsAllValues(product, listaColori, check_ultimi, gratis, check_personalizzazione, correlati, JSON.parse(JSON.stringify(stringa_taglia)), my_json);
	}

	const onChangeTab = (valore) => {
		if (valore != "desc") {
			set_disabilita_bottone(true)
		}
		else {
			set_disabilita_bottone(false)

		}
	}

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
		let lista_taglie_totali = list_all_taglie
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

		//
		let appoggio_taglie_disabilitate = []
		let appoggio_taglie_disabilitate_render = []
		let appoggio_lista_taglie = []
		//


		//

		let appoggio_taglie_disabilitate_render_2 = []
		let appoggio_taglie_disabilitate_render_3 = []
		let appoggio_lista_taglie_totali = []

		//

		for (let i = 0; i < product.coloriDisp.length; i++) {
			appoggio_lista_taglie_totali.push(
				[
					'x',
					'y',
					'z'
				]
			)

			let appoggio_taglie = [] // NEWWW
			let appoggio_taglie_render = [] // NEWWW

			appoggio_colori_disabilitati.push({
				value: product.colore.split(",")[i],
				disabled: true
			})

			//
			for (let j = 0; j < Object.keys(product.coloriDisp[i].size).length; j++) {
				appoggio_taglie.push({
					"taglia": Object.keys(product.coloriDisp[i].size)[j],
					"stock": product.coloriDisp[i].size[Object.keys(product.coloriDisp[i].size)[j]].stock
				})

				appoggio_lista_taglie.push(Object.keys(product.coloriDisp[i].size)[j])
				appoggio_taglie_render.push(Object.keys(product.coloriDisp[i].size)[j])
				if (j == Object.keys(product.coloriDisp[i].size).length - 1) {


					appoggio_taglie_disabilitate.push({
						value: appoggio_taglie,
						disabled: true
					})
					appoggio_taglie_disabilitate_render.push({
						value: appoggio_taglie_render,
						disabled: true
					})

					appoggio_taglie_disabilitate_render_2.push([{
						value: appoggio_taglie_render,
						disabled: true
					}])
					setTaglie(appoggio_taglie)
					//console.log("appoggio_lista_taglie", appoggio_lista_taglie)
					//console.log("appoggio_taglie", appoggio_taglie)
				}
			}
			//console.log("disab taglie: ", appoggio_taglie_disabilitate)


			appoggio.push(product.coloriDisp[i].stock)
			appoggio_lista_colori.push(product.colore.split(",")[i])
			appoggio_colori.push({
				colore: product.colore.split(",")[i],
				indice: product.indiciColori[i].indice
			})
			appoggio_foto.push({ colore: product.colore.split(",")[i], foto: [] })
		}





		//console.log("appoggio_taglie_disabilitate",appoggio_taglie_disabilitate)
		let appoggio_render_3 = []
		let appoggio_render_4 = []
		let appoggio_render_numeri = []
		let appoggio_numeri_impostati_render = []
		//
		let stock_appoggio = []
		let stock_disp = []
		//
		let appoggio_taglie_disabilitate_render_4 = []
		for (let i = 0; i < appoggio_taglie_disabilitate.length; i++) {
			appoggio_render_3 = []
			appoggio_render_4 = []
			appoggio_render_numeri = []
			stock_appoggio = []
			for (let j = 0; j < appoggio_taglie_disabilitate[i].value.length; j++) {
				appoggio_render_3.push(
					{
						value: appoggio_taglie_disabilitate[i].value[j].taglia,
						disabled: true
					})
				appoggio_render_numeri.push(appoggio_taglie_disabilitate[i].value[j].stock)
				stock_appoggio.push(appoggio_taglie_disabilitate[i].value[j].stock)
				appoggio_render_4.push(appoggio_taglie_disabilitate[i].value[j].taglia)

				if (j == appoggio_taglie_disabilitate[i].value.length - 1) {
					appoggio_taglie_disabilitate_render_3.push(appoggio_render_3)
					appoggio_taglie_disabilitate_render_4.push(appoggio_render_4)
					appoggio_numeri_impostati_render.push(appoggio_render_numeri)
					stock_disp.push(stock_appoggio)
				}
				if (i == appoggio_taglie_disabilitate.length - 1 && j == appoggio_taglie_disabilitate[i].value.length - 1) {
					setTaglie_disabilitate(appoggio_taglie_disabilitate_render_3)
					setListaTaglie(appoggio_taglie_disabilitate_render_4)
					setDispColori(appoggio_numeri_impostati_render)

				}
			}
		}




		for (let i = 0; i < product.coloriDisp.length; i++) {
			for (let j = 0; j < product.coloriDisp[i].image.length; j++) {
				appoggio_foto[i].foto.push(product.coloriDisp[i].image[j])
			}
		}

		for (let i = 0; i < product.coloriDisp.length; i++) {

			for (let j = 0; j < appoggio_taglie_disabilitate_render_2[i][0].value.length; j++) {
				const index_taglie = appoggio_lista_taglie_totali[i].indexOf(appoggio_taglie_disabilitate_render_2[i][0].value[j])
				if (index_taglie > -1) {
					appoggio_lista_taglie_totali[i].splice(index_taglie, 1);
				}

				if (i == product.coloriDisp.length - 1 && j == appoggio_taglie_disabilitate_render_2[i][0].value.length - 1) {
					//console.log("appoggio_lista_taglie_totali (props.taglie_totali)",appoggio_lista_taglie_totali)
					setTaglie_totali(appoggio_lista_taglie_totali)
				}
			}
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
		//setTaglie_disabilitate(appoggio_taglie_disabilitate_render_3)
		setListaColori(appoggio_lista_colori)
		setColori(appoggio_colori)
		setidArticolo(product.idArticolo)
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

		setField(product.coloriDisp.length, appoggio_lista_colori, stock_disp, appoggio_taglie_disabilitate, product, correlati)
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
					let appoggio_foto = []
					let appoggio_colori_disabilitati = []
					let appoggio_lista_colori = []

					getListaProdotti(lista_prodotti => {
						//se sto in "EDIT" allora mi devo prendere tutti i campi del prodotto e settarli nelle form come campi già compilati
						//console.log('is edit')
						const { id } = param
						const productId = parseInt(id)
						const productData = lista_prodotti.filter(product => product.idArticolo === productId)
						const product = productData[0]
						console.log("[PRIMA-UPDATE-EDIT] prodotto-selezionato-edit: ", product)
						setProdotto(lista_prodotti.filter(product => product.idArticolo === productId)[0])
						for (let i = 0; i < product.coloriDisp.length; i++) {
							appoggio_foto.push({ colore: product.colore.split(",")[i], foto: [] })
						}
						for (let i = 0; i < product.coloriDisp.length; i++) {
							for (let j = 0; j < product.coloriDisp[i].image.length; j++) {
								appoggio_foto[i].foto.push(product.coloriDisp[i].image[j])
							}
						}
						updateArticolo(idArticolo, appoggio_foto, values, res => {
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
									taglie={taglie}
									listaColori={listaColori}
									listaTaglie={listaTaglie}

									numColori={numColori}
									numUltimiArrivi={numUltimiArrivi}
									gratis={gratis}
									ultimiArrivi={ultimiArrivi}

									colori_disabilitati={[]}
									taglie_disabilitate={[]}

									all_prodotti={all_prodotti}
									correlati={correlati}
								/>
							</TabPane>
						}
						{mode == EDIT && colori.length != 0 && taglie.length != 0 && taglie_totali.length != 0 && taglie_disabilitate.length != 0 && !disable && colori_disabilitati.length != 0 && all_prodotti.length != 0 &&
							<TabPane tab="Descrizioni generali" key="desc">
								<GeneralField

									colori={colori}
									taglie={taglie}

									listaColori={listaColori}
									listaTaglie={listaTaglie}

									numColori={numColori}
									numUltimiArrivi={numUltimiArrivi}
									ultimiArrivi={ultimiArrivi}
									gratis={gratis}

									colori_disabilitati={colori_disabilitati}
									taglie_disabilitate={taglie_disabilitate}

									colori_totali={colori_totali}
									taglie_totali={taglie_totali}

									all_prodotti={all_prodotti}
									correlati={correlati}
									personalizzazione={personalizzazione}
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