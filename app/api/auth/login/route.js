
import { NextResponse } from "next/server"
import { db } from "../../../../lib/db";
import jwt from "jsonwebtoken";

const JWT_SECRET = 'secret_key_aman'

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    const [rows] = await db.execute(`SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`);
    if (rows.length === 0) {
      return NextResponse.json({ message: "Username atau password salah" }, { status: 401 });
    }

    const user = rows[0];
    console.log(user);


     // 🔐 Buat token JWT (misalnya berlaku 1 jam)
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        peran: user.peran
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // 🧾 Kirim token ke frontend
    return NextResponse.json({
      message: "Login berhasil",
      token, // frontend bisa simpan di localStorage atau cookie
      user: {
        id: user.id,
        username: user.username,
      },
      status: 200
    });

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message || 'Terjadi kesalahan!' }, { status: 500 });
  }
}