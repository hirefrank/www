import { Link } from '@tanstack/react-router'

export function NotFound() {
  return (
    <div className="main-container">
      <h1>404 - Page Not Found</h1>
      <p>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <p className="mt-8">
        <Link to="/" className="link-style">
          Return to home page
        </Link>
      </p>
    </div>
  )
}
