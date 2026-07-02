type IconRow = { label: string; icon: "building" | "home" | "layers" | "map" | "villa" | "briefcase" };

const propertyTypes: IconRow[] = [
  { label: "Flats", icon: "building" },
  { label: "Houses", icon: "home" },
  { label: "Builder floors", icon: "layers" },
  { label: "Plots", icon: "map" },
  { label: "Villas", icon: "villa" },
  { label: "Commercial properties", icon: "briefcase" },
];

const popularAreas = [
  "Palam Vihar",
  "Sector 93",
  "Sector 57",
  "Sector 11",
  "Sector 8",
  "Civil Lines",
];

const searchByBhk = [
  "1 RK Properties",
  "1 BHK Properties",
  "2 BHK Properties",
  "3 BHK Properties",
  "1 BHK Houses",
  "2 BHK Houses",
];

const popularSearches = [
  "Flats without brokerage",
  "Under construction flats",
  "Affordable projects for sale",
  "Ready to move-in projects",
  "New residential projects",
  "Resale properties",
];

function PropertyIcon({ name }: { name: IconRow["icon"] }) {
  const cls = "size-[1.125rem] shrink-0 text-neutral-500";
  switch (name) {
    case "building":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden>
          <path d="M4 21V8l8-5 8 5v13M9 21v-4h6v4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "home":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden>
          <path d="M4 10 12 3l8 7v10a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1V10Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "layers":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden>
          <path d="m12.83 2.18 8 3.6a1 1 0 0 1 0 1.82l-8 3.6a2 2 0 0 1-1.66 0l-8-3.6a1 1 0 0 1 0-1.82l8-3.6a2 2 0 0 1 1.66 0Z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 12.5 12 17l10-4.5M2 17l10 4.5 10-4.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "map":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden>
          <path d="M9 20l-5.5-2.7A1 1 0 0 1 3 16.4V5.6a1 1 0 0 1 1.4-.9L9 6l6-2 5.5 2.7A1 1 0 0 1 21 7.6v10.8a1 1 0 0 1-1.4.9L15 18l-6 2Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "villa":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden>
          <path d="M3 21h18M5 21V10l7-7 7 7v11M9 21v-5h6v5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "briefcase":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden>
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M4 9h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}

const rowInteractive =
  "w-full cursor-pointer rounded-lg px-3 py-2.5 text-left text-sm font-medium text-neutral-900 transition-[background-color,color] duration-150 ease-out hover:bg-black/[0.035] active:bg-black/[0.055] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-purple-800/25 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

function TextItem({ children }: { children: string }) {
  return (
    <button type="button" className={rowInteractive}>
      {children}
    </button>
  );
}

function IconItem({ row }: { row: IconRow }) {
  return (
    <button type="button" className={`flex items-center gap-3 ${rowInteractive}`}>
      <PropertyIcon name={row.icon} />
      <span className="min-w-0 flex-1 truncate">{row.label}</span>
    </button>
  );
}

export function BuyersMegaMenu() {
  return (
    <div className="mx-auto w-full max-w-[1200px] rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-[0_10px_40px_-4px_rgba(26,26,26,0.08),0_2px_8px_-2px_rgba(26,26,26,0.04)] sm:p-8">
      <div className="grid grid-cols-4 gap-8 sm:gap-10">
        <div className="flex min-w-0 flex-col">
          <h3 className="mb-5 text-sm text-neutral-500">Property type</h3>
          <div className="flex flex-col gap-1.5">
            {propertyTypes.map((row) => (
              <IconItem key={row.label} row={row} />
            ))}
          </div>
        </div>
        <div className="flex min-w-0 flex-col">
          <h3 className="mb-5 text-sm text-neutral-500">Popular areas</h3>
          <div className="flex flex-col gap-1.5">
            {popularAreas.map((label) => (
              <TextItem key={label}>{label}</TextItem>
            ))}
          </div>
        </div>
        <div className="flex min-w-0 flex-col">
          <h3 className="mb-5 text-sm text-neutral-500">Search by BHK</h3>
          <div className="flex flex-col gap-1.5">
            {searchByBhk.map((label) => (
              <TextItem key={label}>{label}</TextItem>
            ))}
          </div>
        </div>
        <div className="flex min-w-0 flex-col">
          <h3 className="mb-5 text-sm text-neutral-500">Popular searches</h3>
          <div className="flex flex-col gap-1.5">
            {popularSearches.map((label) => (
              <TextItem key={label}>{label}</TextItem>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
