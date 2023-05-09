import {Component} from 'react'
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

class CourseItemDetails extends Component {
  state = {apiStatus: apiStatusViews.initial, courseObject: {}}

  componentDidMount() {
    this.getCourses()
  }

  getCourses = async () => {
    this.setState({apiStatus: apiStatusViews.in_progress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(apiUrl)

    if (response.ok === true) {
      const data = await response.json()
      const dataList = data.course_details
      const updatedData = {
        id: dataList.id,
        name: dataList.name,
        imageUrl: dataList.image_url,
        description: dataList.description,
      }
      this.setState({
        apiStatus: apiStatusViews.success,
        courseObject: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusViews.failure})
    }
  }

  renderSuccessView = () => {
    const {courseObject} = this.state
    const {name, imageUrl, description} = courseObject
    return (
      <div className="course_itemDetails_container">
        <div className="course_detail_card">
          <img className="courseImg" src={imageUrl} alt={name} />
          <div className="text_content">
            <h1 className="name">{name}</h1>
            <p className="description">{description}</p>
          </div>
        </div>
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

export default CourseItemDetails
