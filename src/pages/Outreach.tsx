import { Layout } from "@/components/site/layout";

const CONTENT = `<section class="container" style="padding-top: 5rem; min-height: 60vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
  <div class="reveal">
    <span class="hero-pretitle">In the Community</span>
    <h1 class="section-title">Community <span class="accent">Outreach</span></h1>
    <p class="section-sub">Coming soon.</p>
  </div>
</section>`;

export function Outreach() {
  return (
    <Layout active="/outreach.html">
      <div dangerouslySetInnerHTML={{ __html: CONTENT }} />
    </Layout>
  );
}
