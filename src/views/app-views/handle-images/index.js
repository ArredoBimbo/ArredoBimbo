import React, { useState, useEffect } from 'react'
import { Card, Table, Select, Input, Button, Badge, Menu, Upload, Tabs } from 'antd';
import { getFoto } from 'configs/axios/chiamate_axios'
import Swal from 'sweetalert2';
import UploadImages from './PhotoComponent/UploadImages'
import Flex from 'components/shared-components/Flex'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import UploadImagesHome2 from './PhotoComponent/UploadImages2'
const { TabPane } = Tabs;

const HandleImages = () => {

	useEffect(() => {

	}, []);


	return (
		<div>
			<PageHeaderAlt className="border-bottom" overlap>
				<div className="container">
					<Flex className="py-2" mobileFlex={false} justifyContent="between" alignItems="center">
						<h2 className="mb-3">{"Modifica qui le tue foto"} </h2>
						<div className="mb-3">

						</div>
					</Flex>
				</div>
			</PageHeaderAlt>
			<Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>

				<TabPane tab={"Home_1"} key={1}>
					<UploadImages />
				</TabPane>

				<TabPane tab={"Home_2"} key={2}>
					<UploadImagesHome2 />
				</TabPane>
			</Tabs>
		</div>
	)
}

export default HandleImages;
