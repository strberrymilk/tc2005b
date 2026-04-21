import {
  formatRequestStatusLabel,
  type RequestStatus,
} from "@/lib/admin-dashboard";

const statusClasses: Record<RequestStatus, string> = {
  approved: "bg-success text-success-content",
  pending: "bg-warning text-warning-content",
  rejected: "bg-error text-error-content",
  reviewing: "bg-info text-info-content",
};

export default function StatusBadge({ status }: { status: RequestStatus }) {
  return (
    <span className={`badge rounded-md border-0 px-3 py-3 font-semibold ${statusClasses[status]}`}>
      {formatRequestStatusLabel(status)}
    </span>
  );
}
