"use client";

import { useQuery, useMutation, useQueryClient, QueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { authApi, profileApi, matchApi, myApi } from "@/lib/api-client";

// Query Keys
export const queryKeys = {
  user: ["user"] as const,
  profiles: (page?: number, gender?: string) => ["profiles", { page, gender }] as const,
  profile: (id: string) => ["profile", id] as const,
  myProfiles: ["myProfiles"] as const,
  matchRequests: (type?: string, status?: string) => ["matchRequests", { type, status }] as const,
  matches: ["matches"] as const,
};

// Auth Hooks
export function useUser() {
  return useQuery({
    queryKey: queryKeys.user,
    queryFn: async () => {
      const response = await authApi.me();
      if (!response.success || !response.data) {
        throw new Error(response.error?.message || "Failed to fetch user");
      }
      return response.data.user;
    },
    retry: false,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (email: string) => {
      const response = await authApi.login(email);
      if (!response.success) {
        throw new Error(response.error?.message || "Login failed");
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user });
    },
  });
}

export function useGuestLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await authApi.guest();
      if (!response.success) {
        throw new Error(response.error?.message || "Guest login failed");
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await authApi.logout();
    },
    onSuccess: () => {
      queryClient.clear();
    },
  });
}

// Profile Hooks
export function useProfiles(page = 1, gender?: string) {
  return useQuery({
    queryKey: queryKeys.profiles(page, gender),
    queryFn: async () => {
      const response = await profileApi.list(page, 20, gender);
      if (!response.success || !response.data) {
        throw new Error(response.error?.message || "Failed to fetch profiles");
      }
      return response.data;
    },
  });
}

export function useProfile(id: string) {
  return useQuery({
    queryKey: queryKeys.profile(id),
    queryFn: async () => {
      const response = await profileApi.get(id);
      if (!response.success || !response.data) {
        throw new Error(response.error?.message || "Failed to fetch profile");
      }
      return response.data.profile;
    },
    enabled: !!id,
  });
}

export function useMyProfiles() {
  return useQuery({
    queryKey: queryKeys.myProfiles,
    queryFn: async () => {
      const response = await myApi.profiles();
      if (!response.success || !response.data) {
        throw new Error(response.error?.message || "Failed to fetch my profiles");
      }
      return response.data.profiles;
    },
  });
}

export function useCreateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Parameters<typeof profileApi.create>[0]) => {
      const response = await profileApi.create(data);
      if (!response.success) {
        throw new Error(response.error?.message || "Failed to create profile");
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
      queryClient.invalidateQueries({ queryKey: queryKeys.myProfiles });
    },
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Parameters<typeof profileApi.update>[1] }) => {
      const response = await profileApi.update(id, data);
      if (!response.success) {
        throw new Error(response.error?.message || "Failed to update profile");
      }
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.profile(variables.id) });
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
      queryClient.invalidateQueries({ queryKey: queryKeys.myProfiles });
    },
  });
}

export function useDeleteProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await profileApi.delete(id);
      if (!response.success) {
        throw new Error(response.error?.message || "Failed to delete profile");
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
      queryClient.invalidateQueries({ queryKey: queryKeys.myProfiles });
    },
  });
}

// Match Hooks
export function useMatchRequests(type?: "sent" | "received", status?: string) {
  return useQuery({
    queryKey: queryKeys.matchRequests(type, status),
    queryFn: async () => {
      const response = await matchApi.list(type, status);
      if (!response.success || !response.data) {
        throw new Error(response.error?.message || "Failed to fetch match requests");
      }
      return response.data.requests;
    },
  });
}

export function useMatches() {
  return useQuery({
    queryKey: queryKeys.matches,
    queryFn: async () => {
      const response = await matchApi.matches();
      if (!response.success || !response.data) {
        throw new Error(response.error?.message || "Failed to fetch matches");
      }
      return response.data.matches;
    },
  });
}

export function useRequestMatch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      requesterProfileId,
      targetProfileId,
      message,
    }: {
      requesterProfileId: string;
      targetProfileId: string;
      message?: string;
    }) => {
      const response = await matchApi.request(requesterProfileId, targetProfileId, message);
      if (!response.success) {
        throw new Error(response.error?.message || "Failed to request match");
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matchRequests"] });
    },
  });
}

export function useAcceptMatch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await matchApi.accept(id);
      if (!response.success) {
        throw new Error(response.error?.message || "Failed to accept match");
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matchRequests"] });
      queryClient.invalidateQueries({ queryKey: queryKeys.matches });
    },
  });
}

export function useRejectMatch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await matchApi.reject(id);
      if (!response.success) {
        throw new Error(response.error?.message || "Failed to reject match");
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matchRequests"] });
    },
  });
}

export function useCancelMatch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await matchApi.cancel(id);
      if (!response.success) {
        throw new Error(response.error?.message || "Failed to cancel match");
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matchRequests"] });
    },
  });
}

// Prefetch Hook
export function usePrefetchProfile() {
  const queryClient = useQueryClient();

  return useCallback(
    (id: string) => {
      queryClient.prefetchQuery({
        queryKey: queryKeys.profile(id),
        queryFn: async () => {
          const response = await profileApi.get(id);
          if (!response.success || !response.data) {
            throw new Error(response.error?.message || "Failed to fetch profile");
          }
          return response.data.profile;
        },
        staleTime: 1000 * 60 * 5, // 5분
      });
    },
    [queryClient]
  );
}
