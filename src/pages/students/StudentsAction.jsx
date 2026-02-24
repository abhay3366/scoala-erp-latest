import { Link } from "react-router-dom";
import { MdPersonAdd, MdGroups, MdHowToReg, MdSwapHoriz, MdBadge } from "react-icons/md";

const actions = [
  {
    label: "Add Student",
    to: "/student/registration-list",
    icon: MdPersonAdd,
    bg: "bg-blue-50 dark:bg-blue-900/20",
    text: "text-blue-600",
  },
  {
    label: "All Students",
    to: "/student/all-student",
    icon: MdGroups,
    bg: "bg-blue-50 dark:bg-blue-900/20",
    text: "text-blue-600",
  },
  {
    label: "Admission",
    to: "/student/new-admission",
    icon: MdHowToReg,
    bg: "bg-indigo-50 dark:bg-indigo-900/20",
    text: "text-indigo-600",
  },
  {
    label: "Transfer Certificate",
    to: "/student/transfer-certificate",
    icon: MdSwapHoriz,
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    text: "text-emerald-600",
  },
  {
    label: "Student ID Card",
    to: "/student/id-card",
    icon: MdBadge,
    bg: "bg-amber-50 dark:bg-amber-900/20",
    text: "text-amber-600",
  },
];

const StudentsAction = () => {
  return (
    <section>
      <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-4">
        Quick Actions
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {actions.map(({ to, icon: Icon, label, bg, text }) => (
          <Link
            key={to}
            to={to}
            className="flex flex-col items-center justify-center p-6 bg-white dark:bg-[#1a2632] rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:shadow-md transition-all group"
          >
            <div
              className={`size-12 rounded-full ${bg} ${text} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
            >
              <Icon size={24} />
            </div>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-primary">
              {label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default StudentsAction;