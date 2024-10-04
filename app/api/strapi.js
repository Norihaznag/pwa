import axios from "axios";
import Cookies from "js-cookie";

const dotenv = require("dotenv");
dotenv.config();

export async function getall(entry = "dishes") {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/${entry}?populate=*`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const res = await response.json();
    return res.data;
  } catch (error) {
    console.error("Error fetching dishes:", error);
    throw error;
  }
}

export async function getMeta(entry = "dishes") {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/${entry}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const res = await response.json();
    return res.meta;
  } catch (error) {
    console.error("Error fetching dishes:", error);
    throw error;
  }
}

export async function getOne(id = 18) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/dishes/${id}?populate=*`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const res = await response.json();
    // console.log(res);
    return res.data;
  } catch (error) {
    console.error("Error fetching dishes:", error);
    throw error;
  }
}

export async function addcategory(name) {
  fetch("${process.env.NEXT_PUBLIC_STRAPI_URL}/api/categories", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        name: name,
      },
    }),
  })
    .catch((err) => {
      console.log(err);
    })
    .then((data) => {
      console.log(data.json());
    });
}

export async function getCategories(entry = "categories") {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/${entry}?populate=dishes`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const res = await response.json();
    return res.data;
  } catch (error) {
    console.error("Error fetching dishes:", error);
    throw error;
  }
}

export async function getCategoryDishes(category = "categories") {
  try {
    const response =
      await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/categories?filters[name][$eq]=${category}&populate[dishes][populate]=*
`);
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const res = await response.json();
    return res.data[0].attributes.dishes.data;
  } catch (error) {
    console.error("Error fetching dishes:", error);
    throw error;
  }
}

export async function VerifyUSer(user) {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/clients?filters[username][$eq]=${user.username}&filters[phone][$eq]=${user.phone}`
    );

    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export async function login(user) {
  await axios
    .post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local`, {
      identifier: user.identifier,
      password: user.password,
    })
    .then((response) => {
      // Handle success
      const { jwt, user } = response.data;

      localStorage.setItem("jwt", jwt);

      console.log("Login successful:", user);
    })
    .catch((error) => {
      // Handle error
      console.error("Login error:", error);
    });
}

// Function to fetch the user's profile
export async function fetchUserProfile() {
  try {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      throw new Error("JWT not found in localStorage");
    }

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    // console.log("User profile:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Fetch profile error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

// Function to handle login and fetch user profile
export async function handleLoginAndFetchProfile(user) {
  console.log("fetch user", user);
  try {
    // Log in the user
    await login(user);
    // Fetch the user's profile
    const userProfile = await fetchUserProfile();
    console.log("User Profile:", userProfile);
  } catch (error) {
    console.error("Error during login or fetching profile:", error.message);
  }
}

export async function logoutUser() {
  localStorage.removeItem("jwt"); // Remove the JWT from storage
  console.log("User logged out");
}
// handleLoginAndFetchProfile();

export const updateUserProfile = async (userId, updatedData) => {
  const token = localStorage.getItem("jwt");
  if (!token) {
    throw new Error("No authentication token found");
  }

  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}api/users/${userId}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error;
  }
};

export async function getCounter(name = "orders", token) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/${name}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Assuming the total is in data.meta.total
    // Adjust this line according to the actual structure of your API response
    const total = data.meta.total;

    console.log("Total:", total);
    return total;
  } catch (error) {
    console.error("Error fetching counter:", error);
    throw error; // Re-throw the error so the caller can handle it if needed
  }
}

export async function fillOrder(order) {
  // const { name, phone, address, status } = order;

  const payload = {
    data: {
      name: order.name,
      phone: order.phone,
      address: order.address,
      cart: order.cart,
    },
  };

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/orders`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Success", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error filling order:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

export async function getOrder() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/orders?populate=*`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const res = await response.json();
    return res.data;
  } catch (error) {
    console.error("Error fetching dishes:", error);
    throw error;
  }
}

export async function getOneOrder(id) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/orders/${id}?populate=*`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const res = await response.json();
    return res.data;
  } catch (error) {
    console.error("Error fetching dishes:", error);
    throw error;
  }
}

export async function sort(entry = "orders", name) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/${entry}?populate=*`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const res = await response.json();
    return res.data;
  } catch (error) {
    console.error("Error fetching dishes:", error);
    throw error;
  }
}

export async function UpdateOrderStatus(id, status) {
  if (!id || !status) {
    throw new Error("Invalid input: Both id and status are required");
  }

  const payload = {
    data: {
      status: status,
    },
  };

  const apiUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL ||
    "${process.env.NEXT_PUBLIC_STRAPI_URL}";
  const endpoint = `${apiUrl}/api/orders/${id}`;

  try {
    const response = await axios.put(endpoint, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ADMIN_ACCES}`,
      },
    });

    console.log("Order status updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error updating order status:",
      error.response?.data || error.message
    );
    throw new Error(
      `Failed to update order status: ${
        error.response?.data?.error?.message || error.message
      }`
    );
  }
}

export async function SearchInput(searchtext) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/dishes?filters[$or][0][description][$contains]=${searchtext}&filters[$or][1][title][$contains]=${searchtext}&filters[$or][2][tags][$contains]=${searchtext}&populate=category`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const res = await response.json();
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching dishes:", error);
    throw error;
  }
}

export async function getData({
  data = "orders",
  filters = "",
  onlyToday = false,
  id = "",
  total = false,
  sort = {},
  meta = false,
}) {
  const today = new Date();
  const startOfDay = today.toISOString().split("T")[0] + "T00:00:00.000Z";
  const endOfDay = today.toISOString().split("T")[0] + "T23:59:59.999Z";

  const params = {
    today: `?filters[createdAt][$gte]=${startOfDay}&filters[createdAt][$lte]=${endOfDay}`,
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/${data}${
        id ? `/${id}` : ""
      }${filters}${onlyToday ? params.today : ""}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const res = await response.json();

    console.log(res);
    if (meta) {
      return res;
    }

    return res || res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function getTodaysItems(items = "orders") {
  const today = new Date();
  const startOfDay = today.toISOString().split("T")[0] + "T00:00:00.000Z";
  const endOfDay = today.toISOString().split("T")[0] + "T23:59:59.999Z";

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/${items}?filters[createdAt][$gte]=${startOfDay}&filters[createdAt][$lte]=${endOfDay}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const res = await response.json();
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching dishes:", error);
    throw error;
  }
}

export async function uploadFile(file) {
  const formData = new FormData();
  formData.append("files", file);

  try {
    const response = await fetch("http://localhost:1337/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("File upload failed");
    }

    const data = await response.json();
    console.log("File uploaded successfully:", data);
    console.log("File uploaded successfully:", data[0].id);
    return data[0].id;
  } catch (error) {
    console.error("Error uploading file:", error);
  }
}

export const PostData = async ({
  data = {},
  filesIds = 0 || [],
  api = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337/api",
  entry = "dishes",
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/${entry}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:
        entry === "users"
          ? JSON.stringify(data)
          : JSON.stringify({
              data: data,
            }),
    }
  );

  const res = await response.json();
  console.log(res);
  return res;
};

export const EditeData = async ({
  data = {},
  id = 0 || [],
  api = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337",
  entry = "dishes",
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/${entry}/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body:
        entry === "users"
          ? JSON.stringify(data)
          : JSON.stringify({
              data: data,
            }),
    }
  );

  const res = await response.json();
  console.log(res);
  return res;
};

export const deleteData = async ({
  id = 0 || [],
  api = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337/api",
  entry = "dishes",
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/${entry}/${id}`,
    {
      method: "DELETE",
    }
  );

  const res = await response.json();
  console.log(res);
  return res;
};

export const RegisterUser = async ({
  body = {
    username: "user.username",
    email: "user.email",
    phone: "user.phone",
    password: "user.password",
  },
}) => {
  try {
    const response = await fetch(
      `http://localhost:1337/api/auth/local/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.jwt);
      console.log("succes", data);
      // router.push("/user/profile");
    } else {
      console.log(data.error.message);
    }
  } catch (error) {
    setError("An error occurred. Please try again.");
  }
};

export const LoginUser = async ({
  body = {
    identifier: "",
    password: "",
  },
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    if (response.ok) {
      Cookies.set("auth-token", data.jwt, {
        expires: 1,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        path: "/",
      });

      console.log("Login successful", data);
    } else {
      console.log("Login failed:", data.error.message);
    }

    return data;
  } catch (error) {
    console.error("An error occurred during login:", error);
    throw error;
  }
};

export async function getUserData() {
  // Retrieve the token from cookies
  const token = Cookies.get("auth-token");

  if (!token) {
    throw new Error("No authentication token found. Please log in.");
  }

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me?populate=*`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data)

    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch user data:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to fetch user data. Please try again later.");
  }
}



export async function VerifyUserPassword({
  identifier = "user@example.com",
  password = "user_password",
}) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local`,
      {
        identifier : identifier,
        password : password
       }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch user data:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to fetch user data. Please try again later.");
  }
}


export async function getUploads() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/upload/files`
    );

    return response.data
  } catch (error) {
    console.error(
      "Failed to fetch user data:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to fetch user data. Please try again later.");
  }
}


export async function deleteUpload(id) {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/upload/files/${id}`
    );

    return response.data
  } catch (error) {
    console.error(
      "Failed to fetch user data:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to fetch user data. Please try again later.");
  }
}