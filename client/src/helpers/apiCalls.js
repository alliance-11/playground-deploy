const API_URL = "http://localhost:5000"

export const loginApi = async (email, password) => {
  const credentials = { email, password }

  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // store received cookies!
  })
  return response.json()
}

export const logoutApi = async () => {
  const response = await fetch(`${API_URL}/logout`, {
    credentials: "include",
  })
  return response.json()
}

export const checkAuthStatusApi = async () => {
  const response = await fetch(`${API_URL}/me`, {
    credentials: "include", // store received cookies!
  })
  return response.json()
}

export const fetchBooksApi = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/books`, {
    credentials: "include", // send cookies along!
  })
  return response.json()
}
