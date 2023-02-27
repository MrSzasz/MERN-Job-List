import axios from "axios";
import { JobInterface } from "../interfaces/jobsInterfaces";

/* ============================== JOBS ============================== */

// Get all jobs from the database

export const axios_getData = async (url: string) => {
  try {
    const { data } = await axios.get<JobInterface[]>(
      url ? url : "http://localhost:3001/jobs"
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};

// Edit job from the database

export const axios_updateData = async (
  dataToUpdate: JobInterface,
  url: string
) => {
  try {
    const { data } = await axios.put(url, dataToUpdate, {
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

// Delete job information from the database

export const axios_deleteData = async (idToDelete: string, url: string) => {
  try {
    const { data } = await axios.delete(url, {
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

// Post a new job

export const axios_addData = async (
  dataFromForm: JobInterface,
  url: string
) => {
  try {
    const { data } = await axios.post<JobInterface>(
      url ? url : "http://localhost:3001/jobs",
      dataFromForm,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    // console.log(data);
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

/* ============================== USERS ============================== */

// Create a new user

/*

code

*/

// Get user information from the database

/*

code

*/

// Edit user information

/*

code

*/

// Delete user from the database

/*

code

*/
