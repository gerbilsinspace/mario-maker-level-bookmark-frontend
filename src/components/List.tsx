import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getData } from '../helpers';
import { css } from 'emotion';
import { url } from '../config';

import LevelInterface from '../interfaces/LevelInterface';

const List = () => {
    const [loading, setLoading] = useState(true);
    const [levels, setLevels] = useState([]);

    useEffect(() => {
        getData(`${url}/levels/`).then(({ results }) => {
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
            <div className={css`width: 70%; float: left;`}>
                <h2>Levels</h2>
                <ul>
                    {levels.map(({ name, levelCode, id }: LevelInterface) => (
                        <li key={name}>
                            <p>{name} - {levelCode}</p>
                            <p><Link to={`/${id}`}>Details</Link></p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={css`width: 30%; float: left; text-align: right;`}><h2><Link to='/create'>Create New Level</Link></h2></div>
        </>
    );
};

export default List;