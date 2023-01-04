import { React, useState, useContext } from 'react';
import {
    Modal, Typography, Divider as AntDivider, Button, theme,
} from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

import { AuthContext } from '../hooks/useAuth';
import axios from '../api';

const { Title, Text } = Typography;
const { useToken } = theme;

const Divider = styled(AntDivider)`
    margin: 4px 0 12px 0;
`;

const EditableTitle = styled(Title)`
    width: calc(100% + 20px) !important;
    textarea {
        font-weight: 400 !important;
    }
`;

function InfoField(props) {
    const { token } = useToken();

    const {
        title, value, editable, onChange,
    } = props;

    const EditIcon = (
        <FontAwesomeIcon
            icon={faPen}
            style={{
                color: token.colorPrimary, fontSize: 14, marginBottom: 2, marginLeft: 6,
            }}
        />
    );

    return (
        <div style={{ marginBottom: 10 }}>
            <Text type="secondary" style={{ display: 'flex' }}>{ title }</Text>
            <EditableTitle
                level={4}
                style={{ margin: 0, lineHeight: 1.9, fontWeight: 400 }}
                editable={(editable) ? {
                    icon: EditIcon,
                    tooltip: false,
                    text: value,
                    onChange,
                    enterIcon: null,
                } : false}
            >
                { value }
            </EditableTitle>
        </div>
    );
}

InfoField.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    editable: PropTypes.bool,
    onChange: PropTypes.func,
};

InfoField.defaultProps = {
    editable: false,
    onChange: () => {},
};

function ModalMyInfo(props) {
    const {
        show, onCancel, onUpdateInfoSuccess, messageApi,
    } = props;

    const { userState } = useContext(AuthContext);
    const [user, setUser] = userState;

    const [usernameField, setUsernameField] = useState(user.name);
    const [submitBtnLoading, setSubmitBtnLoading] = useState(false);
    const onUsernameChange = (res) => setUsernameField(res);

    const onSubmitClick = () => {
        setSubmitBtnLoading(true);
        axios
            .post('/updateUser', {
                newName: usernameField,
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            })
            .then((res) => {
                setSubmitBtnLoading(false);
                onUpdateInfoSuccess();
                setUser(res.data.user);
            })
            .catch((err) => {
                setSubmitBtnLoading(false);
                switch (err.response.data.error) {
                case 'ERR_AUTH_NOSIGN':
                    messageApi.open({ type: 'error', content: '請先登入', duration: 5 });
                    break;
                case 'ERR_NOINPUT':
                    messageApi.open({ type: 'error', content: '錯誤！請重新整理後再重試。', duration: 5 });
                    break;
                case 'ERR_SERVER_DB':
                    messageApi.open({ type: 'error', content: '系統無法處理您的請求，請檢查請求內容或稍候再試。', duration: 5 });
                    break;
                default:
                    break;
                }
            });
    };

    return (
        <Modal
            width="400px"
            footer={[]}
            open={show}
            onCancel={onCancel}
            centered
            destroyOnClose="true"
            maskClosable="true"
        >
            <Title level={3} style={{ marginBottom: 16 }}>我的資訊</Title>
            <InfoField title="使用者名稱" value={usernameField} onChange={onUsernameChange} editable />
            <InfoField title="電郵地址" value={user.email} />
            <Divider />
            <div style={{ paddingTop: 4, marginBottom: -8, textAlign: 'right' }}>
                <Button
                    type="primary"
                    disabled={user.name === usernameField}
                    onClick={onSubmitClick}
                    loading={submitBtnLoading}
                >
                    儲存變更
                </Button>
            </div>
        </Modal>
    );
}

ModalMyInfo.propTypes = {
    show: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onUpdateInfoSuccess: PropTypes.func.isRequired,
    messageApi: PropTypes.object.isRequired,        /* eslint-disable-line */
};

export default ModalMyInfo;
