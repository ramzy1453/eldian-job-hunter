const Alert = ({ error, message }) => {
  return (
    <div className={`alert alert-${error ? "danger" : "success"}`}>
      {message}
    </div>
  );
};

export default Alert;
