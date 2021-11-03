import React, { Component, useState } from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import { Drawer, Menu } from 'antd';
import ThemeConfigurator from './ThemeConfigurator';
import { connect } from "react-redux";
import { DIR_RTL } from 'constants/ThemeConstant';
import { Switch, Route, Redirect } from "react-router-dom";
import { APP_PREFIX_PATH } from 'configs/AppConfig'

export const Logout = () => {

    const redirect = () => {
        localStorage.removeItem('email')
        localStorage.removeItem('auth_token')
        window.location.reload(true);
    };

    return (
        <div>
            <Menu mode="horizontal">
                <Menu.Item onClick={() => redirect()}>
                    <LogoutOutlined className="nav-icon mr-0" />
                </Menu.Item>
            </Menu>
        </div>
    );
}

const mapStateToProps = ({ theme }) => {
    const { locale } = theme;
    return { locale }
};

export default connect(mapStateToProps)(Logout);