export default function logReq(req, res, next) {
  console.log(`User has gone to ${req.path}`);
  next();
}