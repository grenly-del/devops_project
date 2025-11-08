import { NextResponse } from "next/server"


export const GET = async (req) => {
    try {

        return NextResponse.json({message: 'Berhasil!'})
        
    } catch (error) {
        return NextResponse.json({message: error.message || 'Terjadi kesalahan!'}, {status: 500})
    }
}