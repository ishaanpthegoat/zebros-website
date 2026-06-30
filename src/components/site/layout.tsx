import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { ShaderBackground } from "@/components/site/shader-background";
import { ZebraGuide } from "@/components/site/zebra-guide";
import { useSiteEffects } from "@/hooks/use-site-effects";

export function Layout({
  active,
  children,
  footer = true,
  shader = true,
}: {
  active?: string;
  children: React.ReactNode;
  footer?: boolean;
  shader?: boolean;
}) {
  useSiteEffects();
  return (
    <>
      {shader && <ShaderBackground />}
      <Navbar active={active} />
      {children}
      {footer && <Footer />}
      <ZebraGuide active={active} />
    </>
  );
}
