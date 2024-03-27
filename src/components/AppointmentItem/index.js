import './index.css'

const AppointmentItem = props => {
  const {appointmentDetail, toggleStar} = props
  const {id, title, date, isStarred} = appointmentDetail
  const starImg = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onStar = () => {
    toggleStar(id)
  }

  return (
    <li>
      <div className="head-star-container">
        <p className="app-head">{title}</p>
        <button
          onClick={onStar}
          className="str-btn"
          data-testid="star"
          type="button"
        >
          <img className="str-img" src={starImg} alt="star" />
        </button>
      </div>
      <p className="app-date">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
