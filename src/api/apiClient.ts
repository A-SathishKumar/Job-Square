/**
 * Enterprise API Client for Job Square Platform
 * Features credentials transmission, error normalization, and response typing.
 */

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  [key: string]: any;
}

class ApiClient {
  private baseUrl = '/api';

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    // Retrieve any client-stored token for authorization fallback
    const token = typeof window !== 'undefined' ? localStorage.getItem('js_auth_token') : null;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {})
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include' // Sends HTTP-only cookie automatically
    });

    const data = await response.json().catch(() => ({
      success: false,
      message: 'Failed to parse response payload.'
    }));

    if (!response.ok) {
      const errorMsg = data.message || `Request failed with status ${response.status}`;
      throw new Error(errorMsg);
    }

    return data as T;
  }

  // Practices
  public getPractices() {
    return this.request<{ success: boolean; practices: any[] }>('/practices');
  }

  public getPractice(slug: string) {
    return this.request<{ success: boolean; practice: any }>(`/practices/${slug}`);
  }

  // Case Studies
  public getCaseStudies(category?: string) {
    const q = category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : '';
    return this.request<{ success: boolean; caseStudies: any[] }>(`/practices/case-studies${q}`);
  }

  // Whitepapers
  public getWhitepapers() {
    return this.request<{ success: boolean; whitepapers: any[] }>('/practices/whitepapers');
  }

  public downloadWhitepaper(slug: string) {
    return this.request<{ success: boolean; downloadUrl: string; whitepaper: any }>(
      `/practices/whitepapers/${slug}/download`,
      { method: 'POST' }
    );
  }

  // Consultations & Advisory Booking
  public createConsultation(bookingData: {
    fullName: string;
    corporateEmail: string;
    organizationName: string;
    headcountScope: string;
    primaryInterest: string;
    notes: string;
  }) {
    return this.request<{
      success: boolean;
      message: string;
      referenceCode: string;
      consultation: any;
    }>('/consultations', {
      method: 'POST',
      body: JSON.stringify(bookingData)
    });
  }

  public getConsultations(filters?: { status?: string; primaryInterest?: string; search?: string }) {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.primaryInterest) params.append('primaryInterest', filters.primaryInterest);
    if (filters?.search) params.append('search', filters.search);
    const qs = params.toString() ? `?${params.toString()}` : '';

    return this.request<{ success: boolean; consultations: any[] }>(`/consultations${qs}`);
  }

  public updateConsultation(id: string, updates: { status?: string; assignedPartnerName?: string }) {
    return this.request<{ success: boolean; consultation: any }>(`/consultations/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates)
    });
  }

  // Authentication
  public login(credentials: { email: string; password: string }) {
    return this.request<{ success: boolean; user: any; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  }

  public register(payload: { name: string; email: string; password: string; role?: string; title?: string }) {
    return this.request<{ success: boolean; user: any; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }

  public getMe() {
    return this.request<{ success: boolean; user: any }>('/auth/me');
  }

  public logout() {
    return this.request<{ success: boolean; message: string }>('/auth/logout', {
      method: 'POST'
    });
  }
}

export const apiClient = new ApiClient();
export default apiClient;
