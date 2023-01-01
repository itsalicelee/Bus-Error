/*
    Usage:

    import MarkdownContainer from ...;

    <MarkdownContainer>
        { markdownString }
    </MarkdownContainer>
 */
import { React } from 'react';
import { theme } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

import { Prism as SyntaxHighlighterPrism } from 'react-syntax-highlighter';
import { oneLight, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const { useToken } = theme;

const Container = styled.div`
    pre {
        margin-left: -8px;
        margin-right: -8px;
    }
    h1, h2, h3, h4, h5, h6 {
        font-weight: 700;
    }
    img {
        max-width: 100%;
    }
`;

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

function MarkdownContainer(props) {
    const { token } = useToken();
    const { children } = props;

    return (
        <Container
            style={{
                fontFamily: token.fontFamily,
                fontSize: token.fontSize,
                lineHeight: token.lineHeight,
                fontWeight: token.fontWeight,
                colorPrimary: token.colorPrimary,
                colorInfo: token.colorInfo,
                color: (token.isDarkMode) ? '#FFFFFFD9' : '#000000E0',
            }}
        >
            <ReactMarkdown
                remarkPlugins={[remarkMath, remarkGfm]}
                rehypePlugins={[rehypeKatex]}
                components={
                    (token.isDarkMode)
                        ? { ...rmcCodeDark, ...rmComponents }
                        : { ...rmcCodeLight, ...rmComponents }
                }
                darkMode={token.isDarkMode}
            >
                { children }
            </ReactMarkdown>
        </Container>
    );
}

MarkdownContainer.propTypes = {
    children: PropTypes.string.isRequired,
};

export default MarkdownContainer;
