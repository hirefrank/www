import { useState } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { sections } from '~/data/sections'

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const routerState = useRouterState()
  const currentPath = routerState.location.pathname

  return (
    <header className="site-header">
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-brand">
            <div className="logo-container">
              <div className="logo-text">hirefrank</div>
            </div>
          </Link>

          <button
            id="menu-toggle"
            className={`sm:hidden flex flex-col justify-center items-center -mt-[calc(3em-28px)] ${isMenuOpen ? 'menu-open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>

          <ul
            id="nav-menu"
            className={`nav-menu ${isMenuOpen ? 'flex' : 'hidden'} sm:flex`}
          >
            {sections
              .filter((section) => section.show)
              .map((section) => (
                <li key={section.url}>
                  <Link
                    to={section.url}
                    className={`nav-link ${currentPath === section.url ? 'nav-link-active' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {section.label}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}
