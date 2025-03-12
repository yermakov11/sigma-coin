import axios from "axios";

export const registerAPI = async (name: string, surname: string, password: string, email: string) => {
  try {
    const URL = "http://localhost:3000/auth/signup";
    const response = await axios.post(
      URL,
      { name, surname, password, email },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    if(!(error as any).response){
      alert("Server is not available");
    } else if((error as any).response.status===409){
      alert("Email already exists");
    } else {
       alert("Registration failed");
    }
  }
};


export const loginAPI = async (email: string, password: string) => {
  try {
    const URL = "http://localhost:3000/auth/login";
    const response = await axios.post(URL,
      { email, password },
      { headers: { "Content-Type": "application/json" } }
    );
    if(response.data.message==="User not found"){
      alert("Account not found, please register first");
    }
    return response.data;
  } catch (error) {
    if(!(error as any).response){
      alert("Server is not available");
    } else if((error as any).response.status===401){
      alert("You are not authorized");
    } else {
       alert("Login failed");
    }
  }
};

export const addCoin = async (coin: number) => {
  try {
    const URL = "http://localhost:3000//balance/addCoins/:id";
    const response = await axios.put(URL, { coin });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
