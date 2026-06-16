import { Layout } from "@/components/site/layout";

const CONTENT = `<section class="container" style="padding-top: 5rem;">
  <div class="reveal">
    <span class="hero-pretitle">Our Mentors</span>
    <h1 class="section-title">Our <span class="accent">Coaches</span></h1>
    <p class="section-sub">Three adult mentors who manage the workshop, the season schedule, and the team's preparation for competition. Click any card to view a full profile.</p>
  </div>

  <div class="people-grid">

    <div class="person-card reveal"
      data-name="Coach John"
      data-initials="JO"
      data-role="Engineering, Strategy"
      data-bio="Coach John is in engineering at NC State and is a former FRC player and competitor. He brings competition experience and an engineering background to the team's build and strategy work, and helps guide the team through season planning and design reviews."
      data-email="infocary@zebrarobotics.com"
      data-phone="(919) 650-6333">
      <div class="person-photo"><div class="placeholder-initials">JO</div></div>
      <div class="person-info">
        <div class="person-name">Coach John</div>
        <div class="person-role">Engineering, Strategy</div>
      </div>
    </div>

    <div class="person-card reveal reveal-delay-1"
      data-name="Coach Jai"
      data-initials="JA"
      data-role="Workshop Host, Program Director"
      data-bio="Coach Jai is the owner of Zebra Robotics Cary. He provides the workshop space, equipment, and program coordination that supports the team year-round, and connects the team with the broader Zebra Robotics network and resources."
      data-email="infocary@zebrarobotics.com"
      data-phone="(919) 650-6333">
      <div class="person-photo"><div class="placeholder-initials">JA</div></div>
      <div class="person-info">
        <div class="person-name">Coach Jai</div>
        <div class="person-role">Workshop Host, Program Director</div>
      </div>
    </div>

  </div>

  <div class="card reveal mt-3" style="text-align: center;">
    <h3 style="font-size: 1.4rem; margin-bottom: 0.5rem;">Interested in mentoring?</h3>
    <p style="color: var(--muted); margin-bottom: 1.25rem;">We welcome adults from local engineering, software, or fabrication backgrounds who can commit a few hours a week to the team.</p>
    <a href="mailto:infocary@zebrarobotics.com" class="btn btn-primary">Contact Us</a>
  </div>
</section>`;

export function Coaches() {
  return (
    <Layout active="/coaches.html">
      <div dangerouslySetInnerHTML={{ __html: CONTENT }} />
    </Layout>
  );
}
