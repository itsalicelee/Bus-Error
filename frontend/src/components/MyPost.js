import React from 'react';
import { Tag } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';

// components
const Container = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 16px 0px;
    margin: 0 16px;
    border-bottom: 1px solid #E8E8E8;
    background-color: #FFFFFF;
`;

const DataContainer = styled.div`
    display: flex;
    div {
        margin: 0px 16px;
        text-align: center;
    }
    div h2 {
        margin-bottom: 0;
        color: #141414;
    }
    div p {
        white-space: nowrap;
        margin: 0;
        font-size: 12px;
        color: #8C8C8C;
    }
`;

const ContentContainer = styled.div`
    margin: 0px 8px;
    div {
        display: flex;
        justify-content: space-between;
    }
    h2 {
        font-size: 18px;
        font-weight: 700;
        color: #141414;
    }
    p {
        font-size: 14px;
        color: #8C8C8C;
    }
    div .info .icon {
        color: #D48806;
        text-align: center;
        background-color: #FCF4E0;
        border-radius: 50%;
        height: 20px;
        width: 20px;
    }
    div .info .user {
        color: #FAAD14;
    }
    div .info .time {
        color: #8C8C8C;
    }
    div .info span {
        white-space: nowrap;
    }
`;

function MyPost() {
    return (
        <Container>
            <DataContainer>
                <div>
                    <h2>16</h2>
                    <p>評分</p>
                </div>
                <div>
                    <h2>15</h2>
                    <p>回答</p>
                </div>
                <div>
                    <h2>82</h2>
                    <p>閱覽</p>
                </div>
            </DataContainer>
            <ContentContainer>
                <h2>進程 exec 了設有 SUID 的程式，會改變進程的 EUID 嗎？</h2>
                <p>為方便大家閱讀，我把關鍵程式碼貼出 有如下 C 程式碼，編譯成程式 test 並設定 test 為 root 所有以及有另外一個程式 fork</p>
                <div>
                    <div>
                        <Tag>C / UNIX</Tag>
                        <Tag>SUID</Tag>
                        <Tag>EUID</Tag>
                    </div>
                    <div className="info">
                        <span className="user icon"><UserOutlined /></span>
                        <span className="user">&nbsp;segmentfault</span>
                        <span className="time">&nbsp;·&nbsp;提問於2022-12-28</span>
                    </div>
                </div>
            </ContentContainer>
        </Container>
    );
}

export default MyPost;
