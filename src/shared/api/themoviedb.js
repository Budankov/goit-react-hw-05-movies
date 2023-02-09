import axios from 'axios';

const instance = axios.create({
  baseURL: '',
  params: {
    _limit: 12,
  },
});

export const getTrendingMovie = async (_page = 1) => {
  const { data } = await instance.get('/', {
    params: {
      _page,
    },
  });
  return data;
};

export const getDetailsMovie = async id => {
  const { data } = await instance.get(`/${id}`);
  return data;
};
