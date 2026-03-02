"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useRef } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { fullSchema, stepSchemas } from "../../schemas/student.schema";


const URL='http://localhost/5001/new-admission'

// ─── Step config ──────────────────────────────────────────────────────
const STEPS = [
  { id: 1, label: "Basic Details", sub: "Full name, Class, DOB" },
  { id: 2, label: "Parent Details", sub: "Father & Mother info" },
  { id: 3, label: "Address", sub: "Current & Permanent" },
  { id: 4, label: "Previous School", sub: "History & Records" },
  { id: 5, label: "Documents", sub: "Upload required files" },
  { id: 6, label: "Fee Assignment", sub: "Admission fees" },
  { id: 7, label: "Review & Submit", sub: "Confirm & complete" },
];

// ─── Shared input classes ──────────────────────────────────────────────
const inputCls =
  "border w-full h-11 px-4 bg-white dark:bg-slate-800 dark:text-white border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 text-sm placeholder:text-slate-400 outline-none transition";
const inputErrCls =
  "border w-full h-11 px-4 bg-white border-red-400 rounded-lg focus:ring-2 focus:ring-red-200 text-sm placeholder:text-slate-400 outline-none transition";
const selectCls =
  "border appearance-none w-full h-11 px-4 bg-white dark:bg-slate-800 dark:text-white border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 text-sm outline-none transition";
const selectErrCls =
  "border appearance-none w-full h-11 px-4 bg-white border-red-400 rounded-lg focus:ring-2 focus:ring-red-200 text-sm outline-none transition";
const labelCls = "text-sm font-semibold text-slate-700 dark:text-slate-300";
const errCls = "text-xs text-red-500 mt-1 flex items-center gap-1";

function FieldError({ message }) {
  if (!message) return null;
  return (
    <p className={errCls}>
      <svg width="12" height="12" fill="none" viewBox="0 0 24 24" className="shrink-0">
        <circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2" />
        <path d="M12 8v4M12 16h.01" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
      </svg>
      {message}
    </p>
  );
}

// ─── Sidebar ────────────────────────────────────────────────────────────
function Sidebar({ current }) {
  return (
    <div className="col-span-12 lg:col-span-3">
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm sticky top-6">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5">Progress</p>
        <div className="space-y-1">
          {STEPS.map((s, i) => {
            const done = current > s.id;
            const active = current === s.id;
            const isLast = i === STEPS.length - 1;
            return (
              <div key={s.id}>
                <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${active ? "bg-blue-50" : ""}`}>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                      done
                        ? "bg-emerald-500 text-white"
                        : active
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {done ? (
                      <svg width="13" height="13" fill="none" viewBox="0 0 24 24">
                        <path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      s.id
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className={`text-sm font-semibold truncate ${active ? "text-blue-700" : done ? "text-slate-600" : "text-slate-400"}`}>
                      {s.label}
                    </p>
                    <p className="text-xs text-slate-400 truncate">{s.sub}</p>
                  </div>
                </div>
                {!isLast && (
                  <div className={`ml-6 w-px h-3 transition-colors ${done ? "bg-emerald-300" : "bg-slate-100"}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── STEP 1: Basic Details ─────────────────────────────────────────────
function Step1() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="p-8 space-y-6">
      {/* Photo Upload */}
      <div className="flex items-center gap-5 bg-slate-50 rounded-xl p-5 border border-slate-100">
        <div className="w-20 h-20 rounded-xl bg-slate-200 border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 shrink-0 cursor-pointer hover:bg-slate-100 transition">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
          </svg>
        </div>
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-0.5">UPLOAD PHOTO</p>
          <p className="text-sm font-semibold text-slate-700">Student Portrait</p>
          <p className="text-xs text-slate-400 mt-1">Upload a high-quality portrait photo (JPEG/PNG, max 2MB). Used for Student ID card.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Row 1: Identifiers */}
        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>Registration No.</label>
          <input {...register("registrationNo")} placeholder="Enter Registration No." className={inputCls} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>S.R. no</label>
          <input {...register("srNo")} placeholder="Enter S.R. No." className={inputCls} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>Admission No.</label>
          <input {...register("admissionNo")} placeholder="Enter Admission No." className={inputCls} />
        </div>

        {/* Row 2: Basic Info */}
        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>Roll No.</label>
          <input {...register("rollNo")} placeholder="Enter Roll No." className={inputCls} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>Student name <span className="text-red-500">*</span></label>
          <input {...register("fullName")} placeholder="Enter student's full name" className={errors.fullName ? inputErrCls : inputCls} />
          <FieldError message={errors.fullName?.message} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>DOB <span className="text-red-500">*</span></label>
          <input type="date" {...register("dob")} className={errors.dob ? inputErrCls : inputCls} />
          <FieldError message={errors.dob?.message} />
        </div>

        {/* Row 3: Academic Placement */}
        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>Class <span className="text-red-500">*</span></label>
          <select {...register("grade")} className={errors.grade ? selectErrCls : selectCls}>
            <option value="">Select Class</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((g) => (
              <option key={g} value={g}>Grade {g}</option>
            ))}
          </select>
          <FieldError message={errors.grade?.message} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>Section</label>
          <input {...register("section")} placeholder="e.g. A" className={inputCls} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>Gender <span className="text-red-500">*</span></label>
          <select {...register("gender")} className={errors.gender ? selectErrCls : selectCls}>
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          <FieldError message={errors.gender?.message} />
        </div>

        {/* Row 4: Personal Details */}
        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>Blood Group</label>
          <select {...register("bloodGroup")} className={selectCls}>
            <option value="">Select</option>
            {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>Aadhar no.</label>
          <input
            {...register("aadhaar")}
            placeholder="12-digit Aadhaar number"
            maxLength={12}
            className={errors.aadhaar ? inputErrCls : inputCls}
          />
          <FieldError message={errors.aadhaar?.message} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>PEN no.</label>
          <input {...register("penNo")} placeholder="Enter PEN No." className={inputCls} />
        </div>

        {/* Row 5: Contact & Demographics */}
        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>Mobile no.</label>
          <input {...register("mobileNo")} placeholder="Enter Mobile No." className={inputCls} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>Religion</label>
          <select {...register("religion")} className={selectCls}>
            <option value="">Select</option>
            <option>Hindu</option>
            <option>Muslim</option>
            <option>Christian</option>
            <option>Sikh</option>
            <option>Other</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>Nationality</label>
          <input {...register("nationality")} defaultValue="Indian" className={inputCls} />
        </div>

        {/* Row 6: Categories */}
        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>Category <span className="text-red-500">*</span></label>
          <select {...register("category")} className={selectCls}>
            <option value="">Select</option>
            <option>General</option>
            <option>OBC</option>
            <option>SC</option>
            <option>ST</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>Right to education (Yes/No)</label>
          <select {...register("rte")} className={selectCls}>
            <option value="">Select</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>BPL student (yes/no)</label>
          <select {...register("bplStudent")} className={selectCls}>
            <option value="">Select</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>

        {/* Row 7: Social Status */}
        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>BPL Card No.</label>
          <input {...register("bplCardNo")} placeholder="Enter Card No." className={inputCls} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>Person with Disability (PwD)</label>
          <select {...register("pwd")} className={selectCls}>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>Identification Mark</label>
          <input {...register("identificationMark")} placeholder="e.g. Mole on right hand" className={inputCls} />
        </div>

        {/* Row 8: Physical Stats */}
        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>Weight (kg)</label>
          <input type="number" step="0.1" {...register("weight")} placeholder="0.0" className={inputCls} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>Height (cm)</label>
          <input type="number" {...register("height")} placeholder="0" className={inputCls} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>Body Mass Index (BMI)</label>
          <input {...register("bmi")} placeholder="Auto-calculated" className={inputCls} readOnly />
        </div>

        {/* Row 9: Health Status */}
        <div className="flex flex-col gap-1.5 md:col-span-3">
          <label className={labelCls}>COVID Vaccination (Single Dose/Both Dose/None)</label>
          <select {...register("covidVaccination")} className={selectCls}>
            <option value="">Select Status</option>
            <option>None</option>
            <option>Single Dose</option>
            <option>Both Dose</option>
          </select>
        </div>
      </div>
    </div>
  );
}

// ─── STEP 2: Parent Details ────────────────────────────────────────────
function Step2() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const ParentSection = ({ prefix, title, icon, color }) => (
    <div className={`rounded-xl border p-6 space-y-4 ${color}`}>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-full bg-white border flex items-center justify-center text-sm font-bold text-slate-600">{icon}</div>
        <p className="text-sm font-bold text-slate-800">{title}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>Full Name <span className="text-red-500">*</span></label>
          <input {...register(`${prefix}.name`)} placeholder="Full name" className={errors[prefix]?.name ? inputErrCls : inputCls} />
          <FieldError message={errors[prefix]?.name?.message} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>Mobile Number <span className="text-red-500">*</span></label>
          <input {...register(`${prefix}.mobile`)} placeholder="10-digit mobile" maxLength={10} className={errors[prefix]?.mobile ? inputErrCls : inputCls} />
          <FieldError message={errors[prefix]?.mobile?.message} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>Email ID</label>
          <input type="email" {...register(`${prefix}.email`)} placeholder="Email address" className={errors[prefix]?.email ? inputErrCls : inputCls} />
          <FieldError message={errors[prefix]?.email?.message} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>Educational Qualification</label>
          <input {...register(`${prefix}.qualification`)} placeholder="e.g. Graduate, Post Graduate" className={inputCls} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>Occupation</label>
          <select {...register(`${prefix}.occupation`)} className={selectCls}>
            <option value="">Select Occupation</option>
            {["Software Engineer", "Doctor", "Business Owner", "Teacher", "Government Employee", "Homemaker", "Other"].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>Work Organization Name</label>
          <input {...register(`${prefix}.organization`)} placeholder="Company or Business name" className={inputCls} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>Designation</label>
          <input {...register(`${prefix}.designation`)} placeholder="e.g. Manager, Director" className={inputCls} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>Annual Income</label>
          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-300">
            <span className="px-3 py-2 bg-slate-50 text-slate-400 text-sm border-r border-slate-200">₹</span>
            <input type="number" {...register(`${prefix}.income`)} placeholder="0.00" className="flex-1 h-11 px-3 text-sm text-slate-700 bg-white focus:outline-none" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-8 space-y-6">
      <ParentSection prefix="father" title="Father's Details" icon="F" color="bg-blue-50 border-blue-100" />
      <ParentSection prefix="mother" title="Mother's Details" icon="M" color="bg-pink-50 border-pink-100" />
      <ParentSection prefix="guardian" title="Guardian's Details" icon="G" color="bg-slate-50 border-slate-100" />
    </div>
  );
}

// ─── STEP 3: Address Details ───────────────────────────────────────────
function Step3() {
  const { register, watch, setValue, formState: { errors } } = useFormContext();
  const [sameAsPresent, setSameAsPresent] = useState(false);
  const presentAddr = watch("presentAddress") || {};

  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa", "Gujarat",
    "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
    "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  ];

  const handleToggle = (e) => {
    const checked = e.target.checked;
    setSameAsPresent(checked);
    if (checked) {
      setValue("permanentAddress.line1", presentAddr.line1 || "");
      setValue("permanentAddress.line2", presentAddr.line2 || "");
      setValue("permanentAddress.city", presentAddr.city || "");
      setValue("permanentAddress.state", presentAddr.state || "");
      setValue("permanentAddress.pincode", presentAddr.pincode || "");
    }
  };

  const AddressBlock = ({ prefix, title, disabled }) => (
    <div className="bg-slate-50 rounded-xl border border-slate-100 p-5 space-y-4">
      <p className="text-sm font-bold text-slate-800">{title}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2 flex flex-col gap-1.5">
          <label className={labelCls}>Address Line 1</label>
          <input {...register(`${prefix}.line1`)} disabled={disabled} placeholder="Street, Building, Flat No." className={inputCls + (disabled ? " opacity-60 cursor-not-allowed" : "")} />
          <FieldError message={errors[prefix]?.line1?.message} />
        </div>
        <div className="md:col-span-2 flex flex-col gap-1.5">
          <label className={labelCls}>Address Line 2 <span className="text-slate-400 font-normal">(Optional)</span></label>
          <input {...register(`${prefix}.line2`)} disabled={disabled} placeholder="Area, Landmark" className={inputCls + (disabled ? " opacity-60 cursor-not-allowed" : "")} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>City</label>
          <input {...register(`${prefix}.city`)} disabled={disabled} placeholder="City" className={inputCls + (disabled ? " opacity-60 cursor-not-allowed" : "")} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>State</label>
          <select {...register(`${prefix}.state`)} disabled={disabled} className={selectCls + (disabled ? " opacity-60 cursor-not-allowed" : "")}>
            <option value="">Select State</option>
            {indianStates.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>Pincode / ZIP</label>
          <input {...register(`${prefix}.pincode`)} disabled={disabled} placeholder="6-digit pincode" maxLength={6} className={errors[prefix]?.pincode ? inputErrCls : inputCls + (disabled ? " opacity-60 cursor-not-allowed" : "")} />
          <FieldError message={errors[prefix]?.pincode?.message} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>Country</label>
          <input {...register(`${prefix}.country`)} disabled={disabled} defaultValue="India" className={inputCls + (disabled ? " opacity-60 cursor-not-allowed" : "")} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-8 space-y-6">
      <AddressBlock prefix="presentAddress" title="🏠 Present Address" />
      <div className="flex items-center gap-3">
        <input type="checkbox" id="sameAddr" checked={sameAsPresent} onChange={handleToggle} className="accent-blue-600 w-4 h-4" />
        <label htmlFor="sameAddr" className="text-sm font-medium text-slate-700 cursor-pointer">Same as Present Address</label>
      </div>
      <AddressBlock prefix="permanentAddress" title="📌 Permanent Address" disabled={sameAsPresent} />
    </div>
  );
}

// ─── STEP 4: Previous School ───────────────────────────────────────────
function Step4() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const tcAvailable = watch("school.tcAvailable");
  const medium = watch("school.medium") || "English";

  const boards = ["CBSE", "ICSE", "State Board", "IB", "Cambridge (IGCSE)", "NIOS", "Other"];
  const classes = ["Nursery", "KG", "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12"];
  const years = Array.from({ length: 10 }, (_, i) => (2024 - i).toString());

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">🎓</span>
        <h3 className="text-base font-bold text-slate-800">Previous School Details</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2 flex flex-col gap-1.5">
          <label className={labelCls}>Previous School Name <span className="text-red-500">*</span></label>
          <input {...register("school.name")} placeholder="Name of the previous school" className={errors.school?.name ? inputErrCls : inputCls} />
          <FieldError message={errors.school?.name?.message} />
        </div>

        {/* Added School Address field from image */}
        <div className="md:col-span-2 flex flex-col gap-1.5">
          <label className={labelCls}>School Address</label>
          <input {...register("school.address")} placeholder="Enter school address" className={inputCls} />
        </div>

        {/* Added UDISE Code field from image */}
        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>UDISE Code</label>
          <input {...register("school.udiseCode")} placeholder="Enter UDISE code" className={inputCls} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>Board <span className="text-red-500">*</span></label>
          <select {...register("school.board")} className={errors.school?.board ? selectErrCls : selectCls}>
            <option value="">Select Board</option>
            {boards.map((b) => <option key={b}>{b}</option>)}
          </select>
          <FieldError message={errors.school?.board?.message} />
        </div>

        {/* Added T.C. Number field from image */}
        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>T.C. Number</label>
          <input {...register("school.tcNumber")} placeholder="Enter TC number" className={inputCls} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>Last Class Passed <span className="text-red-500">*</span></label>
          <select {...register("school.lastClass")} className={errors.school?.lastClass ? selectErrCls : selectCls}>
            <option value="">Select Class</option>
            {classes.map((c) => <option key={c}>{c}</option>)}
          </select>
          <FieldError message={errors.school?.lastClass?.message} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>Year of Passing <span className="text-red-500">*</span></label>
          <select {...register("school.yearOfPassing")} className={selectCls}>
            <option value="">Select Year</option>
            {years.map((y) => <option key={y}>{y}</option>)}
          </select>
        </div>

        {/* Added Percentage/Grade field from image */}
        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>Percentage/Grade</label>
          <input {...register("school.result")} placeholder="e.g. 85% or A1" className={inputCls} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>Medium of Instruction <span className="text-red-500">*</span></label>
          <div className="flex gap-4 mt-1">
            {["English", "Hindi", "Regional"].map((m) => (
              <label key={m} className="flex items-center gap-2 cursor-pointer text-sm text-slate-700">
                <input
                  type="radio"
                  name="school.medium"
                  checked={medium === m}
                  onChange={() => setValue("school.medium", m)}
                  className="accent-blue-600"
                />
                {m}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-slate-50 rounded-xl px-5 py-4 border border-slate-100">
        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-700">Is Transfer Certificate (TC) Available?</p>
          <p className="text-xs text-slate-400 mt-0.5">Toggle to indicate TC status</p>
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-600">
          <span className={tcAvailable ? "text-slate-400" : "font-semibold text-slate-700"}>No (Pending)</span>
          <button
            type="button"
            onClick={() => setValue("school.tcAvailable", !tcAvailable)}
            className={`relative w-11 h-6 rounded-full transition-colors ${tcAvailable ? "bg-blue-600" : "bg-slate-300"}`}
          >
            <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${tcAvailable ? "translate-x-5" : "translate-x-0.5"}`} />
          </button>
          <span className={tcAvailable ? "font-semibold text-blue-600" : "text-slate-400"}>Yes</span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelCls}>Remarks / Special Academic History</label>
        <textarea {...register("school.remarks")} rows={3} placeholder="Any special notes about academic history..." className="border w-full px-4 py-3 bg-white border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-300 text-sm placeholder:text-slate-400 outline-none resize-none" />
      </div>

      <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-5 py-4">
        <span className="text-amber-500 mt-0.5">⚠️</span>
        <div>
          <p className="text-sm font-semibold text-amber-700">Verification Required</p>
          <p className="text-xs text-amber-600 mt-0.5">Ensure the School Name matches the stamp on the TC.</p>
        </div>
      </div>
    </div>
  );
}

// ─── STEP 5: Documents ─────────────────────────────────────────────────
const initialDocs = [
  { id: "photo", title: "Student Photo", description: "Passport size. JPEG/PNG format only.", status: "pending", required: false, icon: "👤", accept: "image/*" },
  { id: "birth", title: "Birth Certificate", description: "Official government certificate. PDF preferred.", status: "pending", required: true, icon: "📄", accept: ".pdf,image/*" },
  { id: "aadhaar", title: "Aadhaar Card", description: "Both sides scanned in a single PDF.", status: "pending", required: false, icon: "🪪", accept: ".pdf" },
  { id: "tc", title: "Transfer Certificate", description: "Issued by the previous educational institution.", status: "pending", required: false, icon: "📋", accept: ".pdf,image/*", optional: true },
  { id: "marksheet", title: "Previous Class Marksheet", description: "Original or provisional report card.", status: "pending", required: true, icon: "⭐", accept: ".pdf,image/*" },
];

function Step5() {
  const [docs, setDocs] = useState(initialDocs);
  const fileInputRefs = useRef({});

  const uploaded = docs.filter((d) => d.status === "uploaded").length;
  const progress = Math.round((uploaded / docs.length) * 100);
  const requiredMissing = docs.filter((d) => d.required && d.status !== "uploaded");

  const handleFileChange = (id, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const sizeKB = Math.round(file.size / 1024);
    setDocs((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: "uploaded", fileName: file.name, fileSize: `${sizeKB} KB` } : d))
    );
  };

  const handleRemove = (id) => {
    setDocs((prev) => prev.map((d) => (d.id === id ? { ...d, status: "pending", fileName: null, fileSize: null } : d)));
    if (fileInputRefs.current[id]) fileInputRefs.current[id].value = "";
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center gap-4 bg-slate-50 rounded-xl px-5 py-4 border border-slate-100">
        <div>
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest mb-1">Upload Progress</p>
          <p className="text-sm font-bold text-blue-600">{progress}% Complete</p>
        </div>
        <div className="flex-1 bg-slate-200 rounded-full h-2">
          <div className="bg-blue-500 h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-xs text-slate-400 whitespace-nowrap">{uploaded}/{docs.length}</p>
      </div>

      {requiredMissing.length > 0 && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl px-5 py-3">
          <svg width="16" height="16" className="text-red-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
            <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <p className="text-xs text-red-600">Required: {requiredMissing.map((d) => d.title).join(", ")}</p>
        </div>
      )}

      <div className="space-y-3">
        {docs.map((doc) => (
          <div key={doc.id} className="bg-slate-50 border border-slate-100 rounded-xl px-5 py-4 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0 ${doc.status === "uploaded" ? "bg-blue-50" : "bg-white border border-slate-200"}`}>
              {doc.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-semibold text-slate-800">{doc.title}</span>
                {doc.status === "uploaded" && <span className="text-[10px] font-bold bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full uppercase">Uploaded</span>}
                {doc.required && doc.status !== "uploaded" && <span className="text-[10px] font-bold bg-red-100 text-red-500 px-2 py-0.5 rounded-full uppercase">Required</span>}
                {doc.optional && <span className="text-[10px] font-bold bg-slate-100 text-slate-400 px-2 py-0.5 rounded-full uppercase">Optional</span>}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{doc.description}</p>
              {doc.status === "uploaded" && <p className="text-xs text-blue-500 font-medium mt-1">{doc.fileName} ({doc.fileSize})</p>}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {doc.status === "uploaded" ? (
                <button type="button" onClick={() => handleRemove(doc.id)} className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-200 transition">
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
              ) : (
                <>
                  <input type="file" accept={doc.accept} className="hidden" ref={(el) => (fileInputRefs.current[doc.id] = el)} onChange={(e) => handleFileChange(doc.id, e)} />
                  <button type="button" onClick={() => fileInputRefs.current[doc.id]?.click()} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition">
                    <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    Upload
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl px-5 py-4">
        <svg width="16" height="16" className="text-blue-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" /><path d="M12 8h.01M12 12v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        <p className="text-xs text-blue-700 leading-relaxed">Make sure all documents are legible. Max 2MB per file. Combine multiple files into one PDF if needed.</p>
      </div>
    </div>
  );
}

// ─── STEP 6: Fee Assignment ────────────────────────────────────────────
const feeTemplates = ["Standard Academic Fee", "Reduced Fee Structure", "Full Scholarship Template", "Management Quota Fee"];
const installmentPlans = ["Quarterly (4 Installments)", "Half-Yearly (2 Installments)", "Annual (1 Payment)", "Monthly (12 Installments)"];
const discountReasons = ["None", "Sibling Discount", "Staff Ward", "Merit Scholarship", "EWS / Financial Aid"];
const feeBreakdown = [
  { component: "Admission Fee (One-time)", frequency: "One-time", amount: 500 },
  { component: "Tuition Fee", frequency: "Quarterly", amount: 4800 },
  { component: "Lab & Library Fee", frequency: "Annual", amount: 150 },
  { component: "Transport Fee", frequency: "Monthly", amount: 850 },
  { component: "Development Fund", frequency: "Annual", amount: 200 },
  { component: "Sports & Activity Fee", frequency: "Annual", amount: 200 },
];

function Step6() {
  const { register, watch, formState: { errors } } = useFormContext();
  const discount = watch("fee.discount") || "None";
  const adjustment = parseFloat(watch("fee.adjustment")) || 0;
  const gross = 5700;
  const tax = Math.round(gross * 0.05);
  const discountAmt = discount !== "None" ? 630 : 0;
  const net = gross + tax - discountAmt - adjustment;
  const firstPayment = (net / 4).toFixed(2);

  return (
    <div className="p-8 space-y-6">
      <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>Fee Structure Template</label>
            <select className={errors.fee?.template ? selectErrCls : selectCls} {...register("fee.template")}>
              {feeTemplates.map((t) => <option key={t}>{t}</option>)}
            </select>
            <FieldError message={errors.fee?.template?.message} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>Installment Plan</label>
            <select className={errors.fee?.installment ? selectErrCls : selectCls} {...register("fee.installment")}>
              {installmentPlans.map((p) => <option key={p}>{p}</option>)}
            </select>
            <FieldError message={errors.fee?.installment?.message} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>Discount Reason</label>
          <select className={selectCls} {...register("fee.discount")}>
            {discountReasons.map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>Manual Adjustment (₹)</label>
          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-300">
            <span className="px-3 py-2 bg-slate-50 text-slate-400 text-sm border-r border-slate-200">₹</span>
            <input type="number" className="flex-1 h-11 px-3 text-sm text-slate-700 bg-white focus:outline-none" min="0" step="0.01" {...register("fee.adjustment")} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 bg-slate-50">
          <p className="text-sm font-semibold text-slate-800">Fee Structure Breakdown</p>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-slate-400 text-xs font-semibold uppercase tracking-wider">
              <th className="text-left px-5 py-3">Fee Component</th>
              <th className="text-left px-5 py-3">Frequency</th>
              <th className="text-right px-5 py-3">Amount</th>
            </tr>
          </thead>
          <tbody>
            {feeBreakdown.map((row, i) => (
              <tr key={i} className="border-t border-slate-50 hover:bg-slate-50 transition-colors">
                <td className="px-5 py-3 text-slate-700">{row.component}</td>
                <td className="px-5 py-3 text-slate-400 text-sm">{row.frequency}</td>
                <td className="px-5 py-3 text-right font-semibold text-slate-700">₹{row.amount.toLocaleString()}.00</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
        <p className="text-sm font-bold text-blue-800 mb-3">Fee Summary</p>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-slate-600"><span>Gross Total</span><span className="font-semibold">₹{gross.toLocaleString()}.00</span></div>
          <div className="flex justify-between text-slate-600"><span>Tax (5%)</span><span className="font-semibold text-emerald-600">+₹{tax}.00</span></div>
          {discountAmt > 0 && <div className="flex justify-between text-slate-600"><span>Discount</span><span className="font-semibold text-red-500">-₹{discountAmt}.00</span></div>}
          {adjustment > 0 && <div className="flex justify-between text-slate-600"><span>Adjustment</span><span className="font-semibold text-red-500">-₹{adjustment.toFixed(2)}</span></div>}
          <div className="border-t border-blue-200 pt-3 flex justify-between items-center">
            <span className="font-bold text-slate-800">Net Payable</span>
            <span className="text-2xl font-extrabold text-blue-600">₹{net.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
          </div>
        </div>
        <div className="mt-3 bg-white rounded-lg px-4 py-3 border border-blue-100">
          <p className="text-xs text-blue-600">First installment: <span className="font-bold">₹{firstPayment}</span> due by Aug 25, 2024</p>
        </div>
      </div>
    </div>
  );
}

// ─── STEP 7: Review & Submit ───────────────────────────────────────────
function Step7({ data, submitted }) {
  const fields = [
    { label: "Full Name", val: data.fullName },
    { label: "Gender", val: data.gender },
    { label: "Date of Birth", val: data.dob },
    { label: "Grade", val: data.grade ? `Grade ${data.grade}` : "-" },
    { label: "Blood Group", val: data.bloodGroup || "-" },
    { label: "Category", val: data.category },
    { label: "Nationality", val: data.nationality || "Indian" },
  ];
  const parentFields = [
    { label: "Father's Name", val: data.father?.name },
    { label: "Father's Mobile", val: data.father?.mobile },
    { label: "Mother's Name", val: data.mother?.name },
    { label: "Mother's Mobile", val: data.mother?.mobile },
  ];
  const addressLine = [data.presentAddress?.line1, data.presentAddress?.city, data.presentAddress?.state].filter(Boolean).join(", ");
  const refId = useRef(Math.floor(Math.random() * 90000) + 10000);

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
        <svg width="16" height="16" className="text-amber-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" /><path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        <div>
          <p className="text-xs font-bold text-amber-700">Please verify all information before submitting</p>
          <p className="text-xs text-amber-600 mt-0.5">Once submitted, changes may require admin approval.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-slate-50 rounded-xl border border-slate-100 p-5">
          <p className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2"><span>👤</span> Student Info</p>
          <div className="space-y-3">
            {fields.map((f) => (
              <div key={f.label} className="flex justify-between text-sm border-b border-slate-100 pb-2 last:border-0">
                <span className="text-slate-400">{f.label}</span>
                <span className="font-semibold text-slate-700 text-right">{f.val || "-"}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 rounded-xl border border-slate-100 p-5">
          <p className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2"><span>👨‍👩‍👦</span> Parent Info</p>
          <div className="space-y-3">
            {parentFields.map((f) => (
              <div key={f.label} className="flex justify-between text-sm border-b border-slate-100 pb-2 last:border-0">
                <span className="text-slate-400">{f.label}</span>
                <span className="font-semibold text-slate-700 text-right">{f.val || "-"}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <p className="text-sm font-bold text-slate-800 mb-2">🏠 Present Address</p>
            <p className="text-sm text-slate-600">{addressLine || "Not provided"}</p>
          </div>
        </div>

        <div className="bg-slate-50 rounded-xl border border-slate-100 p-5">
          <p className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2"><span>🎓</span> Previous School</p>
          <div className="space-y-3">
            {[
              { label: "School Name", val: data.school?.name },
              { label: "Board", val: data.school?.board },
              { label: "Last Class", val: data.school?.lastClass },
              { label: "Medium", val: data.school?.medium },
              { label: "Year of Passing", val: data.school?.yearOfPassing },
            ].map((f) => (
              <div key={f.label} className="flex justify-between text-sm border-b border-slate-100 pb-2 last:border-0">
                <span className="text-slate-400">{f.label}</span>
                <span className="font-semibold text-slate-700 text-right">{f.val || "-"}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 rounded-xl border border-slate-100 p-5">
          <p className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2"><span>💳</span> Fee Details</p>
          <div className="space-y-3">
            {[
              { label: "Template", val: data.fee?.template || "Standard Academic Fee" },
              { label: "Installment", val: data.fee?.installment || "Quarterly" },
              { label: "Discount", val: data.fee?.discount || "None" },
            ].map((f) => (
              <div key={f.label} className="flex justify-between text-sm border-b border-slate-100 pb-2 last:border-0">
                <span className="text-slate-400">{f.label}</span>
                <span className="font-semibold text-slate-700 text-right">{f.val}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
            <span className="text-sm font-bold text-slate-800">Net Payable</span>
            <span className="text-xl font-extrabold text-blue-600">₹6,320.00</span>
          </div>
        </div>
      </div>

      {submitted && (
        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-6 py-4">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path d="M9 12l2 2 4-4" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="12" r="10" stroke="#10b981" strokeWidth="1.7" />
          </svg>
          <div>
            <p className="font-bold text-emerald-700">Admission Submitted Successfully!</p>
            <p className="text-xs text-emerald-600 mt-0.5">Reference ID: ADM-{refId.current} · Session 2024-25</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Step Header ───────────────────────────────────────────────────────
function StepHeader({ step }) {
  const titles = [
    "Step 1: Basic Information",
    "Step 2: Parent & Guardian Details",
    "Step 3: Address Details",
    "Step 4: Academic History",
    "Step 5: Document Upload",
    "Step 6: Fee Assignment",
    "Step 7: Review & Complete",
  ];
  return (
    <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
      <h2 className="text-[#0d141b] text-lg font-bold">{titles[step - 1]}</h2>
    </div>
  );
}

// ─── Main App ───────────────────────────────────────────────────────────
export default function NewAdmission() {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const methods = useForm({
    defaultValues: {
      school: { medium: "English", yearOfPassing: "2024", tcAvailable: false },
      fee: {
        template: "Standard Academic Fee",
        installment: "Quarterly (4 Installments)",
        discount: "None",
        adjustment: "0",
      },
    },
    mode: "onTouched",
    // Use the full schema for submission, per-step for navigation
    resolver: zodResolver(fullSchema),
  });

  const { handleSubmit, trigger, getValues, formState: { errors } } = methods;

  // Fields to validate per step
  const stepFields = {
    1: ["fullName", "gender", "dob", "grade", "aadhaar"],
    2: ["father.name", "father.mobile", "father.email", "father.aadhaar", "mother.name", "mother.mobile", "mother.email", "mother.aadhaar"],
    3: ["presentAddress.pincode", "permanentAddress.pincode"],
    4: ["school.name", "school.board", "school.lastClass"],
    5: [],
    6: ["fee.template", "fee.installment"],
    7: [],
  };

  const handleNext = async () => {
    const fields = stepFields[currentStep];
    const schema = stepSchemas[currentStep];

    // Validate only current step's fields using the step schema
    const currentData = getValues();
    const result = schema.safeParse(currentData);

    if (!result.success) {
      // Trigger validation for the relevant fields to show errors
      await trigger(fields);
      return;
    }

    setCurrentStep((s) => Math.min(s + 1, 7));
  };

  const handlePrev = () => setCurrentStep((s) => Math.max(s - 1, 1));

 const onSubmit = async (data) => {
  try {
    const response = await fetch(`URL`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        submittedAt: new Date().toISOString(),
        session: "2024-25",
      }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const result = await response.json();
    console.log("✅ Admission Submitted:", result);
    setSubmitted(true);
  } catch (error) {
    console.error("❌ Submission failed:", error);
    alert(`Submission failed: ${error.message}. Please try again.`);
  }
};
  // On validation error during submit, go to first failing step
  const onError = (errs) => {
    const stepFieldMap = {
      1: ["fullName", "gender", "dob", "grade", "aadhaar", "bloodGroup", "category", "nationality", "religion"],
      2: ["father", "mother"],
      3: ["presentAddress", "permanentAddress"],
      4: ["school"],
      5: [],
      6: ["fee"],
      7: [],
    };
    for (let s = 1; s <= 6; s++) {
      const keys = stepFieldMap[s];
      if (keys.some((k) => errs[k])) {
        setCurrentStep(s);
        return;
      }
    }
  };

  const formData = getValues();

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit, onError)} className="min-h-screen bg-[#f5f6fa]  p-6">
        <div className=" mx-auto mb-6">
          <div className="flex flex-wrap gap-2 mb-3">
            <a className="text-slate-500 text-sm font-medium hover:text-blue-600" href="#">Students</a>
            <span className="text-slate-400 text-sm">/</span>
            <span className="text-slate-500 text-sm font-semibold">New Student Admission</span>
            <span className="text-slate-400 text-sm">/</span>
            <span className="text-blue-600 text-sm font-semibold">{STEPS[currentStep - 1].label}</span>
          </div>
          <div className="flex flex-wrap justify-between items-end gap-3">
            <div>
              <h1 className="text-[#0d141b] text-2xl font-black leading-tight tracking-[-0.033em]">New Student Admission</h1>
              <p className="text-slate-500 text-base mt-1">Please fill in the details to complete the enrollment process.</p>
            </div>
            <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-bold text-sm">Session: 2024-25</div>
          </div>
        </div>

        <div className=" mx-auto grid grid-cols-12 gap-8">
          <Sidebar current={currentStep} />

          <div className="col-span-12 lg:col-span-9 space-y-0">
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <StepHeader step={currentStep} />
              {currentStep === 1 && <Step1 />}
              {currentStep === 2 && <Step2 />}
              {currentStep === 3 && <Step3 />}
              {currentStep === 4 && <Step4 />}
              {currentStep === 5 && <Step5 />}
              {currentStep === 6 && <Step6 />}
              {currentStep === 7 && <Step7 data={formData} submitted={submitted} />}

              <div className="bg-slate-50 border-t border-slate-200 px-8 py-5 flex justify-between items-center">
                {currentStep > 1 ? (
                  <button type="button" onClick={handlePrev} className="px-6 py-2.5 rounded-lg border border-slate-300 text-slate-600 font-bold text-sm hover:bg-slate-100 transition-colors flex items-center gap-2">
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    Previous
                  </button>
                ) : (
                  <button type="button" className="px-6 py-2.5 rounded-lg border border-slate-300 text-slate-600 font-bold text-sm hover:bg-slate-100 transition-colors">
                    Cancel
                  </button>
                )}

                {currentStep < 7 ? (
                  <button type="button" onClick={handleNext} className="px-8 py-2.5 rounded-lg bg-emerald-500 text-white font-bold text-sm hover:bg-emerald-600 shadow-lg shadow-emerald-200 transition-all flex items-center gap-2">
                    Save & Next
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={submitted}
                    className={`px-8 py-2.5 rounded-lg font-bold text-sm shadow-lg transition-all flex items-center gap-2 ${
                      submitted ? "bg-emerald-500 text-white cursor-default" : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200"
                    }`}
                  >
                    {submitted ? (
                      <>
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        Admission Confirmed!
                      </>
                    ) : (
                      "Complete Admission →"
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}