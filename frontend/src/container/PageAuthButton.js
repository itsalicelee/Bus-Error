import {
    React, useState, useEffect, useContext,
} from 'react';
import { Button, Dropdown, Avatar, theme, message } from 'antd'; /* eslint-disable-line */
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPen, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import useFetch from '../hooks/useFetch';
import { AuthContext } from '../hooks/useAuth';
import axios from '../api';

import ModalMyInfo from './ModalMyInfo';

const { useToken } = theme;

const SignInButton = styled.div`
    > div > div:first-child{ display: none; }
`;

const FaIcon = styled(FontAwesomeIcon)`
    width: 16px;
    margin-right: 8px;
`;

function PageAuthButton() {
    const { token } = useToken();
    const { userState } = useContext(AuthContext);
    const [user, setUser] = userState;

    const { handleGoogle } = useFetch();
    const [signInStage, setSignInStage] = useState(0);
    const [updateSuccessFlipFlop, setUpdateSuccessFlipFlop] = useState(false);
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    // Init Button

    useEffect(() => {
        if (window.google) {
            window.google.accounts.id.initialize({
                client_id: '335796492667-44oo6rbp51pjp6i9q5ui5b2ick7vstmb.apps.googleusercontent.com',
                callback: handleGoogle,
            });
            window.google.accounts.id.renderButton(document.getElementById('sign-in-btn'), {
                theme: token.isDarkMode ? 'filled_black' : 'outline',
                locale: 'zh_TW',
                shape: 'pill',
                size: 'medium',
            });
        }
    }, [handleGoogle]);

    // Before Sign In

    const onSignInBtnClick = () => setSignInStage(signInStage + 1);

    useEffect(() => {
        if (signInStage === 1) setTimeout(() => setSignInStage(0), 5000);
    }, [signInStage]);

    // User Management

    useEffect(() => { if (user?.email) setSignInStage(2); }, [user]);

    const handleSignOut = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.reload();
    };

    // EVERY RELOAD

    useEffect(() => {
        axios
            .get('/getUser', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
            .then((res) => {
                localStorage.setItem('user', JSON.stringify(res.data?.user));
                setUser(res.data?.user);
            });
    }, [updateSuccessFlipFlop]);

    // Components

    const myInfoButton = (
        <>
            <FaIcon icon={faUserPen} style={{ marginRight: 7, marginLeft: 1 }} />
            <span>更新使用者資訊</span>
        </>
    );
    const sinOutButton = (
        <>
            <FaIcon icon={faArrowRightFromBracket} />
            <span>登出</span>
        </>
    );

    const onUserMenuClick = (e) => {
        switch (e.key) {
        case 'signout':
            handleSignOut();
            break;
        case 'myinfo':
            setShowInfoModal(true);
            break;
        default: break;
        }
    };

    const hideInfoModal = () => setShowInfoModal(false);

    const onUpdateInfoSuccess = () => setUpdateSuccessFlipFlop(!updateSuccessFlipFlop);

    return (
        <>
            {contextHolder}

            { (signInStage === 0) && (<Button type="primary" shape="round" onClick={onSignInBtnClick}>登入</Button>) }

            <SignInButton id="sign-in-btn" data-text="signup_with" style={{ display: (signInStage === 1) ? 'block' : 'none' }} />

            { (signInStage === 2) && (
                <>
                    <Dropdown
                        placement="bottomRight"
                        menu={{
                            items: [
                                { label: myInfoButton, key: 'myinfo' },
                                { type: 'divider' },
                                { label: sinOutButton, key: 'signout', danger: true },
                            ],
                            onClick: onUserMenuClick,
                        }}
                    >
                        <Button
                            type="primary"
                            shape="circle"
                            size="large"
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            icon={<Avatar src={user.avatar} size="default" style={{ border: `2px solid ${(!token.isDarkMode) ? '#FAFAFA' : '#050505'}` }} />}
                        />
                    </Dropdown>
                    <ModalMyInfo
                        show={showInfoModal}
                        onCancel={hideInfoModal}
                        onUpdateInfoSuccess={onUpdateInfoSuccess}
                        messageApi={messageApi}
                    />
                </>
            ) }
        </>
    );
}

export default PageAuthButton;
