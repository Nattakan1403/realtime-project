"use client";

import BaseCard from "@/app/components/base/Card/BaseCard";
import Loading from "@/app/components/base/Loading/loading";
import CardLayout from "@/app/components/layouts/staff/CardLayout";
import MonitorHeader from "@/app/components/layouts/staff/MonitorHeader";
import CardHeaderMonitor from "@/app/components/sections/CardHeaderMonitor";
import FieldDisplay from "@/app/components/sections/FieldDisplay";
import { PATIENT_FORM_LABELS } from "@/app/constants/patient-form-constants";
import { PatientResponse } from "@/app/interfaces/patient-response";
import { getColorBgStatus } from "@/app/lib/getColor";
import { getDate } from "@/app/lib/getDate";
import { supabase } from "@/app/lib/supabase";
import { useEffect, useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [forms, setForms] = useState<PatientResponse[]>([]);
  const [filterForms, setFilterForms] = useState<PatientResponse[]>([]);
  const [typingData, setTypingData] = useState<
    Record<string, Partial<PatientResponse>>
  >({});
  const [moreDtailId, setMoreDtailId] = useState<string | null>(null);

  const total = forms?.length;
  const totalActive = forms.filter((e) => e.status === "active").length;
  const totalInActive = forms.filter((e) => e.status === "inactive").length;
  const totalSubmited = forms.filter((e) => e.status === "submitted").length;

  const getTyping = (status: string, typing: string | undefined) => {
    return status === "active" ? typing : undefined;
  };

  const filterData = async (status: string) => {
    setLoading(true);
    if (!status) {
      setFilterForms(forms);
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from("patient_forms")
      .select("*")
      .order("created_at", { ascending: false })
      .eq("status", status);

    setFilterForms(data || []);
    setLoading(false);
  };

  const onClick = (id: string) => {
    if (id === moreDtailId) {
      setMoreDtailId(null);
    } else {
      setMoreDtailId(id);
    }
  };

  useEffect(() => {
    const fetchForms = async () => {
      const { data } = await supabase
        .from("patient_forms")
        .select("*")
        .order("created_at", { ascending: false });

      setForms(data || []);
      setFilterForms(data || []);
      setLoading(false);
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
    <main className="py-6 px-10">
      <MonitorHeader
        total={total}
        totalActive={totalActive}
        totalInactive={totalInActive}
        totalSubmit={totalSubmited}
        onFilterData={filterData}
      />

      {loading && <Loading />}

      {!loading && (
        <CardLayout>
          {filterForms?.map((form) => {
            const realtime = typingData[form.id] || {};
            const status = realtime.status || form.status;
            return (
              <BaseCard
                key={`${form.id}-${moreDtailId}`}
                className={`border-2 p-4 shadow-lg! w-full hover:scale-102 duration-300 transition-all hover:cursor-pointer
                ${form.id === moreDtailId ? "h-189! md:row-span-2! md:col-span-2" : "h-92! col-span-1 row-span-1"}
                ${getColorBgStatus(status)}`}
                onClick={() => onClick(form.id)}
              >
                <CardHeaderMonitor
                  status={status}
                  lastActive={form.last_activity}
                />

                <div
                  className={`flex flex-col gap-4
                    ${
                      form.id === moreDtailId
                        ? "overflow-auto"
                        : "overflow-hidden"
                    }`}
                >
                  <FieldDisplay
                    typing={getTyping(status, realtime.typing_field)}
                    realtimeValue={realtime.first_name}
                    dbValue={form.first_name}
                    fieldName={PATIENT_FORM_LABELS.FNAME.NAME}
                    label={PATIENT_FORM_LABELS.FNAME.LABEL}
                  />

                  <FieldDisplay
                    typing={getTyping(status, realtime.typing_field)}
                    realtimeValue={realtime.middle_name}
                    dbValue={form.middle_name}
                    fieldName={PATIENT_FORM_LABELS.MNAME.NAME}
                    label={PATIENT_FORM_LABELS.MNAME.LABEL}
                  />

                  <FieldDisplay
                    typing={getTyping(status, realtime.typing_field)}
                    realtimeValue={realtime.last_name}
                    dbValue={form.last_name}
                    fieldName={PATIENT_FORM_LABELS.LNAME.NAME}
                    label={PATIENT_FORM_LABELS.LNAME.LABEL}
                  />

                  <div className="flex flex-col gap-4">
                    <FieldDisplay
                      typing={getTyping(status, realtime.typing_field)}
                      realtimeValue={getDate(
                        realtime.date_of_birth || "",
                        false,
                      )}
                      dbValue={getDate(form.date_of_birth, false)}
                      fieldName={PATIENT_FORM_LABELS.DATE_OF_BIRTH.NAME}
                      label={PATIENT_FORM_LABELS.DATE_OF_BIRTH.LABEL}
                    />

                    <FieldDisplay
                      typing={getTyping(status, realtime.typing_field)}
                      realtimeValue={
                        PATIENT_FORM_LABELS.GENDER.OPTION.find(
                          (e) => e.value === realtime.gender,
                        )?.label
                      }
                      dbValue={
                        PATIENT_FORM_LABELS.GENDER.OPTION.find(
                          (e) => e.value === form.gender,
                        )?.label
                      }
                      fieldName={PATIENT_FORM_LABELS.GENDER.NAME}
                      label={PATIENT_FORM_LABELS.GENDER.LABEL}
                    />

                    <FieldDisplay
                      typing={getTyping(status, realtime.typing_field)}
                      realtimeValue={realtime.address}
                      dbValue={form.address}
                      fieldName={PATIENT_FORM_LABELS.ADDRESS.NAME}
                      label={PATIENT_FORM_LABELS.ADDRESS.LABEL}
                    />

                    <FieldDisplay
                      typing={getTyping(status, realtime.typing_field)}
                      realtimeValue={
                        PATIENT_FORM_LABELS.PREFERRED_LANGUAGE.OPTION.find(
                          (e) => e.value === realtime.preferred_language,
                        )?.label
                      }
                      dbValue={
                        PATIENT_FORM_LABELS.PREFERRED_LANGUAGE.OPTION.find(
                          (e) => e.value === form.preferred_language,
                        )?.label
                      }
                      fieldName={PATIENT_FORM_LABELS.PREFERRED_LANGUAGE.NAME}
                      label={PATIENT_FORM_LABELS.PREFERRED_LANGUAGE.LABEL}
                    />

                    <FieldDisplay
                      typing={getTyping(status, realtime.typing_field)}
                      realtimeValue={
                        PATIENT_FORM_LABELS.NATIONALITY.OPTION.find(
                          (e) => e.value === realtime.nationality,
                        )?.label
                      }
                      dbValue={
                        PATIENT_FORM_LABELS.NATIONALITY.OPTION.find(
                          (e) => e.value === form.nationality,
                        )?.label
                      }
                      fieldName={PATIENT_FORM_LABELS.NATIONALITY.NAME}
                      label={PATIENT_FORM_LABELS.NATIONALITY.LABEL}
                    />

                    <FieldDisplay
                      typing={getTyping(status, realtime.typing_field)}
                      realtimeValue={
                        PATIENT_FORM_LABELS.RELIGION.OPTION.find(
                          (e) => e.value === realtime.religion,
                        )?.label
                      }
                      dbValue={
                        PATIENT_FORM_LABELS.RELIGION.OPTION.find(
                          (e) => e.value === form.religion,
                        )?.label
                      }
                      fieldName={PATIENT_FORM_LABELS.RELIGION.NAME}
                      label={PATIENT_FORM_LABELS.RELIGION.LABEL}
                    />

                    <FieldDisplay
                      typing={getTyping(status, realtime.typing_field)}
                      realtimeValue={realtime.phone}
                      dbValue={form.phone}
                      fieldName={PATIENT_FORM_LABELS.PHONE.NAME}
                      label={PATIENT_FORM_LABELS.PHONE.LABEL}
                    />

                    <FieldDisplay
                      typing={getTyping(status, realtime.typing_field)}
                      realtimeValue={realtime.email}
                      dbValue={form.email}
                      fieldName={PATIENT_FORM_LABELS.EMAIL.NAME}
                      label={PATIENT_FORM_LABELS.EMAIL.LABEL}
                    />

                    <FieldDisplay
                      typing={getTyping(status, realtime.typing_field)}
                      realtimeValue={realtime.emergency_first_name}
                      dbValue={form.emergency_first_name}
                      fieldName={PATIENT_FORM_LABELS.EMERGENCY_FNAME.NAME}
                      label={PATIENT_FORM_LABELS.EMERGENCY_FNAME.LABEL}
                    />

                    <FieldDisplay
                      typing={getTyping(status, realtime.typing_field)}
                      realtimeValue={realtime.emergency_middle_name}
                      dbValue={form.emergency_middle_name}
                      fieldName={PATIENT_FORM_LABELS.EMERGENCY_MNAME.NAME}
                      label={PATIENT_FORM_LABELS.EMERGENCY_MNAME.LABEL}
                    />

                    <FieldDisplay
                      typing={getTyping(status, realtime.typing_field)}
                      realtimeValue={realtime.emergency_last_name}
                      dbValue={form.emergency_last_name}
                      fieldName={PATIENT_FORM_LABELS.EMERGENCY_LNAME.NAME}
                      label={PATIENT_FORM_LABELS.EMERGENCY_LNAME.LABEL}
                    />

                    <FieldDisplay
                      typing={getTyping(status, realtime.typing_field)}
                      realtimeValue={
                        PATIENT_FORM_LABELS.EMERGENCY_RELATION.OPTION.find(
                          (e) => e.value === realtime.emergency_relation,
                        )?.label
                      }
                      dbValue={
                        PATIENT_FORM_LABELS.EMERGENCY_RELATION.OPTION.find(
                          (e) => e.value === form.emergency_relation,
                        )?.label
                      }
                      fieldName={PATIENT_FORM_LABELS.EMERGENCY_RELATION.NAME}
                      label={PATIENT_FORM_LABELS.EMERGENCY_RELATION.LABEL}
                    />
                  </div>
                </div>
              </BaseCard>
            );
          })}
        </CardLayout>
      )}
      {filterForms.length === 0 && (
        <p className="flex justify-center items-center h-120 text-gray-500">
          ไม่พบข้อมูล...
        </p>
      )}
    </main>
  );
}
