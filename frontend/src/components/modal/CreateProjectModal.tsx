import {
  Modal,
  TextInput,
  TextArea,
  Stack
} from "@carbon/react";
import { useState } from "react";

interface ProjectDraft {
  name: string;
  description: string;
}

interface Props {
  open: boolean;
  project: ProjectDraft;
  setProject: React.Dispatch<React.SetStateAction<ProjectDraft>>;
  onClose: () => void;
  onSave: (name: string, description: string) => Promise<void>;
}


export const CreateProjectModal = ({
  open,
  onClose,
  onSave,
  project,
  setProject
}: Props) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    console.log('on submit', project)
  

    setLoading(true);
    await onSave(project?.name, project?.description);
    setLoading(false);

    // Reset form
    setProject({ name: "", description: "" });
    onClose();
  };

  return (
    <Modal
      open={open}
      modalHeading="Create Project"
      primaryButtonText="Create"
      secondaryButtonText="Cancel"
      onRequestClose={onClose}
      onRequestSubmit={handleSubmit}
      primaryButtonDisabled={loading || !project?.name?.trim()}
    >
      <Stack gap={5}>
        <TextInput
          id="project-name"
          labelText="Project name"
          value={project.name}
          onChange={(e) =>
            setProject((prev: any) => ({
              ...prev,
              name: e.target.value
            }))
          }
        />

        <TextArea
          id="project-description"
          labelText="Description"
          value={project.description}
          onChange={(e) =>
            setProject((prev: any) => ({
              ...prev,
              description: e.target.value
            }))
          }
        />
      </Stack>
    </Modal>
  );
};
