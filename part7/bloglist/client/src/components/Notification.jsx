import { connect } from 'react-redux'

const Notification = (props) => {
    const successStyle = 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative'

    const errorStyle = 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'
  return (props.notification &&
    <div className={props.notification.type === 'success' ? successStyle : errorStyle}>
      {props.notification.message}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification