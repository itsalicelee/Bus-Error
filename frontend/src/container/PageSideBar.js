import React from 'react';
import { Card } from 'antd';

function PageSideBar() {
    return (
        <Card title="應該可以放蠻多東西" style={{ width: '200px', maxHeight: '300px' }}>
            <p>· 使用者貢獻排行 ?</p>
            <p>· 最常搭配的子標籤 ?</p>
            <p>· 使用者資訊 ?</p>
            <p>· 留言數，不要廣告?</p>
        </Card>
    );
}

export default PageSideBar;
