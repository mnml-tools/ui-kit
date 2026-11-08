import { createRoot } from 'react-dom/client'
import { Playground } from './Playground'
import '../src/styles/tokens.css'
import '../src/styles/base.css'
import '../src/styles/components.css'
import './playground.css'

createRoot(document.getElementById('root')!).render(<Playground />)
