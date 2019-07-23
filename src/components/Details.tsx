import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface MatchInterface {
    match: {
        params: {
            id: string
        }
    }
}
const Details = ({ match: { params: { id } } }: MatchInterface) => {
    const [name, setName] = useState('');
    const [levelCode, setLevelCode] = useState('');
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

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

    return (
        <div>
            <h1>{name}</h1>
            <p>Name: {name}</p>
            <p>Level Code: {levelCode}</p>
            <p>
                <Link to={`/${id}/edit`}>Edit</Link>
            </p>
            <p>
                <Link to={`/${id}/delete`}>Delete</Link>
            </p>
        </div>
    );
};

export default Details;