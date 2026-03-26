import Link from "next/link";

import { footerLinks, mainNavigation } from "./site-navigation";

const Footer = () => {
  return (
    <footer className="border-border/60 mt-16 border-t">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 sm:px-5 lg:px-8 lg:py-14">
        <div className="surface-panel grid gap-8 rounded-[2rem] px-6 py-8 lg:grid-cols-[minmax(0,1.2fr)_repeat(2,minmax(0,0.8fr))] lg:px-8">
          <div className="space-y-4">
            <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.2em] uppercase">
              Bewear
            </p>
            <h2 className="max-w-md text-2xl font-semibold tracking-tight lg:text-3xl">
              Visual premium, checkout seguro e uma experiência pronta para
              portfólio.
            </h2>
            <p className="text-muted-foreground max-w-xl text-sm leading-6">
              Projeto refinado para demonstrar front-end moderno com Next.js,
              auth social, carrinho, pedidos e pagamentos preservados.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-semibold">Navegação</p>
            <div className="grid gap-3 text-sm">
              {mainNavigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-semibold">Atalhos</p>
            <div className="grid gap-3 text-sm">
              {footerLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="text-muted-foreground flex flex-col gap-2 text-xs font-medium sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Bewear. Todos os direitos reservados.</p>
          <p>
            Next.js, Drizzle, Better Auth, Stripe e uma camada visual premium.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
