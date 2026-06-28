import { createRoot } from 'react-dom/client'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './index.css'
import App from './App.tsx'

gsap.registerPlugin(ScrollTrigger)

const root = document.getElementById('root')
if (root) {
  createRoot(root).render(<App />)
} else {
  console.error('Root element not found')
}
