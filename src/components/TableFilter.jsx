/**
 * TableFilter — a reusable filter bar component.
 *
 * Props:
 *   filters: Array<{
 *     key: string,           // unique identifier
 *     label: string,         // display label
 *     icon?: string,         // optional material-symbol name shown before label
 *   }>
 *   onReset: () => void      // called when Reset is clicked
 *
 * Each filter button fires an onFilterClick(key) callback so the parent can
 * open a dropdown, modal, etc.  The component is intentionally "dumb" — it
 * only renders the bar; state lives in the parent.
 *
 * Example usage:
 *
 *   const FILTERS = [
 *     { key: "session",  label: "Session: 2024-25" },
 *     { key: "class",    label: "Class: All Classes" },
 *     { key: "gender",   label: "Gender: All" },
 *     { key: "status",   label: "Status: All Status" },
 *     { key: "dateRange",label: "Date Range", icon: "calendar_today" },
 *   ];
 *
 *   <TableFilter
 *     filters={FILTERS}
 *     onFilterClick={(key) => console.log("clicked", key)}
 *     onReset={() => console.log("reset")}
 *   />
 */

const TableFilter = ({ filters = [], onFilterClick, onReset }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3 px-1">
        <span className="material-symbols-outlined text-gray-400 text-lg">filter_alt</span>
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400">
          Filter Records
        </h3>
      </div>

      <div className="flex flex-wrap gap-3">
        {filters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => onFilterClick?.(filter.key)}
            className="flex h-10 items-center gap-x-2 rounded-lg bg-gray-100 dark:bg-gray-800 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {filter.icon && (
              <span className="material-symbols-outlined text-[18px]">{filter.icon}</span>
            )}
            <span className="text-sm font-medium">{filter.label}</span>
            <span className="material-symbols-outlined text-[18px]">expand_more</span>
          </button>
        ))}

        {/* Spacer pushes Reset to the right */}
        <div className="flex-grow" />

        <button
          onClick={onReset}
          className="flex h-10 items-center gap-2 rounded-lg border-2 border-primary text-primary px-4 font-bold text-sm hover:bg-primary/5 transition-colors"
        >
          <span className="material-symbols-outlined text-lg">refresh</span>
          Reset
        </button>
      </div>
    </div>
  );
};

export default TableFilter;