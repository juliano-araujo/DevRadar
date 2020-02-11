import React, { useState, useEffect } from 'react';

export default function DevForm({ onSubmit }) {
  const [coords, setCoords] = useState({latitude: '', longitude: ''});
  const [githubUsername, setGithubUsername] = useState('');
  const [techs, setTechs] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      setCoords({ latitude, longitude });
    }, err => {
      console.log(err);
    }, {
      timeout: 30000,
    });
  }, []);

  async function handleSubmit(event){
    event.preventDefault();

    await onSubmit({
      github_username: githubUsername,
      techs,
      latitude: coords.latitude,
      longitude: coords.longitude,
    });

    setGithubUsername('');
    setTechs('');
  }

  function handleCoordsChange(event){
    const target = event.target;
    setCoords(state => ({ ...state, [target.name]: target.value }));
  }

  function handleGithubUsernameChange(event){
    setGithubUsername(event.target.value);
  }

  function handleTechsChange(event){
    setTechs(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="github_username">Usuário do Github</label>
        <input
          type="text"
          name="github_username"
          id="username_github" 
          value={githubUsername}
          onChange={handleGithubUsernameChange}
          required
        />
      </div>

      <div className="input-block">
        <label htmlFor="techs">Tecnologias</label>
        <input
          type="text"
          name="techs"
          id="techs"
          value={techs}
          onChange={handleTechsChange}
          required
        />
      </div>

      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input
            type="number"
            name="latitude"
            id="latitude"
            value={coords.latitude}
            onChange={handleCoordsChange}
            required
          />
        </div>

        <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input
            type="number"
            name="longitude" 
            id="longitude"
            value={coords.longitude}
            onChange={handleCoordsChange}
            required/>
        </div>
      </div>

      <button type="submit">Salvar</button>
    </form>
  );
}
