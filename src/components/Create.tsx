import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { css } from 'emotion';

const Create = () => {
  const [name, setName] = useState('');
  const [levelCode, setLevelCode] = useState('');
  const [redirect, setRedirect] = useState(false);

  const onNameChange = (e: { target: { value: string } }) => {
    setName(e.target.value);
  };

  const onLevelCodeChange = (e: { target: { value: string } }) => {
    setLevelCode(e.target.value);
  };

  const onButtonClick = () => {
    fetch('http://localhost:8000/levels/', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        level_code: levelCode,
        name,
      }),
    }).then(() => {
      setRedirect(true);
    });
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <h2>New Level</h2>
      <p>
        <label className={css`width: 100px; display: inline-block;`} htmlFor="name">Name: </label>
        <input type="text" onChange={onNameChange} value={name} id="name" className={css`width: 300px; padding: 5px; display: inline-block;`} />
      </p>
      <p>
        <label className={css`width: 100px; display: inline-block;`} htmlFor="levelCode">Level Code: </label>
        <input
          type="text"
          onChange={onLevelCodeChange}
          value={levelCode}
          id="levelCode"
          className={css`width: 300px; padding: 5px; display: inline-block;`}
        />
      </p>
      <p>
        <button onClick={onButtonClick}>Create Level</button>
      </p>
    </>
  );
};

export default Create;
