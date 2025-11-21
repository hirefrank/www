export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer>
      <div className="footer">
        <ul className="footer-list">
          <li>&copy; {currentYear} Frank Harris</li>
        </ul>
      </div>
    </footer>
  )
}
