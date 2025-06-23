export const getGenres = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/genres`
  ).then((res) => res.json());
  return response;
};
