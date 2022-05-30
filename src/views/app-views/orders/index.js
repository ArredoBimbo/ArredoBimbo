/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Card, Table, Select, Input, Upload, Badge, Menu, Tag, Popover, Tabs, Form, Button, Row, Col, message } from 'antd';
//import OrderListData from "assets/data/order-list.data.json"
import { EyeOutlined, FileExcelOutlined, SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import { DownOutlined } from '@ant-design/icons';
import Flex from 'components/shared-components/Flex'
import utils from 'utils'
import Swal from 'sweetalert2';
import { rules_tracking } from 'configs/AppConfig'

import { getListaProdotti, getAcquisti, updateTracking, confermaTracking } from '../../../configs/axios/chiamate_axios'
const { Option } = Select
const { TabPane } = Tabs;

let OrderListData = []

const getPaymentStatus = status => {
  if (status === 'Pagato') {
    return 'success'
  }
  if (status === 'Pending') {
    return 'warning'
  }
  if (status === 'Expired') {
    return 'error'
  }
  return ''
}

const menu = (
  <Menu>
    <Menu.Item>Action 1</Menu.Item>
    <Menu.Item>Action 2</Menu.Item>
  </Menu>
);


const getColore = colore => {
  if (colore === 'blu') {
    return 'blue'
  }
  if (colore === 'Albicocca') {
    return '#b1191c'
  }
  if (colore === 'verde') {
    return 'green'
  }
  if (colore === 'rosso') {
    return 'red'
  }
  if (colore === 'nero') {
    return 'black'
  }
  if (colore === 'bianco') {
    return 'white'
  }
  if (colore === 'giallo') {
    return 'yellow'
  }
  return ''
}



const getShippingStatus = status => {
  if (status === 'magazzino') {
    return 'red'
  }
  if (status === 'spedito') {
    return 'blue'
  }
  if (status === 'completato') {
    return 'green'
  }
  return ''
}



const paymentStatusList = ['spedito', 'magazzino', 'completato']

const Orders = () => {

  const [list, setList] = useState([])
  const [lista_carrello, set_lista_carrello] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [prodottoSelezionato, setProdottoSelezionato] = useState([])
  const [carrelloSelezionato, setCarrelloSelezionato] = useState([])
  const [vettoreFoto, setVettoreFoto] = useState([])
  const [lista_prodotti, set_lista_prodotti] = useState([])
  const [form] = Form.useForm();


  Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + (h * 60 * 60 * 1000));
    return this;
  }




  useEffect(() => {
    getListaProdotti(res => {
      console.log("lista-prodotti", res)
      getAcquisti(res, (acquisti) => {
        console.log("lista-acquisti: ", acquisti)

        let dict = costruisciCarrello(acquisti)
        set_lista_carrello(dict)
        OrderListData = acquisti
        setList(acquisti)
        set_lista_prodotti(res)
      })
    })
  }, []);

  const costruisciCarrello = (acquisti) => {
    let appoggio = []
    let dict = []
    let my_data = ""
    for (let i = 0; i < acquisti.length; i++) {
      appoggio.push(acquisti[i].idordine)
      if (i == acquisti.length - 1) {
        const unique = [...new Set(appoggio)];
        //console.log("unique", unique)
        for (let z = 0; z < unique.length; z++) {
          let string = unique[z]
          dict.push({
            [string]: [],

          })
          for (let j = 0; j < acquisti.length; j++) {
            /*                var d = new Date(new Date().setHours(new Date(acquisti[j].articoloCompleto.data_acquisto).getHours() + 2))
                           console.log("DATA", d)
                           console.log("1", acquisti[j].articoloCompleto.data_acquisto)
                           console.log("2", new Date(acquisti[j].articoloCompleto.data_acquisto).getHours() + 2)
                           console.log("3", new Date().setHours(new Date(acquisti[j].articoloCompleto.data_acquisto).getHours() + 2)) */
            var d = new Date(acquisti[j].date)
            var date = new Date();
            date.setDate(d.getDate() + 1);
            my_data = date.toDateString()
            if (unique[z] == acquisti[j].idordine) {
              dict[z].id = z
              dict[z].nome_carrello = unique[z]
              dict[z].data = my_data
              dict[z].utente = acquisti[j].name
              dict[z].totale = acquisti[j].articoloCompleto.totale_carrello
              dict[z].metodo_pagamento = acquisti[j].articoloCompleto.metodo_pagamento
              dict[z].iva = acquisti[j].articoloCompleto.iva
              dict[z].costo_spedizione = acquisti[j].articoloCompleto.costo_spedizione
              dict[z].articoloCompleto = acquisti[j].articoloCompleto
              dict[z][unique[z]].push(acquisti[j])
            }
          }
        }
        console.log("dict", dict)
      }
    }

    return dict;
  }

  const setTracking = (id) => {
    //console.log(id)
    form.validateFields().then(values => {

      console.log("tracking", values.tracking)
      updateTracking(values.tracking, id, res => {
        if (res.status == 200) {
          setList([])
          getAcquisti(lista_prodotti, (acquisti) => {
            console.log("lista-acquisti: ", acquisti)
            let dict = costruisciCarrello(acquisti)
            set_lista_carrello(dict)
            OrderListData = acquisti
            setList(acquisti)
          })
          Swal.fire(
            'Completato!',
            'Il tracking è stato aggiornato con successo!',
            'success'
          )
        }
        console.log("risposta-update-tracking", res)
      })
    }).catch(info => {
      message.error('Per favore, inserisci tutti i cambi obbligatori ');
    });
  }

  const setTrackingComplete = (id) => {
    form.validateFields().then(values => {

      console.log("tracking", values.tracking)
      updateTracking(values.tracking, id, res => {
        if (res.status == 200) {
          setList([])
          getAcquisti(lista_prodotti, (acquisti) => {
            console.log("lista-acquisti: ", acquisti)
            let dict = costruisciCarrello(acquisti)
            set_lista_carrello(dict)
            OrderListData = acquisti
            setList(acquisti)
          })
          Swal.fire(
            'Completato!',
            'Il tracking è stato aggiornato con successo!',
            'success'
          )
        }
        console.log("risposta-update-tracking", res)
      })
    }).catch(info => {
      message.error('Per favore, inserisci tutti i cambi obbligatori ');
    });


    confermaTracking(id, res => {
      if (res.status == 200) {
        setList([])

        getAcquisti(lista_prodotti, (acquisti) => {
          console.log("lista-acquisti: ", acquisti)
          let dict = costruisciCarrello(acquisti)
          set_lista_carrello(dict)
          OrderListData = acquisti
          setList(acquisti)
        })
        Swal.fire(
          'Completato!',
          'Lo stato della spedizione è stato aggiornato con successo!',
          'success'
        )
      }
      console.log("risposta-conferma-tracking", res)
    })
  }

  const content_carrello = (id) => {
    //console.log("id", id)
    return (
      <div id={id}>
        {carrelloSelezionato.length != 0 &&

          <Tabs defaultActiveKey="1">
            <TabPane tab={"Descrizione metodo di acquisto"} key={1}>
              <p>
                Metodo di pagamento: {carrelloSelezionato.metodo_pagamento}
              </p>
              <p>
                Costo iva: {carrelloSelezionato.iva}
              </p>
              <p>
                Costo di spedizione: {carrelloSelezionato.costo_spedizione}
              </p>
            </TabPane>
            <TabPane tab={"Descrizione profilo acquirente"} key={2}>
              {console.log("test-ale",carrelloSelezionato)}
              <p> <b> Nome e cognome del destinatario: </b>{carrelloSelezionato.articoloCompleto.nome} {carrelloSelezionato.articoloCompleto.cognome} </p>
              <p> <b> Città: </b>{carrelloSelezionato.articoloCompleto.città} </p>
              <p> <b> Provincia: </b>{carrelloSelezionato.articoloCompleto.provincia} </p>
              <p> <b> CAP: </b>{carrelloSelezionato.articoloCompleto.cap} </p>
              <p> <b> Via: </b>{carrelloSelezionato.articoloCompleto.via} </p>
              <p> <b> Numero civico: </b>{carrelloSelezionato.articoloCompleto.nrcivico} </p>

            </TabPane>
          </Tabs>
        }
      </div>
    )
  }

  const content = (id) => {

    if (prodottoSelezionato.length != 0) {
      console.log(prodottoSelezionato)


      let appoggio = []
      if (prodottoSelezionato.personalizzazione != "Non Supportata") {

        /*
        console.log("sono uqiiiii")
        console.log(prodottoSelezionato.personalizzazione)
        console.log("personalizzazione", JSON.parse(prodottoSelezionato.personalizzazione))
        console.log("lunghezza", Object.keys(JSON.parse(prodottoSelezionato.personalizzazione)))
        console.log("valore", JSON.parse(prodottoSelezionato.personalizzazione)[Object.keys(JSON.parse(prodottoSelezionato.personalizzazione))[0]])
        
        */
        if (Object.keys(JSON.parse(prodottoSelezionato.personalizzazione)).length == prodottoSelezionato.numeroacquisti) {
          for (let i = 0; i < Object.keys(JSON.parse(prodottoSelezionato.personalizzazione)).length; i++) {
            appoggio.push(JSON.parse(prodottoSelezionato.personalizzazione)[Object.keys(JSON.parse(prodottoSelezionato.personalizzazione))[i]])
          }
        } else {
          for (let i = 0; i < Object.keys(JSON.parse(prodottoSelezionato.personalizzazione)).length; i++) {
            appoggio.push(JSON.parse(prodottoSelezionato.personalizzazione)[Object.keys(JSON.parse(prodottoSelezionato.personalizzazione))[i]])
          }
        }
      }

      return (
        <div id={id}>
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
            {prodottoSelezionato.length != 0 &&
              <Tabs defaultActiveKey="1">
                <TabPane tab={"Descrizione prodotto acquistato"} key={1}>
                  <p> id dell'articolo: {prodottoSelezionato.articoloCompleto.idArticoloAcquistato} </p>
                  {prodottoSelezionato.personalizzazione == "Non Supportata" &&
                    <div>
                      <p><b> TAGLIA: {prodottoSelezionato.taglia == "tagliau" ? "TAGLIA UNICA" : prodottoSelezionato.taglia} </b> </p>
                      <p> La personalizzazione sul prodotto non è supportata! </p>
                    </div>
                  }
                  {prodottoSelezionato.personalizzazione != "Non Supportata" &&
                    <div>

                      {Object.keys(JSON.parse(prodottoSelezionato.personalizzazione)).length == prodottoSelezionato.numeroacquisti ?
                        <div>
                          <p><b> TAGLIA: {prodottoSelezionato.taglia == "tagliau" ? "TAGLIA UNICA" : prodottoSelezionato.taglia} </b> </p>

                          {appoggio.map((elm, key) =>
                          (<div>
                            <p> Il
                              {key == 0 &&
                                ' primo '
                              }
                              {key == 1 &&
                                ' secondo '
                              }
                              {key == 2 &&
                                ' terzo '
                              }
                              {key == 3 &&
                                ' quarto '
                              }
                              {key == 4 &&
                                ' quinto '
                              }
                              {key == 5 &&
                                ' sesto '
                              }
                              {key == 6 &&
                                ' settimo '
                              }
                              {key == 7 &&
                                ' ottavo '
                              }
                              {key == 8 &&
                                ' nono '
                              }
                              {key == 9 &&
                                ' decimo '
                              }

                              acquisto è stato di seguito personalizzato: <b> {elm} </b></p>

                          </div>

                          )

                          )}
                        </div>
                        :
                        <div>
                          <p><b> TAGLIA: {prodottoSelezionato.taglia == "tagliau" ? "TAGLIA UNICA" : prodottoSelezionato.taglia} </b> </p>
                          {appoggio.map(
                            (elm, key) => (
                              <div>
                                <p> Il
                                  {key == 0 &&
                                    ' primo '
                                  }
                                  {key == 1 &&
                                    ' secondo '
                                  }
                                  {key == 2 &&
                                    ' terzo '
                                  }
                                  {key == 3 &&
                                    ' quarto '
                                  }
                                  {key == 4 &&
                                    ' quinto '
                                  }
                                  {key == 5 &&
                                    ' sesto '
                                  }
                                  {key == 6 &&
                                    ' settimo '
                                  }
                                  {key == 7 &&
                                    ' ottavo '
                                  }
                                  {key == 8 &&
                                    ' nono '
                                  }
                                  {key == 9 &&
                                    ' decimo '
                                  }
                                  acquisto è stato di seguito personalizzato: <b> {elm} </b></p>
                              </div>
                            )
                          )}
                          <p> I restanti acquisti (<b>{-Object.keys(JSON.parse(prodottoSelezionato.personalizzazione)).length + prodottoSelezionato.numeroacquisti}</b>) non sono stati personalizzati! </p>
                        </div>}

                    </div>
                  }


                  <p> foto dell'articolo scelto:
                    <Upload
                      listType="picture-card"
                      fileList={vettoreFoto}
                    >
                    </Upload>
                  </p>
                </TabPane>
                <TabPane tab={"Spedizione"} key={"ID" + id}>
                  {prodottoSelezionato.orderStatus == "magazzino" &&

                    <Row gutter={20}>
                      <Col xs={10} sm={10} md={15}>

                        <Form.Item id={prodottoSelezionato.id + "tracking"} name="tracking" label="Inserire Tracking" rules={rules_tracking.tracking}>
                          <Input placeholder="Numero tracking" defaultValue={''} />
                        </Form.Item>
                      </Col>

                      <Col xs={10} sm={10} md={5}>

                        <Button type="primary" onClick={() => setTracking(id)}>
                          Conferma
                        </Button>
                      </Col>
                    </Row>

                  }

                  {prodottoSelezionato.orderStatus == "spedito" &&
                    <Row>
                      <Col xs={10} sm={10} md={15}>
                        Tracking corrente: {prodottoSelezionato.tracking}
                      </Col>
                      <Row gutter={20}>
                        <Col xs={10} sm={10} md={15}>
                          <Form.Item id="tracking" name="tracking" label="Inserire Tracking">
                            <Input placeholder="Numero tracking" />
                          </Form.Item>
                        </Col>
                        <Col xs={10} sm={10} md={5}>
                          <Button type="primary" onClick={() => setTracking(id)}>
                            Modifica tracking
                          </Button>
                        </Col>
                      </Row>
                      <Row gutter={20}>
                        <Col xs={10} sm={10} md={5}>
                          <Button type="primary" onClick={() => setTrackingComplete(id)}>
                            Conferma arrivo della spedizione
                          </Button>
                        </Col>
                      </Row>
                    </Row>
                  }

                  {prodottoSelezionato.orderStatus == "completato" &&
                    <Row>
                      Spedizione completata con successo!
                    </Row>
                  }

                </TabPane>
              </Tabs>
            }

          </Form>

        </div >
      )
    }

  }

  const showInfo_carrello = (row) => {
    //  console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO CARRELLO", row)
    //si deve fare la logica del carrello e far uscire content_carrello con tutte le info:
    // - metodo di pagamento, costo iva, spedizione ecc. ecc.
    setCarrelloSelezionato(row)
  }

  const showInfo = (row) => {
    let appoggio = []
    for (let i = 0; i < lista_prodotti.length; i++) {
      if (row.articoloCompleto.idArticoloAcquistato == lista_prodotti[i].idArticolo) {
        for (let j = 0; j < lista_prodotti[i].coloriDisp.length; j++) {
          if (row.colore == lista_prodotti[i].coloriDisp[j].color) {
            for (let z = 0; z < lista_prodotti[i].coloriDisp[j].image.length; z++) {
              appoggio.push({
                uid: i,
                name: i,
                status: 'done',
                url: lista_prodotti[i].coloriDisp[j].image[z]
              })
            }
          }
        }
      }
    }
    setVettoreFoto(appoggio)
    setProdottoSelezionato(row)
  }

  const handleShowStatus = value => {
    if (value !== 'All') {
      const key = 'orderStatus'
      const data = utils.filterArray(OrderListData, key, value)
      setList(data)
    } else {
      setList(OrderListData)
    }
  }

  const dropdownMenu_carrello = row => (
    <Menu>
      <Menu.Item>
        <Flex alignItems="center">
          <EyeOutlined />
          <Popover content={content_carrello(row.id)} title="Dettagli carrello" trigger="click" placement="left">
            <span id={row.id} className="ml-2" onClick={() => showInfo_carrello(row)}>Mostra dettagli carrello</span>
          </Popover>
        </Flex>
      </Menu.Item>
    </Menu>
  );

  const dropdownMenu = row => (
    <Menu>
      <Menu.Item>
        <Flex alignItems="center">
          <EyeOutlined />
          <Popover content={content(row.id)} title="Dettagli acquisto" trigger="click" placement="left">
            <span id={row.id} className="ml-2" onClick={() => showInfo(row)}>Mostra dettagli acquisto</span>
          </Popover>
        </Flex>
      </Menu.Item>
    </Menu>
  );

  const tableColumns = [
    {
      title: 'ID',
      dataIndex: 'id'
    },
    {
      title: 'Utente',
      dataIndex: 'utente',
      render: (_, record) => (
        <div className="d-flex">
          <AvatarStatus size={30} src={record.image} name={record.utente} />
        </div>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
    },
    {
      title: 'Data di acquisto',
      dataIndex: 'data',
      render: (_, record) => (
        <span>{record.data}</span>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'date')
    },
    {
      title: 'Prezzo totale',
      dataIndex: 'totale',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'amount')
    },
    {
      title: '',
      dataIndex: 'actions',
      render: (_, elm) => (
        <div className="text-right">
          <EllipsisDropdown menu={dropdownMenu_carrello(elm)} />
        </div>
      )
    }
  ];

  const rowSelection = {
    onChange: (key, rows) => {
      setSelectedRows(rows)
      setSelectedRowKeys(key)
    }
  };

  const onSearch = e => {
    const value = e.currentTarget.value
    const searchArray = e.currentTarget.value ? list : OrderListData
    const data = utils.wildCardSearch(searchArray, value)
    setList(data)
    setSelectedRowKeys([])
  }

  const expandedRowRender = (row, id, we) => {
    console.log(row)
    console.log(id)
    console.log(we)
    let accesso = lista_carrello[id].nome_carrello
    console.log("dentro", lista_carrello[id][accesso])
    console.log(lista_carrello[id].nome_carrello)


    const columns = [
      {
        title: 'ID',
        dataIndex: 'id'
      },

      {
        title: 'Nome articolo',
        dataIndex: 'nomearticolo',
        sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
      },
      {
        title: 'Stato ordine',
        dataIndex: 'orderStatus',
        render: (_, record) => (
          <><Tag color={getShippingStatus(record.orderStatus)}>{record.orderStatus}</Tag></>
        ),
        sorter: (a, b) => utils.antdTableSorter(a, b, 'orderStatus')
      },
      {
        title: 'Colore scelto',
        dataIndex: 'colore',
        render: (_, record) => (
          <><Badge color={getColore(record.colore)} /><span>{record.colore}</span></>
        ),
        sorter: (a, b) => utils.antdTableSorter(a, b, 'paymentStatus')
      },
      {
        title: 'Numero di acquisti',
        dataIndex: 'numeroacquisti'
      },
      {
        title: 'Prezzo singolo',
        dataIndex: 'amount',
        sorter: (a, b) => utils.antdTableSorter(a, b, 'amount')
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

    return <Table columns={columns} dataSource={lista_carrello[id][accesso]} pagination={false} />;
  };

  return (
    <div>
      <Card>


        <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
          <Flex className="mb-1" mobileFlex={false}>
            <div className="mr-md-3 mb-3">
              <Input placeholder="Ricerca tra gli acquisti.." prefix={<SearchOutlined />} onChange={e => onSearch(e)} />
            </div>
            <div className="mb-3">
              <Select
                defaultValue="All"
                className="w-100"
                style={{ minWidth: 180 }}
                onChange={handleShowStatus}
                placeholder="Status"
              >
                <Option value="All">Stato dei prodotti</Option>
                {paymentStatusList.map(elm => <Option key={elm} value={elm}>{elm}</Option>)}
              </Select>
            </div>
          </Flex>
        </Flex>
        <div className="table-responsive">
          <Table
            columns={tableColumns}
            dataSource={lista_carrello}
            expandable={{ expandedRowRender }}
            rowKey='id'
            rowSelection={{
              selectedRowKeys: selectedRowKeys,
              type: 'checkbox',
              preserveSelectedRowKeys: false,
              ...rowSelection,
            }}
          />
        </div>
      </Card>
    </div>

  )
}

export default Orders
