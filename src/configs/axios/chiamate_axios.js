import axios from "axios"
import { IP } from 'configs/IP';
import ls from 'local-storage'

import firebase from 'firebase/app';

const createToken = async () => {
    const user = firebase.auth().currentUser;
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
            console.log("vettore_url",vettore_url)
            callback(response.data, vettore_url);
        }).catch(err => {
            console.log(err);
        })
}

const deleteTmp = async function (callback) {
    const header = await createToken();
    axios.get(IP + '/delete-tmp', header).then(response => {
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

const getAcquistiTmp = async function (callback) {
    const header = await createToken();
    axios.get(IP + '/acquisti-tmp', header).then(response => {
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
                    console.log(res.data[i])
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
                        personalizzazione: res.data[i].personalizzazione,
                        taglia: res.data[i].taglia
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

const insertArticolo = async function (values, callback) {
    const header = await createToken();
    axios.post(IP + '/insertArticoli', values, header).then(response => {
        callback(response);
    }).catch(err => {
        console.log(err);
    })
}

const updateArticolo = async function (idArticolo, foto, values, callback) {
    const header = await createToken();
    axios.put(IP + '/updateArticolo', { id: idArticolo, lista_foto: foto, values: values }, header).then(response => {
        callback(response);
    }).catch(err => {
        console.log(err);
    })
}

const getFoto = async function (callback) {
    const header = await createToken();
    axios.get(IP + '/lista-foto', header).then(response => {
        callback(response.data);
    }).catch(err => {
        console.log(err);
    })
}

const getOrdiniOdierni = async function (all_prodotti, callback) {
    const header = await createToken();
    axios.get(IP + '/ordini-odierni', header).then(response => {
        let appoggio = []
        if (response.data.length != 0) {
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
        } else {
            callback(appoggio);
        }
    }).catch(err => {
        console.log(err);
    })
}

const topAcquisti = async function (all_prodotti, data, callback) {
    const header = await createToken();
    axios.post(IP + '/top-acquisti', { periodo: data }, header).then(response => {
        let filtraggio = []
        if (response.data.length != 0) {
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
        } else {
            callback(filtraggio);
        }

    }).catch(err => {
        console.log(err);
    })
}

const updateTracking = async function (track, vendor,id, callback) {
    const header = await createToken();
    axios.put(IP + '/update-tracking', { tracking: track,vendortracking: vendor,indice: id }, header).then(response => {
        callback(response);
    }).catch(err => {
        console.log(err);
    })
}


const confermaTracking = async function (id, callback) {
    const header = await createToken();

    axios.put(IP + '/conferma-tracking', { indice: id }, header).then(response => {
        callback(response);
    }).catch(err => {
        console.log(err);
    })
}

const insertFotoECommerce = async function (url, colonna, callback) {
    const header = await createToken();

    axios.post(IP + "/insert-foto-ecommerce", { url: url, colonna_db: colonna }, header)
        .then(response => {
            callback(response);
        }).catch(err => {
            console.log(err);
        })
}

const uploadFotoECommerce = async function (url, colonna, callback) {
    const header = await createToken();

    axios.put(IP + "/upload-foto-ecommerce", { url: url, colonna_db: colonna }, header)
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
    uploadFotoECommerce,
    getAcquistiTmp,
    deleteTmp
}