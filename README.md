# Realms in Exile - Interactive Timeline Map

An interactive web application for exploring the history of Middle-earth through an animated timeline and character map.

## Features

- **Interactive Timeline**: Navigate through major historical periods from the Second Age to the Fourth Age
- **Dynamic Character Positions**: See where key characters are located during different time periods
- **Detailed Information**: Click on timeline events or characters to view detailed descriptions

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

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Based on the works of J.R.R. Tolkien
- Built for the Realms in Exile community

## Contact

- Project Link: [https://github.com/CK3RealmsinExile/RealmsInExile](https://github.com/CK3RealmsinExile/RealmsInExile)
- Website: [https://ck3realmsinexile.github.io/RealmsInExile-Website/](https://ck3realmsinexile.github.io/RealmsInExile-Website/)
