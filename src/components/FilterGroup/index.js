import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'

import UserProfile from '../UserProfile'
import './index.css'

class FilterGroup extends Component {
  state = {
    searchInput: '',
    employmentType: [],
  }

  changeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  clickSearchButton = () => {
    const {updateSearchInput} = this.props
    const {searchInput} = this.state
    updateSearchInput(searchInput)
  }

  changeSalaryAmount = event => {
    const {updateSalaryRange} = this.props
    updateSalaryRange(event.target.value)
  }

  changeEmploymentType = event => {
    const {updateEmploymentType} = this.props
    const {checked, value} = event.target
    console.log(checked)
    this.setState(prevState => {
      const updatedEmploymentType = checked
        ? [...prevState.employmentType, value]
        : prevState.employmentType.filter(type => type !== value)
      updateEmploymentType(updatedEmploymentType)

      return {employmentType: updatedEmploymentType}
    })
  }

  getEmploymentTypesList = empType => {
    const {label, employmentTypeId} = empType
    return (
      <li className="element-type-list" key={employmentTypeId}>
        <input
          type="checkbox"
          id={employmentTypeId}
          value={employmentTypeId}
          onChange={this.changeEmploymentType}
          className="element-input"
        />
        <label className="element-label" htmlFor={employmentTypeId}>
          {label}
        </label>
      </li>
    )
  }

  getSalaryRangeList = salary => {
    const {salaryRangeId, label} = salary
    return (
      <li className="element-type-list" key={salaryRangeId}>
        <input
          type="radio"
          id={salaryRangeId}
          name="salaryType"
          value={salaryRangeId}
          onChange={this.changeSalaryAmount}
          className="element-input"
        />
        <label className="element-label" htmlFor={salaryRangeId}>
          {label}
        </label>
      </li>
    )
  }

  render() {
    const {searchInput} = this.state
    const {employmentTypesList, salaryRangesList} = this.props
    return (
      <div className="filter-group-container">
        <div className="input-container">
          <input
            type="search"
            className="search-input-field"
            placeholder="Search"
            value={searchInput}
            onChange={this.changeSearchInput}
          />
          <button
            className="search-input-button"
            type="button"
            onClick={this.clickSearchButton}
            data-testid="searchButton"
          >
            <BsSearch className="search-input-image" />
          </button>
        </div>
        <UserProfile />
        <hr className="horizantal-line" />
        <p className="type-of-employ-heading">Type of Employment</p>
        <ul className="element-type-container">
          {employmentTypesList.map(item => this.getEmploymentTypesList(item))}
        </ul>
        <hr className="horizantal-line" />
        <p className="type-of-employ-heading">Salary Range</p>
        <ul className="element-type-container">
          {salaryRangesList.map(item => this.getSalaryRangeList(item))}
        </ul>
      </div>
    )
  }
}

export default FilterGroup
