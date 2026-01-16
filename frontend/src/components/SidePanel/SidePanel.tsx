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
  /** 
   * Currently active section in the side navigation 
   * Used to highlight the selected menu item
   */
  active: "projects" | "taskboard";

  /**
   * Callback fired when user switches navigation sections
   * @param section Selected section key
   */
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
      style={{ borderRight: "1px solid #cccccc" }}
    >
      <SideNavItems>

        <SideNavLink
          renderIcon={Folder}
          isActive={active === "projects"}
          onClick={() => {
            navigate("/");
            onChange("projects");
          }}
        >
          Projects
        </SideNavLink>

        <SideNavLink
          renderIcon={Task}
          isActive={active === "taskboard"}
          onClick={() => {
            onChange("taskboard");
            navigate(
              "/tasks/4fd4d2f2-5745-4532-956f-8b8ca870ec9c/Mini Project Manager"
            );
          }}
        >
          Task Board
        </SideNavLink>

      </SideNavItems>
    </SideNav>
  );
});
