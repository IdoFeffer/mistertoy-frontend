import "./assets/style/main.scss"

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom"

import { AppHeader } from "./cmps/AppHeader.jsx"
import { AppFooter } from "./cmps/AppFooter.jsx"

import { HomePage } from "./pages/HomePage.jsx"
import { AboutUs } from "./pages/AboutUs.jsx"
import { ToyIndex } from "./pages/ToyIndex.jsx"
import { ToyEdit } from "./pages/ToyEdit.jsx"
import { ToyDetails } from "./pages/ToyDetails.jsx"
import { UserDetails } from "./pages/UserDetails.jsx"
import { Provider } from "react-redux"

import { store } from "./store/store.js"

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="app full main-layout">
            <AppHeader />
          <main className="main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutUs />}  />
              <Route path="/toy" element={<ToyIndex />} />
              <Route path="/toy/edit" element={<ToyEdit />} />
              <Route path="/toy/edit/:toyId" element={<ToyEdit />} />
              <Route path="/toy/:toyId" element={<ToyDetails />} />
              <Route path="/user/:userId" element={<UserDetails />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <AppFooter />
        </section>
      </Router>
    </Provider>
  )
}
