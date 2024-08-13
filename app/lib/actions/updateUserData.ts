import axios from "axios";

export default async function updateUserStats(
  userId: string,
  updatedStats: object
) {
  try {
    await axios.put(`/api?id=${userId}`, updatedStats);
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}
