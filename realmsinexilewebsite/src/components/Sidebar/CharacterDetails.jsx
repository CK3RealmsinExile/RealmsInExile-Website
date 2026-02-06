import PropTypes from 'prop-types'

/**
 * Character details component
 * Displays character information in the sidebar
 * Presentational component - receives all data via props
 * 
 * @component
 * 
 * @param {Object} props
 * @param {Object} props.character - Character data object
 * @param {string} props.character.name - Character name
 * @param {Array<string>} props.character.description - Array of description paragraphs
 * @param {string} [props.character.image] - Optional character image URL
 * @param {Object} [props.character.metadata] - Optional additional data (birth, death, etc.)
 * 
 * @example
 * <CharacterDetails character={selectedCharacter} />
 */
function CharacterDetails({ character }) {
  if (!character) {
    return (
      <div className="character-details character-details--empty">
        <p className="empty-state">No character selected</p>
      </div>
    )
  }

  return (
    <article className="character-details">
      {/* Character header */}
      <header className="character-details__header">
        <h2 className="character-details__name">{character.name}</h2>
        
        {/* Optional character image */}
        {character.image && (
          <img
            src={character.image}
            alt={`Portrait of ${character.name}`}
            className="character-details__image"
            loading="lazy"
          />
        )}
      </header>

      {/* Character description */}
      <div className="character-details__content">
        {character.description.map((paragraph, index) => (
          <p key={index} className="character-details__paragraph">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Optional metadata section */}
      {character.metadata && (
        <aside className="character-details__metadata">
          <h3 className="character-details__metadata-title">Additional Information</h3>
          <dl className="character-details__metadata-list">
            {character.metadata.birth && (
              <>
                <dt>Born:</dt>
                <dd>{character.metadata.birth}</dd>
              </>
            )}
            {character.metadata.death && (
              <>
                <dt>Died:</dt>
                <dd>{character.metadata.death}</dd>
              </>
            )}
            {character.metadata.titles && (
              <>
                <dt>Titles:</dt>
                <dd>{character.metadata.titles.join(', ')}</dd>
              </>
            )}
          </dl>
        </aside>
      )}
    </article>
  )
}

CharacterDetails.propTypes = {
  character: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.arrayOf(PropTypes.string).isRequired,
    image: PropTypes.string,
    metadata: PropTypes.shape({
      birth: PropTypes.string,
      death: PropTypes.string,
      titles: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
}

CharacterDetails.defaultProps = {
  character: null,
}

export default CharacterDetails