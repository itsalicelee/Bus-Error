import { React, useEffect, useState } from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import { Menu as AntdMenu } from 'antd';
import styled from 'styled-components';

import useMenu from '../hooks/useMenu';

const Menu = styled(AntdMenu)`
    background-color: #FAFAFA00;
    .ant-menu-item-selected {
        font-weight: 700;
    }
}`;

function PageMenu() {
    const tagItems = useMenu();
    const location = useLocation();
    const [tagName, setTagName] = useState('');

    useEffect(() => {
        const match = matchPath(
            { path: '/posts/tag/:tagName' },
            location.pathname,
        );
        setTagName((match) ? match.params.tagName : '');
    }, [location]);

    return (
        <Menu
            items={tagItems}
            style={{ width: 200 }}
            selectedKeys={[tagName]}
            mode="inline"
        />
    );
}

export default PageMenu;
