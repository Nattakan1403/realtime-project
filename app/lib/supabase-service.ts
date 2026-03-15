import { PatientForm } from "../interfaces/patient-form";
import { supabase } from "./supabase";

export const updatePatientForm = async ({
  id,
  values,
  status,
}: {
  id: string;
  values: PatientForm;
  status: string;
}) => {
  await supabase
    .from("patient_forms")
    .update({
      last_activity: new Date(),
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
      status: status,
    })
    .eq("id", id);
};
