export function notFound(req, res) {
  res.status(404).json({ message: `No route for ${req.method} ${req.originalUrl}` })
}

/* One place that turns any thrown error into a JSON body the client
   can show. Mongoose duplicate-key and validation errors get a plain
   sentence instead of the raw driver text. */
export function errorHandler(err, req, res, _next) {
  let status = err.status || 500
  let message = err.message || 'Something went wrong'

  if (err.code === 11000) {
    status = 409
    message = `That ${Object.keys(err.keyPattern || { value: 1 })[0]} is already registered`
  }

  if (err.name === 'ValidationError') {
    status = 400
    message = Object.values(err.errors).map((e) => e.message).join('. ')
  }

  if (err.name === 'CastError') {
    status = 400
    message = 'Bad id in the request'
  }

  if (status === 500) console.error('[error]', err)

  res.status(status).json({
    message,
    ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {}),
  })
}
