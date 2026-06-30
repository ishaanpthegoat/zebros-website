import { useState } from "react";
import { ChevronDown } from "lucide-react";

export type Member = {
  name: string;
  initials: string;
  role: string;
  bio: string;
  photo: string | null;
};

/**
 * Mobile team list: a vertical stack of Apple-notification-center style cards.
 * Tap a card to expand/collapse it (smooth grid-rows 0fr -> 1fr height
 * animation). Replaces the skewed desktop card fan, which is unreadable when
 * scaled down to fit a phone.
 */
function MemberRow({
  member,
  open,
  onToggle,
}: {
  member: Member;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="liquid-glass overflow-hidden rounded-2xl">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center gap-3 p-3 text-left"
      >
        {member.photo ? (
          <img
            src={member.photo}
            alt=""
            className="h-12 w-12 flex-none rounded-full object-cover object-[center_top]"
            loading="lazy"
          />
        ) : (
          <span className="grid h-12 w-12 flex-none place-items-center rounded-full bg-primary/80 text-sm font-bold text-white">
            {member.initials}
          </span>
        )}
        <span className="min-w-0 flex-1">
          <span className="block truncate text-base font-bold text-white">
            {member.name}
          </span>
          <span className="mt-0.5 block truncate text-xs font-medium uppercase tracking-wide text-primary">
            {member.role}
          </span>
        </span>
        <ChevronDown
          className={`h-5 w-5 flex-none text-foreground/50 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4 pt-1">
            {member.photo && (
              <img
                src={member.photo}
                alt={member.name}
                className="mb-3 max-h-72 w-full rounded-xl object-cover object-[center_top]"
                loading="lazy"
              />
            )}
            <p className="text-sm leading-relaxed text-foreground/85">
              {member.bio}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MemberAccordion({ members }: { members: Member[] }) {
  const [openIdx, setOpenIdx] = useState<Set<number>>(new Set());

  const toggle = (i: number) =>
    setOpenIdx((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const allOpen = openIdx.size === members.length;

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="mb-3 flex justify-end">
        <button
          type="button"
          onClick={() =>
            setOpenIdx(
              allOpen ? new Set() : new Set(members.map((_, i) => i))
            )
          }
          className="rounded-full border border-border/60 bg-card/60 px-3 py-1.5 text-xs font-medium text-foreground/80 hover:text-white"
        >
          {allOpen ? "Collapse all" : "Expand all"}
        </button>
      </div>
      <div className="space-y-3">
        {members.map((m, i) => (
          <MemberRow
            key={m.name}
            member={m}
            open={openIdx.has(i)}
            onToggle={() => toggle(i)}
          />
        ))}
      </div>
    </div>
  );
}
