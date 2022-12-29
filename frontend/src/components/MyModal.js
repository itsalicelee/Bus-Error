import React from 'react';
import { Modal, Input, Button, Tabs } from 'antd'; // eslint-disable-line
import styled from 'styled-components';
import PropTypes from 'prop-types';

// components
const MyTabs = styled(Tabs)`
    flex: 1;
`;

// style
const modalStyle = {
    textAlign: 'center',
};

const titleStyle = {
    textAlign: 'center',
    color: '#141414',
    fontweight: 700,
    marginBottom: '8px',
};

const inputStyle = {
    maxWidth: '500px',
    height: '36px',
    marginBottom: '28px',
};

const buttonStyle = {
    width: '100%',
    textAlign: 'center',
    marginBottom: '28px',
};

const SignIn = (
    <div style={{ marginTop: '8px' }}>
        <Input placeholder="用戶名稱 / 電子郵件" style={inputStyle} />
        <Input placeholder="密碼" style={inputStyle} />
        <Button
            key="submit"
            type="primary"
            style={buttonStyle}
        >
            登入
        </Button>
    </div>
);

const SignUp = (
    <div style={{ marginTop: '8px' }}>
        <Input placeholder="電子郵件" style={inputStyle} />
        <Input placeholder="用戶名稱" style={inputStyle} />
        <Input placeholder="密碼" style={inputStyle} />
        <Input placeholder="再次確認密碼" style={inputStyle} />
        <Button
            key="submit"
            type="primary"
            style={buttonStyle}
        >
            登入
        </Button>
    </div>
);

const items = [
    {
        label: '登入',
        key: '1',
        children: SignIn,
    },
    {
        label: '註冊',
        key: '2',
        children: SignUp,
    },
];

function MyModal(props) {
    const { isModalOpen } = props;
    return (
        <Modal
            width="400px"
            style={modalStyle}
            footer={[]}
            open={isModalOpen}
            centered
            destroyOnClose="true"
            maskClosable="true"
        >
            <h1 style={titleStyle}>Welcome !</h1>
            <MyTabs items={items} centered />
        </Modal>
    );
}

MyModal.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
};

export default MyModal;
