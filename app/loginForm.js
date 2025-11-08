'use client'

export default function LoginForm () {
    const handleSubmit = (e) => {
        e.preventDefault()
        const {username, password} = e.target
        fetch('/api/auth/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: username.value, password: password.value }) // username & password are strings
        })

        .then(res => res.json())
        .then(data => {
            alert(data.message)
        })
        .catch(err => {
            alert(err.message)
        })

    } 
    return (
         <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username" className="block mb-1 text-gray-600">Username</label>
                <input type="text" id="username" name="username" placeholder="Masukkan username"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
            </div>
            <div>
                <label htmlFor="password" className="block mb-1 text-gray-600">Password</label>
                <input type="password" id="password" name="password" placeholder="Masukkan password"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
            </div>
            <button type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Login
            </button>
        </form>
    )
}