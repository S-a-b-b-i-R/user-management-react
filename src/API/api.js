import axios from "axios";

export const createUser = async (user) => {
    console.log(user);
    const response = await axios.post(
        "http://10.10.83.41:50/api/users/create",
        user
    );
    const data = await response.data;
    console.log(data);
    return data;
};

export const updateUser = async (user) => {
    const response = await axios.put(
        `http://localhost:5157/api/users/update`,
        user
    );
    const data = await response.data;
    console.log(data);
    return data;
};
