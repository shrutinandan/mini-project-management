import { memo } from "react";
import {
  SideNav,
  SideNavItems,
  SideNavLink
} from "@carbon/react";
import {
  Folder,
  Task
} from "@carbon/icons-react";
import { useNavigate } from "react-router-dom";

interface Props {
  active: "projects" | "taskboard";
  onChange: (section: "projects" | "taskboard") => void;
}

export const SidePanel = memo(({ active, onChange }: Props) => {
    const navigate = useNavigate(); 
  return (
    <SideNav
      isFixedNav
      expanded
      isChildOfHeader={false}
      aria-label="Side navigation"
      style={{borderRight: '1px solid #cccccc'}}
    >
      <SideNavItems>
        <SideNavLink
          renderIcon={Folder}
          isActive={active === "projects"}
          onClick={() =>{
            navigate("/");
            onChange("projects")}}
        >
          Projects
        </SideNavLink>

        <SideNavLink
          renderIcon={Task}
          isActive={active === "taskboard"}
          onClick={() => {onChange("taskboard")
            navigate(`/tasks/p1/Mini Project Manager`)
          }}
        >
          Task Board
        </SideNavLink>
      </SideNavItems>
    </SideNav>
  );
});
