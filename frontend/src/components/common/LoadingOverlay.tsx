import React from "react";
import { CircleLoader } from "react-spinners";

interface LoadingOverlayProps {
  loading: boolean;
  text?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  loading,
  text = "Loading..."
}) => {
  if (!loading) return null;

  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <CircleLoader
          color="#0f62fe"
          loading={true}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <span>{text}</span>
      </div>
    </div>
  );
};
