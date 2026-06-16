import { Layout } from "@/components/site/layout";

const CONTENT = `<section class="container" style="padding-top: 5rem;">
  <div class="reveal" style="text-align:center; min-height:62vh; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:0.5rem;">
    <span class="eyebrow">Sponsors</span>
    <h1 class="mega-text-mid">Coming <span class="accent">soon.</span></h1>
    <p class="section-sub" style="max-width:600px;">We are still putting our sponsorship info together. Check back soon, or reach out if you want to support the team.</p>
    <a href="mailto:infocary@zebrarobotics.com" class="btn btn-primary btn-big" style="margin-top:1.5rem;">Contact us</a>
  </div>
</section>`;

export function Sponsors() {
  return (
    <Layout active="/sponsors.html">
      <div dangerouslySetInnerHTML={{ __html: CONTENT }} />
    </Layout>
  );
}
