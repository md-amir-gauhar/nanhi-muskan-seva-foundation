import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export function requireAdmin(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies.admin_token;

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

    if (decoded.role !== "admin") {
      throw new Error();
    }

    return decoded;
  } catch {
    res.status(401).json({ message: "Unauthorized" });
    return null;
  }
}
