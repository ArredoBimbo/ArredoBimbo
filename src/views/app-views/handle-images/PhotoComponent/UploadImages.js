import React, { Component } from "react";
import { Upload, Alert, message } from 'antd';
import { Spin, Button, Input } from 'antd';
import { uploadFoto, insertFotoECommerce, uploadFotoECommerce, getFoto } from 'configs/axios/chiamate_axios'
import { storageRef } from 'auth/FirebaseAuth'
import Swal from 'sweetalert2';

export default class UploadImages extends Component {
  constructor(props) {
    super(props);
    this.selectFiles = this.selectFiles.bind(this);
    this.uploadImages = this.uploadImages.bind(this);
    this.state = {
      selectedFiles: undefined,
      previewImages: [],
      vettoreFoto: [],
      inserita: false,
      upload_completo: false,
      caricamento: false,
      vettore_foto_old: [],
      vettore_foto_old_2: [],
      indiceColore: [],
      cancellazione: false,
      upload_completo_cancellazione: false,
      position_state: [],
      enable_loop: true,
      listaFoto: []
    };
  }

  componentDidMount() {
    getFoto(res => {
      this.setState({ listaFoto: res })
      console.log("vettoreFotogiàpresenti", res)
      if (res.length != 0) {
        if (res[0].home_1 != null) {
          this.setState({
            vettore_foto_old: [{
              uid: 0,
              name: 0,
              status: 'done',
              url: res[0].home_1
            }]
          }, () => {
            console.log(this.state.vettore_foto_old)
          })
        }

        if (res[0].home_2 != null) {
          this.setState({
            vettore_foto_old_2: [{
              uid: 1,
              name: 1,
              status: 'done',
              url: res[0].home_2
            }]
          }, () => {
            console.log(this.state.vettore_foto_old_2)
          })
        }
      }
    })

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
          if (img[i].width < 700 || img[i].height < 724) {
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
    for (let i = 0; i < this.state.selectedFiles.length; i++) {
      appoggio_selected_files.push(this.state.selectedFiles[i].name)
    }
    console.log("posizione della foto errata: ", this.state.position_state)

    if (this.state.position_state.length != 0) {
      console.log(this.state.selectedFiles)
      console.log(this.state.position_state)

      if (this.state.position_state.length == 1) {
        Swal.fire({
          icon: 'error',
          title: 'Errore!',
          text: `La foto ` + this.state.selectedFiles[0].name + ` non rispetta la risoluzione. Non è stato possibile caricare le foto. Rimuoverla o modificare la risoluzione della foto in questione`
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
      }, 10 * 1000);


      Array.from(this.state.selectedFiles).forEach(file => {
        storageRef
          .child(`/${Date.now()}-${file.name}`)
          .put(file).then((snapshot) => {
            console.log("mazzeo merda", snapshot.ref.getDownloadURL())
            snapshot.ref.getDownloadURL().then((downloadURL) => {
              console.log('File available at', downloadURL);
              //console.log("cont", cont)
              console.log("new foto len", this.state.selectedFiles.length)
              console.log("old foto len", this.state.vettore_foto_old)
              //if (cont.length == this.state.selectedFiles.length + this.state.vettoreFotoOld.length) {
              console.log("INDICE", this.props.indice)
              if (this.state.vettore_foto_old.length == 0 && !this.state.inserita && this.state.vettore_foto_old_2.length == 0) {
                //se sto qui significa che devo fare la insert
                insertFotoECommerce(downloadURL, "home_1", res => {
                  if (res.status = 200) {
                    this.setState({ inserita: true, caricamento: false, upload_completo: true })
                    Swal.fire(
                      'Completato!',
                      'La foto numero 1 è stata inserita correttamente!',
                      'success'
                    )
                    getFoto(res => {
                      this.setState({ listaFoto: res })
                      console.log("vettoreFotogiàpresenti", res)
                      if (res.length != 0) {
                        if (res[0].home_1 != null) {
                          this.setState({
                            vettore_foto_old: [{
                              uid: 0,
                              name: 0,
                              status: 'done',
                              url: res[0].home_1
                            }]
                          }, () => {
                            console.log(this.state.vettore_foto_old)
                          })
                        }

                        if (res[0].home_2 != null) {
                          this.setState({
                            vettore_foto_old_2: [{
                              uid: 1,
                              name: 1,
                              status: 'done',
                              url: res[0].home_2
                            }]
                          }, () => {
                            console.log(this.state.vettore_foto_old_2)
                          })
                        }
                      }
                    })
                  }
                  console.log(res)
                })
              }
              else {
                uploadFotoECommerce(downloadURL, "home_1", res => {
                  if (res.status = 200) {
                    this.setState({ inserita: true, caricamento: false, upload_completo: true })
                    Swal.fire(
                      'Completato!',
                      'La foto numero 1 è stata modificata correttamente!',
                      'success'
                    )
                    getFoto(res => {
                      this.setState({ listaFoto: res })
                      console.log("vettoreFotogiàpresenti", res)
                      if (res.length != 0) {
                        if (res[0].home_1 != null) {
                          this.setState({
                            vettore_foto_old: [{
                              uid: 0,
                              name: 0,
                              status: 'done',
                              url: res[0].home_1
                            }]
                          }, () => {
                            console.log(this.state.vettore_foto_old)
                          })
                        }

                        if (res[0].home_2 != null) {
                          this.setState({
                            vettore_foto_old_2: [{
                              uid: 1,
                              name: 1,
                              status: 'done',
                              url: res[0].home_2
                            }]
                          }, () => {
                            console.log(this.state.vettore_foto_old_2)
                          })
                        }
                      }
                    })
                  }
                  console.log(res)
                })
              }
              // }
            });
          })
      });
  
    }
  }


  render() {
    const { selectedFiles, previewImages } = this.state;
    return (

      <div>
        <div>
          {this.state.vettore_foto_old.length != 0 &&

            <div>
              <div className="clearfix">
                <Alert message="Foto attualmente presenti" type="info" showIcon />

                <Upload
                  listType="picture-card"
                  fileList={this.state.vettore_foto_old}
                  onChange={this.handleChange}
                >
                </Upload>
              </div>
            </div>
          }

          {!this.state.upload_completo ?
            <div className="row">

              <div className="col-8">
                <label className="btn btn-default p-0">
                  <Input type="file" accept="image/*" onChange={this.selectFiles} />
                </label>
              </div>

              {previewImages && (
                <div>
                  <div className="clearfix">
                    <Upload
                      listType="picture-card"
                      fileList={this.state.vettoreFoto}
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

      </div>
    );
  }
}
