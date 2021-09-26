import React, { Component } from "react";
import { Upload, Alert, message } from 'antd';
import { Spin, Button, Input } from 'antd';
import { uploadFoto } from 'configs/axios/chiamate_axios'
import { storageRef } from 'auth/FirebaseAuth'
import Swal from 'sweetalert2';

export default class UploadImages extends Component {
  constructor(props) {
    super(props);
    this.selectFiles = this.selectFiles.bind(this);
    this.uploadImages = this.uploadImages.bind(this);
    this.confermaModifiche = this.confermaModifiche.bind(this);
    this.state = {
      selectedFiles: undefined,
      previewImages: [],
      vettoreFoto: [],
      upload_completo: false,
      caricamento: false,
      vettoreFotoOld: [],
      indiceColore: [],
      cancellazione: false,
      upload_completo_cancellazione: false,
      position_state: [],
      enable_loop: true
    };
  }

  componentDidMount() {
    console.log("vettoreFOTO: ", this.props.vettFoto)
    console.log("colore: ", this.props.colore)
    console.log("indice_colore: ", this.props.indice)
    if (this.props.vettFoto.length != 0) {
      let appoggio = []
      for (let i = 0; i < this.props.vettFoto[this.props.indice].foto.length; i++) {
        appoggio.push({
          uid: i,
          name: i,
          status: 'done',
          url: this.props.vettFoto[this.props.indice].foto[i]
        })
      }

      this.setState({ vettoreFotoOld: appoggio });
    }

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
      cancellazione: false
    }, () => {
      for (let i = 0; i < this.state.selectedFiles.length; i++) {
        img[i].src = this.state.previewImages[i];
        img[i].onload = () => {
          console.log("dentro img", img[i])
          console.log("NEW IMAGE width", img[i].width);
          console.log("NEW IMAGE height: ", img[i].height);
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
      this.setState({ vettoreFoto: appoggio, position_state: position })
    });
  }


  uploadImages() {
    let appoggio_selected_files = [] 
    let appoggio_selected_files_chosen = [] 
    for(let i=0; i<this.state.selectedFiles.length; i++) {
          appoggio_selected_files.push(this.state.selectedFiles[i].name)
    }

    if (this.state.position_state.length != 0) {
      console.log(this.state.selectedFiles)
      console.log(this.state.position_state)

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
      this.setState({ caricamento: true })
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
          cont.push(this.state.vettoreFotoOld[i].url)
        }
      }

      //controlla innanzitutto se ci sono state delle cancellazioni di vettFoto
      if (this.state.vettoreFoto.length == this.state.selectedFiles.length) {

        Array.from(this.state.selectedFiles).forEach(file => {
          storageRef
            .child(`/${Date.now()}-${file.name}`)
            .put(file).then((snapshot) => {
              console.log("mazzeo merda", snapshot.ref.getDownloadURL())
              snapshot.ref.getDownloadURL().then((downloadURL) => {
                cont.push(downloadURL)
                console.log('File available at', downloadURL);
                console.log("cont", cont)
                console.log("cont len", cont.length)
                console.log("new foto len", this.state.selectedFiles.length)
                console.log("old foto len", this.props.vettFoto.length)
                if (cont.length == this.state.selectedFiles.length + this.state.vettoreFotoOld.length) {
                  console.log("INDICE", this.props.indice)
                  uploadFoto(this.props.id, this.props.indice, cont, (res) => {
                    if (res == "UploadCompleto") {
                      this.setState({ upload_completo: true, caricamento: false }, () => {
                        console.log("ok")
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
                console.log("old foto len", this.props.vettFoto.length)
                if (cont.length == appoggio_selected_files_chosen.length + this.state.vettoreFotoOld.length) {
                  console.log("INDICE", this.props.indice)
                  uploadFoto(this.props.id, this.props.indice, cont, (res) => {
                    if (res == "UploadCompleto") {
                      this.setState({ upload_completo: true, caricamento: false }, () => {
                        console.log("ok")
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
        this.setState({ upload_completo_cancellazione: true }, () => {
          console.log("ok")
        })
      }
    })
  }


  handleChange = ({ fileList }) => {
    console.log("delete")
    console.log("file list", fileList)
    if (fileList.length >= 1) {
      this.setState({ vettoreFotoOld: fileList, cancellazione: true });

    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Errore!',
        text: 'Il colore di questo articolo deve avere associato almeno 1 foto!',
      })
    }
  }

  handleChange_newFoto = ({ fileList }) => {
    console.log("delete")
    console.log("file list", fileList)
    if (fileList.length >= 1) {
      this.setState({ vettoreFoto: fileList });
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
        {!this.state.upload_completo ?
          <div>
            {this.state.vettoreFotoOld.length != 0 &&

              <div className="clearfix">
                <Alert message="Foto attualmente presenti" type="info" showIcon />

                <Upload
                  listType="picture-card"
                  fileList={this.state.vettoreFotoOld}
                  onChange={this.handleChange}
                >
                </Upload>
                {this.state.cancellazione &&
                  <Button
                    className="btn btn-success btn-sm"
                    onClick={this.confermaModifiche}
                  >
                    Conferma modifiche
                  </Button>
                }
                {this.state.upload_completo_cancellazione &&
                  <Alert message="Modifica avvenuta correttamente!" type="success" showIcon />
                }
              </div>
            }
            <div className="row">
              <Alert message="Puoi aggiungere nuove foto da associare all'articolo" type="info" showIcon />

              <div className="col-8">
                <label className="btn btn-default p-0">
                  <Input type="file" multiple accept="image/*" onChange={this.selectFiles} />
                </label>
              </div>
            </div>

            {previewImages && (
              <div>
                <div className="clearfix">
                  <Upload
                    listType="picture-card"
                    fileList={this.state.vettoreFoto}
                    onChange={this.handleChange_newFoto}

                  >
                  </Upload>

                </div>
                <div className="col-4">
                  <Button
                    className="btn btn-success btn-sm"
                    disabled={!selectedFiles}
                    onClick={this.uploadImages}
                  >
                    Carica foto
                  </Button>
                </div>
              </div>
            )}

            {this.state.caricamento == true &&
              <Spin />
            }
          </div>
          :
          <Alert
            message="Upload avvenuto con successo!"
            description="Le modifiche sono state effettuate correttamente."
            type="success"
            showIcon
          />
        }
      </div>
    );
  }
}
