import axiosClient from "@/lib/axios/axiosClient";

// Get all blogs
export const getBlogs = async params => {
  return axiosClient.get(`/blogs?filter_value=${params.title}`);
};

// Get blog by ID
export const getBlogById = async (id: string) => {
  return axiosClient.get(`/blogs/${id}`);
};

// Create blog
export const createBlog = async blogData => {
  return axiosClient.post(`/blogs`, blogData);
};

// Update blog
export const updateBlog = async (id: string, blogData) => {
  return axiosClient.put(`/blogs/${id}`, blogData);
};

// Delete blog
export const deleteBlog = async (id: string): Promise<void> => {
  axiosClient.delete(`/blogs/${id}`);
};
