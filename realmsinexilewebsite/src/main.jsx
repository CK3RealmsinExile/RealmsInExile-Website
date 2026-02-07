import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/pages/App'
import { AppProvider } from '@context/AppContext'
import { EditModeProvider } from '@context/EditModeContext'
import { LoadingProvider } from '@context/LoadingContext'  // ← Add
import '@styles/variables.css'
import '@styles/reset.css'
import '@styles/index.css'

/**
 * Application entry point
 * Mounts React app with all necessary providers
 * 
 * Provider hierarchy:
 * - LoadingProvider: Global loading state management
 * - EditModeProvider: Edit/view mode state
 * - AppProvider: Application state (timeline, characters, etc.)
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoadingProvider>           {/* ← Add - outermost for global loading */}
      <EditModeProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </EditModeProvider>
    </LoadingProvider>
  </StrictMode>
)