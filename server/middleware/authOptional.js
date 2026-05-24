import jwt from "jsonwebtoken";

/** Attach req.userId when a valid Bearer token is present; otherwise continue as guest. */
export function authOptional(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return next();
  }

  const token = header.slice(7);
  try {
    if (!process.env.JWT_SECRET) return next();
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.sub;
  } catch {
    /* ignore invalid token for optional auth */
  }
  return next();
}
