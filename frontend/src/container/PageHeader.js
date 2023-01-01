import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from 'antd/es/input/Input';
import { Button, Typography, Switch } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import PageModalSignin from './ModalSignin';
import BusErrorLogoDark from '../assets/BusErrorLogoDark.svg';
import BusErrorLogoLight from '../assets/BusErrorLogoLight.svg';

const { Title } = Typography;

// components
const Header = styled.header`
    display: flex;
    height: 64px;
    max-width: 1400px;
    margin-left: auto;
    margin-right: auto;
    padding: 0 16px;
    justify-content: center;
    align-items: center;
}`;

const Container = styled.div`
    display: flex;
    flex: 1;
    flex-shrink: 0;
    justify-content: flex-end;
}`;

const HeaderHomeContainer = styled(Title)`
    margin: 0 !important;
    flex: 1;
    flex-shrink: 0;
    display: flex;
`;

function PageHeader(props) {
    const { darkMode, handleThemeChange } = props;
    document.body.style.backgroundColor = (!darkMode) ? '#FAFAFA' : '#050505';

    // Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onThemeChange = () => {
        handleThemeChange();
    };

    return (
        <Header>
            <HeaderHomeContainer level={1}>
                <Link to="/">
                    <img src={darkMode ? BusErrorLogoDark : BusErrorLogoLight} alt="Bus Error" style={{ display: 'block' }} />
                </Link>
            </HeaderHomeContainer>
            <Input placeholder="搜尋" style={{ maxWidth: 500, flex: 1 }} />
            <Container>
                <Switch checked={darkMode} onChange={onThemeChange} />
                <Button type="text">問題</Button>
                <Button type="text">標籤</Button>
                <Button type="primary" shape="round" onClick={showModal}>登入 / 註冊</Button>
            </Container>
            <PageModalSignin isModalOpen={isModalOpen} onCancel={handleCancel} />
        </Header>
    );
}

PageHeader.propTypes = {
    darkMode: PropTypes.bool.isRequired,
    handleThemeChange: PropTypes.func.isRequired,
};

export default PageHeader;
