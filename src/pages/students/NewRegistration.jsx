import { useState, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addressSchema,
  basicDetailsSchema,
  feePaymentSchema,
  parentDetailsSchema,
  previousSchoolSchema,
} from "../../schemas/student.schema";

// ─── React Icons ───────────────────────────────────────────────────────────────
import { FiCheck, FiUpload, FiCamera, FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { MdOutlineAddAPhoto, MdPayments, MdAccountBalance } from "react-icons/md";
import { BsPerson, BsPersonFill, BsShieldFillCheck } from "react-icons/bs";
import { IoHome, IoLocationSharp } from "react-icons/io5";
import { PiStudentFill } from "react-icons/pi";
import { RiReceiptLine, RiFileUserLine, RiBankCardLine } from "react-icons/ri";
import { HiOutlineIdentification } from "react-icons/hi";
// ──────────────────────────────────────────────────────────────────────────────

const schemas = [
  basicDetailsSchema,
  parentDetailsSchema,
  addressSchema,
  previousSchoolSchema,
  feePaymentSchema,
];

const indianStates = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
  "Delhi","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand",
  "Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur",
  "Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan",
  "Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh",
  "Uttarakhand","West Bengal",
];

const inputClass =
  "border rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:border-primary focus:ring-primary h-11 px-4 text-sm placeholder:text-slate-400 w-full";
const selectClass =
  "border appearance-none rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:border-primary focus:ring-primary h-11 px-4 text-sm w-full";
const errorClass = "text-red-500 text-xs mt-1";
const labelClass = "text-sm font-semibold text-slate-700 dark:text-slate-300";

const FieldError = ({ message }) =>
  message ? <p className={errorClass}>{message}</p> : null;

const Field = ({ label, required, error, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className={labelClass}>
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    <FieldError message={error} />
  </div>
);

const steps = [
  { label: "Basic Details",   sub: "Personal & identity info" },
  { label: "Parent Details",  sub: "Father, Mother & Guardian" },
  { label: "Address",         sub: "Current & Permanent" },
  { label: "Previous School", sub: "Academic history" },
  { label: "Fee Payment",     sub: "Admission fees" },
];

/* ─── Step Sidebar ─────────────────────────────────────────────────────────── */
const StepSidebar = ({ currentStep }) => (
  <div className="col-span-12 lg:col-span-3 sticky top-24 self-start">
    <div className="bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800 rounded-xl p-4">
      <div className="flex flex-col gap-0">
        {steps.map((step, i) => {
          const completed = i < currentStep;
          const active    = i === currentStep;
          const isLast    = i === steps.length - 1;
          return (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`size-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  completed ? "bg-success text-white"
                  : active  ? "bg-primary text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                }`}>
                  {completed ? <FiCheck size={14} /> : i + 1}
                </div>
                {!isLast && (
                  <div className={`w-[2px] h-12 ${
                    completed ? "bg-success/30"
                    : active  ? "bg-primary/30"
                    : "bg-slate-100 dark:bg-slate-800"
                  }`} />
                )}
              </div>
              <div className="pt-1">
                <p className={`font-bold text-sm leading-tight ${
                  completed ? "text-success"
                  : active  ? "text-primary"
                  : "text-slate-500 dark:text-slate-400"
                }`}>{step.label}</p>
                <p className="text-slate-400 text-xs mt-1">{step.sub}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════════
   STEP 1 — BASIC DETAILS
   Order: Registration No. → Student Name → DOB → Class → Section →
   Gender → Blood Group → Aadhar No. → PEN No. → Mobile No. →
   Religion → Nationality → Category → Right to Education →
   BPL Student → BPL Card No. → Person with Disability →
   Identification Mark → Weight → Height → BMI → COVID Vaccination
═══════════════════════════════════════════════════════════════════════════════ */
const BasicDetailsForm = ({ form }) => {
  const { register, watch, formState: { errors } } = form;
  const weight = watch("weight");
  const height = watch("height");
  const bmi =
    weight && height && Number(height) > 0
      ? (Number(weight) / Math.pow(Number(height) / 100, 2)).toFixed(1)
      : "";

  return (
    <div className="bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
      <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 border-b border-slate-200 dark:border-slate-800">
        <h2 className="text-[#0d141b] dark:text-white text-lg font-bold">Step 1: Basic Details</h2>
      </div>

      <div className="p-8 space-y-8">

        {/* Photo Upload */}
        <div className="flex items-center gap-8">
          <div className="relative group cursor-pointer">
            <div className="size-28 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center overflow-hidden">
              <MdOutlineAddAPhoto className="text-slate-400 text-4xl group-hover:hidden" />
              <p className="text-[10px] text-slate-400 font-medium group-hover:hidden px-2 text-center mt-1">UPLOAD PHOTO</p>
              <div className="hidden group-hover:flex absolute inset-0 bg-primary/80 items-center justify-center transition-all">
                <FiUpload className="text-white text-3xl" />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Student Portrait</h3>
            <p className="text-xs text-slate-400 max-w-sm">Upload a high-quality portrait (JPEG/PNG, max 2MB). Used for Student ID card.</p>
            <button type="button" className="mt-3 text-primary text-sm font-bold hover:underline flex items-center gap-1.5">
              <FiCamera className="text-base" />
              Take Photo via Webcam
            </button>
          </div>
        </div>

        <hr className="border-slate-100 dark:border-slate-800" />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-5">

          {/* 1 */}
          <Field label="Registration No." required error={errors.registrationNo?.message}>
            <input {...register("registrationNo")} className={inputClass} placeholder="e.g. REG-2024-001" type="text" />
          </Field>

          {/* 2 */}
          <Field label="Student Name" required error={errors.fullName?.message}>
            <input {...register("fullName")} className={inputClass} placeholder="e.g. Johnathan Doe" type="text" />
          </Field>

          {/* 3 */}
          <Field label="DOB (Date of Birth)" required error={errors.dateOfBirth?.message}>
            <input {...register("dateOfBirth")} className={inputClass} type="date" />
          </Field>

          {/* 4 */}
          <Field label="Class / Grade" required error={errors.classGrade?.message}>
            <select {...register("classGrade")} className={selectClass}>
              <option value="">Select Class</option>
              {[1,2,3,4,5,6,7,8,9,10].map(g => <option key={g} value={g}>Grade {g}</option>)}
            </select>
          </Field>

          {/* 5 */}
          <Field label="Section" error={errors.section?.message}>
            <select {...register("section")} className={selectClass}>
              <option value="">Select Section</option>
              {["A","B","C","D","E"].map(s => <option key={s} value={s}>Section {s}</option>)}
            </select>
          </Field>

          {/* 6 */}
          <Field label="Gender" required error={errors.gender?.message}>
            <select {...register("gender")} className={selectClass}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </Field>

          {/* 7 */}
          <Field label="Blood Group" error={errors.bloodGroup?.message}>
            <select {...register("bloodGroup")} className={selectClass}>
              <option value="">Select</option>
              {["A+","A-","B+","B-","O+","O-","AB+","AB-"].map(bg => <option key={bg}>{bg}</option>)}
            </select>
          </Field>

          {/* 8 */}
          <Field label="Aadhar No." error={errors.aadhaar?.message}>
            <input {...register("aadhaar")} className={inputClass} placeholder="12-digit number" type="text" maxLength={12} />
          </Field>

          {/* 9 */}
          <Field label="PEN No." error={errors.penNo?.message}>
            <input {...register("penNo")} className={inputClass} placeholder="Permanent Education Number" type="text" />
          </Field>

          {/* 10 */}
          <Field label="Mobile No." error={errors.studentMobile?.message}>
            <input {...register("studentMobile")} className={inputClass} placeholder="+91 00000 00000" type="tel" />
          </Field>

          {/* 11 */}
          <Field label="Religion" error={errors.religion?.message}>
            <select {...register("religion")} className={selectClass}>
              <option value="">Select</option>
              <option value="hindu">Hindu</option>
              <option value="muslim">Muslim</option>
              <option value="christian">Christian</option>
              <option value="sikh">Sikh</option>
              <option value="other">Other</option>
            </select>
          </Field>

          {/* 12 */}
          <Field label="Nationality" error={errors.nationality?.message}>
            <input {...register("nationality")} className={inputClass} type="text" defaultValue="Indian" />
          </Field>

          {/* 13 */}
          <Field label="Category" required error={errors.category?.message}>
            <select {...register("category")} className={selectClass}>
              <option value="">Select</option>
              <option value="general">General</option>
              <option value="obc">OBC</option>
              <option value="sc">SC</option>
              <option value="st">ST</option>
            </select>
          </Field>

          {/* 14 */}
          <Field label="Right to Education (Yes/No)" error={errors.rteStatus?.message}>
            <select {...register("rteStatus")} className={selectClass}>
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </Field>

          {/* 15 */}
          <Field label="BPL Student (Yes/No)" error={errors.bplStudent?.message}>
            <select {...register("bplStudent")} className={selectClass}>
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </Field>

          {/* 16 */}
          <Field label="BPL Card No." error={errors.bplCardNo?.message}>
            <input {...register("bplCardNo")} className={inputClass} placeholder="BPL Card Number" type="text" />
          </Field>

          {/* 17 */}
          <Field label="Person with Disability (PwD)" error={errors.pwdStatus?.message}>
            <select {...register("pwdStatus")} className={selectClass}>
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </Field>

          {/* 18 */}
          <Field label="Identification Mark" error={errors.identificationMark?.message}>
            <input {...register("identificationMark")} className={inputClass} placeholder="e.g. Mole on left cheek" type="text" />
          </Field>

          {/* 19 */}
          <Field label="Weight (kg)" error={errors.weight?.message}>
            <input {...register("weight")} className={inputClass} placeholder="e.g. 45" type="number" step="0.1" />
          </Field>

          {/* 20 */}
          <Field label="Height (cm)" error={errors.height?.message}>
            <input {...register("height")} className={inputClass} placeholder="e.g. 150" type="number" step="0.1" />
          </Field>

          {/* 21 — BMI auto-calc */}
          <Field label="Body Mass Index (BMI)">
            <input
              className="border rounded-lg border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 dark:text-slate-400 h-11 px-4 text-sm text-slate-500 cursor-not-allowed w-full"
              disabled
              type="text"
              value={bmi ? `${bmi} kg/m²` : ""}
              placeholder="Auto-calculated from Weight & Height"
              readOnly
            />
          </Field>

          {/* 22 */}
          <Field label="COVID Vaccination" error={errors.covidVaccination?.message}>
            <select {...register("covidVaccination")} className={selectClass}>
              <option value="">Select</option>
              <option value="both">Both Doses</option>
              <option value="single">Single Dose</option>
              <option value="none">None</option>
            </select>
          </Field>

        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════════
   STEP 2 — PARENT INFO
   Each section order:
   Name → Mobile No. → Email ID → Educational Qualification →
   Occupation → Work Organization Name → Designation → Annual Income
═══════════════════════════════════════════════════════════════════════════════ */
const educationOptions = ["Below 10th","10th Pass","12th Pass","Diploma","Graduate","Post Graduate","Doctorate","Other"];
const occupationOptions = ["Software Engineer","Doctor","Business Owner","Teacher","Government Employee","Lawyer","Accountant","Other"];

const ParentBlock = ({ title, IconComponent, prefix, register, errors }) => (
  <div className="bg-white dark:bg-background-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
    <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-2">
      <IconComponent className="text-primary text-xl" />
      <h2 className="text-lg font-bold text-[#0d141b] dark:text-white">{title}</h2>
    </div>
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

      {/* 1. Name */}
      <Field label="Full Name" required error={errors[`${prefix}Name`]?.message}>
        <input {...register(`${prefix}Name`)} className={inputClass} placeholder="Full Name" type="text" />
      </Field>

      {/* 2. Mobile No. */}
      <Field label="Mobile No." required error={errors[`${prefix}Mobile`]?.message}>
        <input {...register(`${prefix}Mobile`)} className={inputClass} placeholder="+91 00000 00000" type="tel" />
      </Field>

      {/* 3. Email ID */}
      <Field label="Email ID" error={errors[`${prefix}Email`]?.message}>
        <input {...register(`${prefix}Email`)} className={inputClass} placeholder="email@example.com" type="email" />
      </Field>

      {/* 4. Educational Qualification */}
      <Field label="Educational Qualification" error={errors[`${prefix}Education`]?.message}>
        <select {...register(`${prefix}Education`)} className={selectClass}>
          <option value="">Select Qualification</option>
          {educationOptions.map(o => <option key={o}>{o}</option>)}
        </select>
      </Field>

      {/* 5. Occupation */}
      <Field label="Occupation" error={errors[`${prefix}Occupation`]?.message}>
        <select {...register(`${prefix}Occupation`)} className={selectClass}>
          <option value="">Select Occupation</option>
          {occupationOptions.map(o => <option key={o}>{o}</option>)}
        </select>
      </Field>

      {/* 6. Work Organization Name */}
      <Field label="Work Organization Name" error={errors[`${prefix}Organization`]?.message}>
        <input {...register(`${prefix}Organization`)} className={inputClass} placeholder="Company / Organisation name" type="text" />
      </Field>

      {/* 7. Designation */}
      <Field label="Designation" error={errors[`${prefix}Designation`]?.message}>
        <input {...register(`${prefix}Designation`)} className={inputClass} placeholder="e.g. Manager, Engineer" type="text" />
      </Field>

      {/* 8. Annual Income */}
      <Field label="Annual Income" error={errors[`${prefix}Income`]?.message}>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₹</span>
          <input {...register(`${prefix}Income`)} className={`${inputClass} pl-7`} placeholder="e.g. 500000" type="number" />
        </div>
      </Field>

    </div>
  </div>
);

const ParentDetailsForm = ({ form }) => {
  const { register, formState: { errors } } = form;
  const [guardianSameAsFather, setGuardianSameAsFather] = useState(true);

  return (
    <div className="space-y-6">
      <ParentBlock title="Father's Details"   IconComponent={BsPerson}       prefix="father"   register={register} errors={errors} />
      <ParentBlock title="Mother's Details"   IconComponent={BsPersonFill}   prefix="mother"   register={register} errors={errors} />

      {/* Guardian */}
      <div className="bg-white dark:bg-background-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <BsShieldFillCheck className="text-primary text-xl" />
            <h2 className="text-lg font-bold text-[#0d141b] dark:text-white">Guardian's Details</h2>
          </div>
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              checked={guardianSameAsFather}
              onChange={e => setGuardianSameAsFather(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
              type="checkbox"
            />
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400 group-hover:text-primary transition-colors">
              Same as Father
            </span>
          </label>
        </div>

        {guardianSameAsFather ? (
          <div className="p-6 opacity-50 pointer-events-none">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {["Guardian's Name","Mobile No.","Email ID","Educational Qualification","Occupation","Work Organization Name","Designation","Annual Income"].map(lbl => (
                <Field key={lbl} label={lbl}>
                  <input className="border rounded-lg border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 h-11 px-4 text-sm text-slate-400 w-full cursor-not-allowed" disabled type="text" placeholder="Copied from Father" />
                </Field>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              <Field label="Guardian's Name" required error={errors.guardianName?.message}>
                <input {...register("guardianName")} className={inputClass} placeholder="Full Name" type="text" />
              </Field>
              <Field label="Mobile No." required error={errors.guardianMobile?.message}>
                <input {...register("guardianMobile")} className={inputClass} placeholder="+91 00000 00000" type="tel" />
              </Field>
              <Field label="Email ID" error={errors.guardianEmail?.message}>
                <input {...register("guardianEmail")} className={inputClass} placeholder="email@example.com" type="email" />
              </Field>
              <Field label="Educational Qualification" error={errors.guardianEducation?.message}>
                <select {...register("guardianEducation")} className={selectClass}>
                  <option value="">Select Qualification</option>
                  {educationOptions.map(o => <option key={o}>{o}</option>)}
                </select>
              </Field>
              <Field label="Occupation" error={errors.guardianOccupation?.message}>
                <select {...register("guardianOccupation")} className={selectClass}>
                  <option value="">Select Occupation</option>
                  {occupationOptions.map(o => <option key={o}>{o}</option>)}
                </select>
              </Field>
              <Field label="Work Organization Name" error={errors.guardianOrganization?.message}>
                <input {...register("guardianOrganization")} className={inputClass} placeholder="Company / Organisation name" type="text" />
              </Field>
              <Field label="Designation" error={errors.guardianDesignation?.message}>
                <input {...register("guardianDesignation")} className={inputClass} placeholder="e.g. Manager" type="text" />
              </Field>
              <Field label="Annual Income" error={errors.guardianIncome?.message}>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₹</span>
                  <input {...register("guardianIncome")} className={`${inputClass} pl-7`} placeholder="e.g. 500000" type="number" />
                </div>
              </Field>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════════
   STEP 3 — ADDRESS
   Current: Address → City → State → Pincode
   Permanent: Address → City → State → Pincode
═══════════════════════════════════════════════════════════════════════════════ */
const AddressDetailsForm = ({ form }) => {
  const { register, watch, setValue, formState: { errors } } = form;
  const [sameAsPresent, setSameAsPresent] = useState(false);

  const handleSameAsPresent = (e) => {
    const checked = e.target.checked;
    setSameAsPresent(checked);
    if (checked) {
      const [line1, city, state, pincode] = watch(["presentLine1","presentCity","presentState","presentPincode"]);
      setValue("permanentLine1", line1   || "");
      setValue("permanentCity",  city    || "");
      setValue("permanentState", state   || "");
      setValue("permanentPincode", pincode || "");
    }
  };

  const ai = "border w-full h-11 px-4 bg-slate-50 dark:bg-slate-800 dark:text-white border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary text-sm placeholder:text-slate-400";
  const as = "border appearance-none w-full h-11 px-4 bg-slate-50 dark:bg-slate-800 dark:text-white border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary text-sm";

  const AddressSection = ({ title, IconComponent, prefix, disabled }) => (
    <div className="bg-white dark:bg-background-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
          <IconComponent className="text-lg" />
        </div>
        <h2 className="text-lg font-bold text-[#0d141b] dark:text-white">{title}</h2>
        {prefix === "permanent" && (
          <label className="ml-auto inline-flex items-center cursor-pointer gap-3">
            <div className="relative">
              <input className="sr-only peer" type="checkbox" checked={sameAsPresent} onChange={handleSameAsPresent} />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </div>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-primary transition-colors whitespace-nowrap">
              Same as Current
            </span>
          </label>
        )}
      </div>
      <div className={`p-6 grid grid-cols-1 md:grid-cols-2 gap-5 transition-opacity duration-300 ${disabled ? "opacity-60 pointer-events-none" : ""}`}>
        {/* 1. Address */}
        <div className="md:col-span-2 flex flex-col gap-1.5">
          <label className={labelClass}>Address</label>
          <input {...register(`${prefix}Line1`)} disabled={disabled} className={ai} placeholder="Street, building, area, locality" type="text" />
          <FieldError message={errors[`${prefix}Line1`]?.message} />
        </div>
        {/* 2. City */}
        <Field label="City" error={errors[`${prefix}City`]?.message}>
          <input {...register(`${prefix}City`)} disabled={disabled} className={ai} placeholder="Enter city" type="text" />
        </Field>
        {/* 3. State */}
        <Field label="State" error={errors[`${prefix}State`]?.message}>
          <select {...register(`${prefix}State`)} disabled={disabled} className={as}>
            <option value="">Select State</option>
            {indianStates.map(s => <option key={s}>{s}</option>)}
          </select>
        </Field>
        {/* 4. Pincode */}
        <Field label="Pincode" error={errors[`${prefix}Pincode`]?.message}>
          <input {...register(`${prefix}Pincode`)} disabled={disabled} className={ai} placeholder="6-digit pincode" type="text" maxLength={6} />
        </Field>
        {/* Country (fixed) */}
        <Field label="Country">
          <input className="border w-full h-11 px-4 bg-slate-100 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-lg text-slate-500 cursor-not-allowed text-sm" disabled type="text" defaultValue="India" />
        </Field>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <AddressSection title="Current Address"   IconComponent={IoHome}         prefix="present"   disabled={false} />
      <AddressSection title="Permanent Address" IconComponent={IoLocationSharp} prefix="permanent" disabled={sameAsPresent} />
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════════
   STEP 4 — PREVIOUS SCHOOL
   Order: Previous School Name → School Address → UDISE Code → Board →
   T.C. Number → Last Class Passed → Year of Passing → Percentage/Grade
═══════════════════════════════════════════════════════════════════════════════ */
const PreviousSchoolForm = ({ form }) => {
  const { register, formState: { errors } } = form;
  const fi = "border w-full h-11 px-4 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white text-sm focus:border-primary focus:ring-primary placeholder:text-slate-400";
  const fs = "border appearance-none w-full h-11 px-4 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white text-sm focus:border-primary focus:ring-primary";

  return (
    <div className="bg-white dark:bg-background-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-2">
        <PiStudentFill className="text-primary text-xl" />
        <h2 className="text-lg font-bold text-[#0d141b] dark:text-white">Previous School Details</h2>
      </div>
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* 1 */}
          <div className="md:col-span-2">
            <Field label="Previous School Name" required error={errors.schoolName?.message}>
              <input {...register("schoolName")} className={fi} placeholder="Enter full school name" type="text" />
            </Field>
          </div>

          {/* 2 */}
          <div className="md:col-span-2">
            <Field label="School Address" error={errors.schoolAddress?.message}>
              <input {...register("schoolAddress")} className={fi} placeholder="Full address of previous school" type="text" />
            </Field>
          </div>

          {/* 3 */}
          <Field label="UDISE Code" error={errors.udiseCode?.message}>
            <input {...register("udiseCode")} className={fi} placeholder="11-digit UDISE code" type="text" maxLength={11} />
          </Field>

          {/* 4 */}
          <Field label="Affiliated Board" required error={errors.board?.message}>
            <select {...register("board")} className={fs}>
              <option value="">Select Board</option>
              {["CBSE","ICSE","State Board","IB","IGCSE","Other"].map(b => <option key={b}>{b}</option>)}
            </select>
          </Field>

          {/* 5 */}
          <Field label="T.C. Number (Transfer Certificate)" error={errors.tcNumber?.message}>
            <input {...register("tcNumber")} className={fi} placeholder="Transfer Certificate Number" type="text" />
          </Field>

          {/* 6 */}
          <Field label="Last Class Passed" required error={errors.lastClass?.message}>
            <select {...register("lastClass")} className={fs}>
              <option value="">Select Class</option>
              {[1,2,3,4,5,6,7,8,9,10].map(g => <option key={g} value={`Grade ${g}`}>Grade {g}</option>)}
            </select>
          </Field>

          {/* 7 */}
          <Field label="Year of Passing" required error={errors.yearOfPassing?.message}>
            <select {...register("yearOfPassing")} className={fs}>
              {[2025,2024,2023,2022,2021,2020].map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </Field>

          {/* 8 */}
          <Field label="Percentage / Grade Obtained" error={errors.percentage?.message}>
            <input {...register("percentage")} className={fi} placeholder="e.g. 85% or A+" type="text" />
          </Field>

          {/* TC Available */}
          <div className="md:col-span-2 p-5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-dashed border-slate-200 dark:border-slate-700 flex flex-col gap-3">
            <label className={labelClass}>Is Transfer Certificate (TC) Available?</label>
            <div className="flex items-center gap-8">
              {[{value:"yes",label:"Yes"},{value:"no",label:"No (Pending)"}].map(({value,label}) => (
                <label key={value} className="relative inline-flex items-center cursor-pointer gap-3">
                  <input {...register("tcAvailable")} className="sr-only peer" type="radio" value={value} defaultChecked={value==="no"} />
                  <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Remarks */}
          <div className="md:col-span-2">
            <Field label="Remarks / Special Academic History" error={errors.remarks?.message}>
              <textarea {...register("remarks")} className="border w-full px-4 py-3 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white text-sm focus:border-primary focus:ring-primary placeholder:text-slate-400 resize-none" placeholder="Mention any awards, disciplinary actions, or subjects studied..." rows={4} />
            </Field>
          </div>

        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════════
   STEP 5 — FEE PAYMENT
═══════════════════════════════════════════════════════════════════════════════ */
const FeePaymentForm = ({ form }) => {
  const { register, watch, formState: { errors } } = form;
  const paymentMode = watch("paymentMode") || "cash";

  const paymentModes = [
    { value: "cash",   label: "Cash",          Icon: MdPayments       },
    { value: "online", label: "Online",         Icon: RiBankCardLine   },
    { value: "bank",   label: "Bank Transfer",  Icon: MdAccountBalance },
  ];

  const feeItems = [
    { label: "Registration Fee",          amount: 2500 },
    { label: "Processing & Admin Fee",    amount: 500  },
    { label: "Early Bird Discount (10%)", amount: -300, color: "text-red-500" },
  ];
  const total = feeItems.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="bg-white dark:bg-background-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-2">
        <RiReceiptLine className="text-primary text-xl" />
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Fee Breakdown &amp; Payment</h2>
      </div>
      <div className="p-8 space-y-8">
        <div className="border border-slate-100 dark:border-slate-800 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Description</th>
                <th className="text-right px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {feeItems.map(item => (
                <tr key={item.label}>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{item.label}</td>
                  <td className={`px-4 py-3 text-right font-medium ${item.color || "text-slate-900 dark:text-white"}`}>
                    {item.amount < 0 ? `-₹${Math.abs(item.amount).toLocaleString()}` : `₹${item.amount.toLocaleString()}`}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-primary/5 dark:bg-primary/10">
              <tr>
                <td className="px-4 py-4 text-slate-900 dark:text-white font-bold text-base">Net Payable</td>
                <td className="px-4 py-4 text-right text-primary font-bold text-2xl">₹{total.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-4">Select Payment Mode</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {paymentModes.map(({ value, label, Icon }) => {
              const isActive = paymentMode === value;
              return (
                <label key={value} className={`flex items-center justify-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${isActive ? "border-primary bg-primary/5" : "border-slate-100 dark:border-slate-800 hover:border-slate-200"}`}>
                  <input {...register("paymentMode")} className="text-primary focus:ring-primary h-4 w-4" type="radio" value={value} />
                  <div className="flex flex-col items-center">
                    <Icon className={`text-2xl mb-1 ${isActive ? "text-primary" : "text-slate-500"}`} />
                    <span className={`text-xs font-bold ${isActive ? "text-primary" : "text-slate-600 dark:text-slate-400"}`}>{label}</span>
                  </div>
                </label>
              );
            })}
          </div>
          <FieldError message={errors.paymentMode?.message} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label="Transaction ID / Ref No." error={errors.transactionId?.message}>
            <input {...register("transactionId")} className="border w-full h-11 px-4 bg-slate-50 dark:bg-slate-800 dark:text-white border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:border-primary focus:ring-primary placeholder:text-slate-400" placeholder="TXN-99008877" type="text" />
          </Field>
          <Field label="Receipt Date" error={errors.receiptDate?.message}>
            <input {...register("receiptDate")} className="border w-full h-11 px-4 bg-slate-50 dark:bg-slate-800 dark:text-white border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:border-primary focus:ring-primary" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
          </Field>
        </div>

        <Field label="Payment Remarks" error={errors.paymentRemarks?.message}>
          <textarea {...register("paymentRemarks")} className="border w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 dark:text-white border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:border-primary focus:ring-primary placeholder:text-slate-400 resize-none" placeholder="e.g. Paid in full by parent at the front desk." rows={3} />
        </Field>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════════════════════ */
const breadcrumbLabels = ["Basic Details","Parent & Guardian","Address","Previous School","Fee Payment"];
const pageHeaders = [
  { title: "New Student Registration",       sub: "Fill in the student's basic personal details." },
  { title: "Parent & Guardian Information",  sub: "Provide contact and professional details of the student's guardians." },
  { title: "Address Details",                sub: "Provide the current and permanent address of the student." },
  { title: "Previous School Details",        sub: "Provide academic history from the previous institution." },
  { title: "Fee Payment Details",            sub: "Confirm and record the admission fee payment." },
];

const NewRegistration = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed,   setCompleted]   = useState(false);
  const [allData,     setAllData]     = useState({});
  const mainRef = useRef(null);

  const form = useForm({
    resolver: zodResolver(schemas[currentStep]),
    mode: "onTouched",
    defaultValues: {
      // Basic
      registrationNo: "", fullName: "", dateOfBirth: "", classGrade: "", section: "",
      gender: "", bloodGroup: "", aadhaar: "", penNo: "", studentMobile: "",
      religion: "", nationality: "Indian", category: "",
      rteStatus: "", bplStudent: "", bplCardNo: "",
      pwdStatus: "", identificationMark: "",
      weight: "", height: "", covidVaccination: "",
      // Parent
      fatherName: "",   fatherMobile: "",   fatherEmail: "",   fatherEducation: "",
      fatherOccupation: "",   fatherOrganization: "",   fatherDesignation: "",   fatherIncome: "",
      motherName: "",   motherMobile: "",   motherEmail: "",   motherEducation: "",
      motherOccupation: "",   motherOrganization: "",   motherDesignation: "",   motherIncome: "",
      guardianName: "", guardianMobile: "", guardianEmail: "", guardianEducation: "",
      guardianOccupation: "", guardianOrganization: "", guardianDesignation: "", guardianIncome: "",
      // Address
      presentLine1: "",   presentCity: "",   presentState: "",   presentPincode: "",
      permanentLine1: "", permanentCity: "", permanentState: "", permanentPincode: "",
      // School
      schoolName: "", schoolAddress: "", udiseCode: "", board: "", tcNumber: "",
      lastClass: "", yearOfPassing: "2025", percentage: "", tcAvailable: "no", remarks: "",
      // Fee
      paymentMode: "cash", transactionId: "",
      receiptDate: new Date().toISOString().split("T")[0], paymentRemarks: "",
    },
  });

  const scrollToTop = () => {
    let el = mainRef.current?.parentElement;
    while (el) {
      const { overflowY } = window.getComputedStyle(el);
      if (overflowY === "auto" || overflowY === "scroll") {
        el.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      el = el.parentElement;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onNext = useCallback(() => {
    form.handleSubmit((data) => {
      setAllData(prev => ({ ...prev, ...data }));
      if (currentStep < 4) {
        setCurrentStep(s => s + 1);
        scrollToTop();
      } else {
        setCompleted(true);
        console.log("Final data:", { ...allData, ...data });
      }
    })();
  }, [form, currentStep, allData]);

  const onPrev = () => {
    setCurrentStep(s => Math.max(0, s - 1));
    scrollToTop();
  };

  if (completed) {
    return (
      <main className="mx-auto flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center p-8">
        <div className="size-24 rounded-full bg-success/10 flex items-center justify-center">
          <RiFileUserLine className="text-success text-6xl" />
        </div>
        <h1 className="text-3xl font-black text-[#0d141b] dark:text-white">Registration Complete!</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-md">The student has been successfully registered.</p>
        <button
          onClick={() => { setCurrentStep(0); setCompleted(false); setAllData({}); form.reset(); }}
          className="px-8 py-3 rounded-lg bg-primary text-white font-bold text-sm hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all"
        >
          Register Another Student
        </button>
      </main>
    );
  }

  return (
    <main ref={mainRef} className="mx-auto">
      {/* Breadcrumb */}
      <div className="flex flex-wrap gap-2 mb-4">
        <a className="text-slate-500 text-sm font-medium hover:text-primary" href="#">Students</a>
        <span className="text-slate-400 text-sm">/</span>
        <span className="text-slate-500 text-sm font-semibold">New Student Registration</span>
        <span className="text-slate-400 text-sm">/</span>
        <span className="text-primary text-sm font-semibold">{breadcrumbLabels[currentStep]}</span>
      </div>

      {/* Page Header */}
      <div className="flex flex-wrap justify-between items-end gap-3 mb-8">
        <div>
          <h1 className="text-[#0d141b] dark:text-white text-2xl font-black leading-tight tracking-[-0.033em]">
            {pageHeaders[currentStep].title}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-base mt-1">{pageHeaders[currentStep].sub}</p>
        </div>
        <div className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-bold text-sm">
          Session: 2024-25
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <StepSidebar currentStep={currentStep} />

        <div className="col-span-12 lg:col-span-9 space-y-6">
          <form onSubmit={e => e.preventDefault()} noValidate>
            {currentStep === 0 && <BasicDetailsForm  form={form} />}
            {currentStep === 1 && <ParentDetailsForm form={form} />}
            {currentStep === 2 && <AddressDetailsForm form={form} />}
            {currentStep === 3 && <PreviousSchoolForm form={form} />}
            {currentStep === 4 && <FeePaymentForm    form={form} />}

            {/* Navigation */}
            <div className="bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800 rounded-xl px-8 py-5 flex justify-between items-center">
              {currentStep === 0 ? (
                <button type="button" className="px-6 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                  Cancel
                </button>
              ) : (
                <button type="button" onClick={onPrev} className="px-6 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-2">
                  <FiArrowLeft className="text-base" />
                  Previous
                </button>
              )}
              <button type="button" onClick={onNext} className="px-8 py-2.5 rounded-lg bg-success text-white font-bold text-sm hover:bg-success/90 shadow-lg shadow-success/20 transition-all flex items-center gap-2">
                {currentStep === 4 ? (
                  <> Pay &amp; Complete Registration <HiOutlineIdentification className="text-lg" /> </>
                ) : (
                  <> Save &amp; Next <FiArrowRight className="text-base" /> </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default NewRegistration;