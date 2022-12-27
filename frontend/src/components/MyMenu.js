import { Menu } from 'antd';
import styled from "styled-components";

const Wrapper = styled(Menu)`
    .ant-menu-item-selected {
        background-color: #FFF1B8 !important;
        color: #FAAD14;
    }
}`;

const items_0 = [
    { label: "追蹤中的主標籤", type: "group"},
    { label: 'C / UNIX', key: 'item-1'},
    { label: 'JS / React', key: 'item-2'},
    { label: 'Python', key: 'item-3'}
];

const items_1 = [
    { label: "熱門的主標籤", type: "group"},
    { label: 'JS / Vue.js', key: 'item-1'},
    { label: 'JS / Angular', key: 'item-2'},
    { label: '軟體 / Adobe XD', key: 'item-3'}
];

const MyMenu = () => {
    return (
        <>
            <Wrapper 
                items={items_0}
                style={{ width: 224 }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
            ></Wrapper>

            <Wrapper 
                items={items_1}
                style={{ width: 224 }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
            ></Wrapper>
        </>
        
    );
};

export default MyMenu;
