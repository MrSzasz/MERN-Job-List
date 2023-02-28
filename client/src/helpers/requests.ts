import axios from "axios";
import { toast } from "react-hot-toast";
import { JobInterface, UserInterface } from "../interfaces/jobsInterfaces";

const notify = (message: string) =>
  toast.error(message, {
    style: { backgroundColor: "#ef4444", color: "white" },
  });

/* ============================== JOBS ============================== */

// Get all jobs from the database

// export const axios_getData = async (url: string) => {
//   try {
//     const { data } = await axios.get<JobInterface[]>(
//       url ? url : "http://localhost:3001/jobs"
//     );

//     return data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.log("error message: ", error.message);
//       return error.message;
//     } else {
//       console.log("unexpected error: ", error);
//       return "An unexpected error occurred";
//     }
//   }
// };

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

// export const axios_addData = async (
//   dataFromForm: JobInterface | UserInterface,
//   url: string
// ) => {
//   try {
//     const { data } = await axios.post<JobInterface>(url, dataFromForm, {
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//     });

//     // console.log(data);
//     return data;
//   } catch (err) {
//     if (axios.isAxiosError(err)) {
//       console.log("error message: ", err.message);
//       return err.message;
//     } else {
//       console.log("unexpected error: ", err);
//       return "An unexpected error occurred";
//     }
//   }
// };

/* ============================== USERS ============================== */

// Create a new user or job

export const axios_addData = async (
  dataFromForm: JobInterface | UserInterface,
  url: string
) => {
  try {
    const { data, status } = await axios.post<JobInterface | UserInterface>(
      url,
      dataFromForm,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    console.log({ status, data });
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

export const axios_getData = async (
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

code

*/

// Delete user from the database

/*

code

*/
