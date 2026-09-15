/* Express 4 does not catch rejected promises on its own, so every
   async route handler is wrapped in this. Any throw lands in
   errorHandler instead of hanging the request. */
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)

export default asyncHandler
