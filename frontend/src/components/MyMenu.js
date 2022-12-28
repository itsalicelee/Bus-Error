import React from 'react';
import { Menu } from 'antd';
import styled from 'styled-components';

const Wrapper = styled(Menu)`
    .ant-menu-item-selected {
        background-color: #FCF4E0 !important;
        color: #FAAD14;
        font-weight: 700;
    }
}`;

const followingTags = [
    { label: '追蹤中的主標籤', type: 'group' },
    { label: 'C / UNIX', key: 'item-1' },
    { label: 'JS / React', key: 'item-2' },
    { label: 'Python', key: 'item-3' },
];

const popularTags = [
    { label: '熱門的主標籤', type: 'group' },
    { label: 'JS / Vue.js', key: 'item-1' },
    { label: 'JS / Angular', key: 'item-2' },
    { label: '軟體 / Adobe XD', key: 'item-3' },
];

function MyMenu() {
    return (
        <div>
            <Wrapper
                items={followingTags}
                style={{ width: 224 }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
            />

            <Wrapper
                items={popularTags}
                style={{ width: 224 }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
            />
        </div>
    );
}

export default MyMenu;
