const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ||
  "https://volunteer-app-backend-8f8p.onrender.com/api";

function normalizeUser(user) {
  if (!user || typeof user !== "object") return user;
  return { ...user, id: user.id ?? user._id };
}

function normalizeOpportunity(opportunity) {
  if (!opportunity || typeof opportunity !== "object") return opportunity;

  const organizerReference = opportunity.organizer ?? opportunity.organizerId;
  const organizer = typeof organizerReference === "object"
    ? normalizeUser(organizerReference)
    : null;
  const totalSpots = opportunity.totalSpots ?? opportunity.slots ?? 0;

  return {
    ...opportunity,
    id: opportunity.id ?? opportunity._id,
    organizerId: organizer?.id ?? organizerReference,
    organizer,
    totalSpots,
    spotsAvailable: opportunity.spotsAvailable ?? opportunity.slotsAvailable ?? opportunity.availableSlots ?? opportunity.remainingSlots ?? null,
    schedule: opportunity.schedule ?? opportunity.shiftSchedule ?? "Schedule to be confirmed",
    tagline: opportunity.tagline ?? "",
  };
}

function normalizeApplication(application) {
  if (!application || typeof application !== "object") return application;

  const opportunityReference = application.opportunityId ?? application.opportunity;
  const volunteerReference = application.volunteerId ?? application.volunteer;
  const volunteer = typeof volunteerReference === "object"
    ? normalizeUser(volunteerReference)
    : null;

  return {
    ...application,
    id: application.id ?? application._id,
    opportunityId: typeof opportunityReference === "object"
      ? opportunityReference.id ?? opportunityReference._id
      : opportunityReference,
    volunteerId: volunteer ?? volunteerReference,
    volunteerName: application.volunteerName ?? volunteer?.fullName,
  };
}

async function request(path, { method = "GET", body } = {}) {
  const headers = {};
  const token = localStorage.getItem("token");

  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    });
    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        success: false,
        message: payload?.message || `Request failed (${response.status}).`,
        data: null,
      };
    }

    if (payload && typeof payload === "object" && "success" in payload) return payload;
    return { success: true, message: "OK", data: payload };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Unable to reach the API.",
      data: null,
    };
  }
}

function mapOpportunityPayload(payload) {
  const fields = { ...payload };
  const totalSpots = fields.totalSpots;
  delete fields.totalSpots;
  delete fields.organizerId;
  return { ...fields, ...(totalSpots === undefined ? {} : { slots: totalSpots }) };
}

function unwrapOpportunity(result) {
  if (result.success) result.data = normalizeOpportunity(result.data?.opportunity ?? result.data);
  return result;
}

export async function register(payload) {
  return request("/auth/register", { method: "POST", body: payload });
}

export async function login(credentials) {
  const result = await request("/auth/login", { method: "POST", body: credentials });
  if (!result.success) return result;

  const data = result.data?.data ?? result.data ?? {};
  return {
    ...result,
    data: {
      ...data,
      token: data.token ?? result.token,
      user: normalizeUser(data.user ?? result.user),
    },
  };
}

export async function getMe() {
  const result = await request("/auth/me");
  if (result.success) result.data = normalizeUser(result.data?.user ?? result.data);
  return result;
}

export async function getOpportunities({ search = "", category = "", page = 1, limit = 10 } = {}) {
  const params = new URLSearchParams({ search, category, page: String(page), limit: String(limit) });
  const result = await request(`/opportunities?${params}`);
  if (!result.success) return result;

  const data = result.data || {};
  const items = Array.isArray(data)
    ? data
    : data.opportunities ?? data.items ?? [];
  const pagination = data.pagination || {};

  return {
    ...result,
    data: {
      ...pagination,
      items: items.map(normalizeOpportunity),
      total: pagination.total ?? data.total ?? items.length,
      page: pagination.page ?? data.page ?? page,
      limit: pagination.limit ?? data.limit ?? limit,
    },
  };
}

export async function getOpportunityById(id) {
  return unwrapOpportunity(await request(`/opportunities/${encodeURIComponent(id)}`));
}

export async function createOpportunity(payload) {
  return unwrapOpportunity(await request("/opportunities", {
    method: "POST",
    body: mapOpportunityPayload(payload),
  }));
}

export async function updateOpportunity(id, payload) {
  return unwrapOpportunity(await request(`/opportunities/${encodeURIComponent(id)}`, {
    method: "PUT",
    body: mapOpportunityPayload(payload),
  }));
}

export async function deleteOpportunity(id) {
  return request(`/opportunities/${encodeURIComponent(id)}`, { method: "DELETE" });
}

export async function applyToOpportunity(opportunityId) {
  const result = await request(`/opportunities/${encodeURIComponent(opportunityId)}/apply`, {
    method: "POST",
  });
  if (result.success) result.data = normalizeApplication(result.data?.application ?? result.data);
  return result;
}

async function getApplications(path) {
  const result = await request(path);
  if (!result.success) return result;

  const data = result.data || {};
  const applications = Array.isArray(data)
    ? data
    : data.applications ?? data.items ?? [];
  return { ...result, data: applications.map(normalizeApplication) };
}

export async function getMyApplications() {
  return getApplications("/applications/my");
}

export async function getOpportunityApplications(opportunityId) {
  return getApplications(`/opportunities/${encodeURIComponent(opportunityId)}/applications`);
}

export async function updateApplicationStatus(applicationId, status) {
  const result = await request(`/applications/${encodeURIComponent(applicationId)}/status`, {
    method: "PUT",
    body: { status },
  });
  if (result.success) result.data = normalizeApplication(result.data?.application ?? result.data);
  return result;
}

async function getOrganizerList(path) {
  const result = await request(path);
  if (!result.success) return result;

  const data = result.data || {};
  const organizers = Array.isArray(data) ? data : data.organizers ?? [];
  return { ...result, data: organizers.map(normalizeUser) };
}

export async function getOrganizers() {
  return getOrganizerList("/admin/organizers");
}

export async function getPendingOrganizers() {
  return getOrganizerList("/admin/organizers/pending");
}

export async function verifyOrganizer(id) {
  return request(`/admin/organizers/${encodeURIComponent(id)}/verify`, { method: "PUT" });
}

export async function rejectOrganizer(id) {
  return request(`/admin/organizers/${encodeURIComponent(id)}/reject`, { method: "PUT" });
}