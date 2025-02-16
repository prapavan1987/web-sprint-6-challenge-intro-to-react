import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios';
import Character from './Character';

const urlPlanets = 'http://localhost:9009/api/planets';
const urlPeople = 'http://localhost:9009/api/people';

function App() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    Promise.all([axios.get(urlPeople), axios.get(urlPlanets)])
      .then(([peopleResponse, planetsResponse]) => {
        const people = peopleResponse.data;
        const planets = planetsResponse.data;

        const combinedData = people.map(person => {
          const homeworld = planets.find(planet => planet.id === person.homeworld);
          return {
            ...person,
            homeworld: {
              id: homeworld.id,
              name: homeworld.name,
            }
          };
        });


        setCharacters(combinedData);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  }, []);

  return (
    <div>
      <h2>Star Wars Characters</h2>
      <p>See the README of the project for instructions on completing this challenge</p>
      {characters.map(character => (
        <Character key={character.id} character={character} />
      ))}
    </div>
  );
}

export default App;

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = App
