const users = [
  { username: "admin", password: "admin123" },
]

export function signIn({ username, password }) {
  const user = users.find(
    (user) => user.username === username && user.password === password
  )
  if (user === undefined) throw new Error()
  return user
}
