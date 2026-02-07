import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/pages/App'
import { AppProvider } from '@context/AppContext'
import { EditModeProvider } from '@context/EditModeContext'  // ← Add this
import '@styles/variables.css'
import '@styles/reset.css'
import '@styles/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EditModeProvider>  {/* ← Wrap with EditModeProvider */}
      <AppProvider>
        <App />
      </AppProvider>
    </EditModeProvider>
  </StrictMode>
)