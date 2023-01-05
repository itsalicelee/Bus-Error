import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api';

const tagChild = (identifier, displayName) => ({
    label: <Link to={`/posts/topic/${identifier}`}>{ displayName }</Link>,
    key: identifier,
});

function useMenuData() {
    const [tagItems, setTagItems] = useState([]); // eslint-disable-line

    useEffect(() => {
        axios.get('/getMainTagList').then((res) => {
            const { following, tags: trending } = res.data.contents;
            const preTagItems = [];
            if (following) {
                preTagItems.push({ type: 'group', label: '追蹤中的主題', children: [] });
                preTagItems.push({ type: 'group', label: '熱門的主題', children: [] });
                following.forEach((e) => {
                    preTagItems[0].children.push(tagChild(e.tag_identifier, e.tag_displayName));
                });
                trending
                    // eslint-disable-next-line max-len
                    .filter((e) => following.map((f) => f.tag_identifier).indexOf(e.tag_identifier) < 0)
                    .forEach((e) => {
                        preTagItems[1].children.push(tagChild(e.tag_identifier, e.tag_displayName));
                    });
            } else {
                // preTagItems.push({ type: 'group', label: '熱門的主題', children: [] });
                preTagItems.push({ type: 'group', label: '主題列表', children: [] });
                preTagItems[0].children.push(tagChild('all', '所有主題'));
                trending
                    .sort((e1, e2) => ((e1.tag_identifier > e2.tag_identifier) ? 1 : -1))
                    .forEach((e) => {
                        console.log(e);
                        preTagItems[0].children.push(tagChild(e.tag_identifier, e.tag_displayName));
                    });
            }
            setTagItems(preTagItems);
        });
    }, []);

    return tagItems;
}

export default useMenuData;
