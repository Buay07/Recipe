import { Alert } from "@heroui/react";
import axios from "axios";

interface ErrorProps {
  error: Error | unknown;
}

const ErrorDisplay = ({ error }: ErrorProps) => {
  let errorMessage = "An error occurred";

  if (axios.isAxiosError(error)) {
    errorMessage = error.response?.data?.message || error.message;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  }

  return (
    <div className="flex justify-center p-5 max-w-xl mx-auto">
      <Alert color="danger" variant="flat">
        {errorMessage}
      </Alert>
    </div>
  );
};

export default ErrorDisplay;
