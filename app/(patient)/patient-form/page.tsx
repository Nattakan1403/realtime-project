"use client";

import BaseButton from "@/app/components/base/Button/BaseButton";
import BaseCard from "@/app/components/base/Card/BaseCard";
import BaseInputText from "@/app/components/base/Input/BaseInputText";
import FormLayout from "@/app/components/layouts/patient/FormLayout";
import PatientNavbar from "@/app/components/layouts/patient/PatientNavbar";
import PatientFormSection from "@/app/components/sections/PatientFormSection";
import { PAGE_TITLE } from "@/app/constants/page-title-constants";
import {
  PATIENT_FORM_DEFAULT,
  PATIENT_FORM_LABELS,
} from "@/app/constants/patient-form-constants";
import { PatientForm } from "@/app/interfaces/patient-form";
import { FieldError, useForm } from "react-hook-form";

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PatientForm>({
    defaultValues: PATIENT_FORM_DEFAULT,
  });

  const onSubmit = (data: PatientForm) => {
    console.log("PATIENT DATA:", data);
  };

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

  return (
    <main>
      <PatientNavbar pageTitle={PAGE_TITLE.PATIENT_FORM} />

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
                    required: {
                      value: field.VALIDATE_MESSAGE ? true : false,
                      message: field.VALIDATE_MESSAGE,
                    },
                  }}
                  error={errors[field.NAME] as FieldError}
                  placeholder={field.PLACEHOLDER}
                  className={patientLayout(field.NAME)}
                />
              ))}
            </PatientFormSection>
          </BaseCard>
        ))}

        <BaseButton type="submit">ส่งข้อมูล</BaseButton>
      </FormLayout>
    </main>
  );
}
