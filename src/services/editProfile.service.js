import api from "./api"

// GET USER BY ID
export const getUserById = (userId) =>
  api.get(`/users/${userId}`)

// UPDATE USER
export const updateUser = (userId, userData) =>
  api.put(`/users/${userId}`, userData)
