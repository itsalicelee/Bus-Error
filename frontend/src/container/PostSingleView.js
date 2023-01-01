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
    padding-bottom: 20px;
`;

function PostListView() {
    const { postId } = useParams();
    const [postData, setPostData] = useState({});

    useEffect(() => {
        axios.get('/post-1').then((res) => {
            setPostData(res.data.post);
        });
    }, [postId]);

    return (
        <MainContainer>
            { postData.post_author ? (
                <>
                    <PostSingleContent postData={postData} />
                    <PostSingleComment postComments={postData.post_comment} />
                </>
            ) : ''}
        </MainContainer>
    );
}

export default PostListView;
