const API_BASE_URL = "/api";

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  const data = await response.json();
  return data;
}

// 인증 API
export const authApi = {
  login: async (email: string) => {
    return apiRequest<{ user?: any; token?: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },
  guest: async () => {
    return apiRequest<{ user?: any; token?: string }>("/auth/guest", {
      method: "POST",
    });
  },
  logout: async () => {
    return apiRequest("/auth/logout", {
      method: "POST",
    });
  },
  me: async () => {
    return apiRequest<{ user: any }>("/auth/me");
  },
};

// 프로필 API
export interface ProfileFilters {
  minAge?: number;
  maxAge?: number;
  smoking?: string;
}

export const profileApi = {
  list: async (page = 1, limit = 20, filters?: ProfileFilters) => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    if (filters) {
      if (filters.minAge) params.append("minAge", filters.minAge.toString());
      if (filters.maxAge) params.append("maxAge", filters.maxAge.toString());
      if (filters.smoking) params.append("smoking", filters.smoking);
    }
    return apiRequest<{ profiles: any[]; pagination: any }>(`/profiles?${params}`);
  },
  get: async (id: string) => {
    return apiRequest<{ profile: any }>(`/profiles/${id}`);
  },
  create: async (data: any) => {
    return apiRequest<{ profile: any }>("/profiles", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  update: async (id: string, data: any) => {
    return apiRequest<{ profile: any }>(`/profiles/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
  delete: async (id: string) => {
    return apiRequest(`/profiles/${id}`, {
      method: "DELETE",
    });
  },
};

// 마이페이지 API
export const myApi = {
  profiles: async () => {
    return apiRequest<{ profiles: any[] }>("/my/profiles");
  },
};

// 매칭 API
export const matchApi = {
  request: async (requesterProfileId: string, targetProfileId: string, message?: string) => {
    return apiRequest<{ matchRequest: any }>("/match-requests", {
      method: "POST",
      body: JSON.stringify({ requesterProfileId, targetProfileId, message }),
    });
  },
  list: async (type?: "sent" | "received", status?: string) => {
    const params = new URLSearchParams();
    if (type) params.append("type", type);
    if (status) params.append("status", status);
    return apiRequest<{ requests: any[] }>(
      `/match-requests${params.toString() ? `?${params}` : ""}`
    );
  },
  accept: async (id: string) => {
    return apiRequest<{ matchRequest: any; match: any }>(`/match-requests/${id}/accept`, {
      method: "POST",
    });
  },
  reject: async (id: string) => {
    return apiRequest<{ matchRequest: any }>(`/match-requests/${id}/reject`, {
      method: "POST",
    });
  },
  cancel: async (id: string) => {
    return apiRequest<{ matchRequest: any }>(`/match-requests/${id}/cancel`, {
      method: "POST",
    });
  },
  matches: async () => {
    return apiRequest<{ matches: any[] }>("/matches");
  },
};
