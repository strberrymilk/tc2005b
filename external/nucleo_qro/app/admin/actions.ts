"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isRequestStatus } from "@/lib/admin-dashboard";
import { getCurrentUserProfileContext } from "@/lib/auth/profile";
import { createAdminClient } from "@/lib/supabase/admin";

export async function updateSchoolRequestStatus(formData: FormData) {
  const requestId = formData.get("requestId");
  const status = formData.get("status");

  if (typeof requestId !== "string" || typeof status !== "string" || !isRequestStatus(status)) {
    return;
  }

  const { role, user } = await getCurrentUserProfileContext();

  if (!user) {
    redirect("/ingresar");
  }

  if (role !== "admin") {
    redirect("/cuenta");
  }

  const admin = createAdminClient();
  const { error } = await admin
    .from("school_requests")
    .update({
      reviewed_at: new Date().toISOString(),
      reviewed_by: user.id,
      status,
    })
    .eq("id", requestId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
}
