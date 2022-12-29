import React, { useState } from 'react';
import Input from 'antd/es/input/Input';
import { Button, Typography } from 'antd';
import styled from 'styled-components';
import MyModal from './MyModal';

const { Title } = Typography;

// components
const Header = styled.header`
    display: flex;
    height: 64px;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    padding: 16px 16px;
    justify-content: center;
}`;

const Container = styled.div`
    display: flex;
    flex: 1;
    flex-shrink: 0;
    justify-content: right;
}`;

// style
const inputStyle = {
    maxWidth: '500px',
    flex: 1,
};

const titleStyle = {
    width: '220px',
    flex: 1,
    flexShrink: 0,
    alignItem: 'left',
};

const buttonStyle = {
    borderRadius: '16px',
};

function MyHeader() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Header>
            <Title level={3} style={titleStyle}>Bus Error</Title>
            <Input style={inputStyle} placeholder="搜尋" />
            <Container>
                <Button type="text">問題</Button>
                <Button type="text">標籤</Button>
                <Button type="primary" style={buttonStyle} onClick={showModal}>登入 / 註冊</Button>
            </Container>
            <MyModal isModalOpen={isModalOpen} onCancel={handleCancel} />
        </Header>
    );
}

export default MyHeader;
