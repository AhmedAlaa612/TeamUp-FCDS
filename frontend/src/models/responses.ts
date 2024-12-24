// Base Interfaces
interface ApiError {
  message: string;
  error?: string;
}

interface Course {
  id: number;
  name: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  linkedinUrl: string | null;
  gitHubUrl: string | null;
  bio: string;
  imagePath?: string;
}

interface Team {
  id: number;
  name: string;
  size: number;
  teamDescription: string;
  courseId: number;
  users: {
    id: number;
    firstName: string;
    lastName: string;
    pivot: {
      teamId: number;
      userId: number;
    };
  }[];
  course: Course;
}

// Auth Controller Responses
interface AuthResponse {
  access_token: string;
  user: User;
}

interface LogoutResponse {
  message: string;
}

interface EditUserResponse {
  message: string;
  user: User;
}

interface EditUserPhotoResponse {
  message: string;
  imagePath: string;
}

// Team Controller Responses
interface CreateTeamResponse {
  message: string;
  team: Team;
}

interface DeleteTeamResponse {
  message: string;
}

interface JoinTeamResponse {
  message: string;
  team: Team;
}

interface GetUserTeamsResponse {
  teams: Team[];
}

interface GetOtherTeamsResponse {
  teams: Team[];
}

interface GetCoursesResponse {
  status: string;
  courses: Course[];
}

// Error Responses for specific cases
interface InvalidCredentialsError extends ApiError {
  message: "Invalid credentials";
}

interface TeamFullError extends ApiError {
  message: "Team is full";
}

interface AlreadyMemberError extends ApiError {
  message: "User is already a member of this team";
}
interface TeamCreationData {
  name: string;
  size: number;
  teamDescription: string;
  courseId: number;
}
export type {
  ApiError,
  Course,
  User,
  Team,
  AuthResponse,
  LogoutResponse,
  EditUserResponse,
  EditUserPhotoResponse,
  CreateTeamResponse,
  DeleteTeamResponse,
  JoinTeamResponse,
  GetUserTeamsResponse,
  GetOtherTeamsResponse,
  GetCoursesResponse,
  InvalidCredentialsError,
  TeamFullError,
  AlreadyMemberError,
  TeamCreationData,
};
