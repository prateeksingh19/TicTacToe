import axios from "axios";

export default async function getUserData(userId: string) {
  try {
    const response = await axios.get(`/api?id=${userId}`);
    return response.data[0];
  } catch (error) {
    console.error("Error fetching user stats:", error);
    throw error;
  }
}
