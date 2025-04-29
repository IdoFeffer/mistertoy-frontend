import './assets/style/main.css'

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { Provider } from 'react-redux'

import { ToyIndex } from './pages/ToyIndex.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { UserDetails } from './pages/UserDetails.jsx'

import { store } from './store/store.js'

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="app full main-layout">
          <main>
            <Routes>
              <Route path="/toy" element={<ToyIndex />} />
              <Route path="/toy/edit" element={<ToyEdit />} />
              <Route path="/toy/edit/:toyId" element={<ToyEdit />} />
              <Route path="/toy/:toyId" element={<ToyDetails />} />
              <Route path="/user/:userId" element={<UserDetails />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </section>
      </Router>
    </Provider>
  )
}
