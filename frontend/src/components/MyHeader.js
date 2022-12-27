import React from 'react';
import Input from 'antd/es/input/Input';
import { Button, Typography } from 'antd';
import styled from 'styled-components';

const { Title } = Typography;

const Header = styled.header`
    display: flex;
    height: 64px;
    padding: 16px 16px;
    justify-content: center;
}`;

const Container = styled.div`
    display: flex;
}`;

const inputStyle = {
    width: '500px',
    margin: '0 240px',
};

const buttonStyle = {
    background: '#FAAD14',
    borderRadius: '16px',
};

function MyHeader() {
    return (
        <Header>
            <Title level={3} style={{ width: '220px' }}>Bus Error</Title>
            <Input style={inputStyle} placeholder="搜尋" />
            <Container>
                <Button type="text">問題</Button>
                <Button type="text">標籤</Button>
                <Button type="primary" style={buttonStyle}>登入 / 註冊</Button>
            </Container>
        </Header>
    );
}

export default MyHeader;
