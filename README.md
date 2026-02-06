# Realms in Exile - Interactive Timeline Map

An interactive web application for exploring the history of Middle-earth through an animated timeline and character map.

## Features

- **Interactive Timeline**: Navigate through major historical periods from the Second Age to the Fourth Age
- **Dynamic Character Positions**: See where key characters are located during different time periods
- **Draggable Pins**: Adjust character positions (editors can export updated coordinates)
- **Detailed Information**: Click on timeline events or characters to view detailed descriptions
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite 5
- **Styling**: CSS3 with CSS Custom Properties
- **Deployment**: GitHub Pages

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 18 or higher)
- npm (comes with Node.js)
- Git

## Installation

1. **Clone the repository**
```bash
   git clone https://github.com/CK3RealmsinExile/RealmsInExile-Website.git
   cd RealmsInExile-Website
```

2. **Install dependencies**
```bash
   npm install
```

3. **Start development server**
```bash
   npm run dev
```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (output in `dist/`)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality
- `npm run lint:fix` - Automatically fix linting issues
- `npm run format` - Format code with Prettier

## Project Structure
```
src/
├── components/          # React components
│   ├── Timeline/       # Timeline navigation components
│   ├── Map/           # Map and character pin components
│   ├── Sidebar/       # Sidebar with details panels
│   └── shared/        # Reusable components (Button, Tooltip)
├── context/           # React Context for state management
├── data/              # JSON data files
│   ├── characters.json    # Character data and positions
│   └── startDates.json    # Timeline periods data
├── hooks/             # Custom React hooks
├── styles/            # Global styles and CSS variables
├── utils/             # Utility functions
└── pages/             # Page components
```

## Data Files

### `startDates.json`
Contains timeline period information:
- `id`: Unique identifier
- `name`: Period name
- `date`: Display date (e.g., "T.A. 3018")
- `type`: "major" or "minor"
- `description`: Main description
- `extra`: Additional paragraphs (optional)

### `characters.json`
Contains character information and positions:
- `id`: Unique identifier
- `name`: Character name
- `description`: Array of description paragraphs
- `startDates`: Array of timeline dates when character appears
- `position`: Default position {x, y} (0-1 range)
- `positions`: Position at each timeline date

## Editing Character Positions

1. Open the application
2. Select a timeline period
3. Drag character pins to new positions
4. Open the sidebar and click "Export Positions"
5. Save the downloaded JSON file
6. Replace the relevant entries in `src/data/characters.json`

## Deployment

The site automatically deploys to GitHub Pages when changes are pushed to the `main` branch.

### Manual Deployment
```bash
npm run build
npm run deploy
```

## Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Based on the works of J.R.R. Tolkien
- Built for the Realms in Exile community

## Contact

- Project Link: [https://github.com/CK3RealmsinExile/RealmsInExile](https://github.com/CK3RealmsinExile/RealmsInExile)
- Website: [https://ck3realmsinexile.github.io/RealmsInExile-Website/](https://ck3realmsinexile.github.io/RealmsInExile-Website/)