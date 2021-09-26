import React, { Component } from "react";
import { Upload, Alert, message } from 'antd';
import { Spin, Button, Input } from 'antd';
import { uploadFoto } from 'configs/axios/chiamate_axios'
import { storageRef } from 'auth/FirebaseAuth'
import Swal from 'sweetalert2';

export default class RenderFotoUno extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    componentDidMount() {
    }



    render() {
        const { selectedFiles, previewImages } = this.state;
        return (
            <div>
                
            </div>
        );
    }
}
