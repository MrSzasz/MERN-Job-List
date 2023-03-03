import axios from "axios";
import { toast } from "react-hot-toast";
import { JobInterface, UserInterface } from "../interfaces/jobsInterfaces";

const notify = (message: string) =>
  toast.error(message, {
    style: { backgroundColor: "#ef4444", color: "white" },
  });

const serverBaseUrl = import.meta.env.VITE_SERVER_BASE_URL;

/* ============================== JOBS ============================== */

// Get all jobs from the database

export const axios_JOBS_getData = async (
  path: string,
  tokenFromUser: string
) => {
  try {
    const { data } = await axios.get<JobInterface[]>(serverBaseUrl + path, {
      // Send the token in the header of the request

      headers: {
        "x-access-token": tokenFromUser,
      },
    });

    // Returns the jobs

    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.data.popUpMessage !== "Token not provided") {
        notify(err.response?.data.popUpMessage);
        // Generate a new error for the handler in form
        throw new Error(err.response?.data.popUpMessage);
      }

      throw new Error("Not authenticated");
    } else {
      console.log("unexpected error: ", err);
      notify("An unexpected error occurred, please try again later");
      return "An unexpected error occurred, please try again later";
    }
  }
};

// Edit job from the database

export const axios_JOBS_updateData = async (
  dataToUpdate: JobInterface,
  path: string
) => {
  try {
    const { data } = await axios.put(serverBaseUrl + path, dataToUpdate, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-access-token": localStorage.getItem("token"), // Send the stored token from the user
      },
    });
    console.log(data);
    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log("error message: ", err.message);
      return err.message;
    } else {
      console.log("unexpected error: ", err);
      return "An unexpected error occurred";
    }
  }
};

// Delete job from the database

export const axios_JOBS_deleteData = async (
  idToDelete: string,
  path: string
) => {
  try {
    const { data } = await axios.delete(serverBaseUrl + path, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-access-token": localStorage.getItem("token"), // Send the stored token from the user
      },
      data: { jobID: idToDelete }, // Send the id to delete
    });

    
    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.data.popUpMessage !== "Token not provided") {
        notify(err.response?.data.popUpMessage);
        // Generate a new error for the handler in form
        throw new Error(err.response?.data.popUpMessage);
      }

      throw new Error("Not authenticated");
    } else {
      console.log("unexpected error: ", err);
      notify("An unexpected error occurred, please try again later");
      return "An unexpected error occurred, please try again later";
    }
  }
};

// Post a new job

export const axios_JOBS_addData = async (
  dataFromForm: JobInterface, // Send the job info to the back end
  path: string // And the path to the request
) => {
  try {
    const { data } = await axios.post<JobInterface>(
      serverBaseUrl + path,
      dataFromForm,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-access-token": localStorage.getItem("token"), // Send the stored token from the user
        },
      }
    );

    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      // Generate the popup
      notify(err.response?.data.popUpMessage);

      // Generate a new error for the handler in form
      throw new Error(err.response?.data.popUpMessage);
    } else {
      // If the error is not defined

      console.log("unexpected error: ", err);
      notify("An unexpected error occurred, please try again later");
      return "An unexpected error occurred, please try again later";
    }
  }
};

/* ============================== USERS ============================== */

// Create a new user

export const axios_USERS_addData = async (
  dataFromForm: UserInterface,
  path: string
) => {
  try {
    const { data } = await axios.post(serverBaseUrl + path, dataFromForm, {
      // Send the data to the backend
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    // Store the token from the response in the local storage

    localStorage.setItem("token", data.token);

    // Store the authorization in the local storage

    localStorage.setItem("auth", data.auth);

    // Returns the data to the frontend

    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      // Generate the popup
      notify(err.response?.data.popUpMessage);

      // Generate a new error for the handler in form
      throw new Error(err.response?.data.popUpMessage);
    } else {
      // If the error is not defined

      console.log("unexpected error: ", err);
      notify("An unexpected error occurred, please try again later");
      return "An unexpected error occurred, please try again later";
    }
  }
};

// Get user information from the database

export const axios_USERS_getData = async (
  dataFromUser: UserInterface,
  path: string
) => {
  try {
    const { data } = await axios.get(serverBaseUrl + path, {
      params: { email: dataFromUser.email, password: dataFromUser.password }, // Send the data in the params
    });

    // Store the token from the response in the local storage

    localStorage.setItem("token", data.token);

    // Store the authorization in the local storage

    localStorage.setItem("auth", data.auth);

    // Returns the data to the frontend

    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      // Generate the popup
      notify(err.response?.data.popUpMessage);

      // Generate a new error for the handler in form
      throw new Error(err.response?.data.popUpMessage);
    } else {
      // If the error is not defined

      console.log("unexpected error: ", err);
      notify("An unexpected error occurred, please try again later");
      return "An unexpected error occurred, please try again later";
    }
  }
};

// Edit user information

/*

export const axios_USERS_updateData = async (
  dataToUpdate: JobInterface,
  path: string
) => {
  try {
    const { data } = await axios.put(serverBaseUrl + path, dataToUpdate, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    console.log(data);
    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log("error message: ", err.message);
      return err.message;
    } else {
      console.log("unexpected error: ", err);
      return "An unexpected error occurred";
    }
  }
};

*/

// Delete user from the database

/*

export const axios_USERS_deleteData = async (idToDelete: string, path: string) => {
  try {
    const { data } = await axios.delete(serverBaseUrl + path, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: { id: idToDelete },
    });
    console.log(data);
    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log("error message: ", err.message);
      return err.message;
    } else {
      console.log("unexpected error: ", err);
      return "An unexpected error occurred";
    }
  }
};

*/
