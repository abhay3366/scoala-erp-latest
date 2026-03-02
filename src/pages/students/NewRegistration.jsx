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
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
  "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
  "Uttarakhand", "West Bengal",
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
                  className={`size-8 rounded-full flex items-center justify-center font-bold text-sm ${completed
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
                    className={`w-[2px] h-12 ${completed
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
                  className={`font-bold text-sm leading-tight ${completed
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
          {/* Row 1 */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Registration No.</label>
            <input {...register("registrationNo")} className={inputClass} placeholder="Enter Registration No." type="text" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Student name</label>
            <input {...register("studentName")} className={inputClass} placeholder="Enter Name" type="text" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">DOB</label>
            <input {...register("dob")} className={inputClass} type="date" />
          </div>

          {/* Row 2 */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Class</label>
            <select {...register("class")} className={selectClass}>
              <option value="">Select Class</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(g => <option key={g} value={g}>Grade {g}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Section</label>
            <input {...register("section")} className={inputClass} placeholder="Section" type="text" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Gender</label>
            <select {...register("gender")} className={selectClass}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Row 3 */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Blood Group</label>
            <select {...register("bloodGroup")} className={selectClass}>
              <option value="">Select</option>
              {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(bg => <option key={bg}>{bg}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Aadhar no.</label>
            <input {...register("aadharNo")} className={inputClass} placeholder="12-digit number" type="text" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">PEN no.</label>
            <input {...register("penNo")} className={inputClass} placeholder="Enter PEN No." type="text" />
          </div>

          {/* Row 4 */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Mobile no.</label>
            <input {...register("mobileNo")} className={inputClass} placeholder="Enter Mobile No." type="tel" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Religion</label>
            <input {...register("religion")} className={inputClass} type="text" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Nationality</label>
            <input {...register("nationality")} className={inputClass} type="text" defaultValue="Indian" />
          </div>

          {/* Row 5 */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Category</label>
            <select {...register("category")} className={selectClass}>
              <option value="general">General</option>
              <option value="obc">OBC</option>
              <option value="sc">SC</option>
              <option value="st">ST</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Right to education (Yes/No)</label>
            <select {...register("rte")} className={selectClass}>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">BPL student (yes/no)</label>
            <select {...register("bplStudent")} className={selectClass}>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* Row 6 */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">BPL Card No.</label>
            <input {...register("bplCardNo")} className={inputClass} type="text" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Person with Disability (PwD)</label>
            <select {...register("pwd")} className={selectClass}>
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Identification Mark</label>
            <input {...register("identificationMark")} className={inputClass} type="text" />
          </div>

          {/* Row 7 */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Weight (kg)</label>
            <input {...register("weight")} className={inputClass} type="number" step="0.01" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Height (cm)</label>
            <input {...register("height")} className={inputClass} type="number" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Body Mass Index (BMI)</label>
            <input {...register("bmi")} className={inputClass} placeholder="Auto-calculated" type="text" readOnly />
          </div>

          {/* Row 8 */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">COVID Vaccination (Single Dose/Both Dose/None)</label>
            <select {...register("covidVaccination")} className={selectClass}>
              <option value="none">None</option>
              <option value="single">Single Dose</option>
              <option value="both">Both Dose</option>
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
      {/* Father's Details */}
      <div className="bg-white dark:bg-background-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">person</span>
          <h2 className="text-lg font-bold text-[#0d141b] dark:text-white">Father's Details</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Father Name <span className="text-red-500">*</span></label>
            <input {...register("fatherName")} className={inputClass} placeholder="e.g. Robert Smith" type="text" />
            <FieldError message={errors.fatherName?.message} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Mobile no. <span className="text-red-500">*</span></label>
            <input {...register("fatherMobile")} className={inputClass} placeholder="+91 00000 00000" type="tel" />
            <FieldError message={errors.fatherMobile?.message} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email ID</label>
            <input {...register("fatherEmail")} className={inputClass} placeholder="robert.smith@example.com" type="email" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Educational Qualification</label>
            <input {...register("fatherQualification")} className={inputClass} placeholder="e.g. Graduate" type="text" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Occupation</label>
            <input {...register("fatherOccupation")} className={inputClass} placeholder="e.g. Engineer" type="text" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Work Organization Name</label>
            <input {...register("fatherOrgName")} className={inputClass} placeholder="Company Name" type="text" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Designation</label>
            <input {...register("fatherDesignation")} className={inputClass} placeholder="e.g. Manager" type="text" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Annual Income</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₹</span>
              <input {...register("fatherIncome")} className="border w-full pl-7 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:border-primary focus:ring-primary h-11 px-4 text-sm" placeholder="e.g. 500000" type="number" />
            </div>
          </div>
        </div>
      </div>

      {/* Mother's Details */}
      <div className="bg-white dark:bg-background-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">person_3</span>
          <h2 className="text-lg font-bold text-[#0d141b] dark:text-white">Mother's Details</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Mother name <span className="text-red-500">*</span></label>
            <input {...register("motherName")} className={inputClass} placeholder="e.g. Jane Smith" type="text" />
            <FieldError message={errors.motherName?.message} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Mobile no. <span className="text-red-500">*</span></label>
            <input {...register("motherMobile")} className={inputClass} placeholder="+91 00000 00000" type="tel" />
            <FieldError message={errors.motherMobile?.message} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email ID</label>
            <input {...register("motherEmail")} className={inputClass} placeholder="jane.smith@example.com" type="email" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Educational Qualification</label>
            <input {...register("motherQualification")} className={inputClass} placeholder="e.g. Post Graduate" type="text" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Occupation</label>
            <input {...register("motherOccupation")} className={inputClass} placeholder="e.g. Teacher" type="text" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Work Organization Name</label>
            <input {...register("motherOrgName")} className={inputClass} placeholder="Company Name" type="text" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Designation</label>
            <input {...register("motherDesignation")} className={inputClass} placeholder="e.g. Headmistress" type="text" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Annual Income</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₹</span>
              <input {...register("motherIncome")} className="border w-full pl-7 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:border-primary focus:ring-primary h-11 px-4 text-sm" placeholder="e.g. 400000" type="number" />
            </div>
          </div>
        </div>
      </div>

      {/* Guardian Details */}
      <div className="bg-white dark:bg-background-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">shield_person</span>
            <h2 className="text-lg font-bold text-[#0d141b] dark:text-white">Guardian's Details</h2>
          </div>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Guardian's name</label>
            <input {...register("guardianName")} className={inputClass} placeholder="Full Name" type="text" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Mobile no.</label>
            <input {...register("guardianMobile")} className={inputClass} placeholder="+91 00000 00000" type="tel" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email ID</label>
            <input {...register("guardianEmail")} className={inputClass} placeholder="guardian@example.com" type="email" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Educational Qualification</label>
            <input {...register("guardianQualification")} className={inputClass} type="text" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Occupation</label>
            <input {...register("guardianOccupation")} className={inputClass} type="text" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Work Organization Name</label>
            <input {...register("guardianOrgName")} className={inputClass} type="text" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Designation</label>
            <input {...register("guardianDesignation")} className={inputClass} type="text" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Annual Income</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₹</span>
              <input {...register("guardianIncome")} className="border w-full pl-7 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:border-primary focus:ring-primary h-11 px-4 text-sm" type="number" />
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
      const present = watch(["presentLine1", "presentLine2", "presentCity", "presentState", "presentPincode"]);
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
          {/* Previous School Name */}
          <div className="md:col-span-2 flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Previous School Name <span className="text-red-500">*</span></label>
            <input {...register("schoolName")} className="border w-full h-11 px-4 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white text-sm focus:border-primary focus:ring-primary placeholder:text-slate-400" placeholder="Enter full school name" type="text" />
            <FieldError message={errors.schoolName?.message} />
          </div>

          {/* School Address - Added from image */}
          <div className="md:col-span-2 flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">School Address</label>
            <input {...register("schoolAddress")} className="border w-full h-11 px-4 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white text-sm focus:border-primary focus:ring-primary placeholder:text-slate-400" placeholder="Enter school address" type="text" />
          </div>

          {/* UDISE Code - Added from image */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">UDISE Code</label>
            <input {...register("udiseCode")} className="border w-full h-11 px-4 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white text-sm focus:border-primary focus:ring-primary placeholder:text-slate-400" placeholder="Enter UDISE code" type="text" />
          </div>

          {/* Board */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Affiliated Board / University <span className="text-red-500">*</span></label>
            <select {...register("board")} className="border appearance-none w-full h-11 px-4 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white text-sm focus:border-primary focus:ring-primary">
              <option value="">Select Board</option>
              {["CBSE", "ICSE", "State Board", "IB", "IGCSE", "Other"].map(b => <option key={b}>{b}</option>)}
            </select>
            <FieldError message={errors.board?.message} />
          </div>

          {/* T.C. Number - Added from image */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">T.C. Number</label>
            <input {...register("tcNumber")} className="border w-full h-11 px-4 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white text-sm focus:border-primary focus:ring-primary placeholder:text-slate-400" placeholder="Enter Transfer Certificate Number" type="text" />
          </div>

          {/* Last Class Passed */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Last Class Passed <span className="text-red-500">*</span></label>
            <select {...register("lastClass")} className="border appearance-none w-full h-11 px-4 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white text-sm focus:border-primary focus:ring-primary">
              <option value="">Select Class</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(g => <option key={g} value={`Grade ${g}`}>Grade {g}</option>)}
            </select>
            <FieldError message={errors.lastClass?.message} />
          </div>

          {/* Year of Passing */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Year of Passing <span className="text-red-500">*</span></label>
            <select {...register("yearOfPassing")} className="border appearance-none w-full h-11 px-4 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white text-sm focus:border-primary focus:ring-primary">
              {[2026, 2025, 2024, 2023, 2022, 2021, 2020].map(y => <option key={y} value={y}>{y}</option>)}
            </select>
            <FieldError message={errors.yearOfPassing?.message} />
          </div>

          {/* Percentage / Grade */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Percentage / Grade Obtained</label>
            <input {...register("percentage")} className="border w-full h-11 px-4 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white text-sm focus:border-primary focus:ring-primary placeholder:text-slate-400" placeholder="e.g. 85% or A+" type="text" />
          </div>

          {/* Medium of Instruction */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Medium of Instruction <span className="text-red-500">*</span></label>
            <div className="flex gap-6 mt-1">
              {["English", "Hindi", "Regional"].map(medium => (
                <label key={medium} className="flex items-center gap-2 cursor-pointer">
                  <input {...register("medium")} className="text-primary focus:ring-primary border-slate-300 dark:border-slate-600" name="medium" type="radio" value={medium} defaultChecked={medium === "English"} />
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{medium}</span>
                </label>
              ))}
            </div>
            <FieldError message={errors.medium?.message} />
          </div>

          {/* TC Availability Toggle */}
          <div className="md:col-span-2 p-5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-dashed border-slate-200 dark:border-slate-700 flex flex-col gap-3">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Is Transfer Certificate (TC) Available?</label>
            <div className="flex items-center gap-8">
              {[{ value: "yes", label: "Yes" }, { value: "no", label: "No (Pending)" }].map(({ value, label }) => (
                <label key={value} className="relative inline-flex items-center cursor-pointer">
                  <input {...register("tcAvailable")} className="sr-only peer" type="radio" value={value} defaultChecked={value === "no"} />
                  <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  <span className="ml-3 text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Remarks */}
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
    { label: "Registration Fee", amount: 250.00, color: "" },
    { label: "Processing & Admin Fee", amount: 50.00, color: "" },
    { label: "Early Bird Discount (10%)", amount: -30.00, color: "text-red-500" },
  ];
  const total = feeItems.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="flex flex-col lg:flex-row gap-6 bg-transparent">
      {/* Left Side: Student Summary (Based on image) */}
      <div className="lg:w-1/3  bg-white dark:bg-background-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
        <div className="flex items-center gap-2 mb-6">
          <span className="material-symbols-outlined text-primary text-xl">person</span>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">Student Summary</h2>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <div className="size-16 rounded-lg bg-slate-100 overflow-hidden border border-slate-200">
            {/* Placeholder for Arjun Sharma image */}
            <div className="w-full h-full bg-slate-300" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Arjun Sharma</h3>
            <p className="text-primary text-xs font-bold uppercase tracking-wider">REG2024001</p>
            <p className="text-slate-500 text-xs">Class: Grade 8 - Section A</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Guardian Name</label>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Mr. Rajesh Sharma</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Contact Number</label>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">+91 98765 43210</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Date of Birth</label>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">12 May 2010</p>
          </div>
        </div>
      </div>

      {/* Right Side: Fee Breakdown & Payment */}
      <div className="lg:w-2/3 bg-white dark:bg-background-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">receipt_long</span>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Fee Breakdown & Payment</h2>
        </div>

        <div className="p-8 space-y-6">
          <div className="bg-[#f8fbff] dark:bg-slate-800/40 rounded-xl overflow-hidden p-2">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-500">Description</th>
                  <th className="text-right px-4 py-3 font-semibold text-slate-500">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-transparent">
                {feeItems.map(item => (
                  <tr key={item.label}>
                    <td className="px-4 py-2 text-slate-600 dark:text-slate-400 font-medium">{item.label}</td>
                    <td className={`px-4 py-2 text-right font-bold ${item.color || "text-slate-900 dark:text-white"}`}>
                      {item.amount < 0 ? `-$${Math.abs(item.amount).toFixed(2)}` : `$${item.amount.toFixed(2)}`}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td className="px-4 pt-6 pb-4 text-slate-900 dark:text-white font-bold text-lg">Net Payable</td>
                  <td className="px-4 pt-6 pb-4 text-right text-primary font-bold text-2xl">${total.toFixed(2)}</td>
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
                    <input {...register("paymentMode")} className="hidden" type="radio" value={value} />
                    <div className={`size-4 rounded-full border flex items-center justify-center ${isActive ? "border-primary" : "border-slate-300"}`}>
                      {isActive && <div className="size-2 rounded-full bg-primary" />}
                    </div>
                    <div className="flex flex-col items-center">
                      <span className={`material-symbols-outlined mb-1 ${isActive ? "text-primary" : "text-slate-500"}`}>{icon}</span>
                      <span className={`text-xs font-bold ${isActive ? "text-primary" : "text-slate-600 dark:text-slate-400"}`}>{label}</span>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Transaction ID / Ref No.</label>
              <input {...register("transactionId")} className="border w-full h-11 px-4 bg-slate-50 dark:bg-slate-800 dark:text-white border-slate-100 dark:border-slate-700 rounded-lg text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="TXN-99008877" type="text" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Receipt Date</label>
              <input {...register("receiptDate")} className="border w-full h-11 px-4 bg-slate-50 dark:bg-slate-800 dark:text-white border-slate-100 dark:border-slate-700 rounded-lg text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" type="date" defaultValue="2024-10-27" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Payment Remarks</label>
            <textarea {...register("paymentRemarks")} className="border w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 dark:text-white border-slate-100 dark:border-slate-700 rounded-lg text-sm focus:border-primary outline-none resize-none" placeholder="e.g. Paid in full by parent at the front desk." rows={3} />
          </div>
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

          {
            currentStep == 3 && (
              <div class="mt-8 flex items-start gap-4 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/30">
                <span class="material-symbols-outlined text-amber-500">info</span>
                <div>
                  <p class="text-sm font-bold text-amber-900 dark:text-amber-200">Verification Required</p>
                  <p class="text-xs text-amber-800/80 dark:text-amber-300/80 mt-1 leading-relaxed">Ensure the 'School Name' matches the stamp on the TC. Any discrepancy will lead to registration rejection during manual audit.</p>
                </div>
              </div>
            )
          }

          {
            currentStep == 1 && (
              <div class="bg-primary/5 border border-primary/20 rounded-xl p-4 flex gap-4">
                <span class="material-symbols-outlined text-primary">info</span>
                <div>
                  <p class="text-sm font-semibold text-[#0d141b] dark:text-white">Note to Admin</p>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Fields marked with an asterisk (<span class="text-red-500">*</span>) are mandatory. Ensure the Aadhaar number is verified with the original document for security compliance.</p>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </main>
  );
};

export default NewRegistration;