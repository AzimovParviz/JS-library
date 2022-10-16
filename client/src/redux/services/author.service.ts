import axios from "axios";

import { UpdatedAuthor, Author } from "types";

export type PutType = {
  authorId: string;
  updatedAuthor: UpdatedAuthor;
};

const URL = "http://localhost:4000/api/v1/authors";

//TODO: refactor how the thunks are created like in author service

export default {
  getAllAuthors: async () => {
    try {
      const res = await axios.get(`${URL}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return {
        data: res.data,
        status: res.status,
      };
    } catch (error) {
      throw error;
    }
  },
  getAuthor: async (authorId: string) => {
    try {
      const res = await axios.get(`${URL}/${authorId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return {
        data: res.data,
        status: res.status,
      };
    } catch (error) {
      throw error;
    }
  },
  createAuthor: async (author: Author) => {
    try {
      const res = await axios.post(`${URL}/`, author, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return {
        data: res.data,
        status: res.status,
      };
    } catch (error) {
      throw error;
    }
  },
  updateAuthor: async (data: PutType) => {
    try {
      const { authorId, updatedAuthor } = data;
      const res = await axios.put(`${URL}/${authorId}`, updatedAuthor, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return {
        data: res.data,
        status: res.status,
      };
    } catch (error) {
      throw error;
    }
  },

  deleteAuthor: async (authorId: string) => {
    try {
      const res = await axios.delete(`${URL}/${authorId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return {
        data: authorId,
        status: res.status,
      };
    } catch (error) {
      throw error;
    }
  },
};
