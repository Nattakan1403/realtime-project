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
    PLACEHOLDER: "ชื่อกลาง (ถ้ามี)",
    VALIDATE_MESSAGE: "",
  },
  LNAME: {
    LABEL: "นามสกุล",
    NAME: "lastName",
    PLACEHOLDER: "นามสกุล",
    VALIDATE_MESSAGE: "กรุณากรอกนามสกุล",
  },
  DATE_OF_BIRTH: {
    LABEL: "วันเดือนปีเกิด",
    NAME: "dateOfBirth",
    PLACEHOLDER: "วว/ดด/ปปปป",
    VALIDATE_MESSAGE: "กรุณากรอกวันเดือนปีเกิด",
  },
  GENDER: {
    LABEL: "เพศ",
    NAME: "gender",
    PLACEHOLDER: "เพศ",
    VALIDATE_MESSAGE: "กรุณากรอกเพศ",
  },
  PHONE: {
    LABEL: "เบอร์โทรศัพท์",
    NAME: "phone",
    PLACEHOLDER: "เบอร์โทรศัพท์",
    VALIDATE_MESSAGE: "กรุณากรอกเบอร์โทรศัพท์",
  },
  EMAIL: {
    LABEL: "อีเมล์",
    NAME: "email",
    PLACEHOLDER: "อีเมล์",
    VALIDATE_MESSAGE: "กรุณากรอกอีเมล์",
  },
  ADDRESS: {
    LABEL: "ที่อยู่",
    NAME: "address",
    PLACEHOLDER: "ที่อยู่",
    VALIDATE_MESSAGE: "กรุณากรอกที่อยู่",
  },
  PREFERRED_LANGUAGE: {
    LABEL: "ภาษาที่ใช้สื่อสาร",
    NAME: "preferredLanguage",
    PLACEHOLDER: "ภาษาที่ใช้สื่อสาร",
    VALIDATE_MESSAGE: "กรุณากรอกภาษาที่ใช้สื่อสาร",
  },
  NATIONALITY: {
    LABEL: "สัญชาติ",
    NAME: "nationality",
    PLACEHOLDER: "สัญชาติ",
    VALIDATE_MESSAGE: "กรุณากรอกสัญชาติ",
  },
  RELIGION: {
    LABEL: "ศาสนา",
    NAME: "religion",
    PLACEHOLDER: "ศาสนา",
    VALIDATE_MESSAGE: "",
  },

  // ==== ผู้ติดต่อฉุกเฉิน ====
  EMERGENCY_FNAME: {
    LABEL: "ชื่อผู้ติดต่อฉุกเฉิน",
    NAME: "emergencyFirstName",
    PLACEHOLDER: "ชื่อผู้ติดต่อฉุกเฉิน",
    VALIDATE_MESSAGE: "",
  },
  EMERGENCY_MNAME: {
    LABEL: "ชื่อกลาง",
    NAME: "emergencyMiddleName",
    PLACEHOLDER: "ชื่อกลางผู้ติดต่อฉุกเฉิน",
    VALIDATE_MESSAGE: "",
  },
  EMERGENCY_LNAME: {
    LABEL: "นามสกุล",
    NAME: "emergencyLastName",
    PLACEHOLDER: "นามสกุลผู้ติดต่อฉุกเฉิน",
    VALIDATE_MESSAGE: "",
  },
  EMERGENCY_RELATION: {
    LABEL: "ความสัมพันธ์",
    NAME: "emergencyRelation",
    PLACEHOLDER: "ความสัมพันธ์",
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
