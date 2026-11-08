import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Docs } from './app/Docs.tsx'
import '../src/styles/styles.css'
import './docs.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Docs />
  </StrictMode>
)
