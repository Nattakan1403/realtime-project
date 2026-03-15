"use client";

import BaseCard from "@/app/components/base/Card/BaseCard";
import CardLayout from "@/app/components/layouts/staff/CardLayout";
import MonitorHeader from "@/app/components/layouts/staff/MonitorHeader";
import CardHeaderMonitor from "@/app/components/sections/CardHeaderMonitor";
import FieldDisplay from "@/app/components/sections/FieldDisplay";
import { PATIENT_FORM_LABELS } from "@/app/constants/patient-form-constants";
import { PatientResponse } from "@/app/interfaces/patient-response";
import { getColorBgStatus } from "@/app/lib/getColor";
import { supabase } from "@/app/lib/supabase";
import { useEffect, useState } from "react";

export default function Page() {
  const [forms, setForms] = useState<PatientResponse[]>([]);
  const [typingData, setTypingData] = useState<
    Record<string, Partial<PatientResponse>>
  >({});

  const total = forms?.length;
  const totalActive = forms.filter((e) => e.status === "active").length;
  const totalInActive = forms.filter((e) => e.status === "inactive").length;
  const totalSubmited = forms.filter((e) => e.status === "submitted").length;

  const getTyping = (status: string, typing: string | undefined) => {
    return status === "active" ? typing : undefined;
  };

  useEffect(() => {
    const fetchForms = async () => {
      const { data } = await supabase
        .from("patient_forms")
        .select("*")
        .order("created_at", { ascending: false });

      setForms(data || []);
    };

    fetchForms();

    /* ===== database realtime ===== */

    const dbChannel = supabase
      .channel("admin-db")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "patient_forms",
        },
        () => {
          fetchForms();
        },
      )
      .subscribe();

    /* ===== typing realtime ===== */

    const typingChannel = supabase
      .channel("patient-typing")
      .on("broadcast", { event: "typing" }, (payload) => {
        const { formId, values } = payload.payload;

        setTypingData((prev) => ({
          ...prev,
          [formId]: values,
        }));
      })
      .subscribe();

    return () => {
      supabase.removeChannel(dbChannel);
      supabase.removeChannel(typingChannel);
    };
  }, []);

  return (
    <main className="p-10">
      <MonitorHeader
        total={total}
        totalActive={totalActive}
        totalInactive={totalInActive}
        totalSubmit={totalSubmited}
      />

      <CardLayout>
        {forms.map((form) => {
          const realtime = typingData[form.id] || {};
          return (
            <BaseCard
              key={form.id}
              className={`border-2 p-4 mb-4 shadow-lg!
                ${getColorBgStatus(form.status)}
                ${form.status !== "inactive" && "hover:scale-102 duration-100 hover:cursor-pointer"}`}
            >
              <CardHeaderMonitor
                status={form.status}
                lastActive={form.last_activity}
              />

              <FieldDisplay
                typing={getTyping(form.status, realtime.typing_field)}
                realtimeValue={realtime.first_name}
                dbValue={form.first_name}
                fieldName={PATIENT_FORM_LABELS.FNAME.NAME}
                label={PATIENT_FORM_LABELS.FNAME.LABEL}
              />

              <FieldDisplay
                typing={getTyping(form.status, realtime.typing_field)}
                realtimeValue={realtime.last_name}
                dbValue={form.last_name}
                fieldName={PATIENT_FORM_LABELS.LNAME.NAME}
                label={PATIENT_FORM_LABELS.LNAME.LABEL}
              />
            </BaseCard>
          );
        })}
      </CardLayout>
    </main>
  );
}
