import { useState, useRef, useCallback } from "react"; // ✅ added useCallback
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressSchema, basicDetailsSchema, feePaymentSchema, parentDetailsSchema, previousSchoolSchema } from "../../schemas/student.schema";

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

const FieldError = ({ message }) =>
  message ? <p className={errorClass}>{message}</p> : null;

const steps = [
  { label: "Basic Details", sub: "Full name, Class, DOB" },
  { label: "Parent Details", sub: "Father & Mother info" },
  { label: "Address", sub: "Current & Permanent" },
  { label: "Previous School", sub: "History & Records" },
  { label: "Fee Payment", sub: "Admission fees" },
];

const StepSidebar = ({ currentStep }) => (
  <div className="col-span-12 lg:col-span-3 sticky top-24 self-start">
    <div className="bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800 rounded-xl p-4">
      <div className="flex flex-col gap-0">
        {steps.map((step, i) => {
          const completed = i < currentStep;
          const active = i === currentStep;
          const isLast = i === steps.length - 1;
          return (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`size-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    completed
                      ? "bg-success text-white"
                      : active
                      ? "bg-primary text-white"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                  }`}
                >
                  {completed ? (
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  ) : (
                    i + 1
                  )}
                </div>
                {!isLast && (
                  <div
                    className={`w-[2px] h-12 ${
                      completed
                        ? "bg-success/30"
                        : active
                        ? "bg-primary/30"
                        : "bg-slate-100 dark:bg-slate-800"
                    }`}
                  />
                )}
              </div>
              <div className="pt-1">
                <p
                  className={`font-bold text-sm leading-tight ${
                    completed
                      ? "text-success"
                      : active
                      ? "text-primary"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {step.label}
                </p>
                <p className="text-slate-400 text-xs mt-1">{step.sub}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

const BasicDetailsForm = ({ form }) => {
  const { register, formState: { errors } } = form;
  return (
    <div className="bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
      <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 border-b border-slate-200 dark:border-slate-800">
        <h2 className="text-[#0d141b] dark:text-white text-lg font-bold">Step 1: Basic Information</h2>
      </div>
      <div className="p-8 space-y-8">
        <div className="flex items-center gap-8">
          <div className="relative group">
            <div className="size-32 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center overflow-hidden">
              <span className="material-symbols-outlined text-slate-400 text-4xl group-hover:hidden">add_a_photo</span>
              <p className="text-[10px] text-slate-400 font-medium group-hover:hidden px-2 text-center">UPLOAD PHOTO</p>
              <div className="hidden group-hover:flex absolute inset-0 bg-primary/80 items-center justify-center transition-all cursor-pointer">
                <span className="material-symbols-outlined text-white text-3xl">upload</span>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Student Portrait</h3>
            <p className="text-xs text-slate-400 max-w-sm">
              Upload a high-quality portrait photo (JPEG/PNG, max 2MB). This photo will be used for the Student ID card.
            </p>
            <button type="button" className="mt-3 text-primary text-sm font-bold hover:underline flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">photo_camera</span>
              Take Photo via Webcam
            </button>
          </div>
        </div>
        <hr className="border-slate-100 dark:border-slate-800" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Full Name <span className="text-red-500">*</span></label>
            <input {...register("fullName")} className={inputClass} placeholder="e.g. Johnathan Doe" type="text" />
            <FieldError message={errors.fullName?.message} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Gender <span className="text-red-500">*</span></label>
            <select {...register("gender")} className={selectClass}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <FieldError message={errors.gender?.message} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Date of Birth <span className="text-red-500">*</span></label>
            <input {...register("dateOfBirth")} className={inputClass} type="date" />
            <FieldError message={errors.dateOfBirth?.message} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Blood Group</label>
            <select {...register("bloodGroup")} className={selectClass}>
              <option value="">Select</option>
              {["A+","A-","B+","B-","O+","O-","AB+","AB-"].map(bg => <option key={bg}>{bg}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Class/Grade <span className="text-red-500">*</span></label>
            <select {...register("classGrade")} className={selectClass}>
              <option value="">Select Class</option>
              {[1,2,3,4,5,6,7,8,9,10].map(g => <option key={g} value={g}>Grade {g}</option>)}
            </select>
            <FieldError message={errors.classGrade?.message} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Category <span className="text-red-500">*</span></label>
            <select {...register("category")} className={selectClass}>
              <option value="">Select</option>
              <option value="general">General</option>
              <option value="obc">OBC</option>
              <option value="sc">SC</option>
              <option value="st">ST</option>
            </select>
            <FieldError message={errors.category?.message} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Aadhaar Number / National ID</label>
            <input {...register("aadhaar")} className={inputClass} placeholder="12-digit number" type="text" maxLength={12} />
            <FieldError message={errors.aadhaar?.message} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Nationality</label>
            <input {...register("nationality")} className={inputClass} type="text" defaultValue="Indian" />
            <FieldError message={errors.nationality?.message} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Religion</label>
            <select {...register("religion")} className={selectClass}>
              <option value="">Select</option>
              <option value="hindu">Hindu</option>
              <option value="muslim">Muslim</option>
              <option value="christian">Christian</option>
              <option value="sikh">Sikh</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

const ParentDetailsForm = ({ form }) => {
  const { register, formState: { errors } } = form;
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-background-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">person</span>
          <h2 className="text-lg font-bold text-[#0d141b] dark:text-white">Father's Details</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Full Name <span className="text-red-500">*</span></label>
            <input {...register("fatherName")} className={inputClass} placeholder="e.g. Robert Smith" type="text" />
            <FieldError message={errors.fatherName?.message} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Mobile Number <span className="text-red-500">*</span></label>
            <input {...register("fatherMobile")} className={inputClass} placeholder="+91 00000 00000" type="tel" />
            <FieldError message={errors.fatherMobile?.message} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
            <input {...register("fatherEmail")} className={inputClass} placeholder="robert.smith@example.com" type="email" />
            <FieldError message={errors.fatherEmail?.message} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Occupation</label>
            <select {...register("fatherOccupation")} className={selectClass}>
              <option value="">Select Occupation</option>
              {["Software Engineer","Doctor","Business Owner","Teacher","Government Employee","Other"].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Annual Income</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₹</span>
              <input {...register("fatherIncome")} className="border w-full pl-7 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:border-primary focus:ring-primary h-11 px-4 text-sm placeholder:text-slate-400" placeholder="e.g. 500000" type="number" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Aadhaar Number</label>
            <input {...register("fatherAadhaar")} className={inputClass} placeholder="12-digit number" type="text" maxLength={12} />
            <FieldError message={errors.fatherAadhaar?.message} />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-background-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">person_3</span>
          <h2 className="text-lg font-bold text-[#0d141b] dark:text-white">Mother's Details</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Full Name <span className="text-red-500">*</span></label>
            <input {...register("motherName")} className={inputClass} placeholder="e.g. Jane Smith" type="text" />
            <FieldError message={errors.motherName?.message} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Mobile Number <span className="text-red-500">*</span></label>
            <input {...register("motherMobile")} className={inputClass} placeholder="+91 00000 00000" type="tel" />
            <FieldError message={errors.motherMobile?.message} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
            <input {...register("motherEmail")} className={inputClass} placeholder="jane.smith@example.com" type="email" />
            <FieldError message={errors.motherEmail?.message} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Occupation</label>
            <input {...register("motherOccupation")} className={inputClass} placeholder="e.g. Accountant" type="text" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Annual Income</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₹</span>
              <input {...register("motherIncome")} className="border w-full pl-7 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:border-primary focus:ring-primary h-11 px-4 text-sm placeholder:text-slate-400" placeholder="e.g. 400000" type="number" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Aadhaar Number</label>
            <input {...register("motherAadhaar")} className={inputClass} placeholder="12-digit number" type="text" maxLength={12} />
            <FieldError message={errors.motherAadhaar?.message} />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-background-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">shield_person</span>
            <h2 className="text-lg font-bold text-[#0d141b] dark:text-white">Guardian Details</h2>
          </div>
          <label className="flex items-center gap-2 cursor-pointer group">
            <input defaultChecked className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary" type="checkbox" />
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400 group-hover:text-primary transition-colors">
              Guardian same as parents
            </span>
          </label>
        </div>
        <div className="p-6 opacity-50 pointer-events-none bg-slate-50/30 dark:bg-slate-800/20">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Guardian Name</label>
              <input className="border rounded-lg border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 dark:text-white h-11 px-4 text-sm" disabled type="text" defaultValue="Robert Smith" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Relationship</label>
              <input className="border rounded-lg border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 dark:text-white h-11 px-4 text-sm" disabled type="text" defaultValue="Father" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Contact Number</label>
              <input className="border rounded-lg border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 dark:text-white h-11 px-4 text-sm" disabled type="text" defaultValue="+91 00000 00000" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AddressDetailsForm = ({ form }) => {
  const { register, watch, setValue, formState: { errors } } = form;
  const [sameAsPresent, setSameAsPresent] = useState(false);

  const handleSameAsPresent = (e) => {
    const checked = e.target.checked;
    setSameAsPresent(checked);
    if (checked) {
      const present = watch(["presentLine1","presentLine2","presentCity","presentState","presentPincode"]);
      setValue("permanentLine1", present[0] || "");
      setValue("permanentLine2", present[1] || "");
      setValue("permanentCity", present[2] || "");
      setValue("permanentState", present[3] || "");
      setValue("permanentPincode", present[4] || "");
    }
  };

  const addrInputClass = "border w-full h-11 px-4 bg-slate-50 dark:bg-slate-800 dark:text-white border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary text-sm placeholder:text-slate-400";
  const addrSelectClass = "border appearance-none w-full h-11 px-4 bg-slate-50 dark:bg-slate-800 dark:text-white border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary text-sm";

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-background-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-xl">home</span>
          </div>
          <h2 className="text-lg font-bold text-[#0d141b] dark:text-white">Present Address</h2>
        </div>
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2 flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Address Line 1</label>
            <input {...register("presentLine1")} className={addrInputClass} placeholder="Street, building, suite" type="text" />
            <FieldError message={errors.presentLine1?.message} />
          </div>
          <div className="md:col-span-2 flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Address Line 2 (Optional)</label>
            <input {...register("presentLine2")} className={addrInputClass} placeholder="Apartment, unit, floor" type="text" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">City</label>
            <input {...register("presentCity")} className={addrInputClass} placeholder="Enter city" type="text" />
            <FieldError message={errors.presentCity?.message} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">State / Province</label>
            <select {...register("presentState")} className={addrSelectClass}>
              <option value="">Select State</option>
              {indianStates.map(s => <option key={s}>{s}</option>)}
            </select>
            <FieldError message={errors.presentState?.message} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Pincode / ZIP</label>
            <input {...register("presentPincode")} className={addrInputClass} placeholder="Enter 6-digit pincode" type="text" maxLength={6} />
            <FieldError message={errors.presentPincode?.message} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Country</label>
            <input className="border w-full h-11 px-4 bg-slate-100 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-lg text-slate-500 cursor-not-allowed text-sm" disabled type="text" defaultValue="India" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-background-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">location_on</span>
            </div>
            <h2 className="text-lg font-bold text-[#0d141b] dark:text-white">Permanent Address</h2>
          </div>
          <label className="inline-flex items-center cursor-pointer group">
            <div className="relative">
              <input className="sr-only peer" type="checkbox" checked={sameAsPresent} onChange={handleSameAsPresent} />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
            </div>
            <span className="ml-3 text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">
              Same as Present Address
            </span>
          </label>
        </div>
        <div className={`p-8 grid grid-cols-1 md:grid-cols-2 gap-6 transition-opacity duration-300 ${sameAsPresent ? "opacity-60 pointer-events-none" : "opacity-100"}`}>
          <div className="md:col-span-2 flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Address Line 1</label>
            <input {...register("permanentLine1")} disabled={sameAsPresent} className={addrInputClass} placeholder="Street, building, suite" type="text" />
            <FieldError message={errors.permanentLine1?.message} />
          </div>
          <div className="md:col-span-2 flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Address Line 2 (Optional)</label>
            <input {...register("permanentLine2")} disabled={sameAsPresent} className={addrInputClass} placeholder="Apartment, unit, floor" type="text" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">City</label>
            <input {...register("permanentCity")} disabled={sameAsPresent} className={addrInputClass} placeholder="Enter city" type="text" />
            <FieldError message={errors.permanentCity?.message} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">State / Province</label>
            <select {...register("permanentState")} disabled={sameAsPresent} className={addrSelectClass}>
              <option value="">Select State</option>
              {indianStates.map(s => <option key={s}>{s}</option>)}
            </select>
            <FieldError message={errors.permanentState?.message} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Pincode / ZIP</label>
            <input {...register("permanentPincode")} disabled={sameAsPresent} className={addrInputClass} placeholder="Enter 6-digit pincode" type="text" maxLength={6} />
            <FieldError message={errors.permanentPincode?.message} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Country</label>
            <input className="border w-full h-11 px-4 bg-slate-100 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-lg text-slate-500 cursor-not-allowed text-sm" disabled type="text" defaultValue="India" />
          </div>
        </div>
      </div>
    </div>
  );
};

const PreviousSchoolForm = ({ form }) => {
  const { register, formState: { errors } } = form;
  return (
    <div className="bg-white dark:bg-background-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary text-[20px]">school</span>
        <h2 className="text-lg font-bold text-[#0d141b] dark:text-white">Previous School Details</h2>
      </div>
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2 flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Previous School Name <span className="text-red-500">*</span></label>
            <input {...register("schoolName")} className="border w-full h-11 px-4 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white text-sm focus:border-primary focus:ring-primary placeholder:text-slate-400" placeholder="Enter full school name" type="text" />
            <FieldError message={errors.schoolName?.message} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Affiliated Board / University <span className="text-red-500">*</span></label>
            <select {...register("board")} className="border appearance-none w-full h-11 px-4 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white text-sm focus:border-primary focus:ring-primary">
              <option value="">Select Board</option>
              {["CBSE","ICSE","State Board","IB","IGCSE","Other"].map(b => <option key={b}>{b}</option>)}
            </select>
            <FieldError message={errors.board?.message} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Last Class Passed <span className="text-red-500">*</span></label>
            <select {...register("lastClass")} className="border appearance-none w-full h-11 px-4 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white text-sm focus:border-primary focus:ring-primary">
              <option value="">Select Class</option>
              {[1,2,3,4,5,6,7,8,9,10].map(g => <option key={g} value={`Grade ${g}`}>Grade {g}</option>)}
            </select>
            <FieldError message={errors.lastClass?.message} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Medium of Instruction <span className="text-red-500">*</span></label>
            <div className="flex gap-6 mt-1">
              {["English","Hindi","Regional"].map(medium => (
                <label key={medium} className="flex items-center gap-2 cursor-pointer">
                  <input {...register("medium")} className="text-primary focus:ring-primary border-slate-300 dark:border-slate-600" name="medium" type="radio" value={medium} defaultChecked={medium === "English"} />
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{medium}</span>
                </label>
              ))}
            </div>
            <FieldError message={errors.medium?.message} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Year of Passing <span className="text-red-500">*</span></label>
            <select {...register("yearOfPassing")} className="border appearance-none w-full h-11 px-4 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white text-sm focus:border-primary focus:ring-primary">
              {[2025,2024,2023,2022,2021,2020].map(y => <option key={y} value={y}>{y}</option>)}
            </select>
            <FieldError message={errors.yearOfPassing?.message} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Percentage / Grade Obtained</label>
            <input {...register("percentage")} className="border w-full h-11 px-4 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white text-sm focus:border-primary focus:ring-primary placeholder:text-slate-400" placeholder="e.g. 85% or A+" type="text" />
          </div>
          <div className="md:col-span-2 p-5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-dashed border-slate-200 dark:border-slate-700 flex flex-col gap-3">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Is Transfer Certificate (TC) Available?</label>
            <div className="flex items-center gap-8">
              {[{value:"yes",label:"Yes"},{value:"no",label:"No (Pending)"}].map(({value,label}) => (
                <label key={value} className="relative inline-flex items-center cursor-pointer">
                  <input {...register("tcAvailable")} className="sr-only peer" type="radio" value={value} defaultChecked={value==="no"} />
                  <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  <span className="ml-3 text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="md:col-span-2 flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Remarks / Special Academic History</label>
            <textarea {...register("remarks")} className="border w-full px-4 py-3 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white text-sm focus:border-primary focus:ring-primary placeholder:text-slate-400 resize-none" placeholder="Mention any awards, disciplinary actions, or subjects studied..." rows={4} />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeePaymentForm = ({ form }) => {
  const { register, watch, formState: { errors } } = form;
  const paymentMode = watch("paymentMode") || "cash";

  const paymentModes = [
    { value: "cash", label: "Cash", icon: "payments" },
    { value: "online", label: "Online", icon: "credit_card" },
    { value: "bank", label: "Transfer", icon: "account_balance" },
  ];

  const feeItems = [
    { label: "Registration Fee", amount: 2500, color: "" },
    { label: "Processing & Admin Fee", amount: 500, color: "" },
    { label: "Early Bird Discount (10%)", amount: -300, color: "text-red-500" },
  ];
  const total = feeItems.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="bg-white dark:bg-background-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">receipt_long</span>
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
            {paymentModes.map(({ value, label, icon }) => {
              const isActive = paymentMode === value;
              return (
                <label key={value} className={`flex items-center justify-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${isActive ? "border-primary bg-primary/5" : "border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700"}`}>
                  <input {...register("paymentMode")} className="text-primary focus:ring-primary h-4 w-4" type="radio" value={value} />
                  <div className="flex flex-col items-center">
                    <span className={`material-symbols-outlined mb-1 ${isActive ? "text-primary" : "text-slate-500"}`}>{icon}</span>
                    <span className={`text-xs font-bold ${isActive ? "text-primary" : "text-slate-600 dark:text-slate-400"}`}>{label}</span>
                  </div>
                </label>
              );
            })}
          </div>
          <FieldError message={errors.paymentMode?.message} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Transaction ID / Ref No.</label>
            <input {...register("transactionId")} className="border w-full h-11 px-4 bg-slate-50 dark:bg-slate-800 dark:text-white border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:border-primary focus:ring-primary placeholder:text-slate-400" placeholder="TXN-99008877" type="text" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Receipt Date</label>
            <input {...register("receiptDate")} className="border w-full h-11 px-4 bg-slate-50 dark:bg-slate-800 dark:text-white border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:border-primary focus:ring-primary" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
            <FieldError message={errors.receiptDate?.message} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Payment Remarks</label>
          <textarea {...register("paymentRemarks")} className="border w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 dark:text-white border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:border-primary focus:ring-primary placeholder:text-slate-400 resize-none" placeholder="e.g. Paid in full by parent at the front desk." rows={3} />
        </div>
      </div>
    </div>
  );
};

const breadcrumbLabels = [
  "Basic Details",
  "Parent & Guardian Details",
  "Address Details",
  "Previous School Details",
  "Fee Payment Details",
];

const pageHeaders = [
  { title: "New Student Registration", sub: "Please fill in the basic details to start the enrollment process." },
  { title: "Parent & Guardian Information", sub: "Please provide the contact and professional information of the student's legal guardians." },
  { title: "Address Details", sub: "Please provide the current and permanent address of the student." },
  { title: "Previous School Details", sub: "Please provide the academic details of the student's previous school." },
  { title: "Fee Payment Details", sub: "Please provide the fee payment details for the student." },
];

const NewRegistration = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [allData, setAllData] = useState({});

  // ✅ FIX: ref attached to <main> to walk up and find real scrollable parent
  const mainRef = useRef(null);

  const form = useForm({
    resolver: zodResolver(schemas[currentStep]),
    mode: "onTouched",
    defaultValues: {
      fullName: "", gender: "", dateOfBirth: "", bloodGroup: "", classGrade: "",
      category: "", aadhaar: "", nationality: "Indian", religion: "",
      fatherName: "", fatherMobile: "", fatherEmail: "", fatherOccupation: "",
      fatherIncome: "", fatherAadhaar: "", motherName: "", motherMobile: "",
      motherEmail: "", motherOccupation: "", motherIncome: "", motherAadhaar: "",
      presentLine1: "", presentLine2: "", presentCity: "", presentState: "", presentPincode: "",
      permanentLine1: "", permanentLine2: "", permanentCity: "", permanentState: "", permanentPincode: "",
      schoolName: "", board: "", lastClass: "", medium: "English", yearOfPassing: "2025",
      percentage: "", tcAvailable: "no", remarks: "",
      paymentMode: "cash", transactionId: "", receiptDate: new Date().toISOString().split("T")[0], paymentRemarks: "",
    },
  });

  // ✅ FIX: walks up DOM from <main> to find the actual scrollable container
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
    // fallback if nothing found
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onNext = useCallback(
    form.handleSubmit((data) => {
      setAllData(prev => ({ ...prev, ...data }));
      if (currentStep < 4) {
        setCurrentStep(s => s + 1);
        scrollToTop(); // ✅ works for both next and prev
      } else {
        setCompleted(true);
        console.log("Final data:", { ...allData, ...data });
      }
    }),
    [form, currentStep, allData]
  );

  const onPrev = () => {
    setCurrentStep(s => Math.max(0, s - 1));
    scrollToTop(); // ✅ same function, same logic
  };

  if (completed) {
    return (
      <main className="mx-auto flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center p-8">
        <div className="size-24 rounded-full bg-success/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-success text-6xl">how_to_reg</span>
        </div>
        <h1 className="text-3xl font-black text-[#0d141b] dark:text-white">Registration Complete!</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-md">
          The student has been successfully registered. You can now proceed to view the student profile or register another student.
        </p>
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
    // ✅ FIX: ref attached here so scrollToTop can walk up from this element
    <main ref={mainRef} className="mx-auto">
      <div className="flex flex-wrap gap-2 mb-4">
        <a className="text-slate-500 text-sm font-medium hover:text-primary" href="#">Students</a>
        <span className="text-slate-400 text-sm font-medium">/</span>
        <span className="text-slate-500 text-sm font-semibold">New Student Registration</span>
        <span className="text-slate-400 text-sm font-medium">/</span>
        <span className="text-primary text-sm font-semibold">{breadcrumbLabels[currentStep]}</span>
      </div>

      <div className="flex flex-wrap justify-between items-end gap-3 mb-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-[#0d141b] dark:text-white text-2xl font-black leading-tight tracking-[-0.033em]">
            {pageHeaders[currentStep].title}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-base font-normal">
            {pageHeaders[currentStep].sub}
          </p>
        </div>
        <div className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-bold text-sm">
          Session: 2024-25
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <StepSidebar currentStep={currentStep} />

        <div className="col-span-12 lg:col-span-9 space-y-6">
          <form onSubmit={e => e.preventDefault()} noValidate>
            {currentStep === 0 && <BasicDetailsForm form={form} />}
            {currentStep === 1 && <ParentDetailsForm form={form} />}
            {currentStep === 2 && <AddressDetailsForm form={form} />}
            {currentStep === 3 && <PreviousSchoolForm form={form} />}
            {currentStep === 4 && <FeePaymentForm form={form} />}

            <div className="bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800 rounded-xl px-8 py-5 flex justify-between items-center">
              {currentStep === 0 ? (
                <button
                  type="button"
                  className="px-6 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onPrev}
                  className="px-6 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                  Previous
                </button>
              )}

              <button
                type="button"
                onClick={onNext}
                className="px-8 py-2.5 rounded-lg bg-success text-white font-bold text-sm hover:bg-success/90 shadow-lg shadow-success/20 transition-all flex items-center gap-2"
              >
                {currentStep === 4 ? (
                  <>Pay &amp; Complete Registration <span className="material-symbols-outlined text-[18px]">how_to_reg</span></>
                ) : (
                  <>Save &amp; Next <span className="material-symbols-outlined text-[18px]">arrow_forward</span></>
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