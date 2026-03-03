import { GiPresent } from "react-icons/gi";
import { Md10Mp, MdPayments, MdPeople } from "react-icons/md";
import { RiSchoolLine } from "react-icons/ri";
import { SiCohost } from "react-icons/si";


const Dashboard = () => {
  return (
     <>

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

              <div className="flex flex-col justify-between rounded-xl bg-white dark:bg-[#1a2632] p-5 shadow-sm border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between mb-4">
                  <div className="size-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    {/* <span className="material-symbols-outlined">school</span> */}
              <RiSchoolLine className="text-xl" />
                    
                  </div>
                  <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-full">
                    <span className="material-symbols-outlined text-[14px] mr-1">trending_up</span> +5.2%
                  </span>
                </div>
                <div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Total Students</p>
                  <h3 className="text-slate-900 dark:text-white text-2xl font-bold">1,250</h3>
                </div>
              </div>

              <div className="flex flex-col justify-between rounded-xl bg-white dark:bg-[#1a2632] p-5 shadow-sm border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between mb-4">
                  <div className="size-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                    <span className="material-symbols-outlined"><MdPeople className="text-xl"/> </span>
                  </div>
                  <span className="flex items-center text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full">
                    <span className="material-symbols-outlined text-[14px] mr-1">remove</span> 0%
                  </span>
                </div>
                <div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Total Staff</p>
                  <h3 className="text-slate-900 dark:text-white text-2xl font-bold">85</h3>
                </div>
              </div>

              <div className="flex flex-col justify-between rounded-xl bg-white dark:bg-[#1a2632] p-5 shadow-sm border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between mb-4">
                  <div className="size-10 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <span className="material-symbols-outlined"><GiPresent /> </span>
                  </div>
                  <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-full">
                    <span className="material-symbols-outlined text-[14px] mr-1">trending_up</span> +1.2%
                  </span>
                </div>
                <div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Today Present</p>
                  <h3 className="text-slate-900 dark:text-white text-2xl font-bold">92%</h3>
                </div>
              </div>

              <div className="flex flex-col justify-between rounded-xl bg-white dark:bg-[#1a2632] p-5 shadow-sm border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between mb-4">
                  <div className="size-10 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                    <span className="material-symbols-outlined"><MdPayments className="text-3xl"/> </span>
                  </div>
                  <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-full">
                    <span className="material-symbols-outlined text-[14px] mr-1">trending_up</span> +12%
                  </span>
                </div>
                <div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Fee Collection (Today)</p>
                  <h3 className="text-slate-900 dark:text-white text-2xl font-bold">$4,500</h3>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              <div className="lg:col-span-2 rounded-xl bg-white dark:bg-[#1a2632] p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-slate-900 dark:text-white text-lg font-bold">Monthly Fee Collection</h3>
                    <p className="text-slate-500 text-sm">Revenue trends over the last 30 days</p>
                  </div>
                  <div className="text-right">
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white">$45,200</h4>
                    <span className="text-emerald-500 text-sm font-medium">+12% vs last month</span>
                  </div>
                </div>
                <div className="flex-1 min-h-[250px] w-full relative">

                  <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 800 200">

                    <line stroke="#e2e8f0" strokeWidth="1" x1="0" x2="800" y1="199" y2="199"></line>
                    <line stroke="#e2e8f0" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="800" y1="150" y2="150"></line>
                    <line stroke="#e2e8f0" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="800" y1="100" y2="100"></line>
                    <line stroke="#e2e8f0" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="800" y1="50" y2="50"></line>

                    <path d="M0,150 C50,150 50,80 100,80 C150,80 150,120 200,120 C250,120 250,40 300,40 C350,40 350,90 400,90 C450,90 450,60 500,60 C550,60 550,140 600,140 C650,140 650,30 700,30 C750,30 750,70 800,70" fill="none" stroke="#137fec" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>

                    <defs>
                      <lineargradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#137fec" stopOpacity="0.2"></stop>
                        <stop offset="100%" stopColor="#137fec" stopOpacity="0"></stop>
                      </lineargradient>
                    </defs>
                    <path d="M0,150 C50,150 50,80 100,80 C150,80 150,120 200,120 C250,120 250,40 300,40 C350,40 350,90 400,90 C450,90 450,60 500,60 C550,60 550,140 600,140 C650,140 650,30 700,30 C750,30 750,70 800,70 V200 H0 Z" fill="url(#chartGradient)"></path>

                    <circle cx="300" cy="40" fill="#fff" r="4" stroke="#137fec" strokeWidth="2"></circle>
                    <circle cx="700" cy="30" fill="#fff" r="4" stroke="#137fec" strokeWidth="2"></circle>
                  </svg>
                </div>
                <div className="flex justify-between mt-4 text-xs text-slate-400 font-medium uppercase tracking-wider">
                  <span>Week 1</span>
                  <span>Week 2</span>
                  <span>Week 3</span>
                  <span>Week 4</span>
                </div>
              </div>

              <div className="rounded-xl bg-white dark:bg-[#1a2632] p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col">
                <div className="mb-6">
                  <h3 className="text-slate-900 dark:text-white text-lg font-bold">Attendance Summary</h3>
                  <p className="text-slate-500 text-sm">Today's breakdown</p>
                </div>
                <div className="flex-1 flex flex-col justify-center gap-6">

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-700 dark:text-slate-200 font-medium">Present</span>
                        <span className="text-slate-900 dark:text-white font-bold">92%</span>
                      </div>
                      <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: "92%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-700 dark:text-slate-200 font-medium">Absent</span>
                        <span className="text-slate-900 dark:text-white font-bold">5%</span>
                      </div>
                      <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-rose-500 rounded-full" style={{ width: "5%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-700 dark:text-slate-200 font-medium">On Leave</span>
                        <span className="text-slate-900 dark:text-white font-bold">3%</span>
                      </div>
                      <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full" style={{ width: "3%" }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-500 font-medium uppercase">Total Checked In</span>
                      <span className="text-xl font-bold text-slate-900 dark:text-white">1,150</span>
                    </div>
                    <button className="text-primary text-sm font-semibold hover:underline">View Details</button>
                  </div>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">

              <div className="xl:col-span-2 rounded-xl bg-white dark:bg-[#1a2632] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <h3 className="text-slate-900 dark:text-white text-lg font-bold">Recent Fee Transactions</h3>
                  <button className="text-sm font-semibold text-primary hover:text-primary/80">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                        <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Student Name</th>
                        <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Class</th>
                        <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
                        <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                        <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      <tr className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="size-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">JD</div>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">John Doe</p>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-slate-600 dark:text-slate-400">10-A</td>
                        <td className="p-4 text-sm font-semibold text-slate-900 dark:text-white">$500</td>
                        <td className="p-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                            Paid
                          </span>
                        </td>
                        <td className="p-4 text-sm text-slate-500">Oct 24, 2023</td>
                      </tr>
                      <tr className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="size-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-xs font-bold">JS</div>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">Jane Smith</p>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-slate-600 dark:text-slate-400">9-B</td>
                        <td className="p-4 text-sm font-semibold text-slate-900 dark:text-white">$500</td>
                        <td className="p-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                            Pending
                          </span>
                        </td>
                        <td className="p-4 text-sm text-slate-500">Oct 24, 2023</td>
                      </tr>
                      <tr className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="size-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">MB</div>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">Michael Brown</p>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-slate-600 dark:text-slate-400">10-A</td>
                        <td className="p-4 text-sm font-semibold text-slate-900 dark:text-white">$500</td>
                        <td className="p-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                            Paid
                          </span>
                        </td>
                        <td className="p-4 text-sm text-slate-500">Oct 23, 2023</td>
                      </tr>
                      <tr className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="size-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold">ED</div>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">Emily Davis</p>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-slate-600 dark:text-slate-400">8-C</td>
                        <td className="p-4 text-sm font-semibold text-slate-900 dark:text-white">$300</td>
                        <td className="p-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400">
                            Overdue
                          </span>
                        </td>
                        <td className="p-4 text-sm text-slate-500">Oct 22, 2023</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="rounded-xl bg-white dark:bg-[#1a2632] shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-slate-900 dark:text-white text-lg font-bold">Today's Events</h3>
                </div>
                <div className="p-6 flex-1 overflow-y-auto max-h-[400px]">
                  <div className="relative pl-6 border-l-2 border-slate-200 dark:border-slate-700 space-y-8">
                    <div className="relative">
                      <div className="absolute -left-[29px] top-1 size-4 rounded-full border-2 border-white dark:border-[#1a2632] bg-primary ring-2 ring-primary/20"></div>
                      <p className="text-xs font-bold text-primary mb-1">09:00 AM</p>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">Morning Assembly</h4>
                      <p className="text-xs text-slate-500 mt-1">Main Ground - All Staff</p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[29px] top-1 size-4 rounded-full border-2 border-white dark:border-[#1a2632] bg-indigo-500 ring-2 ring-indigo-500/20"></div>
                      <p className="text-xs font-bold text-indigo-500 mb-1">10:30 AM</p>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">Math Exam (Grade 10)</h4>
                      <p className="text-xs text-slate-500 mt-1">Hall A &amp; B</p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[29px] top-1 size-4 rounded-full border-2 border-white dark:border-[#1a2632] bg-amber-500 ring-2 ring-amber-500/20"></div>
                      <p className="text-xs font-bold text-amber-500 mb-1">02:00 PM</p>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">Staff Meeting</h4>
                      <p className="text-xs text-slate-500 mt-1">Conference Room 1</p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[29px] top-1 size-4 rounded-full border-2 border-white dark:border-[#1a2632] bg-slate-400 ring-2 ring-slate-400/20"></div>
                      <p className="text-xs font-bold text-slate-500 mb-1">04:00 PM</p>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">Sports Practice</h4>
                      <p className="text-xs text-slate-500 mt-1">Field 2</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 rounded-b-xl">
                  <button className="w-full py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">calendar_month</span> View Calendar
                  </button>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="flex flex-col items-center justify-center p-6 bg-white dark:bg-[#1a2632] rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:shadow-md transition-all group">
                  <div className="size-12 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[24px]">person_add</span>
                  </div>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-primary">Add Student</span>
                </button>
                <button className="flex flex-col items-center justify-center p-6 bg-white dark:bg-[#1a2632] rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:shadow-md transition-all group">
                  <div className="size-12 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[24px]">assignment_turned_in</span>
                  </div>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-primary">Take Attendance</span>
                </button>
                <button className="flex flex-col items-center justify-center p-6 bg-white dark:bg-[#1a2632] rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:shadow-md transition-all group">
                  <div className="size-12 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[24px]">payments</span>
                  </div>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-primary">Collect Fee</span>
                </button>
                <button className="flex flex-col items-center justify-center p-6 bg-white dark:bg-[#1a2632] rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:shadow-md transition-all group">
                  <div className="size-12 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[24px]">monitoring</span>
                  </div>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-primary">View Reports</span>
                </button>
              </div>
            </section>
            
          </>
  );
};

export default Dashboard;
