/**
 * Handles all errors that might occur in the app.
 */
const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ msg: 'Internal server error' });
};

export default errorHandler;
