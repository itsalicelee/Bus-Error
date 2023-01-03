import { useState } from 'react';
import axios from '../api';

const useFetch = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGoogle = async (response) => {
        setLoading(true);
        fetch(`${axios.defaults.baseURL}/signInUser`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ credential: response.credential }),
        })
            .then((res) => {
                setLoading(false);
                return res.json();
            })
            .then((data) => {
                if (data?.user) {
                    localStorage.setItem('user', JSON.stringify(data?.user));
                    localStorage.setItem('token', data?.user?.token);
                    window.location.reload();
                }
                throw new Error(data?.message || data);
            })
            .catch((err) => {
                setError(err?.message);
            });
    };
    return { loading, error, handleGoogle };
};

export default useFetch;
