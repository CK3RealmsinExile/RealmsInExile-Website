import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/pages/App'
import { AppProvider } from '@context/AppContext'
import '@styles/variables.css'
import '@styles/reset.css'
import '@styles/index.css'

/**
 * Application entry point
 * Mounts React app to DOM and wraps with global providers
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>
)