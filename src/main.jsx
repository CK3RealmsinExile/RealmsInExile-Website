import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/pages/App'
import { AppProvider } from '@context/AppContext'
import { EditModeProvider } from '@context/EditModeContext'
import { LoadingProvider } from '@context/LoadingContext'
import { SearchProvider } from '@context/SearchContext'
import '@styles/variables.css'
import '@styles/reset.css'
import '@styles/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoadingProvider>
      <EditModeProvider>
        <SearchProvider>
          <AppProvider>
            <App />
          </AppProvider>
        </SearchProvider>
      </EditModeProvider>
    </LoadingProvider>
  </StrictMode>
)