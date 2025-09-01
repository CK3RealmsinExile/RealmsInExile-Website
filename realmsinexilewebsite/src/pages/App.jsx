import { useState } from 'react';
import realmsMap from '../assets/map.webp';
import startDatesData from '../data/startDates.json';
import charactersData from '../data/characters.json'; // make sure to import this
import '../styles/App.css';

function App() {
  const [startName, setStartName] = useState(startDatesData[0].name);
  const [startDate, setStartDate] = useState(startDatesData[0].date);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const selectedStart = startDatesData.find((s) => s.name === startName);

  return (
    <>
      {/* Timeline navigation bar */}
      <nav className="timeline-nav">
        {startDatesData.map((start) => (
          <div className="timeline-item" key={start.id}>
            <div
              className={`circle ${start.name === startName ? 'active' : ''}`}
              onClick={() => {
                setStartDate(start.date)
                setStartName(start.name);
                setSidebarOpen(true);
                setSelectedCharacter(null); // reset character selection
              }}
            >
              <div className="tooltip">{start.tooltip}</div>
            </div>
            <span className="date-label">{start.date}</span>
          </div>
        ))}
      </nav>

      {/* Map container */}
      <div className="map-container">
        <img src={realmsMap} alt="Realms Map" />

        {/* Character pins ON TOP of map */}
        {charactersData
          .filter((char) => char.startDates.includes(startDate))
          .map((char) => (
            <div
              key={char.id}
              className="char-pin"
              style={{
                left: `${char.position.x * 100}%`,
                top: `${char.position.y * 100}%`,
              }}
              onClick={() => {
                setSelectedCharacter(char);
                setSidebarOpen(true);
              }}
            >
              <div className="char-tooltip">{char.name}</div>
            </div>
          ))}
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={() => setSidebarOpen(false)}>
          ✕
        </button>

        {selectedCharacter ? (
          <>
            <h2>{selectedCharacter.name}</h2>
            {selectedCharacter.description.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </>
        ) : (
          <>
            <h2>{selectedStart.name}</h2>
            <p>{selectedStart.description}</p>
            {selectedStart.extra &&
              selectedStart.extra.map((para, i) => <p key={i}>{para}</p>)}
          </>
        )}
      </div>

      {/* Sidebar toggle button (when closed) */}
      <button
        className={`sidebar-toggle ${sidebarOpen ? 'hidden' : ''}`}
        onClick={() => setSidebarOpen(true)}
      >
        &lt;
      </button>
    </>
  );
}

export default App;
