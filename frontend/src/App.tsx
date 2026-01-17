import {
  Content,
  Header,
  HeaderName,
  HeaderGlobalBar,
  Theme,
  HeaderContainer,
} from "@carbon/react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useState, type JSX } from "react";

import "./App.scss";
import { Dashboard } from "./pages/Dashboard";
import { SidePanel } from "./components/SidePanel/SidePanel";
import { TaskBoardWrapper } from "./components/TaskBoardWrapper/TaskBoardWrapper";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";

/**
 * HeaderComponent
 * ----------------
 * Application-level header using Carbon Header.
 * - Displays app title
 * - Handles top-level navigation (home redirect)
 *
 * Kept separate from App to:
 *  - Avoid re-renders
 *  - Improve readability
 *  - Keep routing logic isolated
 */
const HeaderComponent = () => {
  const navigate = useNavigate();

  return (
    <Header aria-label="Header for Mini Project App">
      {/* App name acts as a home navigation link */}
      <HeaderName
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        &nbsp;Mini Project
      </HeaderName>

      {/* Reserved for future global actions (profile, notifications, etc.) */}
      <HeaderGlobalBar />
    </Header>
  );
};

/**
 * App
 * ----
 * Root component responsible for:
 *  - Application layout
 *  - Theme configuration
 *  - Routing
 *  - Global navigation structure
 *
 * Business logic is intentionally delegated to child components.
 */
const App = (): JSX.Element => {
  /**
   * Tracks the currently active section in the SidePanel.
   * Used purely for UI highlighting, not routing.
   */
  const [activeSection, setActiveSection] =
    useState<"projects" | "taskboard">("projects");

  return (
    <ErrorBoundary>
      <BrowserRouter>
        {/* Carbon global theme wrapper */}
        <Theme theme="g100">
          <HeaderContainer
            render={() => (
              <>
                {/* Top navigation header */}
                <HeaderComponent />

                {/* Left navigation panel */}
                <SidePanel
                  active={activeSection}
                  onChange={setActiveSection}
                />

                {/* Main content area: route-driven */}
                <Content style={{ height: "100vh" }}>
                  <Routes>
                    {/* Dashboard: project listing */}
                    <Route path="/" element={<Dashboard />} />

                    {/* Task board scoped to a project */}
                    <Route
                      path="/tasks/:projectId/:projectName"
                      element={<TaskBoardWrapper />}
                    />
                  </Routes>
                </Content>
              </>
            )}
          />
        </Theme>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
