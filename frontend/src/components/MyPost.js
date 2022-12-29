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
    margin-right: 8px;
    margin-left: -4px;
    div {
        display: inline-block;
        width: 50px;
        height: 48px;
        margin: 0 4px 0 0;
        padding-top: 3px;
        text-align: center;
        border-radius: 4px;
    }
    div h2 {
        font-size: 20px;
        line-height: 1.2em;
        margin-bottom: 0;
    }
    div p {
        white-space: nowrap;
        margin: 0;
        font-size: 12px;
        line-height: 1.4em;
        color: #8C8C8C;
    }
`;

const ContentContainer = styled.div`
    flex: 1;
    div {
        display: flex;
        justify-content: space-between;
    }
    h2 {
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 4px;
    }
    p {
        font-size: 14px;
        margin-bottom: 10px;
        color: #8C8C8C;
    }
    div .info .icon {
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
                <p>為方便大家閱讀，我把關鍵程式碼貼出 有如下 C 程式碼，編譯成程式 test {'{'}程式片段{'}'} 並設定 test 為 root 所有以及 SUID {'{'}程式片段{'}'} 有另外一個程式 fork，調用 exec 來執行 test {'{'}程式片段{'}'} 系統 ...</p>{/* eslint-disable-line */}
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
