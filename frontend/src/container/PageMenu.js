import { React, useEffect, useState } from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import { Menu as AntdMenu } from 'antd';
import styled from 'styled-components';

import useMenuData from '../hooks/useMenuData';

const Menu = styled(AntdMenu)`
    flex-shrink: 0 !important;
    background-color: #FAFAFA00;
    .ant-menu-item-selected {
        font-weight: 700;
    }
}`;

function PageMenu() {
    const tagItems = useMenuData();
    const location = useLocation();
    const [topicName, setTopicName] = useState('');

    useEffect(() => {
        const match = matchPath(
            { path: '/posts/topic/:topicName/*' },
            location.pathname,
        );
        setTopicName((match) ? match.params.topicName : '');
    }, [location]);

    return (
        <Menu
            items={tagItems}
            style={{ width: 200 }}
            selectedKeys={[topicName]}
            mode="inline"
        />
    );
}

export default PageMenu;
