import './assets/style/main.css'

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { Provider } from 'react-redux'

import { ToyIndex } from './pages/ToyIndex.jsx'
import { store } from './store/store.js'

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="app full main-layout">
          <main>
            <Routes>
              <Route path="/" element={<Navigate to="/toy" />} />
              <Route path="/toy" element={<ToyIndex />} />
            </Routes>
          </main>
        </section>
      </Router>
    </Provider>
  )
}
