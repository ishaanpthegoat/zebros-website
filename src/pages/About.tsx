import { Layout } from "@/components/site/layout";

const CONTENT = `<section class="container" style="padding-top: 5rem;">
  <div class="reveal">
    <span class="hero-pretitle">Our Story</span>
    <h1 class="section-title">About <span class="accent">Team 30415</span></h1>
    <p class="section-sub">Our background, our values, and what we are working on now.</p>
  </div>

  <div class="story-grid">
    <div class="story-text reveal">
      <p>Teams 30415 and 30416 began as two homeschool FTC rookie teams competing side by side during the 2025 season. Both teams shared a workshop, traded parts and design ideas, and occasionally faced each other on opposing alliances at the same qualifier.</p>
      <p>Going into the 2026 season, the two rosters were reorganized. Members were redistributed across both teams to balance experience, sub-team coverage, and competition goals.</p>
      <p>Both 30415 and 30416 continue to compete independently. The current 30415 Zebros roster includes returning members from each of the original lineups. We share the same workshop and the same pink and black colors.</p>
      <p>Our goals for the upcoming season are to build a competitive robot, contribute to the judged awards, and continue our community outreach across the Triangle.</p>
    </div>

    <div class="timeline reveal reveal-delay-2">
      <div class="timeline-item">
        <div class="timeline-year">2025, Fall</div>
        <h3 class="timeline-title">Two rookie teams form</h3>
        <p class="timeline-text">30415 and 30416 register as separate FTC rookie teams within a Cary, NC homeschool group.</p>
      </div>
      <div class="timeline-item">
        <div class="timeline-year">2026, January</div>
        <h3 class="timeline-title">First official qualifier</h3>
        <p class="timeline-text">Both teams compete at Cardinal Gibbons. 30416 captains a playoff alliance. 30415 takes home the Design Award 2nd Place.</p>
      </div>
      <div class="timeline-item">
        <div class="timeline-year">2026, February</div>
        <h3 class="timeline-title">Awards across the season</h3>
        <p class="timeline-text">30415 wins Judges' Choice at Southeast Raleigh. 30416 wins the Design Award at Ascend. Both teams reach playoffs at separate events.</p>
      </div>
      <div class="timeline-item">
        <div class="timeline-year">2026, May</div>
        <h3 class="timeline-title">Roster reorganization</h3>
        <p class="timeline-text">Off-season reorganization redistributes members across the two rosters. Both 30415 and 30416 continue to compete.</p>
      </div>
      <div class="timeline-item">
        <div class="timeline-year">2026, current</div>
        <h3 class="timeline-title">Current season</h3>
        <p class="timeline-text">Off-season build, training new members, and continuing community outreach across the Triangle.</p>
      </div>
    </div>
  </div>
</section>

<!-- Values -->
<section class="container">
  <div class="reveal">
    <h2 class="section-title">What we <span class="accent">value</span></h2>
  </div>
  <div class="outreach-grid mt-2">
    <div class="outreach-card reveal">
      <div class="outreach-icon">⚙️</div>
      <h3>Prototype and iterate</h3>
      <p>We prototype quickly, test early, and keep only what holds up on the field.</p>
    </div>
    <div class="outreach-card reveal reveal-delay-1">
      <div class="outreach-icon">🤝</div>
      <h3>Gracious Professionalism</h3>
      <p>A FIRST core value. We compete hard, offer help freely, and recognize the work of other teams.</p>
    </div>
    <div class="outreach-card reveal reveal-delay-2">
      <div class="outreach-icon">🦓</div>
      <h3>Shared ownership</h3>
      <p>Every drive coach has a backup. Every CAD file gets a second review. No single point of failure on the team.</p>
    </div>
    <div class="outreach-card reveal reveal-delay-3">
      <div class="outreach-icon">🌱</div>
      <h3>Community outreach</h3>
      <p>We mentor FLL teams, run library demos, and support STEM access in the Triangle community.</p>
    </div>
  </div>
</section>`;

export function About() {
  return (
    <Layout active="/about.html">
      <div dangerouslySetInnerHTML={{ __html: CONTENT }} />
    </Layout>
  );
}
