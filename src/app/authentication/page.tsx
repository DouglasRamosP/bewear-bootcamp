import { ShieldCheckIcon, SparklesIcon } from "lucide-react";

import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SignInForm from "./components/sign-in-form";
import SignUpForm from "./components/sign-up-form";

const Authentication = async () => {
  return (
    <>
      <Header />

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-5 lg:px-8 lg:py-10 xl:py-14">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(420px,520px)] lg:items-start">
          <section className="surface-panel relative overflow-hidden rounded-[2rem] p-6 sm:p-8 lg:min-h-[720px] lg:p-10">
            <div className="bg-accent/30 absolute top-0 right-0 h-48 w-48 rounded-full blur-3xl" />
            <div className="relative flex h-full flex-col justify-between gap-8">
              <div className="space-y-5">
                <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.22em] uppercase">
                  Acesso inteligente
                </p>
                <h1 className="max-w-lg text-4xl font-semibold tracking-tight sm:text-5xl">
                  Entre, compre e acompanhe seus pedidos em uma jornada única.
                </h1>
                <p className="text-muted-foreground max-w-xl text-base leading-7">
                  A camada de autenticação foi preservada para manter Google
                  Sign-In, histórico de pedidos e carrinho persistente com uma
                  interface muito mais madura.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="border-border/60 bg-background/70 rounded-[1.5rem] border p-5">
                  <SparklesIcon className="mb-3 size-5" />
                  <p className="font-semibold">Experiência consistente</p>
                  <p className="text-muted-foreground mt-1 text-sm leading-6">
                    Login, checkout e pedidos com a mesma linguagem visual.
                  </p>
                </div>
                <div className="border-border/60 bg-background/70 rounded-[1.5rem] border p-5">
                  <ShieldCheckIcon className="mb-3 size-5" />
                  <p className="font-semibold">Fluxos preservados</p>
                  <p className="text-muted-foreground mt-1 text-sm leading-6">
                    Ajustes visuais e funcionais sem romper integrações
                    sensíveis.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="mx-auto w-full max-w-xl">
            <Tabs
              defaultValue="sign-in"
              className="surface-panel w-full rounded-[2rem] p-4 sm:p-5"
            >
              <TabsList className="grid h-12 w-full grid-cols-2 rounded-full">
                <TabsTrigger value="sign-in">Entrar</TabsTrigger>
                <TabsTrigger value="sign-up">Criar conta</TabsTrigger>
              </TabsList>
              <TabsContent value="sign-in" className="w-full pt-4">
                <SignInForm />
              </TabsContent>
              <TabsContent value="sign-up" className="w-full pt-4">
                <SignUpForm />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Authentication;
