import { redirect } from "next/navigation";

export default function NotFoundCatchAll() {
  redirect("/patient-form");
}
