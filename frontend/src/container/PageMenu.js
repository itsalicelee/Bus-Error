import { React } from 'react';
import { useParams } from 'react-router-dom';
import { Menu as AntdMenu } from 'antd';
import styled from 'styled-components';

import useMenuItems from '../hooks/useMenuItems';

const Menu = styled(AntdMenu)`
    background-color: #FAFAFA00;
    .ant-menu-item-selected {
        font-weight: 700;
    }
}`;

function PageMenu() {
    const { tagName } = useParams();
    const tagItems = useMenuItems();

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
