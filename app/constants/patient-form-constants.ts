import { PatientForm } from "../interfaces/patient-form";

export const PATIENT_FORM_LABELS = {
  // ==== title ====
  TITLE_INFO: "ข้อมูลส่วนตัว",
  TITLE_EMERGENCY: "ข้อมูลผู้ติดต่อฉุกเฉิน",

  // ==== ข้อมูลส่วนตัว ====
  FNAME: {
    LABEL: "ชื่อ",
    NAME: "firstName",
    PLACEHOLDER: "ชื่อจริง",
    VALIDATE_MESSAGE: "กรุณากรอกชื่อ",
  },
  MNAME: {
    LABEL: "ชื่อกลาง",
    NAME: "middleName",
    PLACEHOLDER: "",
    VALIDATE_MESSAGE: "",
  },
  LNAME: {
    LABEL: "นามสกุล",
    NAME: "lastName",
    PLACEHOLDER: "",
    VALIDATE_MESSAGE: "",
  },
  DATE_OF_BIRTH: {
    LABEL: "วันเดือนปีเกิด",
    NAME: "dateOfBirth",
    PLACEHOLDER: "",
    VALIDATE_MESSAGE: "",
  },
  GENDER: {
    LABEL: "เพศ",
    NAME: "gender",
    PLACEHOLDER: "",
    VALIDATE_MESSAGE: "",
  },
  PHONE: {
    LABEL: "เบอร์โทรศัพท์",
    NAME: "phone",
    PLACEHOLDER: "",
    VALIDATE_MESSAGE: "",
  },
  EMAIL: {
    LABEL: "อีเมล",
    NAME: "email",
    PLACEHOLDER: "",
    VALIDATE_MESSAGE: "",
  },
  ADDRESS: {
    LABEL: "ที่อยู่",
    NAME: "address",
    PLACEHOLDER: "",
    VALIDATE_MESSAGE: "",
  },
  PREFERRED_LANGUAGE: {
    LABEL: "ภาษาที่ใช้สื่อสาร",
    NAME: "preferredLanguage",
    PLACEHOLDER: "",
    VALIDATE_MESSAGE: "",
  },
  NATIONALITY: {
    LABEL: "สัญชาติ",
    NAME: "nationality",
    PLACEHOLDER: "",
    VALIDATE_MESSAGE: "",
  },
  RELIGION: {
    LABEL: "ศาสนา",
    NAME: "religion",
    PLACEHOLDER: "",
    VALIDATE_MESSAGE: "",
  },

  // ==== ผู้ติดต่อฉุกเฉิน ====
  EMERGENCY_FNAME: {
    LABEL: "ชื่อผู้ติดต่อฉุกเฉิน",
    NAME: "emergencyFirstName",
    PLACEHOLDER: "",
    VALIDATE_MESSAGE: "",
  },
  EMERGENCY_MNAME: {
    LABEL: "ชื่อกลาง",
    NAME: "emergencyMiddleName",
    PLACEHOLDER: "",
    VALIDATE_MESSAGE: "",
  },
  EMERGENCY_LNAME: {
    LABEL: "นามสกุล",
    NAME: "emergencyLastName",
    PLACEHOLDER: "",
    VALIDATE_MESSAGE: "",
  },
  EMERGENCY_RELATION: {
    LABEL: "ความสัมพันธ์",
    NAME: "emergencyRelation",
    PLACEHOLDER: "",
    VALIDATE_MESSAGE: "",
  },
} as const;

export const PATIENT_FORM_DEFAULT: PatientForm = {
  firstName: "",
  middleName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
  phone: "",
  email: "",
  address: "",
  preferredLanguage: "",
  nationality: "",
  religion: "",
  emergencyFirstName: "",
  emergencyMiddleName: "",
  emergencyLastName: "",
  emergencyRelation: "",
};
