import baseLink from "../baselink";
import {
  GetCoursesResponse,
  GetUserTeamsResponse,
  GetOtherTeamsResponse,
  CreateTeamResponse,
  DeleteTeamResponse,
  JoinTeamResponse,
  TeamCreationData,
} from "../models/responses";
const token = localStorage.getItem("token");

const getCourses = async (): Promise<GetCoursesResponse> => {
  const response = await fetch(`${baseLink}/courses`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  console.log(data);
  return data;
};

const getUserTeams = async (userId: number): Promise<GetUserTeamsResponse> => {
  const response = await fetch(`${baseLink}/teams/user/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data: any = await response.json();
  console.log(data);
  return data;
};

const getOtherTeams = async (
  userId: number
): Promise<GetOtherTeamsResponse> => {
  const response = await fetch(`${baseLink}/teams/other/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data: any = await response.json();
  console.log(data);
  return data;
};

const joinTeam = async (
  teamId: number,
  userId: number
): Promise<JoinTeamResponse> => {
  const response = await fetch(`${baseLink}/teams/${teamId}/join`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId }),
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data: any = await response.json();
  console.log(data);
  return data;
};

const leaveTeam = async (teamId: number, userId: number): Promise<void> => {
  const response = await fetch(`${baseLink}/teams/${teamId}/leave`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
    body: JSON.stringify({ userId }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }

  const data = await response.json();
  return data;
};
const deleteTeam = async (teamId: number): Promise<DeleteTeamResponse> => {
  const response = await fetch(`${baseLink}/teams/${teamId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data: any = await response.json();
  console.log(data);
  return data;
};

const createTeam = async (
  team: TeamCreationData
): Promise<CreateTeamResponse> => {
  const response = await fetch(`${baseLink}/teams`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
    body: JSON.stringify(team),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  console.log(data);
  return data;
};
export {
  getCourses,
  getUserTeams,
  getOtherTeams,
  joinTeam,
  leaveTeam,
  deleteTeam,
  createTeam,
};
