import React from 'react';
import { Menu } from 'antd';
import styled from 'styled-components';

const Container = styled(Menu)`
    background-color: #FAFAFA00;
    .ant-menu-item-selected {
        font-weight: 700;
    }
}`;

const followingTags = [
    {
        type: 'group',
        label: '追蹤中的主標籤',
        children: [
            { label: 'C / UNIX', key: 'item-1' },
            { label: 'JS / React', key: 'item-2' },
            { label: 'Python', key: 'item-3' },
        ],
    },
    {
        type: 'group',
        label: '熱門的主標籤',
        children: [
            { label: 'JS / Vue.js', key: 'item-4' },
            { label: 'JS / Angular', key: 'item-5' },
            { label: 'UI / Adobe XD', key: 'item-6' },
        ],
    },
];

function PageMenu() {
    return (
        <Container
            items={followingTags}
            style={{ width: '200px' }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
        />
    );
}

export default PageMenu;
