import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Input from 'antd/es/input/Input';
import { Button, Typography, theme } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

import useFetch from '../hooks/useFetch';

import BusErrorLogoDark from '../assets/BusErrorLogoDark.svg';
import BusErrorLogoLight from '../assets/BusErrorLogoLight.svg';

const { Title } = Typography;
const { useToken } = theme;

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
    align-items: center;
}`;

const HeaderHomeContainer = styled(Title)`
    margin: 0 !important;
    flex: 1;
    flex-shrink: 0;
    display: flex;
`;

const SignInButton = styled.div`
    > div > div:first-child,
    > div > div:last-child {
        display: none;
    }
`;

function PageHeader(props) {
    const { darkMode, handleThemeChange, userEmail } = props;

    const { token } = useToken();
    document.body.style.backgroundColor = (!darkMode) ? '#FAFAFA' : '#050505';
    const onThemeChange = () => handleThemeChange();

    const [signInStage, setSignInStage] = useState(0);
    const { handleGoogle } = useFetch();

    useEffect(() => {
        if (window.google) {
            window.google.accounts.id.initialize({
                client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                callback: handleGoogle,
            });
            window.google.accounts.id.renderButton(document.getElementById('sign-in-btn'), {
                theme: darkMode ? 'filled_black' : 'outline',
                locale: 'zh_TW',
                shape: 'pill',
                size: 'medium',
            });
        }
    }, [handleGoogle]);

    const onSignInBtnClick = () => setSignInStage(signInStage + 1);

    const onSignOutBtnClick = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.reload();
    };

    useEffect(() => {
        if (signInStage === 1) {
            setTimeout(() => setSignInStage(0), 5000);
        }
    }, [signInStage]);

    useEffect(() => { if (userEmail) setSignInStage(2); }, [userEmail]);

    return (
        <Header>
            <HeaderHomeContainer level={1}>
                <Link to="/">
                    <img src={darkMode ? BusErrorLogoDark : BusErrorLogoLight} alt="Bus Error" style={{ display: 'block' }} />
                </Link>
            </HeaderHomeContainer>
            <Input placeholder="搜尋" style={{ maxWidth: 500, flex: 1 }} />
            <Container>
                <Button onClick={onThemeChange} type="text" shape="circle" style={{ marginRight: 8, color: token.colorTextTertiary }}>
                    <FontAwesomeIcon icon={(darkMode) ? faMoon : faSun} />
                </Button>
                { (signInStage === 0) && (<Button type="primary" shape="round" onClick={onSignInBtnClick}>登入</Button>) }
                { (signInStage === 1) && (<SignInButton id="sign-in-btn" data-text="signup_with" />) }
                { (signInStage === 2) && (<Button type="primary" shape="round" onClick={onSignOutBtnClick}>登出</Button>) }
            </Container>
        </Header>
    );
}

PageHeader.propTypes = {
    darkMode: PropTypes.bool.isRequired,
    handleThemeChange: PropTypes.func.isRequired,
    userEmail: PropTypes.string,
};

export default PageHeader;
