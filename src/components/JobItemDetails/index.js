import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaRegStar, FaRegEnvelope} from 'react-icons/fa'
import {IoLocationOutline} from 'react-icons/io5'
import {BsBoxArrowUpRight} from 'react-icons/bs'

import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobItem: {},
    similarJobsList: [],
  }

  componentDidMount = () => {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.loading,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const jobDetails = data.job_details
      const similarJobs = data.similar_jobs
      const formattedJobDetails = this.formatJobDetails(jobDetails)
      const formattedSimilarJobs = similarJobs.map(item =>
        this.formatSimilarJobs(item),
      )
      this.setState({
        apiStatus: apiStatusConstants.success,
        jobItem: formattedJobDetails,
        similarJobsList: [...formattedSimilarJobs],
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  formatSimilarJobs = jobItem => {
    const newJob = {
      companyLogoUrl: jobItem.company_logo_url,
      employmentType: jobItem.employment_type,
      id: jobItem.id,
      jobDescription: jobItem.job_description,
      location: jobItem.location,
      rating: jobItem.rating,
      title: jobItem.title,
    }
    return newJob
  }

  renderLifeStyle = jobItem => {
    const newJob = {
      description: jobItem.description,
      imageUrl: jobItem.image_url,
    }
    return newJob
  }

  formatJobDetails = jobItem => {
    const newJob = {
      companyLogoUrl: jobItem.company_logo_url,
      title: jobItem.title,
      companyWebsiteUrl: jobItem.company_website_url,
      employmentType: jobItem.employment_type,
      jobDescription: jobItem.job_description,
      skills: jobItem.skills.map(item => ({
        imageUrl: item.image_url,
        name: item.name,
      })),
      lifeAtCompany: this.renderLifeStyle(jobItem.life_at_company),
      location: jobItem.location,
      packagePerAnnum: jobItem.package_per_annum,
      rating: jobItem.rating,
    }

    return newJob
  }

  renderLoadingView = () => (
    <div className="loading-view-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" width="50" height="50" />
    </div>
  )

  failureButton = () => {
    this.getJobItemDetails()
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="failure-view-about">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="failure-view-button"
        type="button"
        onClick={this.failureButton}
      >
        Retry
      </button>
    </div>
  )

  getSkillsList = item => {
    const {name, imageUrl} = item
    return (
      <li className="skill-item" key={item.name}>
        <img src={imageUrl} alt={name} className="skill-item-image" />
        <p className="skill-item-name">{name}</p>
      </li>
    )
  }

  renderSuccessView = () => {
    const {jobItem, similarJobsList} = this.state
    console.log(jobItem)
    const {
      companyLogoUrl,
      title,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
    } = jobItem
    return (
      <div className="job-item-bg-container">
        <div className="job-item-container">
          <div className="company-logo-and-name-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div className="company-name-container">
              <p className="job-title">{title}</p>
              <div className="rating-and-value-container">
                <FaRegStar className="rating-image" />
                <p className="rating-value">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-and-internship-and-package-container">
            <div className="location-and-internship-container">
              <div className="location-container">
                <IoLocationOutline className="location-image" />
                <p className="location-value">{location}</p>
              </div>
              <div className="location-container type-container">
                <FaRegEnvelope className="location-image" />
                <p className="location-value">{employmentType}</p>
              </div>
            </div>
            <p className="package-value">{packagePerAnnum}</p>
          </div>
          <hr className="line-control" />
          <div className="description-container">
            <div className="description-and-visit-container">
              <h1 className="description-heading">Description</h1>
              <a
                href={companyWebsiteUrl}
                alt="not-found"
                className="company-link"
                target="_blank"
                rel="noreferrer"
              >
                <p>Visit</p>
                <BsBoxArrowUpRight className="arrow-image" />
              </a>
            </div>
            <p className="description-value">{jobDescription}</p>
          </div>
          <h3 className="job-item-skills-heading">Skills</h3>
          <ul className="job-item-skills-container">
            {skills.map(item => this.getSkillsList(item))}
          </ul>
          <h3 className="life-company-heading">Life at Company</h3>
          <div className="life-at-company-container">
            <p className="life-company-about">{lifeAtCompany.description}</p>
            <img
              src={lifeAtCompany.imageUrl}
              alt="life at company"
              className="life-company-image"
            />
          </div>
        </div>
        <div className="similar-jobs-container">
          <h3 className="similar-items-heading">Similar Jobs</h3>
          <ul className="similar-jobs-list-container">
            {similarJobsList.map(item => (
              <SimilarJobItem key={item.id} similarJob={item} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderJobItemList = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderJobItemList()}
      </>
    )
  }
}

export default JobItemDetails
