import { Header } from "@/components/common/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SignInForm from "./components/sign-in-form";
import SignUpForm from "./components/sign-up-form";

const Authentication = async () => {
  return (
    <>
      <Header />

      <main className="mx-auto flex w-full max-w-md flex-col gap-6 px-4 py-6 sm:px-5 lg:max-w-5xl lg:px-8 lg:py-10 xl:max-w-6xl xl:py-14">
        <div className="mx-auto w-full lg:max-w-xl">
          <Tabs defaultValue="sign-in" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="sign-in">Entrar</TabsTrigger>
              <TabsTrigger value="sign-up">Criar conta</TabsTrigger>
            </TabsList>
            <TabsContent value="sign-in" className="w-full">
              <SignInForm />
            </TabsContent>
            <TabsContent value="sign-up" className="w-full">
              <SignUpForm />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  );
};

export default Authentication;
