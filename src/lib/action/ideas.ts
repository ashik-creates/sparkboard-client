"use server";
import { Idea } from "@/types/idea";
import { getToken } from "../getToken";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const createIdea = async (idea: Omit<Idea, "_id">) => {
  const token = await getToken();
  const res = await fetch(`${API_URL}/api/ideas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(idea),
  });

  return res.json();
};

export const deleteIdea = async (id: string) => {
  const token = await getToken();
  const res = await fetch(`${API_URL}/api/ideas/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

export const validateIdea = async (id: string) => {
  const res = await fetch(`${API_URL}/api/ideas/${id}/validate`, {
    method: "POST",
  });

  return res.json();
};

export const improveIdea = async (id: string) => {

  const res = await fetch(`${API_URL}/api/ideas/${id}/improve`, {
    method: "POST",
  });

  return res.json();
};