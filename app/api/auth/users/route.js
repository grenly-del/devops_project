import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";
import jwt from "jsonwebtoken";

const JWT_SECRET = "secret_key_aman";

export async function GET(req) {
  try {
    const authHeader = req.headers.get("authorization");
    console.log(authHeader);
    if (!authHeader) {
      return NextResponse.json({ message: "Token tidak ditemukan" }, { status: 401 });
    }
    
    const token = authHeader.split(" ")[1];

    try {
      jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ message: "Token tidak valid atau kedaluwarsa" }, { status: 401 });
    }

    const [rows] = await db.execute("SELECT id, username, password FROM users");
    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Terjadi kesalahan server" }, { status: 500 });
  }
}
