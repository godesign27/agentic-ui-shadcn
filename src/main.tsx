import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './components/ai/tokens/css/ai-surface.css'
import './components/ai/tokens/css/ai-component-tokens.css'
import './components/ai/tokens/css/ai-typography.css'
import './components/ai/tokens/css/ds-bridge.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

