import {FaRegStar, FaRegEnvelope} from 'react-icons/fa'
import {IoLocationOutline} from 'react-icons/io5'

import './index.css'

const SimilarJobItem = props => {
  const {similarJob} = props
  console.log(similarJob)
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJob
  return (
    <li className="similar-job-item">
      <div className="company-logo-and-name-container">
        <img src={companyLogoUrl} alt="company logo" className="company-logo" />
        <div className="company-name-container">
          <p className="job-title">{title}</p>
          <div className="rating-and-value-container">
            <FaRegStar className="rating-image" />
            <p className="rating-value">{rating}</p>
          </div>
        </div>
      </div>
      <h3 className="similar-job-description-heading">Description</h3>
      <p className="similar-job-description">{jobDescription}</p>
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
    </li>
  )
}

export default SimilarJobItem
