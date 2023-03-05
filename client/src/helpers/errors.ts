// ================================================================================ //
// ================================ IMPORTS ======================================= //
// ================================================================================ //

// ========== Package components ================================================== //

import toast from "react-hot-toast";

// ================================================================================ //
// =================================== CODE ======================================= //
// ================================================================================ //

const notify = (message: string) =>
  toast.error(message, {
    style: { backgroundColor: "#ef4444", color: "white" },
  });

export const notifyErrorWithToast = (message: string, err: {}) => {
  toast.error(message, {
    style: { backgroundColor: "#ef4444", color: "white" },
  }); // We catch the error and show the error message
  console.log(err);
};

export const handleRequestErrors = (err: {
  response?: { data?: { popUpMessage?: string } };
}) => {
  if (err.response?.data?.popUpMessage !== "Token not provided") {
    notify(err.response?.data?.popUpMessage!);

    // Generate a new error for the handler in form
    throw new Error(err.response?.data?.popUpMessage);
  }

  throw new Error("Not authenticated");
};

export const handleUnexpectedRequestErrors = (err: {}) => {
  console.log("unexpected error: ", err);
  notify("An unexpected error occurred, please try again later");
  return "An unexpected error occurred, please try again later";
};
