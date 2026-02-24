
const AddStudent = () => {
    return (
        <>
            <div class="flex flex-wrap gap-2 text-sm">
                <a class="text-slate-500 dark:text-slate-400 font-medium hover:underline" href="#">Dashboard</a>
                <span class="text-slate-400 dark:text-slate-500">/</span>
                <a class="text-slate-500 dark:text-slate-400 font-medium hover:underline" href="#">Students</a>
                <span class="text-slate-400 dark:text-slate-500">/</span>
                <span class="text-slate-900 dark:text-slate-100 font-medium">Search Records</span>
            </div>
            <div class="flex flex-wrap justify-between items-end gap-4">
                <div class="flex flex-col gap-2">
                    <h1 class="text-slate-900 dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">Student Directory</h1>
                    <p class="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal max-w-2xl">Search and manage student records across all classes. View detailed profiles and academic history.</p>
                </div>
                <button class="flex items-center gap-2 cursor-pointer overflow-hidden rounded-lg h-12 px-6 bg-primary hover:bg-blue-600 transition-colors text-white text-sm font-bold leading-normal tracking-[0.015em] shadow-lg shadow-blue-500/20">
                    <span class="material-symbols-outlined text-[20px]">add</span>
                    <span class="truncate">Add New Student</span>
                </button>
            </div>
            <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-5 flex flex-col gap-6">
                <div class="relative w-full">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
                        <span class="material-symbols-outlined">search</span>
                    </div>
                    <input class="w-full h-14 pl-12 pr-4 rounded-lg bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base" placeholder="Search by Name, Student ID, or Parent Name..." type="text" />
                </div>
                <div class="flex flex-col lg:flex-row gap-4 items-end lg:items-center">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 w-full lg:w-auto flex-1">
                        <label class="flex flex-col gap-1.5">
                            <span class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Class</span>
                            <div class="relative">
                                <select class="w-full h-11 pl-3 pr-10 rounded-lg bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white appearance-none focus:ring-1 focus:ring-primary focus:border-primary text-sm cursor-pointer">
                                    <option value="">All Classes</option>
                                    <option value="9">Class 9</option>
                                    <option value="10">Class 10</option>
                                    <option value="11">Class 11</option>
                                    <option value="12">Class 12</option>
                                </select>
                                <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-500">
                                    <span class="material-symbols-outlined">expand_more</span>
                                </div>
                            </div>
                        </label>
                        <label class="flex flex-col gap-1.5">
                            <span class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Section</span>
                            <div class="relative">
                                <select class="w-full h-11 pl-3 pr-10 rounded-lg bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white appearance-none focus:ring-1 focus:ring-primary focus:border-primary text-sm cursor-pointer">
                                    <option value="">All Sections</option>
                                    <option value="A">Section A</option>
                                    <option value="B">Section B</option>
                                    <option value="C">Section C</option>
                                </select>
                                <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-500">
                                    <span class="material-symbols-outlined">expand_more</span>
                                </div>
                            </div>
                        </label>
                        <label class="flex flex-col gap-1.5">
                            <span class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Status</span>
                            <div class="relative">
                                <select class="w-full h-11 pl-3 pr-10 rounded-lg bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white appearance-none focus:ring-1 focus:ring-primary focus:border-primary text-sm cursor-pointer">
                                    <option value="">Any Status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="suspended">Suspended</option>
                                </select>
                                <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-500">
                                    <span class="material-symbols-outlined">expand_more</span>
                                </div>
                            </div>
                        </label>
                    </div>
                    <div class="flex items-center gap-3 w-full lg:w-auto mt-2 lg:mt-6">
                        <button class="flex-1 lg:flex-none h-11 px-6 bg-primary hover:bg-blue-600 text-white rounded-lg text-sm font-bold transition-colors shadow-sm">
                            Apply Filters
                        </button>
                        <button class="flex-1 lg:flex-none h-11 px-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-colors">
                            Clear
                        </button>
                    </div>
                </div>
            </div>
            <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                <th class="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                    <div class="flex items-center gap-1 cursor-pointer hover:text-slate-700 dark:hover:text-slate-200">
                                        Student ID <span class="material-symbols-outlined text-sm">unfold_more</span>
                                    </div>
                                </th>
                                <th class="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                    <div class="flex items-center gap-1 cursor-pointer hover:text-slate-700 dark:hover:text-slate-200">
                                        Full Name <span class="material-symbols-outlined text-sm">unfold_more</span>
                                    </div>
                                </th>
                                <th class="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Class</th>
                                <th class="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Section</th>
                                <th class="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Parent Contact</th>
                                <th class="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Status</th>
                                <th class="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                            <tr class="hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors group">
                                <td class="p-4 text-sm font-medium text-slate-900 dark:text-white whitespace-nowrap">#STU-2023-001</td>
                                <td class="p-4 text-sm font-bold text-slate-900 dark:text-white">
                                    <div class="flex items-center gap-3">
                                        <div class="size-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center text-xs font-bold">LJ</div>
                                        Liam Johnson
                                    </div>
                                </td>
                                <td class="p-4 text-sm text-slate-600 dark:text-slate-300">10</td>
                                <td class="p-4 text-sm text-slate-600 dark:text-slate-300">A</td>
                                <td class="p-4 text-sm text-slate-600 dark:text-slate-300">
                                    <div class="flex flex-col">
                                        <span class="text-slate-900 dark:text-white font-medium">Robert Johnson</span>
                                        <span class="text-xs text-slate-500">+1 (555) 123-4567</span>
                                    </div>
                                </td>
                                <td class="p-4">
                                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                        <span class="size-1.5 rounded-full bg-green-500"></span>
                                        Active
                                    </span>
                                </td>
                                <td class="p-4 text-right whitespace-nowrap">
                                    <div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button class="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all" title="View Profile">
                                            <span class="material-symbols-outlined text-[20px]">visibility</span>
                                        </button>
                                        <button class="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all" title="Edit Record">
                                            <span class="material-symbols-outlined text-[20px]">edit</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr class="hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors group">
                                <td class="p-4 text-sm font-medium text-slate-900 dark:text-white whitespace-nowrap">#STU-2023-002</td>
                                <td class="p-4 text-sm font-bold text-slate-900 dark:text-white">
                                    <div class="flex items-center gap-3">
                                        <div class="size-8 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 flex items-center justify-center text-xs font-bold">ES</div>
                                        Emma Smith
                                    </div>
                                </td>
                                <td class="p-4 text-sm text-slate-600 dark:text-slate-300">10</td>
                                <td class="p-4 text-sm text-slate-600 dark:text-slate-300">B</td>
                                <td class="p-4 text-sm text-slate-600 dark:text-slate-300">
                                    <div class="flex flex-col">
                                        <span class="text-slate-900 dark:text-white font-medium">Sarah Smith</span>
                                        <span class="text-xs text-slate-500">+1 (555) 987-6543</span>
                                    </div>
                                </td>
                                <td class="p-4">
                                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                        <span class="size-1.5 rounded-full bg-green-500"></span>
                                        Active
                                    </span>
                                </td>
                                <td class="p-4 text-right whitespace-nowrap">
                                    <div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button class="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all" title="View Profile">
                                            <span class="material-symbols-outlined text-[20px]">visibility</span>
                                        </button>
                                        <button class="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all" title="Edit Record">
                                            <span class="material-symbols-outlined text-[20px]">edit</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr class="hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors group">
                                <td class="p-4 text-sm font-medium text-slate-900 dark:text-white whitespace-nowrap">#STU-2023-045</td>
                                <td class="p-4 text-sm font-bold text-slate-900 dark:text-white">
                                    <div class="flex items-center gap-3">
                                        <div class="size-8 rounded-full bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 flex items-center justify-center text-xs font-bold">NB</div>
                                        Noah Brown
                                    </div>
                                </td>
                                <td class="p-4 text-sm text-slate-600 dark:text-slate-300">11</td>
                                <td class="p-4 text-sm text-slate-600 dark:text-slate-300">A</td>
                                <td class="p-4 text-sm text-slate-600 dark:text-slate-300">
                                    <div class="flex flex-col">
                                        <span class="text-slate-900 dark:text-white font-medium">Michael Brown</span>
                                        <span class="text-xs text-slate-500">+1 (555) 234-5678</span>
                                    </div>
                                </td>
                                <td class="p-4">
                                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300">
                                        <span class="size-1.5 rounded-full bg-slate-500"></span>
                                        Inactive
                                    </span>
                                </td>
                                <td class="p-4 text-right whitespace-nowrap">
                                    <div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button class="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all" title="View Profile">
                                            <span class="material-symbols-outlined text-[20px]">visibility</span>
                                        </button>
                                        <button class="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all" title="Edit Record">
                                            <span class="material-symbols-outlined text-[20px]">edit</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr class="hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors group">
                                <td class="p-4 text-sm font-medium text-slate-900 dark:text-white whitespace-nowrap">#STU-2023-088</td>
                                <td class="p-4 text-sm font-bold text-slate-900 dark:text-white">
                                    <div class="flex items-center gap-3">
                                        <div class="size-8 rounded-full bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-300 flex items-center justify-center text-xs font-bold">OA</div>
                                        Olivia Anderson
                                    </div>
                                </td>
                                <td class="p-4 text-sm text-slate-600 dark:text-slate-300">9</td>
                                <td class="p-4 text-sm text-slate-600 dark:text-slate-300">C</td>
                                <td class="p-4 text-sm text-slate-600 dark:text-slate-300">
                                    <div class="flex flex-col">
                                        <span class="text-slate-900 dark:text-white font-medium">David Anderson</span>
                                        <span class="text-xs text-slate-500">+1 (555) 876-5432</span>
                                    </div>
                                </td>
                                <td class="p-4">
                                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                        <span class="size-1.5 rounded-full bg-green-500"></span>
                                        Active
                                    </span>
                                </td>
                                <td class="p-4 text-right whitespace-nowrap">
                                    <div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button class="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all" title="View Profile">
                                            <span class="material-symbols-outlined text-[20px]">visibility</span>
                                        </button>
                                        <button class="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all" title="Edit Record">
                                            <span class="material-symbols-outlined text-[20px]">edit</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr class="hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors group">
                                <td class="p-4 text-sm font-medium text-slate-900 dark:text-white whitespace-nowrap">#STU-2023-102</td>
                                <td class="p-4 text-sm font-bold text-slate-900 dark:text-white">
                                    <div class="flex items-center gap-3">
                                        <div class="size-8 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300 flex items-center justify-center text-xs font-bold">WM</div>
                                        William Martinez
                                    </div>
                                </td>
                                <td class="p-4 text-sm text-slate-600 dark:text-slate-300">12</td>
                                <td class="p-4 text-sm text-slate-600 dark:text-slate-300">A</td>
                                <td class="p-4 text-sm text-slate-600 dark:text-slate-300">
                                    <div class="flex flex-col">
                                        <span class="text-slate-900 dark:text-white font-medium">Maria Martinez</span>
                                        <span class="text-xs text-slate-500">+1 (555) 345-6789</span>
                                    </div>
                                </td>
                                <td class="p-4">
                                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                                        <span class="size-1.5 rounded-full bg-red-500"></span>
                                        Suspended
                                    </span>
                                </td>
                                <td class="p-4 text-right whitespace-nowrap">
                                    <div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button class="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all" title="View Profile">
                                            <span class="material-symbols-outlined text-[20px]">visibility</span>
                                        </button>
                                        <button class="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all" title="Edit Record">
                                            <span class="material-symbols-outlined text-[20px]">edit</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="p-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div class="text-sm text-slate-500 dark:text-slate-400">
                        Showing <span class="font-bold text-slate-900 dark:text-white">1</span> to <span class="font-bold text-slate-900 dark:text-white">10</span> of <span class="font-bold text-slate-900 dark:text-white">128</span> results
                    </div>
                    <div class="flex items-center gap-2">
                        <button class="px-3 py-1 rounded border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50" disabled="">Previous</button>
                        <button class="px-3 py-1 rounded bg-primary text-white text-sm font-bold">1</button>
                        <button class="px-3 py-1 rounded border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm hover:bg-slate-50 dark:hover:bg-slate-800">2</button>
                        <button class="px-3 py-1 rounded border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm hover:bg-slate-50 dark:hover:bg-slate-800">3</button>
                        <span class="text-slate-400">...</span>
                        <button class="px-3 py-1 rounded border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm hover:bg-slate-50 dark:hover:bg-slate-800">12</button>
                        <button class="px-3 py-1 rounded border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm hover:bg-slate-50 dark:hover:bg-slate-800">Next</button>
                    </div>
                </div>
            </div>
        </>
    );
};
export default AddStudent;