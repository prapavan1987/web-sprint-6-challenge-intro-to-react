import React, { useState } from 'react';

function Character(props) {
  const { character } = props;
  const [showHomeworld, setShowHomeworld] = useState(false);

  return (
    <div className="character-card" onClick={() => setShowHomeworld(!showHomeworld)}>
      <h3 className="character-name">{character.name}</h3>
      {showHomeworld && (
        <p className="character-planet">Homeworld: {character.homeworld.name}</p>
      )}
    </div>
  );
}

export default Character;
