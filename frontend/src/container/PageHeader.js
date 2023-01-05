import { React } from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, theme } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import BusErrorLogoDark from '../assets/BusErrorLogoDark.svg';
import BusErrorLogoLight from '../assets/BusErrorLogoLight.svg';
import PageAuthButton from './PageAuthButton';

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
    .material-symbols-outlined {
        font-size: 20px;
        font-variation-settings:
            'FILL' 1,
            'wght' 500,
            'GRAD' -25,
            'opsz' 20
    }
`;

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

const ThemeChangeButton = styled(Button)`
    margin-right: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

function PageHeader(props) {
    const { darkMode, handleThemeChange } = props;

    const { token } = useToken();
    document.body.style.backgroundColor = (!darkMode) ? '#FAFAFA' : '#050505';
    const onThemeChange = () => handleThemeChange();

    return (
        <Header>
            <HeaderHomeContainer level={1}>
                <Link to="/">
                    <img src={darkMode ? BusErrorLogoDark : BusErrorLogoLight} alt="Bus Error" style={{ display: 'block' }} />
                </Link>
            </HeaderHomeContainer>
            <Container>
                <ThemeChangeButton onClick={onThemeChange} type="text" shape="circle" style={{ color: token.colorTextTertiary }}>
                    <span className="material-symbols-outlined">{ darkMode ? 'light_mode' : 'dark_mode' }</span>
                </ThemeChangeButton>
                <PageAuthButton />
            </Container>
        </Header>
    );
}

PageHeader.propTypes = {
    darkMode: PropTypes.bool.isRequired,
    handleThemeChange: PropTypes.func.isRequired,
};

export default PageHeader;
