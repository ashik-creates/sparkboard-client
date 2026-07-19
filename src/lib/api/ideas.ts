"use server";

import { getToken } from "../getToken";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface IdeaQuery {
  search?: string;
  category?: string;
  sort?: string;
  page?: string;
}

export const getIdeas = async (query: IdeaQuery) => {
  const params = new URLSearchParams();

  if (query.search) params.set("search", query.search);
  if (query.category) params.set("category", query.category);
  if (query.sort) params.set("sort", query.sort);
  if (query.page) params.set("page", query.page);

  const res = await fetch(`${API_URL}/api/ideas?${params.toString()}`, {
    cache: "no-store",
  });

  return res.json();
};

export const getStatistics = async () => {
  const res = await fetch(`${API_URL}/api/statistics`, {
    cache: "no-store",
  });

  return res.json();
};

export const getFeaturedIdeas = async () => {
  const res = await fetch(`${API_URL}/api/featured-ideas`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch featured ideas");
  }

  return res.json();
};

export async function getIdea(id: string) {
  const res = await fetch(`${API_URL}/api/ideas/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch idea");
  }

  return res.json();
}

export async function getAllIdeas() {

  const token = await getToken();
  const res = await fetch(`${API_URL}/api/all-ideas`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch idea");
  }

  return res.json();
}
