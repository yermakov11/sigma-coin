import axios from 'axios'

export const registerAPI = async (name: string, surname: string, password: string, email: string) => {
  try {
    const URL = 'http://localhost:3000/api/auth/signup';
    const response = await axios.post(URL, {name,surname,password,email})
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const loginAPI = async (email: string, password: string) => {
  try {
    const URL = 'http://localhost:3000/api/auth/login';
    const response = await axios.post(URL, {email,password})
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const addCoin = async (coin:number)=>{
    try {
        const URL = 'http://localhost:3000//balance/addCoins/:id';
        const response = await axios.put(URL, {coin})
        return response.data
    } catch (error) {
        console.log(error)
    }
}