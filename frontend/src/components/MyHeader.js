import React from 'react';
import Input from 'antd/es/input/Input';
import { Button } from 'antd';

// const Wrapper = styled(Menu)`
//     .ant-menu-item-selected {
//         background-color: #FFF1B8 !important;
//         color: #FAAD14;
//     }
// }`;

function MyHeader() {
    return (
        <div>
            <h1>Bus Error</h1>
            <Input />
            <Button>問題</Button>
            <Button>標籤</Button>
            <Button>登入 / 註冊</Button>
        </div>
    );
}

export default MyHeader;
