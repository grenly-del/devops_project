import LoginForm from "./loginForm";


export default function Home() {
  return (
     <section className="flex justify-center items-center w-full h-dvh">
          <section className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
            <main>
                <h1 className="text-2xl font-bold text-center mb-6">Silahkan Login!</h1>
                <LoginForm />
                <p className="text-sm text-gray-500 text-center mt-4">
                    Belum punya akun? <a href="#" className="text-blue-500 hover:underline">Daftar di sini</a>
                </p>
            </main>
        </section>
     </section>
  );
}
