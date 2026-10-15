"use client";

import { useMemo, useRef, useState } from "react";
import { Heart, HandHeart, Handshake, MessagesSquare, UsersRound } from "lucide-react";
import { TestimonialQuoteTile } from "@/components/testimonials/TestimonialQuoteTile";
import type { Testimonial, TestimonialCategory } from "@/lib/testimonials";
import { cn } from "@/lib/cn";

function matchCategory(t: Testimonial, slug: string) {
  return t.categorySlug === slug;
}

const symbols = {
  people: { Icon: UsersRound, color: "bg-blue-50 text-blue-700" },
  heart: { Icon: Heart, color: "bg-rose-50 text-rose-700" },
  helping: { Icon: HandHeart, color: "bg-amber-50 text-amber-700" },
  partnership: { Icon: Handshake, color: "bg-teal-50 text-teal-700" },
  conversation: { Icon: MessagesSquare, color: "bg-violet-50 text-violet-700" },
};
const categorySymbols: Record<string, keyof typeof symbols> = {
  clients: "people", caregivers: "heart", volunteers: "helping", partners: "partnership",
};

export function TestimonialCategoryFilter({
  items,
  categories,
}: {
  items: Testimonial[];
  categories: TestimonialCategory[];
}) {
  const [active, setActive] = useState("all");
  const cardsRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const sorted = [...items].sort(
      (a, b) => (a.sortOrder ?? 99) - (b.sortOrder ?? 99),
    );
    if (active === "all") return sorted;
    return sorted.filter((t) => matchCategory(t, active));
  }, [active, items]);

  const activeLabel =
    active === "all"
      ? "All voices"
      : categories.find((c) => c.slug === active)?.title ?? "Category";

  function selectCategory(slug: string) {
    setActive(slug);
    requestAnimationFrame(() => {
      cardsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <>
      <p className="mt-5 text-sm text-zinc-700">
        Select a category below to view quote cards from that group.{" "}
        <strong>All voices</strong> shows every testimonial mixed together.
      </p>

      <div aria-label="Testimonial categories" className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {[{ _id: "all", slug: "all", title: "All voices", icon: "conversation" }, ...categories].map((c) => {
          const symbol = symbols[c.icon as keyof typeof symbols] ?? symbols[categorySymbols[c.slug] ?? "conversation"];
          const { Icon } = symbol;
          const selected = active === c.slug;
          const count = c.slug === "all" ? items.length : items.filter((t) => matchCategory(t, c.slug)).length;
          return (
            <button
              key={c.slug}
              type="button"
              aria-pressed={selected}
              onClick={() => selectCategory(c.slug)}
              className={cn(
                "group rounded-2xl border-2 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700 motion-reduce:transform-none",
                selected
                  ? "border-slate-900 bg-slate-50 ring-1 ring-slate-900"
                  : "border-zinc-200 hover:border-slate-400",
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <span className={cn("grid h-12 w-12 place-items-center rounded-2xl", symbol.color)}>
                  <Icon className="h-6 w-6" strokeWidth={1.7} aria-hidden="true" />
                </span>
                <span className="rounded-full bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-600" aria-label={`${count} testimonials`}>
                  {count}
                </span>
              </div>
              <div className="mt-4 text-sm font-semibold text-slate-950">
                {c.title}
              </div>
            </button>
          );
        })}
      </div>

      <div ref={cardsRef} className="mt-12 scroll-mt-24">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[var(--border)] pb-4">
          <h2 className="text-xl font-semibold text-black">{activeLabel}</h2>
          <p className="text-sm text-zinc-600">
            {filtered.length} testimonial{filtered.length === 1 ? "" : "s"}
          </p>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t, i) => (
            <TestimonialQuoteTile
              key={t._id}
              quote={t.quote}
              name={t.name}
              role={t.role}
              index={i}
            />
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="mt-8 rounded-2xl bg-zinc-50 p-6 text-sm text-zinc-700 ring-1 ring-[var(--border)]">
            No testimonials in this category yet. Try <strong>All voices</strong> or
            another category.
          </p>
        ) : null}
      </div>
    </>
  );
}
