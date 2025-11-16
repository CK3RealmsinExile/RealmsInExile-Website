import { useState, useRef, useEffect } from 'react';
import realmsMap from '../assets/map.webp';
import startDatesData from '../data/startDates.json';
import charactersDataImported from '../data/characters.json';
import '../styles/App.css';

function App() {
  const [startName, setStartName] = useState(startDatesData[0].name);
  const [startDate, setStartDate] = useState(startDatesData[0].date);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [hoveredCharId, setHoveredCharId] = useState(null);

  const [charactersData, setCharactersData] = useState(() =>
    charactersDataImported.map(char => ({
      ...char,
      positions: { ...char.position } // default positions
    }))
  );

  const [draggingCharId, setDraggingCharId] = useState(null);
  const mapRef = useRef(null);

  const selectedStart = startDatesData.find(s => s.name === startName);

  const handleMouseMove = (e) => {
    if (!draggingCharId || !mapRef.current) return;

    const mapRect = mapRef.current.getBoundingClientRect();
    let newX = (e.clientX - mapRect.left) / mapRect.width;
    let newY = (e.clientY - mapRect.top) / mapRect.height;

    newX = Math.max(0, Math.min(1, newX));
    newY = Math.max(0, Math.min(1, newY));

    setCharactersData(prev =>
      prev.map(char => {
        if (char.id === draggingCharId) {
          return {
            ...char,
            positions: {
              ...char.positions,
              [startDate]: { x: newX, y: newY }
            }
          };
        }
        return char;
      })
    );
  };

  const handleMouseUp = () => setDraggingCharId(null);

  useEffect(() => {
    if (draggingCharId) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingCharId]);

  // Export JSON function
  const exportPositions = () => {
    const exportData = charactersData.map(char => ({
      id: char.id,
      name: char.name,
      positions: char.positions
    }));

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'characters_positions.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {/* Timeline navigation */}
      <nav className="timeline-nav">
        {startDatesData.map((start) => (
          <div className="timeline-item" key={start.id}>
            <div
              className={`circle ${start.name === startName ? 'active' : ''}`}
              onClick={() => {
                setStartDate(start.date);
                setStartName(start.name);
                setSidebarOpen(true);
                setSelectedCharacter(null);
              }}
            >
              <div className="tooltip">{start.tooltip}</div>
            </div>
            <span className="date-label">{start.date}</span>
          </div>
        ))}
      </nav>

      {/* Map container */}
      <div className="map-container" ref={mapRef}>
        <img src={realmsMap} alt="Realms Map" />

        {charactersData
          .filter(char => char.startDates.includes(startDate))
          .map(char => {
            const pos = char.positions[startDate] || char.position;
            return (
              <div
                key={char.id}
                className="char-pin"
                style={{
                  left: `${pos.x * 100}%`,
                  top: `${pos.y * 100}%`,
                  cursor: draggingCharId === char.id ? 'grabbing' : 'grab'
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  setDraggingCharId(char.id);
                }}
                onClick={() => {
                  setSelectedCharacter(char);
                  setSidebarOpen(true);
                }}
                onMouseEnter={() => setHoveredCharId(char.id)}
                onMouseLeave={() => setHoveredCharId(null)}
              >
                <div
                  className={`char-tooltip ${hoveredCharId && hoveredCharId !== char.id ? 'faded' : ''}`}
                >
                  {char.name}
                </div>
              </div>
            );
          })}
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={() => setSidebarOpen(false)}>✕</button>

        {selectedCharacter ? (
          <>
            <h2>{selectedCharacter.name}</h2>
            {selectedCharacter.description.map((para, i) => <p key={i}>{para}</p>)}
          </>
        ) : (
          <>
            <h2>{selectedStart.name}</h2>
            <p>{selectedStart.description}</p>
            {selectedStart.extra && selectedStart.extra.map((para, i) => <p key={i}>{para}</p>)}
          </>
        )}

        {/* Export positions button */}
        <button onClick={exportPositions} className="export-btn">
          Export Positions JSON
        </button>
      </div>

      {/* Sidebar toggle */}
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
