import { BrowserRouter, Routes, Route } from 'react-router-dom'
import StartPage from './pages/StartPage'
import UIKitPage from './pages/UIKitPage'
import BrandPreviewPage from './pages/BrandPreviewPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/ui-kit" element={<UIKitPage />} />
        <Route path="/brand-preview" element={<BrandPreviewPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

