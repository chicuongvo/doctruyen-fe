import axiosClient from "../lib/axios/axiosClient";

export interface StoryComment {
  comment_id: string;
  content: string;
  story_id: string;
  story_title: string;
  created_at: string;
}

export interface LikedStory {
  story_id: string;
  title: string;
  author_name: string;
  liked_at: string;
}

export interface User {
  user_id: string;
  username: string;
  email: string;
  phone_number: string;
  fullname: string;
  role: string;
  profile_pic?: string;
  is_banned: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
  story_comments?: StoryComment[];
  liked_stories?: LikedStory[];
}

// Get all users
export const getAllUsers = async () => {
  return axiosClient.get("/auth");
};

// Get user by ID
export const getUserById = async (id: string) => {
  return axiosClient.get(`/auth/${id}`);
};

// Create new user
export const createUser = async (userData: {
  username: string;
  email: string;
  phone_number: string;
  password: string;
  confirm_password: string;
  role?: string;
  profile_pic?: string;
}) => {
  return axiosClient.post("/auth/sign-up", userData);
};

// Update user
export const updateUser = async (userData: {
  username?: string;
  email?: string;
  phone_number?: string;
  fullname?: string;
  profile_pic?: string;
}) => {
  return axiosClient.put("/auth", userData);
};

// Ban user
export const banUser = async (userId: string) => {
  return axiosClient.put("/auth/ban", { user_id: userId });
};

// Get current user
export const getCurrentUser = async () => {
  return axiosClient.get("/auth/me");
};

// Request password reset
export const requestPasswordReset = async (email: string) => {
  return axiosClient.post("/auth/reset-password-token", { email });
};

// Reset password
export const resetPassword = async (
  token: string,
  data: { new_password: string; confirm_new_password: string }
) => {
  return axiosClient.post(`/auth/reset-password/${token}`, data);
};

// Request email verification
export const requestEmailVerification = async () => {
  return axiosClient.get("/auth/verification-token");
};

// Verify email
export const verifyEmail = async (token: string) => {
  return axiosClient.post("/auth/verify-email", { verification_token: token });
};
