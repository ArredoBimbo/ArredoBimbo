import axios from "axios"
import { IP } from 'configs/AppConfig';
import ls from 'local-storage'

import firebase from 'firebase/app';

const createToken = async () => {
    const user = firebase.auth().currentUser;
    console.log(user)

    const token = user && (await user.getIdToken());
    const payloadHeader = {
        headers: {
            "Authorization": "Bearer " + token,
        },
    };
    return payloadHeader;
}


const uploadFoto = async function (id, indice, vettore_url, callback) {
    const header = await createToken();
    axios.post(IP + "/uploadFoto", { url: vettore_url, id: id, indice: indice }, header)
        .then(response => {
            callback(response.data);
        }).catch(err => {
            console.log(err);
        })
}

const getListaProdotti = async function (callback) {
    const header = await createToken();
    axios.get(IP + '/lista-prodotti-dashboard', header).then(response => {
        ls.set('lista_prodotti', response.data)
        callback(response.data);
    }).catch(err => {
        console.log(err);
    })
}

const getAcquisti = async function (all_prodotti, callback) {
    const header = await createToken();
    axios.get(IP + '/lista-acquisti', header).then(res => {
        let filtraggio = []
        for (let i = 0; i < res.data.length; i++) {
            for (let j = 0; j < all_prodotti.length; j++) {
                if (all_prodotti[j].idArticolo == res.data[i].idArticoloAcquistato) {
                    filtraggio.push({
                        id: res.data[i].idAcquisto,
                        name: res.data[i].nome + " " + res.data[i].cognome,
                        image: '',
                        date: res.data[i].dataAcquisto.split("T")[0],
                        amount: res.data[i].totalePrezzo,
                        numeroacquisti: res.data[i].numeroAcquisti,
                        orderStatus: res.data[i].stato,
                        colore: all_prodotti[j].coloriDisp[res.data[i].indiceColore].color,
                        nomearticolo: res.data[i].nomeArticolo,
                        articoloCompleto: res.data[i],
                        tracking: res.data[i].nrtracking,
                        idordine: res.data[i].idordine,
                        personalizzazione: res.data[i].personalizzazione
                    })
                    if (i == res.data.length - 1) {
                        callback(filtraggio)
                    }
                }
            }
        }
    }).catch(err => {
        console.log(err);
    })
}

const insertArticolo = function (values, callback) {
    axios.post(IP + '/insertArticoli', values).then(response => {
        callback(response);
    }).catch(err => {
        console.log(err);
    })
}

const updateArticolo = function (idArticolo, foto, values, callback) {
    console.log("idArt", idArticolo)
    console.log("listaFoto", foto)
    console.log("values", values)
    axios.put(IP + '/updateArticolo', { id: idArticolo, lista_foto: foto, values: values }).then(response => {
        callback(response);
    }).catch(err => {
        console.log(err);
    })
}

const getFoto = function (callback) {
    axios.get(IP + '/lista-foto').then(response => {
        callback(response.data);
    }).catch(err => {
        console.log(err);
    })
}

const getOrdiniOdierni = function (all_prodotti, callback) {
    axios.get(IP + '/ordini-odierni').then(response => {
        let appoggio = []
        for (let i = 0; i < response.data.length; i++) {
            for (let j = 0; j < all_prodotti.length; j++) {
                if (all_prodotti[j].idArticolo === response.data[i].idArticoloAcquistato) {
                    if (response.data.Nome != null && response.data.Cognome != null) {
                        appoggio.push({
                            id: i,
                            name: response.data[i].Nome + ' ' + response.data[i].Cognome,
                            amount: response.data[i].totalePrezzo,
                            articolo: all_prodotti[j].nomeArticolo,
                            numero_acquisti: response.data[i].numeroAcquisti
                        })
                    } else {
                        appoggio.push({
                            id: i,
                            name: response.data[i].emailAcquirente,
                            amount: response.data[i].totalePrezzo,
                            articolo: all_prodotti[j].nomeArticolo,
                            numero_acquisti: response.data[i].numeroAcquisti
                        })
                    }
                    if (i == response.data.length - 1) {
                        callback(appoggio);
                    }
                }
            }
        }
    }).catch(err => {
        console.log(err);
    })
}

const topAcquisti = function (all_prodotti, data, callback) {
    axios.post(IP + '/top-acquisti', { periodo: data }).then(response => {
        let filtraggio = []
        for (let i = 0; i < response.data.length; i++) {
            for (let j = 0; j < all_prodotti.length; j++) {
                if (all_prodotti[j].idArticolo == response.data[i].idArticoloAcquistato) {
                    if (all_prodotti[j].coloriDisp[response.data[i].indiceColore].image.length == 0) {
                        filtraggio.push({
                            name: all_prodotti[j].nomeArticolo,
                            image: '',
                            category: all_prodotti[j].categoria,
                            sales: response.data[i].sum,
                            status: 'up',
                            venduti: response.data[i].numerototaleacquisti
                        })

                    } else {
                        filtraggio.push({
                            name: all_prodotti[j].nomeArticolo,
                            image: all_prodotti[j].coloriDisp[response.data[i].indiceColore].image[0],
                            category: all_prodotti[j].categoria,
                            sales: response.data[i].sum,
                            status: 'up',
                            venduti: response.data[i].numerototaleacquisti
                        })
                    }
                    if (i == response.data.length - 1) {
                        callback(filtraggio);
                    }
                }
            }

        }
    }).catch(err => {
        console.log(err);
    })
}

const updateTracking = function (track, id, callback) {
    axios.put(IP + '/update-tracking', { tracking: track, indice: id  }).then(response => {
        callback(response);
    }).catch(err => {
        console.log(err);
    })
}


const confermaTracking = function (id, callback) {
    axios.put(IP + '/conferma-tracking', { indice: id  }).then(response => {
        callback(response);
    }).catch(err => {
        console.log(err);
    })
}

const insertFotoECommerce = function (url, colonna, callback) {

    axios.post(IP + "/insert-foto-ecommerce", { url: url, colonna_db: colonna })
        .then(response => {
            callback(response);
        }).catch(err => {
            console.log(err);
        })
}

const uploadFotoECommerce = function (url, colonna, callback) {

    axios.put(IP + "/upload-foto-ecommerce", { url: url, colonna_db: colonna })
        .then(response => {
            callback(response.data);
        }).catch(err => {
            console.log(err);
        })
}

export {
    uploadFoto,
    getListaProdotti,
    getAcquisti,
    updateArticolo,
    insertArticolo,
    getFoto,
    getOrdiniOdierni,
    topAcquisti,
    updateTracking,
    confermaTracking,
    insertFotoECommerce,
    uploadFotoECommerce
}