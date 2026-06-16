import { Layout } from "@/components/site/layout";

const CONTENT = `<section class="container" style="padding-top: 5rem;">
  <div class="reveal">
    <span class="hero-pretitle">2025 Season, Rookie Year</span>
    <h1 class="section-title">Past <span class="accent">Seasons</span></h1>
    <p class="section-sub">30415 and 30416 competed as separate rookie teams during the 2025 season. Below are each team's results from that season. Both teams continue to compete this season with reorganized rosters.</p>
  </div>

  <!-- Tab switcher -->
  <div class="team-tabs reveal">
    <button class="team-tab active" data-team="30415">30415, Zebros</button>
    <button class="team-tab" data-team="30416">30416, Zebolts</button>
  </div>

  <!-- ===================== 30415 PANEL ===================== -->
  <div class="team-panel active" id="panel-30415">

    <div class="card reveal mb-2">
      <h3 style="font-size: 1.4rem; margin-bottom: 0.4rem;">Team 30415, Zebros</h3>
      <p style="color: var(--muted); margin-bottom: 0.4rem;">Cary, NC. Rookie Year 2025. Sponsor: Home School.</p>
    </div>

    <div class="stats-grid">
      <div class="stat-card card reveal">
        <div class="stat-number"><span data-count="6">0</span></div>
        <div class="stat-label">Wins</div>
      </div>
      <div class="stat-card card reveal reveal-delay-1">
        <div class="stat-number"><span data-count="11">0</span></div>
        <div class="stat-label">Losses</div>
      </div>
      <div class="stat-card card reveal reveal-delay-2">
        <div class="stat-number"><span data-count="3">0</span></div>
        <div class="stat-label">Official Events</div>
      </div>
      <div class="stat-card card reveal reveal-delay-3">
        <div class="stat-number"><span data-count="2">0</span></div>
        <div class="stat-label">Awards</div>
      </div>
    </div>

    <h3 class="reveal" style="font-size: 1.5rem; margin: 2.5rem 0 1rem;">Awards</h3>
    <ul class="award-list reveal">
      <li><div><strong>Judges' Choice Award</strong><br><span style="color: var(--muted); font-size: 0.9rem;">Southeast Raleigh High School Qualifier 3</span></div></li>
      <li><div><strong>Design Award, 2nd Place</strong><br><span style="color: var(--muted); font-size: 0.9rem;">Cardinal Gibbons High School</span></div></li>
    </ul>

    <h3 class="reveal" style="font-size: 1.5rem; margin: 2.5rem 0 1rem;">Events</h3>

    <div class="event-block reveal">
      <div class="event-name">Cardinal Gibbons High School</div>
      <div class="event-date">January 17, 2026. Rank 19 of 26.</div>
      <div class="event-detail">
        <div><strong>Qual Record</strong>1 W, 4 L</div>
        <div><strong>Playoffs</strong>Did not appear</div>
        <div><strong>Notable Match</strong>Q15, won 125 to 58</div>
      </div>
    </div>

    <div class="event-block reveal">
      <div class="event-name">Ascend Leadership Academy Qualifier</div>
      <div class="event-date">February 7, 2026. Rank 15 of 19.</div>
      <div class="event-detail">
        <div><strong>Qual Record</strong>1 W, 4 L</div>
        <div><strong>Playoffs</strong>Did not appear</div>
        <div><strong>Notable Match</strong>Q7, won 93 to 33</div>
      </div>
    </div>

    <div class="event-block reveal">
      <div class="event-name">Southeast Raleigh High School Qualifier 3</div>
      <div class="event-date">February 15, 2026. Rank 6 of 24. Judges' Choice Award.</div>
      <div class="event-detail">
        <div><strong>Qual Record</strong>4 W, 1 L</div>
        <div><strong>Playoff Record</strong>0 W, 2 L (Round 1 alliance)</div>
        <div><strong>Notable Match</strong>Q18, won 207 to 86</div>
      </div>
    </div>
  </div>

  <!-- ===================== 30416 PANEL ===================== -->
  <div class="team-panel" id="panel-30416">

    <div class="card mb-2">
      <h3 style="font-size: 1.4rem; margin-bottom: 0.4rem;">Team 30416, Zebolts</h3>
      <p style="color: var(--muted); margin-bottom: 0.4rem;">Cary, NC. Rookie Year 2025. Sponsor: Home School.</p>
    </div>

    <div class="stats-grid">
      <div class="stat-card card">
        <div class="stat-number">8</div>
        <div class="stat-label">Wins</div>
      </div>
      <div class="stat-card card">
        <div class="stat-number">13</div>
        <div class="stat-label">Losses</div>
      </div>
      <div class="stat-card card">
        <div class="stat-number">3</div>
        <div class="stat-label">Official Events</div>
      </div>
      <div class="stat-card card">
        <div class="stat-number">2</div>
        <div class="stat-label">Awards</div>
      </div>
    </div>

    <h3 style="font-size: 1.5rem; margin: 2.5rem 0 1rem;">Awards</h3>
    <ul class="award-list">
      <li><div><strong>Design Award</strong><br><span style="color: var(--muted); font-size: 0.9rem;">Ascend Leadership Academy Qualifier 2</span></div></li>
      <li><div><strong>Think Award, 2nd Place</strong><br><span style="color: var(--muted); font-size: 0.9rem;">Cardinal Gibbons High School</span></div></li>
    </ul>

    <h3 style="font-size: 1.5rem; margin: 2.5rem 0 1rem;">Events</h3>

    <div class="event-block">
      <div class="event-name">Cardinal Gibbons High School</div>
      <div class="event-date">January 17, 2026. Rank 10 of 26. Think Award 2nd Place.</div>
      <div class="event-detail">
        <div><strong>Qual Record</strong>3 W, 2 L</div>
        <div><strong>Playoff Record</strong>0 W, 2 L (Captain of 6)</div>
        <div><strong>Notable Match</strong>Q3, won 176 to 58</div>
      </div>
    </div>

    <div class="event-block">
      <div class="event-name">Ascend Leadership Academy Qualifier 2</div>
      <div class="event-date">February 8, 2026. Rank 9 of 18. Design Award.</div>
      <div class="event-detail">
        <div><strong>Qual Record</strong>1 W, 4 L</div>
        <div><strong>Playoffs</strong>Did not appear</div>
        <div><strong>Notable Match</strong>Q20, won 109 to 28</div>
      </div>
    </div>

    <div class="event-block">
      <div class="event-name">Southeast Raleigh High School Qualifier 3</div>
      <div class="event-date">February 15, 2026. Rank 16 of 24.</div>
      <div class="event-detail">
        <div><strong>Qual Record</strong>2 W, 3 L</div>
        <div><strong>Playoff Record</strong>2 W, 2 L (Round 1 alliance)</div>
        <div><strong>Notable Match</strong>UB R2 M4, won 142 to 100</div>
      </div>
    </div>
  </div>

  <!-- Footer note about the two teams -->
  <div class="card reveal mt-3" style="text-align: center; background: linear-gradient(135deg, rgba(255,31,143,0.12), rgba(255,31,143,0.02));">
    <p style="font-size: 1.05rem;">
      Combined 2025 rookie season totals across both teams:
      <strong style="color: var(--pink);">14 wins, 24 losses, 4 awards, 6 events</strong>
    </p>
    <p style="color: var(--muted); margin-top: 0.5rem; font-size: 0.95rem;">
      For the 2026 season, both 30415 and 30416 continue to compete with reorganized rosters drawn from the prior membership.
    </p>
  </div>
</section>`;

export function PastSeasons() {
  return (
    <Layout active="/past-seasons.html">
      <div dangerouslySetInnerHTML={{ __html: CONTENT }} />
    </Layout>
  );
}
