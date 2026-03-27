
import { useState } from 'react'

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [signupName, setSignupName] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleLoginSubmit = async (e) => {
    e.preventDefault()

    setIsSubmitting(true)

    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      })

      const data = await response.json()
      console.log('Login response:', data)

      if (data.success) {
        localStorage.setItem('auth-token', data.token)
        alert('Login successful.')
        setLoginEmail('')
        setLoginPassword('')
      } else {
        alert(data.errors || 'Login failed')
      }
    } catch (error) {
      console.error('Login request failed:', error)
      alert('Unable to login.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSignupSubmit = async (e) => {
    e.preventDefault()

    if (signupPassword !== signupConfirmPassword) {
      alert('Passwords do not match!')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: signupName,
          email: signupEmail,
          password: signupPassword,
        }),
      })

      const data = await response.json()
      console.log('Signup response:', data)

      if (data.success) {
        localStorage.setItem('auth-token', data.token)
        alert('Account created successfully. Check browser console for response.')
        setSignupName('')
        setSignupEmail('')
        setSignupPassword('')
        setSignupConfirmPassword('')
        setIsLogin(true)
      } else {
        alert(data.errors || 'Signup failed')
      }
    } catch (error) {
      console.error('Signup request failed:', error)
      alert('Unable to create account. Check browser console for error.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 pt-20 pb-20">
      <div className="flex justify-center items-center">
        <div className="w-full max-w-md">
          {/* Toggle Buttons */}
          <div className="flex gap-4 mb-8 justify-center">
            <button
              onClick={() => setIsLogin(true)}
              className={`px-8 py-3 rounded-lg font-semibold transition ${
                isLogin
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-700 border-2 border-gray-300'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`px-8 py-3 rounded-lg font-semibold transition ${
                !isLogin
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-700 border-2 border-gray-300'
              }`}
            >
              Signup
            </button>
          </div>

          {/* Login Form */}
          {isLogin && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome Back</h2>
              <form onSubmit={handleLoginSubmit} className="space-y-5">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Password</label>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition mt-6"
                >
                  {isSubmitting ? 'Please wait...' : 'Login'}
                </button>
              </form>

              <p className="text-center text-gray-600 mt-4">
                Don't have an account?{' '}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-orange-500 font-semibold hover:underline"
                >
                  Sign up here
                </button>
              </p>
            </div>
          )}

          {/* Signup Form */}
          {!isLogin && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Create Account</h2>
              <form onSubmit={handleSignupSubmit} className="space-y-5">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Password</label>
                  <input
                    type="password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="Create a password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>
                  <input
                    type="password"
                    value={signupConfirmPassword}
                    onChange={(e) => setSignupConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition mt-6"
                >
                  {isSubmitting ? 'Please wait...' : 'Create Account'}
                </button>
              </form>

              <p className="text-center text-gray-600 mt-4">
                Already have an account?{' '}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-orange-500 font-semibold hover:underline"
                >
                  Login here
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
