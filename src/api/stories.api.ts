import axiosClient from "../lib/axios/axiosClient";

export interface Story {
  story_id: string;
  title: string;
  author_name: string;
  status: string;
  puplished_at: Date;
}

interface PaginationParams {
  page: number;
  limit: number;
  title: string;
}

export interface UpdateStoryDto {
  title?: string;
  author_name?: string;
  description?: string;
  cover_image?: string;
  price?: number;
  status?: string;
  progress?: string;
  genres?: string[];
}

export const getAllStories = async (params: PaginationParams) => {
  return axiosClient.get(
    `/stories?page=${params.page}&limit=${params.limit}&title=${params.title}`
  );
};

export const getStoryById = async (id: string) => {
  return axiosClient.get(`/stories/${id}`);
};

export const deleteStory = async (id: string): Promise<void> => {
  return axiosClient.delete(`/stories/${id}`);
};

export const updateStory = async (
  id: string,
  storyData: UpdateStoryDto
): Promise<Story> => {
  return axiosClient.put(`/stories/${id}`, storyData);
};

export const getGenres = async () => {
  return axiosClient.get(`/genres`);
};

export const createStory = async (storyData: any) => {
  return axiosClient.post(`/stories`, storyData);
};

export const getChapterById = async (id: string) => {
  return axiosClient.get(`/chapters/${id}`);
};

export const deleteChapter = async (id: string): Promise<void> => {
  return axiosClient.delete(`/chapters/${id}`);
};

export const updateChapter = async (id: string, chapterData: any) => {
  return axiosClient.put(`/chapters/${id}`, chapterData);
};

export const createChapter = async (chapterData: any) => {
  return axiosClient.post(`/chapters`, chapterData);
};
