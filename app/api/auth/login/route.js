
import { NextResponse } from "next/server"
import { db } from "../../../../lib/db";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    const [rows] = await db.execute(`SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`);
    if (rows.length === 0) {
      return NextResponse.json({ message: "Username atau password salah" }, { status: 401 });
    }

    const user = rows[0];
    console.log(user);


    const response = NextResponse.json({ message: "Login berhasil" });

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message || 'Terjadi kesalahan!' }, { status: 500 });
  }
}