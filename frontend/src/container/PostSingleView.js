// General
import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import dayjs from 'dayjs';

// Ant Design
import { Typography, Button, Tag, Avatar, theme, ConfigProvider } from 'antd'; /* eslint-disable-line */
import { gold } from '@ant-design/colors';
import { UserOutlined } from '@ant-design/icons';

// FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

// React Markdown
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { Prism as SyntaxHighlighterPrism } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Components & containers
import PageMenu from '../components/PageMenu';
import PageSideBar from '../components/PageSideBar';

const { Text, Title } = Typography;
const { useToken } = theme;

const MainWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    max-width: 1400px;
    margin-left: auto;
    margin-right: auto;
`;

const MainContainer = styled.div`
    flex: 1;
    margin: 0 16px;
    padding-bottom: 20px;
`;

const PostContainer = styled.div`
    border-radius: 4px;
    box-shadow: 0px 2px 6px #00000017;
`;

const PostHeadContainer = styled.div`
    margin: 0 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid #00000017;
`;

const TitleContainer = styled.div`
    display: flex;
    align-items: flex-start;
    padding-top: 9px;
    padding-bottom: 10px;
`;

const PostTitle = styled(Title)`
    font-size: 22px !important;
    margin: 0 !important;
    padding-top: 7px;
    line-height: 1.2;
    flex: 1;
`;

const PostContentContainer = styled.div`
    margin: 12px 20px;
    pre {
        margin-left: -8px;
        margin-right: -8px;
    }
    p code {
        background: #FAFAFA;
        padding: 2px 4px;
        border-radius: 4px;
    }
    h1, h2, h3, h4, h5, h6 {
        font-weight: 700;
    }
`;

const PostActionContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 20px;
    padding: 12px 0 14px 0;
    border-top: 1px solid #00000017;
`;

const CommentContainer = styled.div`
    border-radius: 4px;
    box-shadow: 0px 2px 6px #00000017;
    margin-top: 16px;
`;

/* eslint-disable */
const postData = {
    post_id: 0,
    post_author: {
        user_id: 'paun3wrad6saff6LUM4cris2gnew',
        user_name: '不知名的小子',
    },
    post_tag: [],
    post_topic: '進程 exec 了設有 SUID 的程式，會改變進程的 EUID 嗎？',
    post_shortbody: '為方便大家閱讀，我把關鍵程式碼貼出 有如下 C 程式碼，編譯成程式 test {程式片段} 並設定 test 為 root 所有以及 SUID {程式片段} 有另外一個程式 fork，調用 exec 來執行 test {程式片段} 系統系統中普通用戶的 uid 為 1000，root 的 uid 為 0 個人覺得，輸出結果應該是： EUID:0 因為 test 設置了 SUID，fork 在 exec 時應該會將有效用戶 ID',
    post_fullBody: `
## Task Description ##

作為實習員工的你，在前兩次由組織所策畫的項目中表現得相當傑出，大哥對此讚譽有加。於是，他決定指派你參與一項更大的計畫。正如組織的座右銘「Never settle for less」所言，接下來的計畫將會由包括你在內的團隊，策畫一系列的銀行搶劫案。與侵入民宅行竊相比，搶劫銀行可要複雜得多。  

還好，負責偵察的隊員已經拿到了城市裡所有銀行的平面圖，以及每間銀行的保全系統的規格說明書。為了防止歹徒入侵，每間銀行的金庫都設有雷射裝置，而保全系統的規格說明書裡則詳細地列出了這些雷射器的具體位置。你的任務是按照這份說明書計算銀行裡有多少道雷射光束，讓你的伙伴能造出足夠數量的**特別裝置**。這種裝置能在不觸發警報的情況下，通過雷射光束的檢測。  

https://cool.ntu.edu.tw

和社區裡的住宅一樣，相鄰的兩間銀行的保全系統也是連通的。因此如果在同一個晚上，相鄰的兩間銀行的金庫都有被打開的話，警報就會響起，而相關單位也會接獲通報。  

給定：一個整數 $N$，代表目標城市裡的銀行數量；一個包含 $N$ 個整數的數組 *money*，依序表示每間銀行金庫所存放的現金；一個 binary string 的陣列，以 $4\times6$ 矩陣的形式表示每間銀行的雷射器位置。對於每行 binary string，*map[i]* 表示銀行的第 $i$ 列，由 *‘0’* 和 *‘1’* 組成，每位數字表示該列每一格的狀況：*‘0’* 表示該格為空，而 *‘1’* 則表示該格設有雷射器。  

當兩個雷射器同時滿足以下條件，它們之間就會產生一束雷射光束：  

1. 這兩個雷射器位處兩個不同的列 $r_1$ 和 $r_2$ 上，其中 $r_1 \lt r_2$；  
2. 這兩個雷射器所在的列之間的每一列，都沒有雷射器。   

注意：任意兩條雷射光束之間都是獨立的，也就是說，它們不會合併或互相干預。  

請你完成以下兩個函數：  
函數 \`beams\`，用來找出每一間銀行的雷射光束數量；  
函數 \`rob\`，計算在一個晚上裡，你們小隊最多能盜走的金額，並回傳要盜走前述金額所需**特別裝置的數量**。  

函數 \`beams\` 及 \`rob\` 的原型給定如下：  

\`\`\`c
int beams(char spec[4][7]);
int rob(int *money, int *laser, int no_of_bank);
\`\`\`

以下的主程式會用來測試你所提交的函數：  

\`\`\`c
#include <stdio.h>
#include <string.h>
#include "function.h"
int main () {
    int N;
    scanf("%d", &N);
    int money[N], laser[N];
    for (int i = 0; i < N; i++)
        scanf("%d", &money[i]);
    for (int i = 0; i < N; i++) {
        char spec[4][7];
        for (int j = 0; j < 4; j++)
            scanf("%s", spec[j]);
        laser[i] = beams(spec);
    }
    
    int ans = rob(money, laser, N);
    printf("%d", ans);
    return 0;
}
\`\`\`
        
    `,
    post_createdAt: 1672297200360,
    post_updatedAt: 1672297200360,
    post_views: 12,
};
/* eslint-enable */

const rmComponents = {
    code: ({ inline, className, children }) => {
        const match = /language-(\w+)/.exec(className || '');
        return !inline && match ? (
            <SyntaxHighlighterPrism style={oneLight} language={match[1]} PreTag="div">
                { String(children).replace(/\n$/, '') }
            </SyntaxHighlighterPrism>
        ) : (<code className={className}>{children}</code>);
    },
    h1: 'h2',
    h2: 'h3',
    h3: 'h4',
    h4: 'h5',
};

function PostListView() {
    const { token } = useToken();

    const { postId } = useParams();
    console.log(postId);
    console.log(ConfigProvider.theme);

    return (
        <MainWrapper>
            <PageMenu />
            <MainContainer>
                <PostContainer style={{ background: token.colorBgContainer }}>
                    <PostHeadContainer style={{ borderBottomColor: token.colorBorder }}>
                        <TitleContainer>
                            <PostTitle>{postData.post_topic}</PostTitle>
                            <Button type="primary">問問題</Button>
                        </TitleContainer>
                        <div>
                            <Tag color="gold">C / UNIX</Tag>
                            <Tag>SUID</Tag>
                            <Tag>EUID</Tag>
                        </div>
                    </PostHeadContainer>
                    <PostContentContainer style={{
                        fontFamily: token.fontFamily,
                        fontSize: token.fontSize,
                        lineHeight: token.lineHeight,
                        fontWeight: token.fontWeight,
                        colorPrimary: token.colorPrimary,
                        colorInfo: token.colorInfo,
                        colorTextBase: token.colorTextBase,
                    }}
                    >
                        <ReactMarkdown
                            remarkPlugins={[remarkMath, remarkGfm]}
                            rehypePlugins={[rehypeKatex]}
                            components={rmComponents}
                        >
                            {postData.post_fullBody}
                        </ReactMarkdown>
                    </PostContentContainer>
                    <PostActionContainer style={{ bordeTopColor: token.colorBorder }}>
                        <div style={{ marginLeft: -6 }}>
                            <Button type="text" shape="circle" style={{ fontSize: 16, paddingTop: 3, color: '#8C8C8C' }}><FontAwesomeIcon icon={faArrowUp} /></Button>
                            <Button type="text" shape="circle" style={{ fontSize: 16, paddingTop: 3, color: '#8C8C8C' }}><FontAwesomeIcon icon={faArrowDown} /></Button>
                            <Text style={{ fontSize: 16, lineHeight: 2, marginLeft: 8 }}>16</Text>
                        </div>
                        <div>
                            <Button type="text" size="small" shape="round" style={{ padding: '0 6px 0 0px', marginRight: -2 }}>
                                <Avatar
                                    icon={<UserOutlined />}
                                    size="small"
                                    style={{
                                        backgroundColor: '#FCF4E0',
                                        color: '#D48806',
                                        marginTop: -3,
                                        marginRight: 3,
                                        transform: 'scale(0.85)',
                                    }}
                                />
                                <span style={{ color: gold.primary }}>
                                    { postData.post_author.user_name }
                                </span>
                            </Button>
                            <Text type="secondary">
                                ·&nbsp;提問於&nbsp;
                                { dayjs(postData.post_createdAt).format('YYYY-MM-DD HH:mm') }
                            </Text>
                        </div>
                    </PostActionContainer>
                </PostContainer>
                <CommentContainer style={{ background: token.colorBgContainer }}>
                    1
                </CommentContainer>
            </MainContainer>
            <PageSideBar />
        </MainWrapper>
    );
}

export default PostListView;
