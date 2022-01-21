import React, { Component } from "react";
import { Upload, Alert, Row, Col, message } from 'antd';
import { Spin, Button, Input } from 'antd';
import { uploadFoto } from 'configs/axios/chiamate_axios'
import { storageRef } from 'auth/FirebaseAuth'
import Swal from 'sweetalert2';

export default class UploadImages extends Component {
  constructor(props) {
    super(props);
    this.selectFiles = this.selectFiles.bind(this);
    this.selectFiles_secondTime = this.selectFiles_secondTime.bind(this);
    this.annullaModifiche = this.annullaModifiche.bind(this);
    this.annullaModifiche_afterUpload = this.annullaModifiche_afterUpload.bind(this);

    this.uploadImages = this.uploadImages.bind(this);
    this.uploadImages_secondTime = this.uploadImages_secondTime.bind(this);
    this.confermaModifiche = this.confermaModifiche.bind(this);
    this.confermaModifiche_afterUpload = this.confermaModifiche_afterUpload.bind(this);



    this.state = {
      selectedFiles: [],
      selectFiles_secondTime: [],
      previewImages: [],
      vettoreFoto: [],
      upload_completo: false,
      caricamento: false,
      vettoreFotoOld: [],
      vettoreFotoAfterUpload: [],
      cancellazione_secondTime: false,
      indiceColore: [],
      cancellazione: false,
      upload_completo_cancellazione: false,
      position_state: [],
      vettoreFotoAfterUpload_secondTime: [],
      enable_loop: true,
      successo: false,
      restoreFoto: [],
      oneTime: true
    };
  }

  componentDidMount() {
    console.log("vettoreFOTO: ", this.props.vettFoto)
    console.log("colore: ", this.props.colore)
    console.log("indice_colore: ", this.props.indice)
    let appoggio = []
    if (this.props.vettFoto.length != 0) {
      if (this.props.vettFoto[this.props.indice].foto.length != 0) {
        for (let i = 0; i < this.props.vettFoto[this.props.indice].foto.length; i++) {
          if (this.props.vettFoto[this.props.indice].foto.length == 1 &&
            this.props.vettFoto[this.props.indice].foto[i] == ""
          ) {
            appoggio.push({
              uid: 0,
              name: "No Image",
              status: 'done',
              url: ''
            })
          } else {
            appoggio.push({
              uid: i,
              name: i,
              status: 'done',
              url: this.props.vettFoto[this.props.indice].foto[i]
            })
          }

        }
      }
      else {
        appoggio.push({
          uid: 0,
          name: "No Image",
          status: 'done',
          url: ''
        })
      }
      this.setState({ vettoreFotoOld: appoggio }, () => {
        console.log("vettoreFotoOld componentDidMount", this.state.vettoreFotoOld)
      });
    } else {
      appoggio.push({
        uid: 0,
        name: "No Image",
        status: 'done',
        url: ''
      })
    }
    this.setState({ vettoreFotoOld: appoggio }, () => {
      console.log("vettoreFotoOld componentDidMount", this.state.vettoreFotoOld)
    });


  }

  selectFiles(event) {
    let images = [];
    var img = []
    let position = []

    for (let i = 0; i < event.target.files.length; i++) {
      images.push(URL.createObjectURL(event.target.files[i]))
      img.push(document.createElement('img'))
    }

    this.setState({
      selectedFiles: event.target.files,
      previewImages: images,
      cancellazione: false,
      upload_completo_cancellazione: false
    }, () => {
      for (let i = 0; i < this.state.selectedFiles.length; i++) {
        img[i].src = this.state.previewImages[i];
        img[i].onload = () => {
          /*        console.log("dentro img", img[i])
                 console.log("NEW IMAGE width", img[i].width);
                 console.log("NEW IMAGE height: ", img[i].height); */
          if (img[i].width < 700 || img[i].height < 800) {
            position.push(i)
          }
        }
      }
      let appoggio = []
      for (let i = 0; i < this.state.selectedFiles.length; i++) {
        appoggio.push({
          uid: i,
          name: this.state.selectedFiles[i].name,
          status: 'done',
          url: this.state.previewImages[i]
        })
      }
      this.setState({ vettoreFoto: appoggio, position_state: position }, () => {
        console.log("vettoreFoto in selectFiles ", this.state.vettoreFoto)
        console.log("position_state in selectFiles ", this.state.position_state)
      })
    });
  }

  selectFiles_secondTime(event) {
    let images = [];
    var img = []
    let position = []

    console.log("event", event)
    console.log("images", images)
    for (let i = 0; i < event.target.files.length; i++) {
      images.push(URL.createObjectURL(event.target.files[i]))
      img.push(document.createElement('img'))
    }

    this.setState({
      selectedFiles: event.target.files,
      previewImages: images,
      cancellazione: false,
      successo: false,
      upload_completo_cancellazione: false

    }, () => {
      for (let i = 0; i < this.state.selectedFiles.length; i++) {
        img[i].src = this.state.previewImages[i];
        img[i].onload = () => {
          /*        console.log("dentro img", img[i])
                 console.log("NEW IMAGE width", img[i].width);
                 console.log("NEW IMAGE height: ", img[i].height); */
          if (img[i].width < 700 || img[i].height < 800) {
            position.push(i)
          }
        }
      }
      let appoggio = []
      for (let i = 0; i < this.state.selectedFiles.length; i++) {
        appoggio.push({
          uid: i,
          name: this.state.selectedFiles[i].name,
          status: 'done',
          url: this.state.previewImages[i]
        })
      }
      this.setState({ vettoreFotoAfterUpload_secondTime: appoggio, position_state: position }, () => {
        console.log("vettoreFotoAfterUpload_secondTime in selectFiles ", this.state.vettoreFotoAfterUpload_secondTime)
        console.log("position_state in selectFiles ", this.state.position_state)
      })
    });
  }

  uploadImages() {
    let appoggio_selected_files = []
    let appoggio_selected_files_chosen = []
    for (let i = 0; i < this.state.selectedFiles.length; i++) {
      appoggio_selected_files.push(this.state.selectedFiles[i].name)
    }

    if (this.state.position_state.length != 0) {


      if (this.state.position_state.length == 1) {
        Swal.fire({
          icon: 'error',
          title: 'Errore!',
          text: `La foto ` + this.state.selectedFiles[0].name + ` non rispetta la risoluzione. Non è stato possibile caricare le foto. Rimuoverla o modificare la risoluzione della foto in questione`
        })
      } else {
        let appoggio_string = ''
        for (let i = 0; i < this.state.position_state.length; i++) {
          appoggio_string += this.state.selectedFiles[this.state.position_state[i]].name + ','
        }
        Swal.fire({
          icon: 'error',
          title: 'Errore!',
          text: `Le foto ` + appoggio_string + ` non rispettano la risoluzione. Non è stato possibile caricare le foto. Rimuoverla o modificare la risoluzione delle foto in questione`
        })
      }
    }
    else {
      this.setState({ caricamento: true, upload_completo_cancellazione: false })
      setTimeout(() => {
        if (this.state.caricamento == true) {
          this.setState({ caricamento: false })
          clearTimeout()
          Swal.fire({
            icon: 'error',
            title: 'Errore di rete!',
            text: `Qualcosa è andato storto nel caricamento delle foto! Riprova.`
          })
        }
      }, 30 * 1000);
      let cont = []

      if (this.state.vettoreFotoOld.length != 0) {
        for (let i = 0; i < this.state.vettoreFotoOld.length; i++) {
          if (this.state.vettoreFotoOld[0].url != "") {
            cont.push(this.state.vettoreFotoOld[i].url)
          }
        }
      }

      console.log("vettoreFoto in uploadImages", this.state.vettoreFoto)
      console.log("vettoreFotoOld in uploadImages", this.state.vettoreFotoOld)
      console.log("selectedFiles in uploadImages", this.state.selectedFiles)
      console.log("position_state in uploadImages", this.state.position_state)

      //controlla innanzitutto se ci sono state delle cancellazioni di vettFoto
      if (this.state.vettoreFoto.length == this.state.selectedFiles.length) {
        let conteggio = 0
        if (this.state.vettoreFotoOld[0].url == "") {
          conteggio = -1
        }

        Array.from(this.state.selectedFiles).forEach(file => {
          storageRef
            .child(`/${Date.now()}-${file.name}`)
            .put(file).then((snapshot) => {
              console.log("mazzeo merda", snapshot.ref.getDownloadURL())
              snapshot.ref.getDownloadURL().then((downloadURL) => {
                cont.push(downloadURL)
                /*                 console.log('File available at', downloadURL);
                                console.log("cont", cont)
                                console.log("new foto len", this.state.selectedFiles.length)
                                console.log("old foto len", this.props.vettFoto.length) */

                console.log("cont len", cont.length)
                console.log("lunghezza vettoreFoto in uploadImages", this.state.vettoreFoto.length)
                console.log("lunghezza vettoreFotoOld in uploadImages", this.state.vettoreFotoOld.length)
                console.log("lunghezza selectedFiles in uploadImages", this.state.selectedFiles.length)
                console.log("lunghezza position_state in uploadImages", this.state.position_state.length)
                console.log("lunghezza vettoreFotoAfterUpload in uploadImages", this.state.vettoreFotoAfterUpload.length)

                if (cont.length == this.state.selectedFiles.length + this.state.vettoreFotoOld.length + conteggio) {
                  console.log("INDICE", this.props.indice)
                  uploadFoto(this.props.id, this.props.indice, cont, (res, all_foto) => {
                    if (res == "UploadCompleto") {
                      this.setState({ upload_completo: true, caricamento: false, selectedFiles: [] }, () => {
                        console.log("ok")
                        let appoggioAfterUpload = []
                        for (let i = 0; i < all_foto.length; i++) {
                          appoggioAfterUpload.push({
                            uid: i,
                            name: i,
                            status: 'done',
                            url: all_foto[i]
                          })
                        }
                        this.setState({ vettoreFotoAfterUpload: appoggioAfterUpload, successo: true }, () => {
                          console.log("vettore foto dopo upload", this.state.vettoreFotoAfterUpload)
                        })
                      })
                    }
                  })
                }
              });
            })
        });
      }
      else {
        console.log(appoggio_selected_files)
        for (var i = appoggio_selected_files.length - 1; i >= 0; i--) {
          for (var j = 0; j < this.state.vettoreFoto.length; j++) {
            if (appoggio_selected_files[i] && (appoggio_selected_files[i] === this.state.vettoreFoto[j].name)) {
              appoggio_selected_files_chosen.push(this.state.selectedFiles[i])
            }
          }
        }
        Array.from(appoggio_selected_files_chosen).forEach(file => {
          storageRef
            .child(`/${Date.now()}-${file.name}`)
            .put(file).then((snapshot) => {
              console.log("mazzeo merda", snapshot.ref.getDownloadURL())
              snapshot.ref.getDownloadURL().then((downloadURL) => {
                cont.push(downloadURL)
                console.log('File available at', downloadURL);
                console.log("cont", cont)
                console.log("cont len", cont.length)
                console.log("new foto len", appoggio_selected_files_chosen.length)
                console.log("old foto len this.state.vettoreFotoOld.length", this.state.vettoreFotoOld.length)
                console.log("vettoreFotoAfterUpload", this.state.vettoreFotoAfterUpload.length)
                console.log("this.state.caricamento", this.state.caricamento)
                if (cont.length == appoggio_selected_files_chosen.length + this.state.vettoreFotoOld.length) {
                  console.log("INDICE", this.props.indice)
                  uploadFoto(this.props.id, this.props.indice, cont, (res, all_foto) => {
                    if (res == "UploadCompleto") {
                      this.setState({ upload_completo: true, caricamento: false, selectedFiles: [] }, () => {
                        console.log("ok")
                        let appoggioAfterUpload = []
                        for (let i = 0; i < all_foto.length; i++) {
                          appoggioAfterUpload.push({
                            uid: i,
                            name: i,
                            status: 'done',
                            url: all_foto[i]
                          })
                        }
                        this.setState({ vettoreFotoAfterUpload: appoggioAfterUpload, successo: true }, () => {
                          console.log("vettore foto dopo upload", this.state.vettoreFotoAfterUpload)
                        })
                      })
                    }
                  })
                }
              });
            })
        });
      }
    }
  }


  uploadImages_secondTime() {
    let appoggio_selected_files = []
    let appoggio_selected_files_chosen = []
    for (let i = 0; i < this.state.selectedFiles.length; i++) {
      appoggio_selected_files.push(this.state.selectedFiles[i].name)
    }

    if (this.state.position_state.length != 0) {


      if (this.state.position_state.length == 1) {
        Swal.fire({
          icon: 'error',
          title: 'Errore!',
          text: `La foto ` + this.state.selectedFiles[0].name + ` non rispetta la risoluzione. Non è stato possibile caricare le foto. Rimuoverla o modificare la risoluzione della foto in questione`
        })
      } else {
        let appoggio_string = ''
        for (let i = 0; i < this.state.position_state.length; i++) {
          appoggio_string += this.state.selectedFiles[this.state.position_state[i]].name + ','
        }
        Swal.fire({
          icon: 'error',
          title: 'Errore!',
          text: `Le foto ` + appoggio_string + ` non rispettano la risoluzione. Non è stato possibile caricare le foto. Rimuoverla o modificare la risoluzione delle foto in questione`
        })
      }
    }
    else {
      this.setState({ caricamento: true, upload_completo_cancellazione: false })
      setTimeout(() => {
        if (this.state.caricamento == true) {
          this.setState({ caricamento: false })
          clearTimeout()
          Swal.fire({
            icon: 'error',
            title: 'Errore di rete!',
            text: `Qualcosa è andato storto nel caricamento delle foto! Riprova.`
          })
        }
      }, 30 * 1000);
      let cont = []

      if (this.state.vettoreFotoAfterUpload.length != 0) {
        for (let i = 0; i < this.state.vettoreFotoAfterUpload.length; i++) {
          if (this.state.vettoreFotoAfterUpload[0].url != "") {
            cont.push(this.state.vettoreFotoAfterUpload[i].url)
          }
        }
      }

      console.log("vettoreFoto in uploadImages", this.state.vettoreFoto)
      console.log("vettoreFotoOld in uploadImages", this.state.vettoreFotoOld)
      console.log("vettoreFotoAfterUpload in uploadImages", this.state.vettoreFotoAfterUpload)
      console.log("selectedFiles in uploadImages", this.state.selectedFiles)
      console.log("position_state in uploadImages", this.state.position_state)

      //controlla innanzitutto se ci sono state delle cancellazioni di vettFoto
      if (this.state.vettoreFotoAfterUpload_secondTime.length == this.state.selectedFiles.length) {
        let conteggio = 0
        if (this.state.vettoreFotoAfterUpload[0].url == "") {
          conteggio = -1
        }

        Array.from(this.state.selectedFiles).forEach(file => {
          storageRef
            .child(`/${Date.now()}-${file.name}`)
            .put(file).then((snapshot) => {
              console.log("mazzeo merda", snapshot.ref.getDownloadURL())
              snapshot.ref.getDownloadURL().then((downloadURL) => {
                cont.push(downloadURL)
                /*                 console.log('File available at', downloadURL);
                                console.log("cont", cont)
                                console.log("new foto len", this.state.selectedFiles.length)
                                console.log("old foto len", this.props.vettFoto.length) */

                console.log("cont len", cont.length)
                console.log("lunghezza vettoreFoto in uploadImages", this.state.vettoreFoto.length)
                console.log("lunghezza vettoreFotoOld in uploadImages", this.state.vettoreFotoOld.length)
                console.log("lunghezza selectedFiles in uploadImages", this.state.selectedFiles.length)
                console.log("lunghezza position_state in uploadImages", this.state.position_state.length)
                console.log("lunghezza vettoreFotoAfterUpload in uploadImages", this.state.vettoreFotoAfterUpload.length)

                if (cont.length == this.state.selectedFiles.length + this.state.vettoreFotoAfterUpload.length + conteggio) {
                  console.log("INDICE", this.props.indice)
                  uploadFoto(this.props.id, this.props.indice, cont, (res, all_foto) => {
                    if (res == "UploadCompleto") {
                      this.setState({ upload_completo: true, caricamento: false, selectedFiles: [] }, () => {
                        console.log("ok")
                        let appoggioAfterUpload = []
                        for (let i = 0; i < all_foto.length; i++) {
                          appoggioAfterUpload.push({
                            uid: i,
                            name: i,
                            status: 'done',
                            url: all_foto[i]
                          })
                        }
                        this.setState({ vettoreFotoAfterUpload: appoggioAfterUpload, vettoreFotoAfterUpload_secondTime: [] }, () => {
                          console.log("vettore foto dopo upload", this.state.vettoreFotoAfterUpload)
                        })
                      })
                    }
                  })
                }
              });
            })
        });
      }
      else {
        console.log(appoggio_selected_files)
        for (var i = appoggio_selected_files.length - 1; i >= 0; i--) {
          for (var j = 0; j < this.state.vettoreFoto.length; j++) {
            if (appoggio_selected_files[i] && (appoggio_selected_files[i] === this.state.vettoreFoto[j].name)) {
              appoggio_selected_files_chosen.push(this.state.selectedFiles[i])
            }
          }
        }
        Array.from(appoggio_selected_files_chosen).forEach(file => {
          storageRef
            .child(`/${Date.now()}-${file.name}`)
            .put(file).then((snapshot) => {
              console.log("mazzeo merda", snapshot.ref.getDownloadURL())
              snapshot.ref.getDownloadURL().then((downloadURL) => {
                cont.push(downloadURL)
                console.log('File available at', downloadURL);
                console.log("cont", cont)
                console.log("cont len", cont.length)
                console.log("new foto len", appoggio_selected_files_chosen.length)
                console.log("old foto len this.state.vettoreFotoAfterUpload.length", this.state.vettoreFotoAfterUpload.length)
                console.log("this.state.caricamento", this.state.caricamento)
                if (cont.length == appoggio_selected_files_chosen.length + this.state.vettoreFotoAfterUpload.length) {
                  console.log("INDICE", this.props.indice)
                  uploadFoto(this.props.id, this.props.indice, cont, (res, all_foto) => {
                    if (res == "UploadCompleto") {
                      this.setState({ upload_completo: true, caricamento: false, selectedFiles: [] }, () => {
                        console.log("ok")
                        let appoggioAfterUpload = []
                        for (let i = 0; i < all_foto.length; i++) {
                          appoggioAfterUpload.push({
                            uid: i,
                            name: i,
                            status: 'done',
                            url: all_foto[i]
                          })
                        }
                        this.setState({ vettoreFotoAfterUpload: appoggioAfterUpload, vettoreFotoAfterUpload_secondTime: [] }, () => {
                          console.log("vettore foto dopo upload", this.state.vettoreFotoAfterUpload)
                        })
                      })
                    }
                  })
                }
              });
            })
        });
      }
    }
  }

  confermaModifiche() {
    let cont = []

    if (this.state.vettoreFotoOld.length != 0) {
      for (let i = 0; i < this.state.vettoreFotoOld.length; i++) {
        cont.push(this.state.vettoreFotoOld[i].url)
      }
    }
    uploadFoto(this.props.id, this.props.indice, cont, (res) => {
      if (res == "UploadCompleto") {
        this.setState({ cancellazione: false, oneTime: true }, () => {
          message.success("Modifica avvenuta correttamente")
        })
      }
    })
  }

  annullaModifiche() {
    console.log("file list", this.state.restoreFoto)

    this.setState({ vettoreFotoOld: this.state.restoreFoto, cancellazione: false })
  }


  annullaModifiche_afterUpload() {
    console.log("file list", this.state.restoreFoto)

    this.setState({ vettoreFotoAfterUpload: this.state.restoreFoto, cancellazione_secondTime: false })
  }

  confermaModifiche_afterUpload() {
    let cont = []

    if (this.state.vettoreFotoAfterUpload.length != 0) {
      for (let i = 0; i < this.state.vettoreFotoAfterUpload.length; i++) {
        cont.push(this.state.vettoreFotoAfterUpload[i].url)
      }
    }
    uploadFoto(this.props.id, this.props.indice, cont, (res) => {
      if (res == "UploadCompleto") {
        this.setState({ cancellazione_secondTime: false, oneTime: true }, () => {
          message.success("Modifica avvenuta correttamente")
        })
      }
    })
  }


  handleChange = ({ fileList }) => {
    console.log("delete")
    console.log("file list", fileList)
    let restoreOldFoto
    if (this.state.oneTime) {
      restoreOldFoto = this.state.vettoreFotoOld
    }
    if (fileList.length >= 1) {
      if (this.state.oneTime) {
        console.log("qui")

        this.setState({ vettoreFotoOld: fileList, cancellazione: true, upload_completo_cancellazione: false, restoreFoto: restoreOldFoto, oneTime: false });
      } else {
        this.setState({ vettoreFotoOld: fileList, cancellazione: true, upload_completo_cancellazione: false });
      }
    }
    else {
      let appoggio = [{
        uid: 0,
        name: 'No Image',
        status: 'done',
        url: ''
      }]

      this.setState({ vettoreFotoOld: appoggio, cancellazione: true, upload_completo_cancellazione: false })
      /*
      Swal.fire({
        icon: 'error',
        title: 'Errore!',
        text: 'Il colore di questo articolo deve avere associato almeno 1 foto!',
      })
      */
    }

  }

  handleChange_newFoto = ({ fileList }) => {
    console.log("delete")
    console.log("file list", fileList)
    if (fileList.length >= 1) {
      this.setState({ vettoreFoto: fileList, upload_completo_cancellazione: false });
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Errore!',
        text: 'Il colore di questo articolo deve avere associato almeno 1 foto!',
      })
    }
  }

  handleChange_newFoto_afterUpload = ({ fileList }) => {
    console.log("delete")
    console.log("file list", fileList)
    let restoreOldFoto

    if (this.state.oneTime) {
      restoreOldFoto = this.state.vettoreFotoAfterUpload
    }
    if (fileList.length >= 1) {
      if (this.state.oneTime) {
        this.setState({ vettoreFotoAfterUpload: fileList, cancellazione_secondTime: true, upload_completo_cancellazione: false, restoreFoto: restoreOldFoto, oneTime: false });
      } else {
        this.setState({ vettoreFotoAfterUpload: fileList, cancellazione_secondTime: true, successo: false, upload_completo_cancellazione: false });
      }
    }
    else {
      let appoggio = [{
        uid: 0,
        name: 'No Image',
        status: 'done',
        url: ''
      }]
      this.setState({ vettoreFotoAfterUpload: appoggio, upload_completo_cancellazione: false })
    }
  }



  handleChange_newFoto_secondTime = ({ fileList }) => {
    console.log("delete")
    console.log("file list", fileList)
    if (fileList.length >= 1) {
      this.setState({ vettoreFotoAfterUpload_secondTime: fileList, upload_completo_cancellazione: false });
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Errore!',
        text: 'Il colore di questo articolo deve avere associato almeno 1 foto!',
      })
    }
  }


  render() {
    const { selectedFiles, previewImages } = this.state;
    return (

      <div>

        {this.state.caricamento == true &&
          <Row style={{ marginTop: '40px' }}>

            <Col span={12}></Col>
            <Col span={8}>
              <Spin size="large" />
            </Col>
            <Col span={2}></Col>

          </Row>

        }

        {!this.state.upload_completo && !this.state.caricamento &&
          <div>

            <div className="clearfix">
              <Alert message="Foto attualmente presenti" type="info" showIcon />
              <Row style={{ marginTop: '20px', marginBottom: '20px' }}>
                <Col span={3}></Col>
                <Col span={18}>
                  <Upload
                    listType="picture-card"
                    fileList={this.state.vettoreFotoOld}
                    onChange={this.handleChange}
                  >
                  </Upload>
                </Col>
                <Col span={3}></Col>

              </Row>
              {this.state.cancellazione &&
                <Row style={{ marginTop: '20px', marginBottom: '20px' }}>
                  <Col span={6}></Col>
                  <Col span={6}>
                    <Button
                      id="Conferma modifiche"
                      onClick={this.confermaModifiche}
                      type="primary"
                      style={{ backgroundColor: '#14ab34eb', borderColor: '#14ab34eb' }}
                    >
                      Conferma modifiche
                    </Button>
                  </Col>

                  <Col span={1}></Col>
                  <Col span={6}>

                    <Button
                      className="btn btn-success btn-sm"
                      onClick={this.annullaModifiche}
                    >
                      Annulla modifiche
                    </Button>
                  </Col>
                  <Col span={6}></Col>
                </Row>

              }
              {this.state.upload_completo_cancellazione &&
                <Alert message="Modifica avvenuta correttamente!" type="success" showIcon />
              }
            </div>



            {previewImages && !this.state.cancellazione && (
              <div>
                <div className="row">
                  <Alert message="Puoi aggiungere nuove foto da associare all'articolo" type="warning" showIcon />

                  <div className="col-8">
                    <label className="btn btn-default p-0">
                      <Input type="file" multiple accept="image/*" onChange={this.selectFiles} />
                    </label>
                  </div>
                </div>
                {this.state.selectedFiles.length != 0 &&
                  <div>
                    <div className="clearfix">
                      <Alert message="Foto scelte" type="info" showIcon />

                      <Upload
                        listType="picture-card"
                        fileList={this.state.vettoreFoto}
                        onChange={this.handleChange_newFoto}

                      >
                      </Upload>

                    </div>
                    <Row style={{ marginTop: '20px' }}>

                      <Col span={9}></Col>
                      <Col span={12}>
                        <Button
                          id="Carica Foto"
                          disabled={!selectedFiles}
                          onClick={this.uploadImages}
                          type="primary"
                          style={{ backgroundColor: '#14ab34eb', borderColor: '#14ab34eb' }}
                        >
                          Carica foto
                        </Button>
                      </Col>
                      <Col span={3}></Col>
                    </Row>
                  </div>
                }

              </div>
            )}


          </div>
        }

        {this.state.upload_completo && !this.state.caricamento &&
          <div>
            {this.state.successo &&
              <Alert
                message="Upload avvenuto con successo!"
                description="Le modifiche sono state effettuate correttamente."
                type="success"
                showIcon
              />
            }
            <div className="clearfix">


              <Alert message="Foto associate al prodotto in questo momento" type="info" showIcon />
              <Row style={{ marginTop: '20px', marginBottom: '20px' }}>
                <Col span={3}></Col>
                <Col span={18}>
                  <Upload
                    listType="picture-card"
                    fileList={this.state.vettoreFotoAfterUpload}
                    onChange={this.handleChange_newFoto_afterUpload}

                  >
                  </Upload>
                </Col>
                <Col span={3}></Col>

              </Row>

            </div>

            {this.state.upload_completo_cancellazione &&
              <Alert message="Modifica avvenuta correttamente!" type="success" showIcon />
            }

            {this.state.cancellazione_secondTime ?
              <Row style={{ marginTop: '20px', marginBottom: '20px' }}>
                <Col span={6}></Col>
                <Col span={6}>
                  <Button
                    id="Conferma modifiche"
                    onClick={this.confermaModifiche_afterUpload}
                    type="primary"
                    style={{ backgroundColor: '#14ab34eb', borderColor: '#14ab34eb' }}
                  >
                    Conferma modifiche
                  </Button>
                </Col>

                <Col span={1}></Col>
                <Col span={6}>

                  <Button
                    className="btn btn-success btn-sm"
                    onClick={this.annullaModifiche_afterUpload}
                  >
                    Annulla modifiche
                  </Button>
                </Col>
                <Col span={6}></Col>
              </Row>

              :
              <div className="row">
                <Alert message="Puoi aggiungere nuove foto da associare all'articolo" type="warning" showIcon />

                <div className="col-8">
                  <label className="btn btn-default p-0">
                    <Input type="file" multiple accept="image/*" onChange={this.selectFiles_secondTime} />
                  </label>
                </div>

                {this.state.selectedFiles.length != 0 &&
                  <div>
                    <div className="clearfix">
                      <Upload
                        listType="picture-card"
                        fileList={this.state.vettoreFotoAfterUpload_secondTime}
                        onChange={this.handleChange_newFoto_secondTime}

                      >
                      </Upload>

                    </div>

                    <Row style={{ marginTop: '20px' }}>

                      <Col span={9}></Col>
                      <Col span={12}>
                        <Button
                          id="Carica Foto 2"
                          disabled={!selectedFiles}
                          onClick={this.uploadImages_secondTime}
                          type="primary"
                          style={{ backgroundColor: '#14ab34eb', borderColor: '#14ab34eb' }}
                        >
                          Carica foto
                        </Button>
                      </Col>
                      <Col span={3}></Col>
                    </Row>
                  </div>
                }

              </div>
            }



            {/* */}

          </div>
        }
      </div>
    );
  }
}
