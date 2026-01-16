import {
  Modal,
  TextInput,
  InlineLoading
} from "@carbon/react";
import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (title: string) => Promise<void>;
};

export const AddTaskModal = ({ open, onClose, onSubmit }: Props) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError("Task title is required");
      return;
    }

    try {
      setLoading(true);
      await onSubmit(title.trim());
      setTitle("");
      setError("");
      onClose();
    } catch {
      setError("Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      modalHeading="Add new task"
      primaryButtonText={loading ? "Adding..." : "Add task"}
      secondaryButtonText="Cancel"
      onRequestClose={onClose}
      onRequestSubmit={handleSubmit}
      primaryButtonDisabled={loading}
    >
      <TextInput
        id="task-title"
        labelText="Task title"
        placeholder="Enter task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        invalid={!!error}
        invalidText={error}
      />

      {loading && (
        <InlineLoading
          description="Creating task..."
          style={{ marginTop: "1rem" }}
        />
      )}
    </Modal>
  );
};
