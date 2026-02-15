import jwt from "jsonwebtoken";

export const protectedRoute = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({
      success: false,
      message: "Access Denied, No Token Provided.",
    });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // store user id&role in req.user
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Access Denied, Invalid or Expired Token. ❌",
    });
  }
};

export const onlyAdmin = async (req, res, next) => {
  const UnAuthMsg = "Access Denied, Unauthorized.";

  if (req.user && req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: UnAuthMsg });
  } else {
    next();
  }
};
