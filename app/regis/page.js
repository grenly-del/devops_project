'use client'
import { useState } from 'react';

export default function RegisterAkun() {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit =  async (e) => {

    e.preventDefault();
    // Validasi sederhana
    if (formData.password !== formData.confirmPassword) {
      alert('Password dan konfirmasi password tidak cocok!');
      return;
    }
    // Kirim data ke backend atau lanjutkan proses registrasi
    try {
        
        const res = await fetch('/api/auth/regis', {
            body: JSON.stringify({
                username : formData.name,
                password: formData.password
            }),
            method: 'post'
        })
        if(!res.ok) throw new Error('Terjadi kesalahan!')
        
        console.log('Data registrasi:', formData);
        alert('Registrasi berhasil!');
    } catch (error) {
        alert(error.message || 'Registrasi gagal!');
        
    }
};

return (
    <section className="flex justify-center items-center w-full h-dvh">
      <section className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <main>
          <h1 className="text-2xl font-bold text-center mb-6">Daftar Akun</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Masukkan nama lengkap"
              />
            </div>


            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Kata Sandi
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Minimal 6 karakter"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Konfirmasi Kata Sandi
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ulangi kata sandi"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 font-medium"
            >
              Daftar
            </button>
          </form>

          <p className="text-sm text-gray-500 text-center mt-4">
            Sudah punya akun?{' '}
            <a href="/" className="text-blue-500 hover:underline">
              Login di sini
            </a>
          </p>
        </main>
      </section>
    </section>
  );
}