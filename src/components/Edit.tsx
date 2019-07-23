import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { css } from 'emotion';
import { url } from '../config';
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
            fetch(`${url}/levels/${id}/`, {
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
        fetch(`${url}/levels/${id}/`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, level_code: levelCode })
        }).then(() => {
            setRedirect(true);
        });
    };

    return (
        <div>
            <h2>{name}</h2>
            <p>
                <label htmlFor="name" className={css`width: 100px; display: inline-block;`}>Name: </label>
                <input type="text" id="name" value={name} onChange={onNameChange} className={css`width: 300px; padding: 5px; display: inline-block;`} />
            </p>
            <p>
                <label htmlFor="levelCode" className={css`width: 100px; display: inline-block;`}>Level Code: </label>
                <input
                    type="text"
                    id="levelCode"
                    value={levelCode}
                    onChange={onLevelCodeChange}
                    className={css`width: 300px; padding: 5px; display: inline-block;`}
                />
            </p>
            <p>
                <button onClick={onEditClick}>Edit Level</button>
            </p>
        </div>
    );
};

export default Edit;