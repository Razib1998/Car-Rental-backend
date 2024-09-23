/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  TErrorSources,
  TGenericErrorResponse,
} from "../interface/error.interface";

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  // Extract the message within "" using regex,

  const match = err.message.match(/"([^"]*)"/);

  const extractedMessage = match && match[1];

  const errorSources: TErrorSources = [
    {
      path: "",
      message: `${extractedMessage} is already exists`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: "Invalid Id",
    errorSources,
  };
};

export default handleDuplicateError;
