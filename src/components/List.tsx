import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getData } from '../helpers';
import { css } from 'emotion';

import LevelInterface from '../interfaces/LevelInterface';

const List = () => {
    const [loading, setLoading] = useState(true);
    const [levels, setLevels] = useState([]);

    useEffect(() => {
        getData('http://localhost:8000/levels/').then(({ results }) => {
            setLevels(
                results.map(
                    ({ name, level_code, id }: { name: string, level_code: string, id: number }) => ({
                        name,
                        levelCode: level_code,
                        id
                    }),
                ),
            );
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div>Loading</div>;
    }

    return (
        <>
            <div className={css`width: 50%; float: left;`}>
                <h1>Levels</h1>
                <ul>
                    {levels.map(({ name, levelCode, id }: LevelInterface) => (
                        <li key={name}>
                            {name} - {levelCode} <Link to={`/${id}`}>Details</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={css`width: 50%; float: left; text-align: right;`}><h2><Link to='/create'>Create New Level</Link></h2></div>
        </>
    );
};

export default List;