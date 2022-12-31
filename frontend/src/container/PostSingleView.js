// General
import React from 'react';
import { useParams } from 'react-router-dom';
import { theme } from 'antd';
import styled from 'styled-components';

import { Prism as SyntaxHighlighterPrism } from 'react-syntax-highlighter';
import { oneLight, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Components & containers
import PostSingleContent from './PostSingleContent';
import PostSingleComment from './PostSingleComment';

const { useToken } = theme;

const MainContainer = styled.div`
    flex: 1;
    margin: 0 16px;
    padding-bottom: 20px;
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
    h1: 'h2',
    h2: 'h3',
    h3: 'h4',
    h4: 'h5',
};

const rmcCodeLight = {
    code: ({ inline, className, children }) => {
        const match = /language-(\w+)/.exec(className || '');
        return !inline && match ? (
            <SyntaxHighlighterPrism style={oneLight} language={match[1]} PreTag="div">
                { String(children).replace(/\n$/, '') }
            </SyntaxHighlighterPrism>
        ) : (<code className={className}>{children}</code>);
    },
    a: ({ className, href, children }) => (<a className={className} href={href} target="_blank" rel="noreferrer" style={{ color: '#FAAD14' }}>{children}</a>),
};

const rmcCodeDark = {
    code: ({ inline, className, children }) => {
        const match = /language-(\w+)/.exec(className || '');
        return !inline && match ? (
            <SyntaxHighlighterPrism style={oneDark} language={match[1]} PreTag="div">
                { String(children).replace(/\n$/, '') }
            </SyntaxHighlighterPrism>
        ) : (<code className={className}>{children}</code>);
    },
    a: ({ className, href, children }) => (<a className={className} href={href} target="_blank" rel="noreferrer" style={{ color: '#D89614' }}>{children}</a>),
};

function PostListView() {
    const { postId } = useParams();
    const { token } = useToken();
    console.log(postId, token.isDarkMode);

    return (
        <MainContainer>
            <PostSingleContent
                rmComponents={
                    (token.isDarkMode)
                        ? { ...rmcCodeDark, ...rmComponents }
                        : { ...rmcCodeLight, ...rmComponents }
                }
                postData={postData}
            />
            <PostSingleComment
                rmComponents={
                    (token.isDarkMode)
                        ? { ...rmcCodeDark, ...rmComponents }
                        : { ...rmcCodeLight, ...rmComponents }
                }
                postData={postData}
            />
        </MainContainer>
    );
}

export default PostListView;
