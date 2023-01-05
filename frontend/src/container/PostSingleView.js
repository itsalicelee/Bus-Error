// General
import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import axios from '../api';

import PostSingleContent from './PostSingleContent';
import PostSingleComment from './PostSingleComment';

const MainContainer = styled.div`
    flex: 1;
    margin: 0 16px;
    padding-bottom: 32px;
    overflow: auto;
`;

function PostListView() {
    const { postId } = useParams();
    const [postData, setPostData] = useState({});

    useEffect(() => {
        axios
            .get('/GetSinglePost', {
                params: { postId },
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            })
            .then((res) => {
                document.title = `${res.data.contents[0].post_title} - Bus Error`;
                setPostData(res.data.contents[0]);
            });
    }, [postId]);

    return (
        <MainContainer>
            { postData.post_author ? (
                <>
                    <PostSingleContent postData={postData} />
                    <PostSingleComment
                        postComments={postData.post_comment}
                        postId={postId}
                        isAuthor={postData.isAuthor}
                    />
                </>
            ) : ''}
        </MainContainer>
    );
}

export default PostListView;
