"use client";

import BaseButton from "@/app/components/base/Button/BaseButton";
import BaseCard from "@/app/components/base/Card/BaseCard";
import BaseInputText from "@/app/components/base/Input/BaseInputText";
import Loading from "@/app/components/base/Loading/loading";
import FormLayout from "@/app/components/layouts/patient/FormLayout";
import PatientNavbar from "@/app/components/layouts/patient/PatientNavbar";
import PatientFormSection from "@/app/components/sections/PatientFormSection";
import { PAGE_TITLE } from "@/app/constants/page-title-constants";
import {
  PATIENT_FORM_DEFAULT,
  PATIENT_FORM_LABELS,
} from "@/app/constants/patient-form-constants";
import { PatientForm } from "@/app/interfaces/patient-form";
import { supabase } from "@/app/lib/supabase";
import { updatePatientForm } from "@/app/lib/supabase-service";
import { RealtimeChannel } from "@supabase/supabase-js";
import { useEffect, useRef, useState } from "react";
import { FieldError, useForm } from "react-hook-form";

export default function Page() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<PatientForm>({
    defaultValues: PATIENT_FORM_DEFAULT,
  });

  const [loading, setLoading] = useState(false);

  const values = watch();

  const channelRef = useRef<RealtimeChannel | null>(null);
  const formIdRef = useRef<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const creatingRef = useRef(false);
  const typingFields = useRef<string | null>(null);

  const PATIENT_INFO_FIELDS = [
    PATIENT_FORM_LABELS.FNAME,
    PATIENT_FORM_LABELS.MNAME,
    PATIENT_FORM_LABELS.LNAME,
    PATIENT_FORM_LABELS.DATE_OF_BIRTH,
    PATIENT_FORM_LABELS.GENDER,
    PATIENT_FORM_LABELS.ADDRESS,
    PATIENT_FORM_LABELS.PREFERRED_LANGUAGE,
    PATIENT_FORM_LABELS.NATIONALITY,
    PATIENT_FORM_LABELS.RELIGION,
    PATIENT_FORM_LABELS.PHONE,
    PATIENT_FORM_LABELS.EMAIL,
  ];

  const PATIENT_EMERGENCY_FIELDS = [
    PATIENT_FORM_LABELS.EMERGENCY_FNAME,
    PATIENT_FORM_LABELS.EMERGENCY_MNAME,
    PATIENT_FORM_LABELS.EMERGENCY_LNAME,
    PATIENT_FORM_LABELS.EMERGENCY_RELATION,
  ];

  const PATIENT_FORM = [
    {
      title: PATIENT_FORM_LABELS.TITLE_INFO,
      fields: PATIENT_INFO_FIELDS,
    },
    {
      title: PATIENT_FORM_LABELS.TITLE_EMERGENCY,
      fields: PATIENT_EMERGENCY_FIELDS,
    },
  ];

  const patientLayout = (name: string) => {
    switch (name) {
      case "firstName":
      case "middleName":
      case "lastName":
        return "col-span-2";
      default:
        return "col-span-1";
    }
  };

  /* ==== create channel when first render ==== */
  useEffect(() => {
    channelRef.current = supabase.channel("patient-typing");
    channelRef.current.subscribe();

    return () => {
      if (channelRef.current) supabase.removeChannel(channelRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isDirty) return;
    handleTyping();
  }, [values, isDirty]);

  const handleTyping = async () => {
    // create form first time
    if (!formIdRef.current && !creatingRef.current) {
      creatingRef.current = true;
      await onCreate();
    }

    if (!formIdRef.current) return;

    // realtime typing
    onRealtimeTyping();

    // debounce autosave
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      onAutoSave();
    }, 5000);
  };

  const onCreate = async () => {
    const { data } = await supabase
      .from("patient_forms")
      .insert({ status: "active" })
      .select()
      .single();

    formIdRef.current = data.id;
  };

  const onRealtimeTyping = () => {
    if (channelRef.current) {
      channelRef.current.send({
        type: "broadcast",
        event: "typing",
        payload: {
          formId: formIdRef.current,
          values: {
            first_name: values.firstName,
            middle_name: values.middleName,
            last_name: values.lastName,
            date_of_birth: values.dateOfBirth || null,
            gender: values.gender,
            phone: values.phone,
            email: values.email,
            address: values.address,
            preferred_language: values.preferredLanguage,
            nationality: values.nationality,
            religion: values.religion,
            emergency_first_name: values.emergencyFirstName,
            emergency_middle_name: values.emergencyMiddleName,
            emergency_last_name: values.emergencyLastName,
            emergency_relation: values.emergencyRelation,
            typing_field: typingFields.current,
            status: "active",
          },
        },
      });
    }
  };

  const onAutoSave = async () => {
    const id = formIdRef.current;
    if (!id) return;
    const status = "active";
    await updatePatientForm({ id, values, status });
  };

  const onSubmit = async (data: PatientForm) => {
    const id = formIdRef.current;
    if (!id) return;
    const status = "submitted";
    setLoading(true);
    await updatePatientForm({ id, values: data, status });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <main>
      <PatientNavbar pageTitle={PAGE_TITLE.PATIENT_FORM} />

      {loading && <Loading />}
      {!loading && (
        <FormLayout onSubmit={handleSubmit(onSubmit)}>
          {PATIENT_FORM.map((section, index) => (
            <BaseCard key={index}>
              <PatientFormSection title={section.title}>
                {section.fields.map((field) => (
                  <BaseInputText<PatientForm>
                    key={field.NAME}
                    label={field.LABEL}
                    name={field.NAME}
                    register={register}
                    rules={{
                      required: field.VALIDATE_MESSAGE || false,
                    }}
                    error={errors[field.NAME] as FieldError}
                    placeholder={field.PLACEHOLDER}
                    className={patientLayout(field.NAME)}
                    onFocus={() => (typingFields.current = field.NAME)}
                    onBlur={() => (typingFields.current = null)}
                  />
                ))}
              </PatientFormSection>
            </BaseCard>
          ))}

          <BaseButton type="submit">ส่งข้อมูล</BaseButton>
        </FormLayout>
      )}
    </main>
  );
}
