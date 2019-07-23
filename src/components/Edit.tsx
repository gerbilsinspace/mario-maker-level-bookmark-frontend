import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

const Edit = ({
    match: {
        params: { id },
    },
}: {
    match: { params: { id: string } },
}) => {
    const [name, setName] = useState('');
    const [levelCode, setLevelCode] = useState('');
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    const [redirect, setRedirect] = useState(false);

    useEffect(
        () => {
            fetch(`http://localhost:8000/levels/${id}`, {
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                    if (data.detail === 'Not found.')
                        throw new Error(`No level with id ${id}`);
                    setName(data.name);
                    setLevelCode(data.level_code);
                    setLoading(false);
                })
                .catch(e => {
                    setError(e);
                    setLoading(false);
                });
        },
        [id],
    );

    if (error) {
        return <div>There is no level with the id {id}.</div>;
    }

    if (loading) {
        return <div>Loading</div>;
    }

    if (redirect) {
        return <Redirect to={`/${id}`} />;
    }

    const onNameChange = (e: { target: { value: string } }) => {
        setName(e.target.value);
    };

    const onLevelCodeChange = (e: { target: { value: string } }) => {
        setLevelCode(e.target.value);
    };

    const onEditClick = () => {
        fetch(`http://localhost:8000/levels/${id}/`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(() => {
            setRedirect(true);
        });
    };

    return (
        <div>
            <h1>{name}</h1>
            <p>
                <label htmlFor="name">Name: </label>
                <input type="text" id="name" value={name} onChange={onNameChange} />
            </p>
            <p>
                <label htmlFor="levelCode">Level Code: </label>
                <input
                    type="text"
                    id="levelCode"
                    value={levelCode}
                    onChange={onLevelCodeChange}
                />
            </p>
            <p>
                <button onClick={onEditClick}>Edit Level</button>
            </p>
        </div>
    );
};

export default Edit;