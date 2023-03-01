import axios from "axios";
import { toast } from "react-hot-toast";
import { JobInterface, UserInterface } from "../interfaces/jobsInterfaces";

const notify = (message: string) =>
  toast.error(message, {
    style: { backgroundColor: "#ef4444", color: "white" },
  });

const setCookie = (
  cookieName: string,
  cookieValue: string,
  expirationDays: number
) => {
  const d = new Date();
  d.setTime(d.getTime() + expirationDays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = `${cookieName}=${cookieValue};${expires};secure;httpOnly;sameSite=Lax;path=/`;
};

/* ============================== JOBS ============================== */

// Get all jobs from the database

export const axios_JOBS_getData = async (
  url: string,
  tokenFromUser: string
) => {
  try {
    const { data } = await axios.get<JobInterface[]>(url, {
      headers: {
        "x-access-token": "aaaaaaaa",
      },
    });

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

export const axios_JOBS_updateData = async (
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

export const axios_JOBS_deleteData = async (
  idToDelete: string,
  url: string
) => {
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

export const axios_JOBS_addData = async (
  dataFromForm: JobInterface | UserInterface,
  url: string
) => {
  try {
    const { data } = await axios.post<JobInterface>(url, dataFromForm, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

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

// Create a new user or job

export const axios_USERS_addData = async (
  dataFromForm: JobInterface | UserInterface,
  url: string
) => {
  try {
    const { data, status } = await axios.post<JobInterface | UserInterface>(
      url,
      dataFromForm,
      {
        // withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    console.log({ status, data });

    // setCookie("token", data.token, 7);

    // document.cookie= `token=${data.token};secure;sameSite=Lax;httpOnly`
    // document.cookie= `token=${data.token};secure;httpOnly;sameSite=Lax;path=/`

    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      notify(err.response?.data.message);
      return err;
    } else {
      console.log("unexpected error: ", err);
      notify("An unexpected error occurred, please try again later");
      return "An unexpected error occurred, please try again later";
    }
  }
};

// Get user information from the database

export const axios_USERS_getData = async (
  dataFromUser: UserInterface,
  url: string
) => {
  try {
    const { data } = await axios.get<UserInterface>(url, {
      params: { email: dataFromUser.email, password: dataFromUser.password },
    });

    console.log(data);
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

// Edit user information

/*

export const axios_USERS_updateData = async (
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

*/

// Delete user from the database

/*

export const axios_USERS_deleteData = async (idToDelete: string, url: string) => {
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

*/
