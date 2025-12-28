const Notification = ({ successMsg, errorMsg }) => {
  if (!successMsg && !errorMsg) return null
  return (
    <div className={successMsg ? 'success' : 'error'}>
      <p>{successMsg || errorMsg}</p>
    </div>
  )
}

export default Notification
