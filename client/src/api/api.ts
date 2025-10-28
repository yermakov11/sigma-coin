import axios from "axios";

export const registerAPI = async (name: string, surname: string, password: string,email: string ) => {
  try {
    const URL = "http://localhost:3000/auth/signup";
    const response = await axios.post(URL,
      { name, surname, password, email },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    if (!(error as any).response) {
      alert("Server is not available");
    } else if ((error as any).response.status === 409) {
      alert("User already exists");
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
    if(response.status === 200){
      console.log("Login successful", response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    if (!(error as any).response) {
      alert("Server is not available");
    } else if ((error as any).response.status === 401) {
      alert("You are not authorized");
    } else if ((error as any).response.status === 404) {
      alert("User not found, please register first");
    } else if ((error as any).response.status === 400) {
      alert("Invalid email or password");
    } else if ((error as any).response.status === 500) {
      alert("Server error, please try again later");
    } else if ((error as any).response.status === 403) {
      alert("Access denied, please verify your email");
    }else if ((error as any).response.status === 409) {
      alert("User already exists");
    } else {
      alert("Login failed");
    }
  }
};

export const addCoin = async (coins: number, id: string, token: string) => {
  try {
    const URL = `http://localhost:3000/balance/addCoins/${id}`;
    const response = await axios.put(
      URL,
      { coins },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.log("Error adding coins:", error.response?.data || error.message);
  }
};

