// ================================================================================ //
// ================================ IMPORTS ======================================= //
// ================================================================================ //

// ========== Package components ================================================== //

import axios from "axios";

// ========== Interfaces ========================================================== //

import { JobInterface, UserInterface } from "../interfaces/jobsInterfaces";

// ========== Custom components =================================================== //

import { handleRequestErrors, handleUnexpectedRequestErrors } from "./errors";

// ================================================================================ //
// =================================== CODE ======================================= //
// ================================================================================ //

// ========== Variables =========================================================== //

const serverBaseUrl = import.meta.env.VITE_SERVER_BASE_URL;

/* ============================== JOBS ============================== */

// Get all jobs from the database

export const axios_JOBS_getData = async (
  path: string,
  tokenFromUser: string
) => {
  try {
    const { data } = await axios.get(serverBaseUrl + path, {
      // Send the token in the header of the request

      headers: {
        Authorization: `Bearer ${tokenFromUser}`,
      },
    });

    // Returns the jobs

    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      handleRequestErrors(err!);
    } else {
      handleUnexpectedRequestErrors(err!);
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
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Send the stored token from the user
      },
    });
    console.log(data);
    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      handleRequestErrors(err!);
    } else {
      handleUnexpectedRequestErrors(err!);
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
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Send the stored token from the user
      },
      data: { jobID: idToDelete }, // Send the id to delete
    });

    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      handleRequestErrors(err!);
    } else {
      handleUnexpectedRequestErrors(err!);
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
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Send the stored token from the user
        },
      }
    );

    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      handleRequestErrors(err!);
    } else {
      // If the error is not defined

      handleUnexpectedRequestErrors(err!);
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
      handleRequestErrors(err!);
    } else {
      // If the error is not defined

      handleUnexpectedRequestErrors(err!);
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
      handleRequestErrors(err!);
    } else {
      // If the error is not defined

      handleUnexpectedRequestErrors(err!);
    }
  }
};

// Delete user from the database

export const axios_USERS_deleteData = async (
  idToDelete: string,
  path: string
) => {
  try {
    const { data } = await axios.delete(serverBaseUrl + path, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Send the stored token from the user
      },
      data: { id: idToDelete },
    });
    console.log(data);
    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      handleRequestErrors(err!);
    } else {
      handleUnexpectedRequestErrors(err!);
    }
  }
};
