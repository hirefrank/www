import {
  ErrorComponent,
  type ErrorComponentProps,
} from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  return (
    <div className="main-container">
      <h1>Something went wrong</h1>
      <p>An unexpected error occurred. Please try again later.</p>
      <ErrorComponent error={error} />
      <p className="mt-8">
        <Link to="/" className="link-style">
          Return to home page
        </Link>
      </p>
    </div>
  )
}
