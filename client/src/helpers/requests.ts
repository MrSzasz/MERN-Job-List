import axios from "axios";
import { JobInterface } from "../interfaces/jobsInterfaces";

/* ============================== JOBS ============================== */

// Get all jobs from the database

export const getDataFromDB = async (url: string) => {
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

/*

code

*/

// Delete job information from the database

/*

code

*/

// Post a new job

export const postDataToBack = async (
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
