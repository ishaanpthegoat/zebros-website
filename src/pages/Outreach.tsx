import { Layout } from "@/components/site/layout";

const CONTENT = `<section class="container" style="padding-top: 5rem;">
  <div class="reveal">
    <span class="hero-pretitle">In the Community</span>
    <h1 class="section-title">Community <span class="accent">Outreach</span></h1>
    <p class="section-sub">FIRST is about more than competition. The following is a summary of our community work, which focuses on STEM access, mentoring younger teams, and supporting local schools and libraries.</p>
  </div>

  <div class="outreach-grid">

    <div class="outreach-card reveal reveal-delay-1">
      <div class="outreach-icon">🧒</div>
      <h3>FLL Mentorship</h3>
      <p>Several team members mentor local FIRST LEGO League teams. We host build-day workshops and run mock judging sessions before their tournaments.</p>
    </div>

    <div class="outreach-card reveal reveal-delay-2">
      <div class="outreach-icon">🏫</div>
      <h3>Homeschool Co-op Workshops</h3>
      <p>Open workshop days for our homeschool co-op, where younger students learn basic CAD or wiring and leave with a small project they built themselves.</p>
    </div>

    <div class="outreach-card reveal reveal-delay-3">
      <div class="outreach-icon">🤖</div>
      <h3>Rookie Team Support</h3>
      <p>Donating spare parts, sharing CAD files, and offering pit help to other rookie teams at every qualifier we attend.</p>
    </div>

    <div class="outreach-card reveal">
      <div class="outreach-icon">📸</div>
      <h3>Social Media</h3>
      <p>Weekly Instagram posts and YouTube build vlogs that document what FTC really looks like, including both successful matches and rebuild weeks.</p>
    </div>

    <div class="outreach-card reveal reveal-delay-1">
      <div class="outreach-icon">🎓</div>
      <h3>School Demos</h3>
      <p>Robot demos at local elementary and middle schools, with a focus on under-represented groups in STEM. Q&A sessions are a regular part of every visit.</p>
    </div>

  </div>

  <section class="card mt-3" aria-labelledby="outreach-current-title" style="padding: 2rem;">
    <span class="eyebrow">Fall 2026 update</span>
    <h2 id="outreach-current-title" class="section-title">Workshop <span class="accent">planning</span></h2>
    <p>On October 24, we shared workshop ideas for different age groups and coordinated a planning call with the Boys &amp; Girls Club. The October 28 call could not go ahead because the meeting link did not arrive. Reconnecting and arranging another time remain next steps.</p>
    <p style="margin-top: 1rem;">We also shared a Pink Day poster for October 27 to promote breast cancer awareness. In early November, we explored local STEM networks for future outreach opportunities.</p>
    <a href="/blog.html#october-community" class="btn btn-secondary" style="margin-top: 1.5rem;">Read the dated team update</a>
  </section>

  <!-- Outreach stats -->
  <div class="reveal mt-3">
    <h2 class="section-title" style="margin-top: 3rem;">By the <span class="accent">numbers</span></h2>
    <p class="section-sub">Totals across the 2025 to 2026 rookie season.</p>
  </div>

  <div class="outreach-stats">
    <div class="stat-card card reveal">
      <div class="stat-number"><span data-count="240">0</span>+</div>
      <div class="stat-label">Kids reached</div>
    </div>
    <div class="stat-card card reveal reveal-delay-1">
      <div class="stat-number"><span data-count="18">0</span></div>
      <div class="stat-label">Community events</div>
    </div>
    <div class="stat-card card reveal reveal-delay-2">
      <div class="stat-number"><span data-count="4">0</span></div>
      <div class="stat-label">FLL teams mentored</div>
    </div>
    <div class="stat-card card reveal reveal-delay-3">
      <div class="stat-number"><span data-count="320">0</span>+</div>
      <div class="stat-label">Outreach hours</div>
    </div>
  </div>

  <!-- Partner with us CTA -->
  <div class="card reveal mt-3" style="text-align: center; padding: 2.5rem;">
    <h3 style="font-size: 1.6rem; margin-bottom: 0.5rem;">Request a visit</h3>
    <p style="color: var(--muted); margin-bottom: 1.5rem; max-width: 540px; margin-left: auto; margin-right: auto;">
      Schools, libraries, community groups, and fellow FIRST teams can contact us to schedule a demo or workshop.
    </p>
    <a href="mailto:infocary@zebrarobotics.com" class="btn btn-primary">Contact Outreach</a>
  </div>
</section>`;

export function Outreach() {
  return (
    <Layout active="/outreach.html">
      <div dangerouslySetInnerHTML={{ __html: CONTENT }} />
    </Layout>
  );
}
