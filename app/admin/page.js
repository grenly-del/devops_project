'use client'; // Hanya jika Anda menggunakan Next.js App Router

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Jika pakai Next.js
// Jika pakai React biasa (bukan Next.js), ganti dengan: import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode';

export default function AdminUserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);

  const router = useRouter(); // Ganti dengan `const navigate = useNavigate();` di React biasa

  useEffect(() => {
    // Cek role di localStorage
    const token = Cookies.get('token')
    let user
    if(token) {
        user = jwtDecode(token)
    }else {
        
        router.push('/'); // Ganti dengan `navigate('/login')` di React biasa
    }
    console.log(user);
    const role = user.peran == 'admin' ? true : false

    if (role) {
      setAuthorized(true);
      loadUsers(token);
      
    }else {
        
        router.push('/'); // Ganti dengan `navigate('/login')` di React biasa
    }
    // else {
    //   setAuthorized(false);
    //   // Arahkan ke halaman login atau beranda
    //   router.push('/login'); // Ganti dengan `navigate('/login')` di React biasa
    // }

    setChecking(false)
  }, [router]); // Tambahkan `navigate` jika pakai React Router

  const loadUsers = async (token) => {
    try {
      // Ganti dengan API Anda nanti
      const res = await fetch('/api/auth/users', {
        headers: {
            Authorization: `barrer ${token}`
        }
      })
      const data = await res.json()

      console.log(data);
      setUsers(data);
    } catch (error) {
      console.error('Gagal memuat data pengguna:', error);
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Memeriksa akses...</p>
      </div>
    );
  }

  if (!authorized) {
    return null; // Redirect sudah dilakukan, jadi ini aman
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Kelola Pengguna</h1>
          <p className="text-gray-600 mt-2">Daftar semua akun yang telah mendaftar</p>
        </header>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          {loading ? (
            <div className="p-6 text-center text-gray-500">Memuat data...</div>
          ) : users.length === 0 ? (
            <div className="p-6 text-center text-gray-500">Belum ada pengguna yang mendaftar.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nama
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Password
                    </th>
 
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.username}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.password}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}