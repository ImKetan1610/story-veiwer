import { toast } from "react-toastify";

export const dispatchRequest = async (
  dispatch,
  requestAction,
  successAction,
  failureAction,
  requestFn
) => {
  try {
    dispatch(requestAction());
    const { data } = await requestFn();
    dispatch(successAction(data));
  } catch (error) {
    dispatch(failureAction());
    toast.error(error.response.data.message || "Something went wrong");
  }
};
