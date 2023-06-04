import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import ToDoList from "./ToDoList";

interface MenuItemProps {
  active: boolean;
}

const initialTodos = [
  {
    text: "Test 1",
    completed: false,
    subtasks: [],
  },
  {
    text: "Test 2",
    completed: false,
    subtasks: [],
  },
];

type Todo = {
  text: string;
  completed: boolean;
  subtasks: Todo[];
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const onLogoutClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const { user } = useAuth();
  const location = useLocation();
  return (
    <Container>
      <Sidebar>
        <Logo>Dashboard</Logo>
        <Menu>
          <MenuItem active={location.pathname === "/dashboard"}>
            Tasks (My To Do List)
          </MenuItem>
        </Menu>
        <Menu className="bottom-menu">
          <MenuItem
            active={location.pathname === "/dashboard"}
            onClick={onLogoutClick}
          >
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
      <Content>
        <Title>Welcome, {user?.username}!</Title>
        <CardContainer>
          <ToDoList />
        </CardContainer>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

const Sidebar = styled.div`
  width: 250px;
  height: 100vh;
  padding: 20px;
  background-color: #f5f5f5;
`;

const Logo = styled.h1`
  margin-bottom: 30px;
`;

const Menu = styled.ul`
  list-style: none;
  padding: 0;
`;

const MenuItem = styled.li<MenuItemProps>`
  margin-bottom: 10px;
  color: ${(props: any) => (props.active ? "#000" : "#888")};
  font-weight: ${(props: any) => (props.active ? "bold" : "normal")};
  cursor: pointer;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

const Title = styled.h1`
  margin-bottom: 30px;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

export default Dashboard;
