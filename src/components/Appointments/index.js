import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentList: [],
    title: '',
    date: '',
    isStarFiltered: false,
  }

  submitEvent = event => {
    event.preventDefault()

    const {title, date} = this.state
    const newAppointment = {
      id: uuidv4(),
      title,
      date: format(new Date(date), 'dd MMMM yyyy, EEEE'),
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
  }

  toggleStar = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return eachItem
      }),
    }))
  }

  onTitle = event => {
    this.setState({
      title: event.target.value,
    })
  }

  filteredData = () => {
    const {appointmentList, isStarFiltered} = this.state
    if (isStarFiltered) {
      return appointmentList.filter(eachItem => eachItem.isStarred === true)
    }
    return appointmentList
  }

  onDate = event => {
    this.setState({
      date: event.target.value,
    })
  }

  onClickFilter = () => {
    this.setState(prevState => ({isStarFiltered: !prevState.isStarFiltered}))
  }

  render() {
    const {title, date, isStarFiltered} = this.state
    const appointmentFilteredList = this.filteredData()
    const isFilteredClass = isStarFiltered
      ? 'star-filtered'
      : 'star-not-filtered'
    return (
      <div className="bg-container">
        <div className="card-container">
          <h1 className="page-head">Add Appointment</h1>
          <div className="form-container">
            <form onSubmit={this.submitEvent}>
              <label htmlFor="title-el">TITLE</label>
              <input
                id="title-el"
                type="text"
                placeholder="Title"
                onChange={this.onTitle}
                value={title}
              />
              <label htmlFor="date-el">DATE</label>
              <input
                id="date-el"
                type="date"
                placeholder="dd/mm/yyyy"
                onChange={this.onDate}
                value={date}
              />
              <button type="submit" className="submit-button">
                Add
              </button>
            </form>
            <div className="img-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointments-img"
              />
            </div>
          </div>
          <hr />
          <div className="Appointment-filter-container">
            <h1 className="app-container-head">Appointments</h1>
            <button
              type="button"
              onClick={this.onClickFilter}
              className={`starred-button ${isFilteredClass}`}
            >
              Starred
            </button>
          </div>
          <ul>
            {appointmentFilteredList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                toggleStar={this.toggleStar}
                appointmentDetail={eachAppointment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
