export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-[#faf9f6] text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <header className="border-b border-zinc-200/80 bg-white/70 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/70">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <span className="text-lg font-semibold tracking-tight">Foodly</span>
          <a
            href="#how-it-works"
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            How it works
          </a>
        </div>
      </header>

      <main className="flex flex-1 flex-col">
        <section className="relative overflow-hidden px-6 pb-20 pt-16 sm:pb-28 sm:pt-24">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(16,185,129,0.18),transparent),radial-gradient(ellipse_60%_50%_at_100%_0%,rgba(245,158,11,0.12),transparent)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(16,185,129,0.25),transparent),radial-gradient(ellipse_60%_50%_at_100%_0%,rgba(245,158,11,0.15),transparent)]"
          />
          <div className="relative mx-auto max-w-3xl text-center">
            <p className="mb-4 inline-flex items-center rounded-full border border-emerald-200/80 bg-emerald-50/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200">
              Event planning &amp; catering
            </p>
            <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl sm:leading-tight">
              Plan the menu everyone can enjoy
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              Create an event, share a menu, and let guests add dietary needs
              and vote on what they want. An AI assistant turns that input into
              an order with choices for every guest—balanced, thoughtful, and
              ready to send to your caterer.
            </p>
            <p className="mx-auto mt-8 max-w-lg rounded-2xl border-2 border-emerald-600 bg-white px-6 py-4 text-base font-semibold leading-snug text-emerald-950 shadow-sm dark:border-emerald-500 dark:bg-zinc-900 dark:text-emerald-100">
              NO ONE WILL BE LEFT OUT.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href="#get-started"
                className="inline-flex h-12 w-full items-center justify-center rounded-full bg-emerald-600 px-8 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-700 sm:w-auto"
              >
                Create an event
              </a>
              <a
                href="#how-it-works"
                className="inline-flex h-12 w-full items-center justify-center rounded-full border border-zinc-300 bg-white px-8 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 sm:w-auto"
              >
                See how it works
              </a>
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="border-t border-zinc-200 bg-white px-6 py-16 dark:border-zinc-800 dark:bg-zinc-900/40"
        >
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl">
              How Foodly fits your event
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-zinc-600 dark:text-zinc-400">
              From kickoff to the final order, every step keeps dietary needs
              and preferences in the same place—so nothing gets lost in email
              threads or group chats.
            </p>
            <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  step: "1",
                  title: "Create your event",
                  body: "Set the date, headcount, and vibe. Attach or build the menu your caterer or venue shared.",
                },
                {
                  step: "2",
                  title: "Guests share constraints",
                  body: "Attendees note allergies, intolerances, and preferences—clearly and in one structured flow.",
                },
                {
                  step: "3",
                  title: "Vote on the menu",
                  body: "See what people are excited about. Prioritize crowd-pleasers without guessing.",
                },
                {
                  step: "4",
                  title: "AI-built order",
                  body: "Foodly proposes an order everyone can eat from, with alternatives where it matters—so no one is an afterthought.",
                },
              ].map((item) => (
                <li
                  key={item.step}
                  className="relative rounded-2xl border border-zinc-200 bg-[#faf9f6] p-6 dark:border-zinc-700 dark:bg-zinc-950"
                >
                  <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                    {item.step}
                  </span>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {item.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-t border-zinc-200 px-6 py-16 dark:border-zinc-800">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl">
              Built for hosts, guests, and kitchens
            </h2>
            <ul className="mt-10 grid gap-6 sm:grid-cols-3">
              <li className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/60">
                <h3 className="font-semibold">One source of truth</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Menus, votes, and dietary notes live together instead of
                  scattered across messages and spreadsheets.
                </p>
              </li>
              <li className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/60">
                <h3 className="font-semibold">Inclusive by design</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Constraints shape the plan from the start—vegetarian, vegan,
                  halal, kosher, allergies, and more—so every plate has a path.
                </p>
              </li>
              <li className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/60">
                <h3 className="font-semibold">Smarter handoff</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Export a clear brief for your caterer: counts, substitutions,
                  and the rationale so execution matches intent.
                </p>
              </li>
            </ul>
          </div>
        </section>

        <section
          id="get-started"
          className="mt-auto border-t border-zinc-200 bg-emerald-950 px-6 py-16 text-emerald-50 dark:border-emerald-900"
        >
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight">
              Ready to plan your next event?
            </h2>
            <p className="mt-3 text-emerald-100/90">
              Foodly is for gatherings where the food should feel welcoming—not
              stressful—for every guest.{" "}
              <span className="font-semibold text-white">
                NO ONE WILL BE LEFT OUT.
              </span>
            </p>
            <button
              type="button"
              aria-describedby="get-started-hint"
              className="mt-8 inline-flex h-12 cursor-pointer items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-50"
            >
              Get started
            </button>
            <p
              className="mt-4 text-xs text-emerald-200/70"
              id="get-started-hint"
            >
              Wire this button to sign-up or your app route when those flows are
              live.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 bg-white px-6 py-8 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-500">
        © {new Date().getFullYear()} Foodly
      </footer>
    </div>
  );
}
