import { NextApiRequest, NextApiResponse } from "next";
import { IncomingMessage } from "http";
import jwt from "jsonwebtoken";
import { parse } from "cookie";

export interface AuthUser {
  id: string;
  role: string;
}

export function verifyToken(token: string): AuthUser | null {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AuthUser;
    return decoded;
  } catch {
    return null;
  }
}

export function getAuthUser(
  req: NextApiRequest | IncomingMessage,
): AuthUser | null {
  const cookies = parse(req.headers.cookie || "");
  const token = cookies.admin_token;

  if (!token) {
    return null;
  }

  return verifyToken(token);
}

export function requireAuth(
  req: NextApiRequest,
  res: NextApiResponse,
): AuthUser | null {
  const user = getAuthUser(req);

  if (!user || user.role !== "admin") {
    res.status(401).json({ error: "Unauthorized" });
    return null;
  }

  return user;
}
