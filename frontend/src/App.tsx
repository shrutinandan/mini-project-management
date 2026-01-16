import {
  Content,
  Header,
  HeaderName,
  HeaderGlobalBar,
  Theme,
  SkipToContent,
  HeaderContainer,
  SideNav,
} from "@carbon/react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

import "./App.scss";
import { Dashboard } from "./pages/Dashboard";
import { useState, type JSX } from "react";
import { SidePanel } from "./components/SidePanel/SidePanel";
import { TaskBoard } from "./components/TaskBoard/TaskBoard";
import { TaskBoardWrapper } from "./components/TaskBoardWrapper/TaskBoardWrapper";
// import type { RootState } from "./store/userSlice"; // adjust path


const HeaderComponent = () => {
  const navigate = useNavigate(); // Use useNavigate inside the c
 


  return (
    <Header aria-label="Header for Our Skeleton App">
      <HeaderName style={{  cursor: "pointer" }} onClick={() => 
        navigate("/")}>
        &nbsp;Mini Project
      </HeaderName>
     
      <HeaderGlobalBar>
      
      </HeaderGlobalBar>
    </Header>
  );
};

const App = (): JSX.Element => {
  const [activeSection, setActiveSection] =
    useState<"projects" | "taskboard">("projects");

  return (
    <BrowserRouter>
      <Theme theme="g100">
        <HeaderContainer
          render={() => (
            <>
              <HeaderComponent />

              <SidePanel
                active={activeSection}
                onChange={setActiveSection}
              />

              <Content style={{height: '100vh'}}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/tasks/:projectId/:projectName" element={<TaskBoardWrapper />} />
                </Routes>
              </Content>
            </>
          )}
        />
      </Theme>
    </BrowserRouter>
  );
};



export default App;
