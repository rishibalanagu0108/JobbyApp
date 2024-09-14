import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import JobCard from '../JobCard'
import FilterGroup from '../FilterGroup'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
  noJobs: 'NOJOBS',
}

class Jobs extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobsList: [],
    searchInput: '',
    salaryRange: '',
    empType: [],
  }

  componentDidMount() {
    this.getJobsListFromApi()
  }

  getJobsListFromApi = async () => {
    const {searchInput, salaryRange, empType} = this.state
    const empTypeQuery = empType.join(',')
    const jwtToken = Cookies.get('jwt_token')
    this.setState({
      apiStatus: apiStatusConstants.loading,
    })
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${empTypeQuery}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const data1 = data.jobs
      if (data1.length === 0) {
        this.setState({
          apiStatus: apiStatusConstants.noJobs,
        })
      } else {
        const formattedJobsList = data1.map(item => this.formatJobsList(item))
        this.setState({
          jobsList: formattedJobsList,
          apiStatus: apiStatusConstants.success,
        })
      }
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  formatJobsList = job => {
    const newJob = {
      companyLogoUrl: job.company_logo_url,
      employmentType: job.employment_type,
      id: job.id,
      jobDescription: job.job_description,
      location: job.location,
      packagePerAnnum: job.package_per_annum,
      rating: job.rating,
      title: job.title,
    }
    return newJob
  }

  updateSearchInput = value => {
    this.setState({searchInput: value}, this.getJobsListFromApi)
  }

  updateSalaryRange = value => {
    this.setState({salaryRange: value}, this.getJobsListFromApi)
  }

  updateEmploymentType = value => {
    this.setState({empType: [...value]}, this.getJobsListFromApi)
  }

  renderProductsList = () => {
    const {jobsList} = this.state
    return (
      <div className="jobs-list-container">
        <ul className="jobs-list">
          {jobsList.map(item => (
            <JobCard key={item.id} jobCard={item} />
          ))}
        </ul>
      </div>
    )
  }

  renderNoJobsView = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-image"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-about">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="5o" width="50" />
    </div>
  )

  failureBtn = () => {
    this.getJobsListFromApi()
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="failure-view-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="failure-view-button"
        type="button"
        onClick={this.failureBtn}
      >
        Retry
      </button>
    </div>
  )

  renderJobsList = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductsList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.loading:
        return this.renderLoaderView()
      case apiStatusConstants.noJobs:
        return this.renderNoJobsView()
      default:
        return null
    }
  }

  render() {
    const {salaryRangesList, employmentTypesList} = this.props
    return (
      <>
        <Header />
        <div className="jobs-container">
          <FilterGroup
            salaryRangesList={salaryRangesList}
            employmentTypesList={employmentTypesList}
            updateSearchInput={this.updateSearchInput}
            updateEmploymentType={this.updateEmploymentType}
            updateSalaryRange={this.updateSalaryRange}
          />
          {this.renderJobsList()}
        </div>
      </>
    )
  }
}

export default Jobs
