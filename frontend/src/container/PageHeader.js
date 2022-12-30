import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from 'antd/es/input/Input';
import { Button, Typography } from 'antd';
import styled from 'styled-components';
import MyModal from '../components/MyModal';
import BusErrorLogo from '../assets/BusErrorLogo.svg';

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

function PageHeader() {
    // Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Header>
            <Title level={1} style={{ margin: 0, flex: 1, flexShrink: 0 }}>
                <Link to="/">
                    <img src={BusErrorLogo} alt="Bus Error" style={{ display: 'block' }} />
                </Link>
            </Title>
            <Input placeholder="搜尋" style={{ maxWidth: 500, flex: 1 }} />
            <Container>
                <Button type="text">問題</Button>
                <Button type="text">標籤</Button>
                <Button type="primary" shape="round" onClick={showModal}>登入 / 註冊</Button>
            </Container>
            <MyModal isModalOpen={isModalOpen} onCancel={handleCancel} />
        </Header>
    );
}

export default PageHeader;
