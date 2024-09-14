import {Link} from 'react-router-dom'
import {FaRegStar, FaRegEnvelope} from 'react-icons/fa'
import {IoLocationOutline} from 'react-icons/io5'

import './index.css'

const JobCard = props => {
  const {jobCard} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobCard

  return (
    <li className="job-card">
      <Link to={`/jobs/${id}`} className="job-link">
        <div className="company-logo-and-name-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
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
          <p className="description-title">Description</p>
          <p className="description-value">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobCard
