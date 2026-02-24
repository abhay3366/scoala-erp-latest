import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  MdDashboard,
  MdGroups,
  MdCalendarToday,
  MdMenuBook,
  MdCampaign,
  MdQuiz,
  MdPayments,
  MdWorkspacePremium,
  MdInventory2,
  MdReceiptLong,
  MdBadge,
  MdLocalLibrary,
  MdSettings,
  MdSchool,
  MdExpandMore,
  MdClose,
  MdMenu,
} from "react-icons/md";

const MENU = [
  { icon: MdDashboard, label: "Dashboard", link: "/" },
  { icon: MdGroups, label: "Student", link: "/student" },
  {
    icon: MdCalendarToday, label: "Attendance", link: "/attendance",
    sub: [
      { label: "Daily Attendance", link: "/attendance/daily" },
      { label: "Monthly Report", link: "/attendance/monthly" },
      { label: "Leave Requests", link: "/attendance/leave" },
    ],
  },
  {
    icon: MdMenuBook, label: "Academic", link: "/academic",
    sub: [
      { label: "Classes", link: "/academic/classes" },
      { label: "Subjects", link: "/academic/subjects" },
      { label: "Timetable", link: "/academic/timetable" },
      { label: "Homework", link: "/academic/homework" },
    ],
  },
  {
    icon: MdCampaign, label: "Events & Circular", link: "/event-circular",
    sub: [
      { label: "Events", link: "/event-circular/events" },
      { label: "Circulars", link: "/event-circular/circulars" },
      { label: "Notices", link: "/event-circular/notices" },
    ],
  },
  {
    icon: MdQuiz, label: "Examination", link: "/exam",
    sub: [
      { label: "Exam Schedule", link: "/exam/schedule" },
      { label: "Result", link: "/exam/result" },
      { label: "Grade Card", link: "/exam/grade-card" },
      { label: "Report Card", link: "/exam/report-card" },
      { label: "Admit Card", link: "/exam/admit-card" },
    ],
  },
  {
    icon: MdPayments, label: "Fee Management", link: "/fee",
    sub: [
      { label: "Fee Structure", link: "/fee/structure" },
      { label: "Collect Fee", link: "/fee/collect" },
      { label: "Due List", link: "/fee/due" },
      { label: "Receipts", link: "/fee/receipts" },
    ],
  },
  {
    icon: MdWorkspacePremium, label: "Certificate", link: "/certificate",
    sub: [
      { label: "Bonafide", link: "/certificate/bonafide" },
      { label: "Character", link: "/certificate/character" },
      { label: "Custom", link: "/certificate/custom" },
    ],
  },
  {
    icon: MdInventory2, label: "Inventory", link: "/inventory",
    sub: [
      { label: "Items", link: "/inventory/items" },
      { label: "Stock", link: "/inventory/stock" },
      { label: "Issue", link: "/inventory/issue" },
    ],
  },
  {
    icon: MdReceiptLong, label: "Expenses", link: "/expenses",
    sub: [
      { label: "Add Expense", link: "/expenses/add" },
      { label: "Expense List", link: "/expenses/list" },
      { label: "Categories", link: "/expenses/categories" },
    ],
  },
  {
    icon: MdBadge, label: "HR & Payroll", link: "/hr-payroll",
    sub: [
      { label: "Staff", link: "/hr-payroll/staff" },
      { label: "Payroll", link: "/hr-payroll/payroll" },
      { label: "Attendance", link: "/hr-payroll/attendance" },
      { label: "Leave", link: "/hr-payroll/leave" },
    ],
  },
  {
    icon: MdLocalLibrary, label: "Library", link: "/library",
    sub: [
      { label: "Books", link: "/library/books" },
      { label: "Issue & Return", link: "/library/issue" },
      { label: "Members", link: "/library/members" },
    ],
  },
  {
    icon: MdSettings, label: "Settings", link: "/settings",
    sub: [
      { label: "General", link: "/settings/general" },
      { label: "School Profile", link: "/settings/school" },
      { label: "Users & Roles", link: "/settings/users" },
      { label: "Notifications", link: "/settings/notifications" },
    ],
  },
];

const COLLAPSED = 72;
const EXPANDED = 256;

// ── SubMenu ────────────────────────────────────────────────────────────────
const SubMenu = ({ items, isOpen }) => {
  const location = useLocation();
  const innerRef = useRef(null);
  const [maxH, setMaxH] = useState(0);
  const [mounted, setMounted] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      requestAnimationFrame(() =>
        requestAnimationFrame(() =>
          setMaxH(innerRef.current?.scrollHeight ?? 400)
        )
      );
    } else {
      setMaxH(0);
      const t = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <div
      style={{
        maxHeight: maxH,
        opacity: maxH > 0 ? 1 : 0,
        overflow: "hidden",
        transition:
          "max-height 0.32s cubic-bezier(0.4,0,0.2,1), opacity 0.22s ease",
      }}
    >
      <div
        ref={innerRef}
        className="flex flex-col gap-0.5 pt-0.5 pb-2"
        style={{ paddingLeft: 52, paddingRight: 8 }}
      >
        {items.map((sub, i) => {
          const active = location.pathname === sub.link;
          return (
            <Link
              key={sub.link}
              to={sub.link}
              style={{
                opacity: maxH > 0 ? 1 : 0,
                transform: maxH > 0 ? "translateX(0)" : "translateX(-6px)",
                transition: `opacity 0.2s ease ${i * 0.045}s, transform 0.2s ease ${i * 0.045}s`,
                whiteSpace: "nowrap",
              }}
              className={`
                flex items-center gap-2 px-3 py-1.75 rounded-lg text-[13px]
                transition-colors duration-150
                ${active
                  ? "text-primary font-semibold bg-primary/10"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white"
                }
              `}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                  active ? "bg-primary" : "bg-slate-300 dark:bg-slate-600"
                }`}
              />
              {sub.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

// ── Main Sidebar ───────────────────────────────────────────────────────────
const Sidebar = ({ isSidebarOpen, closeSidebar }) => {
  const location = useLocation();
  const sidebarRef = useRef(null);
  const leaveTimer = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [openMenus, setOpenMenus] = useState({});

  const isParentActive = (item) =>
    location.pathname === item.link ||
    item.sub?.some((s) => location.pathname.startsWith(s.link));

  const handleMouseEnter = () => {
    clearTimeout(leaveTimer.current);
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    leaveTimer.current = setTimeout(() => {
      setIsExpanded(false);
      setOpenMenus({});
    }, 120);
  };

  useEffect(() => {
    const handler = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target))
        closeSidebar?.();
    };
    if (isSidebarOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isSidebarOpen, closeSidebar]);

  useEffect(() => {
    if (!isExpanded) setOpenMenus({});
  }, [isExpanded]);

  useEffect(() => () => clearTimeout(leaveTimer.current), []);

  const toggleMenu = (link) =>
    setOpenMenus((p) => ({ ...p, [link]: !p[link] }));

  return (
    <>
      {/* Mobile backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Desktop spacer */}
      <div
        className="hidden md:block flex-shrink-0"
        style={{ width: COLLAPSED, minWidth: COLLAPSED }}
      />

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          width: isExpanded ? EXPANDED : COLLAPSED,
          transition: "width 0.28s cubic-bezier(0.4,0,0.2,1)",
          willChange: "width",
          overflowX: "clip",
          overflowY: "hidden",
        }}
        className={`
          fixed top-0 left-0 h-screen z-40
          bg-white dark:bg-[#1a2632]
          border-r border-slate-200 dark:border-slate-700
          flex flex-col flex-shrink-0 shadow-sm
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          transition-transform duration-300 md:transition-none
        `}
      >
        {/* ── Logo ── */}
        <div className="flex items-center gap-3 px-[18px] py-4 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
          <div className="size-9 flex items-center justify-center rounded-xl bg-primary/10 text-primary flex-shrink-0">
            <MdSchool size={20} />
          </div>
          <div
            className="overflow-hidden"
            style={{
              opacity: isExpanded ? 1 : 0,
              maxWidth: isExpanded ? 200 : 0,
              transform: isExpanded ? "translateX(0)" : "translateX(-8px)",
              transition:
                "opacity 0.2s ease 0.05s, transform 0.2s ease 0.05s, max-width 0.28s ease",
              whiteSpace: "nowrap",
            }}
          >
            <p className="text-sm font-bold text-slate-800 dark:text-white">
              My School
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              AY 2024-25
            </p>
          </div>
        </div>

        {/* ── Navigation ── */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-2 space-y-0.5">
          {MENU.map((item) => {
            const parentActive = isParentActive(item);
            const hasSub = !!item.sub?.length;
            const isOpen = !!openMenus[item.link] && isExpanded;
            const Icon = item.icon;

            const rowBase = `
              flex items-center gap-3 rounded-xl text-sm text-left
              transition-colors duration-150 px-[14px] py-2.5 w-full
              ${parentActive
                ? "bg-primary/10 text-primary font-semibold"
                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50"
              }
            `;

            return (
              <div key={item.link}>
                {hasSub ? (
                  <button
                    onClick={() => isExpanded && toggleMenu(item.link)}
                    title={!isExpanded ? item.label : ""}
                    className={rowBase}
                  >
                    {/* Icon */}
                    <Icon
                      size={22}
                      className={`flex-shrink-0 ${
                        parentActive
                          ? "text-primary"
                          : "text-slate-500 dark:text-slate-400"
                      }`}
                      style={{ minWidth: 22 }}
                    />

                    {/* Label + Chevron */}
                    <span
                      className="flex-1 flex items-center justify-between overflow-hidden"
                      style={{
                        opacity: isExpanded ? 1 : 0,
                        maxWidth: isExpanded ? 999 : 0,
                        transform: isExpanded
                          ? "translateX(0)"
                          : "translateX(-10px)",
                        transition:
                          "opacity 0.22s ease 0.06s, transform 0.22s ease 0.06s, max-width 0.28s ease",
                        whiteSpace: "nowrap",
                        pointerEvents: "none",
                      }}
                    >
                      <span className="truncate">{item.label}</span>
                      <MdExpandMore
                        size={18}
                        className="text-slate-400 ml-1 flex-shrink-0"
                        style={{
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.28s cubic-bezier(0.4,0,0.2,1)",
                        }}
                      />
                    </span>
                  </button>
                ) : (
                  <Link
                    to={item.link}
                    onClick={closeSidebar}
                    title={!isExpanded ? item.label : ""}
                    className={rowBase}
                  >
                    {/* Icon */}
                    <Icon
                      size={22}
                      className={`flex-shrink-0 ${
                        parentActive
                          ? "text-primary"
                          : "text-slate-500 dark:text-slate-400"
                      }`}
                      style={{ minWidth: 22 }}
                    />

                    {/* Label */}
                    <span
                      className="truncate"
                      style={{
                        opacity: isExpanded ? 1 : 0,
                        maxWidth: isExpanded ? 999 : 0,
                        transform: isExpanded
                          ? "translateX(0)"
                          : "translateX(-10px)",
                        transition:
                          "opacity 0.22s ease 0.06s, transform 0.22s ease 0.06s, max-width 0.28s ease",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        display: "block",
                      }}
                    >
                      {item.label}
                    </span>
                  </Link>
                )}

                {hasSub && <SubMenu items={item.sub} isOpen={isOpen} />}
              </div>
            );
          })}
        </nav>

        {/* ── Footer ── */}
        <div
          className="px-4 py-3 border-t border-slate-200 dark:border-slate-700 flex-shrink-0"
          style={{
            opacity: isExpanded ? 1 : 0,
            transition: "opacity 0.2s ease",
          }}
        >
          <p className="text-xs text-slate-400 text-center whitespace-nowrap">
            © {new Date().getFullYear()} School ERP
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;