import Header from '../Header'

import './index.css'

const Home = props => {
  const clickFindJobs = () => {
    const {history} = props
    history.push('/jobs')
  }

  return (
    <div className="home-bg-container">
      <Header />
      <div className="home-container">
        <h1 className="home-heading">Find The Job That Fits Your Life</h1>
        <p className="home-description">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential
        </p>
        <button className="home-button" type="button" onClick={clickFindJobs}>
          Find Jobs
        </button>
      </div>
    </div>
  )
}

export default Home
