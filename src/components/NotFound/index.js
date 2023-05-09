import Header from '../Header'
import './index.css'

const NotFoundUrl =
  'https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png'

const NotFound = () => (
  <>
    <Header />
    <div className="not_found_container">
      <img className="not_found_img" src={NotFoundUrl} alt="not found" />
      <h1 className="heading">Page Not Found</h1>
      <p className="para">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  </>
)

export default NotFound
