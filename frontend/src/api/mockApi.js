// mockApi.js
import { mockUsers, mockOpportunities, mockApplications } from "./mockData";

const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

let users = [...mockUsers];
let opportunities = [...mockOpportunities];
let applications = [...mockApplications];

// Derives spotsAvailable from totalSpots minus approved applications —
// never stored, always computed fresh so it can never go stale.
function withDerivedSpots(opportunity) {
  const approvedCount = applications.filter(
    (a) => a.opportunityId === opportunity.id && a.status === "approved"
  ).length;
  const spotsAvailable = opportunity.totalSpots
    ? Math.max(0, opportunity.totalSpots - approvedCount)
    : null;
  const organizer = users.find((user) => user.id === opportunity.organizerId) || null;
  return { ...opportunity, organizer, spotsAvailable };
}

// ---------- AUTH ----------

export async function register(payload) {
  await delay();
  const { fullName, email, role, cacNumber } = payload;

  const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return { success: false, message: "Email already registered", data: null };
  }

  const newUser = {
    id: `u${users.length + 1}`,
    fullName,
    email,
    role,
    createdAt: new Date().toISOString(),
  };

  if (role === "organizer") {
    newUser.cacNumber = cacNumber || null;
    newUser.cacVerified = false;
  };

  users.push(newUser);
  return { success: true, message: "Registration successful", data: newUser };
}

export async function login({ email }) {
  await delay();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    return { success: false, message: "Invalid email or password", data: null };
  }
  return {
    success: true,
    message: "Login successful",
    data: { token: `mock-jwt-token-for-${user.id}`, user },
  };
}

export async function getMe(userId) {
  await delay();
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return { success: false, message: "User not found", data: null };
  }
  return { success: true, message: "OK", data: user };
}

// ---------- OPPORTUNITIES ----------

export async function getOpportunities({ search = "", category = "", page = 1, limit = 10 } = {}) {
  await delay();
  let results = opportunities.map(withDerivedSpots);

  if (search) {
    results = results.filter((o) => o.title.toLowerCase().includes(search.toLowerCase()));
  }
  if (category) {
    results = results.filter((o) => o.category === category);
  }

  const start = (page - 1) * limit;
  const paginated = results.slice(start, start + limit);

  return {
    success: true,
    message: "OK",
    data: { items: paginated, total: results.length, page, limit },
  };
}

export async function getOpportunityById(id) {
  await delay();
  const opportunity = opportunities.find((o) => o.id === id);
  if (!opportunity) {
    return { success: false, message: "Opportunity not found", data: null };
  }
  return { success: true, message: "OK", data: withDerivedSpots(opportunity) };
}

export async function getOpportunitiesByOrganizer(organizerId) {
  await delay();
  const results = opportunities
    .filter((o) => o.organizerId === organizerId)
    .map(withDerivedSpots);
  return { success: true, message: "OK", data: results };
}

export async function createOpportunity(payload) {
  await delay();
  const newOpportunity = {
    id: `o${opportunities.length + 1}`,
    ...payload,
    createdAt: new Date().toISOString(),
  };
  delete newOpportunity.spotsAvailable; // never stored — always derived
  opportunities.push(newOpportunity);
  return { success: true, message: "Opportunity created", data: withDerivedSpots(newOpportunity) };
}

export async function updateOpportunity(id, payload) {
  await delay();
  const index = opportunities.findIndex((o) => o.id === id);
  if (index === -1) {
    return { success: false, message: "Opportunity not found", data: null };
  }
  const updated = { ...opportunities[index], ...payload };
  delete updated.spotsAvailable;
  opportunities[index] = updated;
  return { success: true, message: "Opportunity updated", data: withDerivedSpots(updated) };
}

export async function deleteOpportunity(id) {
  await delay();
  const index = opportunities.findIndex((o) => o.id === id);
  if (index === -1) {
    return { success: false, message: "Opportunity not found", data: null };
  }
  opportunities.splice(index, 1);
  return { success: true, message: "Opportunity deleted", data: null };
}

// ---------- APPLICATIONS ----------

export async function applyToOpportunity(opportunityId, volunteerId, volunteerName) {
  await delay();
  const newApplication = {
    id: `a${applications.length + 1}`,
    opportunityId,
    volunteerId,
    volunteerName,
    status: "pending",
    appliedAt: new Date().toISOString(),
  };
  applications.push(newApplication);
  return { success: true, message: "Application submitted", data: newApplication };
}

export async function getMyApplications(volunteerId) {
  await delay();
  const results = applications.filter((a) => a.volunteerId === volunteerId);
  return { success: true, message: "OK", data: results };
}

export async function getOpportunityApplications(opportunityId) {
  await delay();
  const results = applications.filter((a) => a.opportunityId === opportunityId);
  return { success: true, message: "OK", data: results };
}

export async function updateApplicationStatus(applicationId, status) {
  await delay();
  const index = applications.findIndex((a) => a.id === applicationId);
  if (index === -1) {
    return { success: false, message: "Application not found", data: null };
  }
  applications[index].status = status;
  return { success: true, message: "Application status updated", data: applications[index] };
}

export async function updateCacVerification(userId, verified) {
  await delay();
  const index = users.findIndex((u) => u.id === userId);
  if (index === -1) {
    return { success: false, message: "User not found", data: null };
  }
  users[index].cacVerified = verified;
  return { success: true, message: "CAC verification updated", data: users[index] };
}

export async function getOrganizers() {
  await delay();
  const results = users.filter((u) => u.role === "organizer");
  return { success: true, message: "OK", data: results };
}
