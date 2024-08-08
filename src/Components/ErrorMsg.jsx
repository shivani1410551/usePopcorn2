const ErrorMsg = ({ error }) => {
  return (
    <div className="error">
      <span>⛔️</span>
      {error}
    </div>
  );
};

export default ErrorMsg;
