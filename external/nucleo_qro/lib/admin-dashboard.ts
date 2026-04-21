import type { AppRole } from "@/lib/auth/profile";

export type RequestStatus = "approved" | "pending" | "rejected" | "reviewing";

export type SchoolRequestRecord = {
  age: number | null;
  city: string;
  created_at: string;
  email: string;
  first_names: string;
  gender: string;
  id: string;
  last_names: string;
  motivation: string;
  reviewed_at?: string | null;
  school_address: string;
  status: RequestStatus;
};

export type ChartDatum = {
  label: string;
  value: number;
};

export type DashboardMetrics = {
  ageBuckets: ChartDatum[];
  pendingByCity: ChartDatum[];
  pendingByGender: ChartDatum[];
  pendingGenderTotal: number;
  recentPendingCount: number;
  sourceLabel: string;
  topMotivationWords: ChartDatum[];
  totalActiveCities: number;
  totalPending: number;
  totalRequests: number;
  totalReviewed: number;
  totalStatuses: ChartDatum[];
};

const STATUS_LABELS: Record<RequestStatus, string> = {
  approved: "Aprobadas",
  pending: "Pendientes",
  rejected: "Rechazadas",
  reviewing: "En revision",
};

const STATUS_ORDER: RequestStatus[] = [
  "pending",
  "reviewing",
  "approved",
  "rejected",
];

const MOTIVATION_STOPWORDS = new Set([
  "a",
  "abrir",
  "al",
  "algo",
  "algunas",
  "algunos",
  "ante",
  "antes",
  "asi",
  "como",
  "con",
  "contra",
  "cual",
  "cuando",
  "de",
  "del",
  "desde",
  "donde",
  "el",
  "ella",
  "ellas",
  "ellos",
  "en",
  "entre",
  "era",
  "eramos",
  "es",
  "esa",
  "esas",
  "ese",
  "eso",
  "esta",
  "estaba",
  "estado",
  "estamos",
  "estan",
  "estar",
  "este",
  "esto",
  "fue",
  "ha",
  "hay",
  "la",
  "las",
  "le",
  "les",
  "lo",
  "los",
  "mas",
  "me",
  "mi",
  "mis",
  "mucho",
  "muy",
  "nucleo",
  "o",
  "otra",
  "otro",
  "para",
  "pero",
  "poder",
  "por",
  "porque",
  "pues",
  "que",
  "queremos",
  "quiero",
  "se",
  "sea",
  "ser",
  "si",
  "sin",
  "sobre",
  "su",
  "sus",
  "tambien",
  "tener",
  "tiene",
  "todo",
  "una",
  "uno",
  "y",
  "ya",
]);

function countValues(values: string[]) {
  const counts = new Map<string, number>();

  values.forEach((value) => {
    const normalizedValue = value.trim();

    if (!normalizedValue) {
      return;
    }

    counts.set(normalizedValue, (counts.get(normalizedValue) ?? 0) + 1);
  });

  return counts;
}

function takeTopEntries(counts: Map<string, number>, limit: number) {
  return [...counts.entries()]
    .sort((left, right) => {
      if (right[1] === left[1]) {
        return left[0].localeCompare(right[0], "es");
      }

      return right[1] - left[1];
    })
    .slice(0, limit)
    .map(([label, value]) => ({ label, value }));
}

function normalizeWord(rawWord: string) {
  return rawWord
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function getAgeBucket(age: number | null) {
  if (!age) {
    return "Sin edad";
  }

  if (age <= 20) {
    return "16-20";
  }

  if (age <= 30) {
    return "21-30";
  }

  if (age <= 40) {
    return "31-40";
  }

  return "41+";
}

export function isRequestStatus(value: string): value is RequestStatus {
  return STATUS_ORDER.includes(value as RequestStatus);
}

export function formatRequestStatusLabel(status: RequestStatus) {
  return STATUS_LABELS[status];
}

export function formatRoleLabel(role: AppRole) {
  return role === "admin" ? "Administrador" : "Usuario";
}

export function buildDashboardMetrics(requests: SchoolRequestRecord[]): DashboardMetrics {
  const pendingRequests = requests.filter((request) => request.status === "pending");
  const recentWindowStart = new Date();
  recentWindowStart.setDate(recentWindowStart.getDate() - 7);

  const totalStatuses = STATUS_ORDER.map((status) => ({
    label: STATUS_LABELS[status],
    value: requests.filter((request) => request.status === status).length,
  }));

  const pendingByCity = takeTopEntries(
    countValues(pendingRequests.map((request) => request.city)),
    6,
  );

  const pendingByGender = takeTopEntries(
    countValues(
      pendingRequests.map((request) =>
        request.gender === "prefiero_no_decir"
          ? "Prefiere no decir"
          : request.gender.replaceAll("_", " "),
      ),
    ),
    5,
  );

  const ageBuckets = takeTopEntries(
    countValues(pendingRequests.map((request) => getAgeBucket(request.age))),
    5,
  );

  const motivationSource =
    pendingRequests.length > 0 ? pendingRequests : requests;

  const wordCounts = new Map<string, number>();

  motivationSource.forEach((request) => {
    const words = request.motivation.match(/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+/g) ?? [];

    words.forEach((word) => {
      const normalizedWord = normalizeWord(word);

      if (normalizedWord.length < 4 || MOTIVATION_STOPWORDS.has(normalizedWord)) {
        return;
      }

      wordCounts.set(normalizedWord, (wordCounts.get(normalizedWord) ?? 0) + 1);
    });
  });

  return {
    ageBuckets,
    pendingByCity,
    pendingByGender,
    pendingGenderTotal: pendingRequests.length,
    recentPendingCount: pendingRequests.filter(
      (request) => new Date(request.created_at) >= recentWindowStart,
    ).length,
    sourceLabel:
      pendingRequests.length > 0
        ? "motivos en solicitudes pendientes"
        : "motivos en todas las solicitudes",
    topMotivationWords: takeTopEntries(wordCounts, 10),
    totalActiveCities: new Set(
      pendingRequests.map((request) => request.city.trim()).filter(Boolean),
    ).size,
    totalPending: pendingRequests.length,
    totalRequests: requests.length,
    totalReviewed: requests.filter((request) => request.status !== "pending").length,
    totalStatuses,
  };
}
