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

	var productJSON = {}
	
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

	const [prenotazioni,setPrenotazioni] = useState([])
	const [disable, setDisable] = useState(false)
	const [colori_disabilitati, setColori_disabilitati] = useState([])
	const [taglie_disabilitate, setTaglie_disabilitate] = useState([])

	const [colori_totali, setColori_totali] = useState([])
	const [taglie_totali, setTaglie_totali] = useState([])

	const [prezzo, setPrezzo] = useState(0)
	const [sconto, setSconto] = useState(0)


	const [all_prodotti, set_all_prodotti] = useState([])
	const [disabilita_bottone, set_disabilita_bottone] = useState(false)

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
		my_json["descrizione_personalizzazione"] = product.descrizione_personalizzazione
		//my_json["prezzoScontato"] = product.prezzo + product.offerta

		//console.log("my_json", my_json)

		//console.log("stringa_taglia", stringa_taglia)
		//console.log("listaColori", listaColori)
		form.setFieldsValue(my_json);

		productJSON = my_json
		//console.log("form", form.getFieldsValue())
	}

	const setField = (numColori, listaColori, stockColore, prenotazioneTaglia, taglie, product, correlati, res_all_prodotti) => {
		////console.log(correlati)
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

		//console.log("correlati", correlati)
		//console.log("all_prodotti", res_all_prodotti)
		//console.log("prenotazioneTaglia", prenotazioneTaglia)

		if (product.correlati == "undefined") {
			correlati = []
		} else {
			//console.log("values.correlati", product.correlati)
			for (let i = 0; i < res_all_prodotti.length; i++) {
				for (let j = 0; j < correlati.length; j++) {
					if (correlati[j] == res_all_prodotti[i].idArticolo) {
						//console.log("qui in if 121")
						correlati[j] = res_all_prodotti[i].nomeArticolo
					}
				}
			}
		}

		//console.log("correlati dopo", correlati)

		//console.log("taglie", taglie)
		//console.log("stockColore", stockColore)
		let stringa_taglia = ""
		//console.log("taglie", taglie)

		for (let i = 0; i < taglie.length; i++) {
			appoggio_taglie_disab = []
			for (let j = 0; j < taglie[i].value.length; j++) {
				if (taglie[i].value[j].taglia == 'tagliau') {
					appoggio_taglie_disab.push("TAGLIA_UNICA")
				} else {
					appoggio_taglie_disab.push(taglie[i].value[j].taglia)
				}
				if (j == taglie[i].value.length - 1) {
					taglie_disab.push(appoggio_taglie_disab)
				}
			}
		}

		let my_json = {}

		for (let i = 0; i < taglie.length; i++) {
			my_json["numTaglia" + i] = taglie_disab[i]
			stringa_taglia += `numTaglia` + i + ` :'` + taglie_disab[i] + `',`
			for (let j = 0; j < taglie[i].value.length; j++) {
				stringa_taglia += `numColore` + i + `numStock` + j + ` :'` + taglie[i].value[j].stock + `',`
				my_json["numColore" + i + "numStock" + j] = taglie[i].value[j].stock
				my_json["numColore" + i + "prenotazione" + taglie[i].value[j].taglia] = taglie[i].value[j].prenotazione
				if (taglie[i].value[j].prenotazione == "Si") {
					my_json["numColore" + i + "stock" + taglie[i].value[j].taglia] = taglie[i].value[j].giorni
				}
			}
		}
		//console.log(JSON.parse(JSON.stringify(stringa_taglia)))
		//console.log("my_json", my_json)

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
			//console.log("[USE-EFFECT-RISPOSTA-AXIOS-ALL-PRODOTTI] lista-all-prodotti:", res)
			set_all_prodotti(res)
			for (let i = 0; i < res.length; i++) {
				if (res[i].ultimiArrivi == true) {
					somma = somma + 1
				}
			}
			setNumUltimiArrivi(somma)

			if (mode === EDIT) {
				//se sto in "EDIT" allora mi devo prendere tutti i campi del prodotto e settarli nelle form come campi già compilati
				////console.log('is edit')
				const { id } = param
				const productId = parseInt(id)
				const productData = res.filter(product => product.idArticolo === productId)
				const product = productData[0]
				//console.log("[USE-EFFECT] prodotto-selezionato-edit: ", product)
				setProdotto(product, res)

			}

		})


	}, [form, mode, param, props]);

	const setProdotto = (product, res_all_prodotti) => {
		//MODIFICA ALE PER PRENOTAZIONE
		let vect_prenotazioni = []
		let lista_colori_totali = list_all_colors
		let lista_taglie_totali = list_all_taglie
		let correlati

		if (product.correlati != undefined) {
			////console.log("correlati", product.correlati)
			if (product.correlati.includes(",")) {
				correlati = product.correlati.split(",")
			} else {
				correlati = [product.correlati]
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


		
		// AGGIUNGERE QUI LISTE UGUALI IN APPCONFIGS.JS
		for (let i = 0; i < product.coloriDisp.length; i++) {
			let appoggio_taglie = [] // NEWWW
			//MODIFICA ALE PER PRENOTAZIONE
			vect_prenotazioni.push(product.coloriDisp[i].size)
			setPrenotazioni(vect_prenotazioni)

			appoggio_lista_taglie_totali.push(
				[

					"TAGLIA_UNICA",

					"XS",
					"S",
					"M",
					"L",
					"XL",
					"XXL",

					"Small",
					"Large",


					"0 mesi",
					"1 mese",
					"2 mesi",
					"3 mesi",
					"4 mesi",
					"5 mesi",
					"6 mesi",
					"7 mesi",
					"8 mesi",
					"9 mesi",
					"10 mesi",
					"11 mesi",
					"12 mesi",

					"0-6 mesi",
					"0-2 mesi",
					"6-18 mesi",
					"0 +",
					"0-4 mesi",
					"4-18 mesi",
					"2-4 mesi",

					"75ml",
					"100ml",
					"120ml",
					"150ml",
					"200ml",
					"240ml",
					"270ml",
					"300ml",
					"340ml",
					"360ml",
					"400ml",
					"500ml",
					"18mesi +"
				]
			)

			let appoggio_taglie_render = [] // NEWWW

			appoggio_colori_disabilitati.push({
				value: product.colore.split(",")[i],
				disabled: true
			})

			//
			//console.log("prima del for", product.coloriDisp[i])
			for (let j = 0; j < Object.keys(product.coloriDisp[i].size).length; j++) {
				if (Object.keys(product.coloriDisp[i].size)[j] == "TAGLIA_UNICA") {
					if (product.coloriDisp[i].size[Object.keys(product.coloriDisp[i].size)[j]].prenotazione == "Si") {
						appoggio_taglie.push({
							"taglia": "TAGLIA_UNICA",
							"stock": product.coloriDisp[i].size[Object.keys(product.coloriDisp[i].size)[j]].stock,
							"prenotazione": product.coloriDisp[i].size[Object.keys(product.coloriDisp[i].size)[j]].prenotazione,
							"giorni": product.coloriDisp[i].size[Object.keys(product.coloriDisp[i].size)[j]].giorni
						})
					} else {
						appoggio_taglie.push({
							"taglia": "TAGLIA_UNICA",
							"stock": product.coloriDisp[i].size[Object.keys(product.coloriDisp[i].size)[j]].stock,
							"prenotazione": product.coloriDisp[i].size[Object.keys(product.coloriDisp[i].size)[j]].prenotazione
						})
					}

					appoggio_lista_taglie.push("TAGLIA_UNICA")
					appoggio_taglie_render.push("TAGLIA_UNICA")
				} else {
					if (product.coloriDisp[i].size[Object.keys(product.coloriDisp[i].size)[j]].prenotazione == "Si") {
						appoggio_taglie.push({
							"taglia": Object.keys(product.coloriDisp[i].size)[j],
							"stock": product.coloriDisp[i].size[Object.keys(product.coloriDisp[i].size)[j]].stock,
							"prenotazione": product.coloriDisp[i].size[Object.keys(product.coloriDisp[i].size)[j]].prenotazione,
							"giorni": product.coloriDisp[i].size[Object.keys(product.coloriDisp[i].size)[j]].giorni
						})
					} else {
						appoggio_taglie.push({
							"taglia": Object.keys(product.coloriDisp[i].size)[j],
							"stock": product.coloriDisp[i].size[Object.keys(product.coloriDisp[i].size)[j]].stock,
							"prenotazione": product.coloriDisp[i].size[Object.keys(product.coloriDisp[i].size)[j]].prenotazione
						})
					}
					appoggio_lista_taglie.push(Object.keys(product.coloriDisp[i].size)[j])
					appoggio_taglie_render.push(Object.keys(product.coloriDisp[i].size)[j])
				}

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
					////console.log("appoggio_lista_taglie", appoggio_lista_taglie)
					//console.log("appoggio_taglie", appoggio_taglie)
				}
			}
			////console.log("disab taglie: ", appoggio_taglie_disabilitate)


			appoggio.push(product.coloriDisp[i].stock)
			appoggio_lista_colori.push(product.colore.split(",")[i])
			appoggio_colori.push({
				colore: product.colore.split(",")[i],
				indice: product.indiciColori[i].indice
			})
			appoggio_foto.push({ colore: product.colore.split(",")[i], foto: [] })
		}

		//console.log("appoggio_taglie_disabilitate", appoggio_taglie_disabilitate)
		let appoggio_render_3 = []
		let appoggio_render_4 = []
		let appoggio_render_numeri = []
		let appoggio_numeri_impostati_render = []
		//
		let stock_appoggio = []
		let stock_disp = []

		let prenotazione_appoggio = []
		let prenotazione_disp = []
		//
		let appoggio_taglie_disabilitate_render_4 = []
		for (let i = 0; i < appoggio_taglie_disabilitate.length; i++) {
			appoggio_render_3 = []
			appoggio_render_4 = []
			appoggio_render_numeri = []
			stock_appoggio = []
			prenotazione_appoggio = []
			for (let j = 0; j < appoggio_taglie_disabilitate[i].value.length; j++) {
				if (appoggio_taglie_disabilitate[i].value[j].taglia === 'tagliau') {
					appoggio_render_3.push(
						{
							value: "TAGLIA_UNICA",
							disabled: true
						})
					appoggio_render_4.push("TAGLIA_UNICA")

				} else {
					appoggio_render_3.push(
						{
							value: appoggio_taglie_disabilitate[i].value[j].taglia,
							disabled: true
						})

					appoggio_render_4.push(appoggio_taglie_disabilitate[i].value[j].taglia)
				}

				appoggio_render_numeri.push(appoggio_taglie_disabilitate[i].value[j].stock)
				stock_appoggio.push(appoggio_taglie_disabilitate[i].value[j].stock)
				prenotazione_appoggio.push(appoggio_taglie_disabilitate[i].value[j].prenotazione)


				if (j == appoggio_taglie_disabilitate[i].value.length - 1) {
					appoggio_taglie_disabilitate_render_3.push(appoggio_render_3)
					appoggio_taglie_disabilitate_render_4.push(appoggio_render_4)
					appoggio_numeri_impostati_render.push(appoggio_render_numeri)
					stock_disp.push(stock_appoggio)
					prenotazione_disp.push(prenotazione_appoggio)
				}
				if (i == appoggio_taglie_disabilitate.length - 1 && j == appoggio_taglie_disabilitate[i].value.length - 1) {
					setTaglie_disabilitate(appoggio_taglie_disabilitate_render_3)
					setListaTaglie(appoggio_taglie_disabilitate_render_4)
					setDispColori(appoggio_numeri_impostati_render)
					//console.log("appoggio_taglie_disabilitate_render_3", appoggio_taglie_disabilitate_render_3)
					//console.log("appoggio_taglie_disabilitate_render_4", appoggio_taglie_disabilitate_render_4)
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
					////console.log("appoggio_lista_taglie_totali (props.taglie_totali)",appoggio_lista_taglie_totali)
					setTaglie_totali(appoggio_lista_taglie_totali)
				}
			}
			const index = lista_colori_totali.indexOf(product.colore.split(",")[i]);

			if (index > -1) {
				lista_colori_totali.splice(index, 1);
			}

			if (i == product.coloriDisp.length - 1) {
				setColori_totali(lista_colori_totali)
				////console.log("colori totali", colori_totali)
			}
		}
		setVettFoto(appoggio_foto)
		setColori_disabilitati(appoggio_colori_disabilitati)
		//setTaglie_disabilitate(appoggio_taglie_disabilitate_render_3)
		setListaColori(appoggio_lista_colori)
		setColori(appoggio_colori)
		setidArticolo(product.idArticolo)
		setCorrelati(correlati)

		setPrezzo(product.prezzo)
		setSconto(product.offerta)


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

		setField(product.coloriDisp.length, appoggio_lista_colori, stock_disp, prenotazione_disp, appoggio_taglie_disabilitate, product, correlati, res_all_prodotti)
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


			////console.log("ttutt cosss", all_prodotti)

			if (values.correlati != undefined) {
				//console.log("values.correlati", values.correlati)
				for (let i = 0; i < values.correlati.length; i++) {
					for (let j = 0; j < all_prodotti.length; j++) {
						if (all_prodotti[j].nomeArticolo == values.correlati[i]) {
							values.correlati[i] = all_prodotti[j].idArticolo
						}
					}
				}
			}
			////console.log("values-ADD-conferma:", values)
			// TESTARE QUIIIIIIIIII
			let trovato_tagliau = false
			let errore_tagliau = false
			for (let i = 0; i < values.Colori.length; i++) {
				trovato_tagliau = false
				for (let j = 0; j < values["numTaglia" + i].length; j++) {
					if (values["numTaglia" + i][j] == "TAGLIA_UNICA") {
						trovato_tagliau = true
					}
					////console.log("length taglia: ", values["numTaglia" + i].length)
					////console.log("trovato taglia unica: ", trovato_tagliau)
					if (j == values["numTaglia" + i].length - 1 && trovato_tagliau == true && values["numTaglia" + i].length > 1) {
						errore_tagliau = true
					} else if (j == values["numTaglia" + i].length - 1 && trovato_tagliau == true && values["numTaglia" + i].length == 1) {
						values["numTaglia" + i] = ["TAGLIA_UNICA"]
					}
				}
			}

			setTimeout(() => {
				setSubmitLoading(false)
				if (mode === ADD && !errore_tagliau) {
					console.log("values-ADD-conferma:", values)

					insertArticolo(values, res => {
						//console.log(res)
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
				if (mode === EDIT && !errore_tagliau) {
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
						setProdotto(lista_prodotti.filter(product => product.idArticolo === productId)[0], lista_prodotti)
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
								console.log("alessandrissimo 200")
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
				else if (errore_tagliau) {
					setSubmitLoading(false)
					message.error("C'è un errore su una delle taglie! TAGLIA UNICA non può essere associata insieme ad altre taglie");
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
						{mode == ADD && colori.length == 0 && all_prodotti.length != 0 &&
							<TabPane tab="Descrizioni generali" key="desc">
								<GeneralField
									colori={colori}
									taglie={taglie}
									listaColori={listaColori}
									listaTaglie={listaTaglie}
									productJSON={productJSON}

									numColori={numColori}
									numUltimiArrivi={numUltimiArrivi}
									gratis={gratis}
									ultimiArrivi={ultimiArrivi}

									colori_disabilitati={[]}
									taglie_disabilitate={[]}

									all_prodotti={all_prodotti}
									correlati={correlati}

									prezzo = {0}
									sconto = {0}

									mode = {mode}
								/>
							</TabPane>
						}
						{mode == EDIT && all_prodotti.length != 0 && colori.length != 0 && taglie.length != 0 && taglie_totali.length != 0 && taglie_disabilitate.length != 0 && !disable && colori_disabilitati.length != 0 && all_prodotti.length != 0 &&
							<TabPane tab="Descrizioni generali" key="desc">
								<GeneralField

									colori={colori}
									taglie={taglie}


									productJSON={productJSON}
									listaColori={listaColori}
									listaTaglie={listaTaglie}
									prenotazioni={prenotazioni}
									
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


									prezzo = {prezzo}
									sconto = {sconto}

									mode = {mode}

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