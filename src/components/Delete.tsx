import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { url } from '../config';

const Delete = ({
    match: {
        params: { id },
    },
}: {
    match: { params: { id: string } }
}) => {
    const [name, setName] = useState('');
    const [deleted, setDeleted] = useState(false);

    useEffect(() => {
        fetch(`${url}/levels/${id}`, {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => response.json()).then((data) => {
            setName(data.name)
        })
    }, [id]);

    const onDeleteClick = () => {
        fetch(`${url}/levels/${id}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(() => {
            setDeleted(true);
        });
    };

    if (deleted) return <Redirect to="/" />;

    return (
        <div>
            <p>
                Are you sure you want to delete {name}?{' '}

            </p>
            <p>
                <button onClick={onDeleteClick}>Delete</button>
                <Link to={`/${id}`}>Don't Delete</Link>
            </p>
        </div>
    );
};

export default Delete;