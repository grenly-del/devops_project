import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    const [result] = await db.execute(
      "INSERT INTO users (username, password, peran) VALUES (?, ?)",
      [username, password] // langsung disimpan tanpa hashing
    );

    return NextResponse.json({ message: "Register berhasil", userId: result.insertId });
  } catch (error) {
    console.log(error);
    if (error.code === "ER_DUP_ENTRY") {
      return NextResponse.json({ message: "Username sudah terdaftar" }, { status: 400 });
    }
    return NextResponse.json({ message: "Register gagal" }, { status: 500 });
  }
}
