import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'
import Header from '../Header'

const failureUrl =
  'https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png '

const apiStatusViews = {
  initial: 'INITIAL',
  in_progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const CourseItem = props => {
  const {details} = props
  const {name, logoUrl, id} = details
  return (
    <Link to={`/courses/${id}`} style={{textDecoration: 'none'}}>
      <li className="li_course_card" key={id}>
        <img className="course_image" src={logoUrl} alt={name} />
        <p className="course_name">{name}</p>
      </li>
    </Link>
  )
}

class Home extends Component {
  state = {apiStatus: apiStatusViews.initial, coursesList: []}

  componentDidMount() {
    this.getCourses()
  }

  getCourses = async () => {
    this.setState({apiStatus: apiStatusViews.in_progress})
    const apiUrl = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(apiUrl)

    if (response.ok === true) {
      const data = await response.json()
      const dataList = data.courses
      const updatedData = dataList.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        logoUrl: eachItem.logo_url,
      }))
      this.setState({
        apiStatus: apiStatusViews.success,
        coursesList: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusViews.failure})
    }
  }

  renderSuccessView = () => {
    const {coursesList} = this.state
    return (
      <div className="home_container">
        <h1 className="heading">Courses</h1>
        <ul className="ul_courses_container">
          {coursesList.map(eachCourse => (
            <CourseItem key={eachCourse.id} details={eachCourse} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="loader_container">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  onClickRetry = () => {
    this.getCourses()
  }

  renderFailureView = () => (
    <div className="failure_container">
      <img className="not_found_img" src={failureUrl} alt="failure view" />
      <h1 className="heading">Oops! Something Went Wrong</h1>
      <p className="para">
        We cannot seem to find the page you are looking for.
      </p>
      <div>
        <button
          className="retry_button"
          type="button"
          onClick={this.onClickRetry}
        >
          Retry
        </button>
      </div>
    </div>
  )

  renderApiViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusViews.in_progress:
        return this.renderLoadingView()
      case apiStatusViews.success:
        return this.renderSuccessView()
      case apiStatusViews.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderApiViews()}
      </>
    )
  }
}

export default Home
