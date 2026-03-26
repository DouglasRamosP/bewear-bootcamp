"use client";

import {
  ArrowRightIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  Package2Icon,
  SparklesIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { authClient } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Cart } from "./cart";
import { mainNavigation } from "./site-navigation";

export const Header = () => {
  const { data: session } = authClient.useSession();
  const initials =
    session?.user?.name
      ?.split(" ")
      .slice(0, 2)
      .map((name) => name[0])
      .join("")
      .toUpperCase() ?? "BW";

  return (
    <header className="border-border/60 bg-background/80 sticky top-0 z-40 border-b backdrop-blur-xl">
      <div className="border-border/40 border-b">
        <div className="text-muted-foreground mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-2 text-[11px] font-medium tracking-[0.18em] uppercase sm:px-5 lg:px-8">
          <div className="flex items-center gap-2">
            <SparklesIcon className="size-3.5" />
            <span>Curadoria urbana com entrega nacional</span>
          </div>
          <span className="hidden sm:block">
            Checkout seguro com Google e Stripe
          </span>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-5 lg:px-8">
        <div className="flex items-center gap-3 lg:gap-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full lg:hidden"
              >
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="surface-panel rounded-b-[2rem]">
              <SheetHeader className="border-border/60 border-b pb-4">
                <SheetTitle>Explorar Bewear</SheetTitle>
                <SheetDescription>
                  Navegação principal, conta e atalhos de compra.
                </SheetDescription>
              </SheetHeader>

              <div className="grid gap-3 px-4 pt-1 pb-6">
                {mainNavigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="surface-panel flex items-center justify-between rounded-[1.5rem] px-4 py-4"
                  >
                    <div>
                      <p className="font-semibold">{item.label}</p>
                      <p className="text-muted-foreground text-sm">
                        {item.description}
                      </p>
                    </div>
                    <ArrowRightIcon className="size-4" />
                  </Link>
                ))}

                {session?.user ? (
                  <div className="surface-panel flex items-center justify-between rounded-[1.5rem] px-4 py-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <Avatar className="border-border/60 size-11 border">
                        <AvatarImage
                          src={session.user.image as string | undefined}
                        />
                        <AvatarFallback>{initials}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="truncate font-semibold">
                          {session.user.name}
                        </p>
                        <p className="text-muted-foreground truncate text-sm">
                          {session.user.email}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                      onClick={() => authClient.signOut()}
                    >
                      <LogOutIcon />
                    </Button>
                  </div>
                ) : (
                  <Button className="rounded-full" size="lg" asChild>
                    <Link href="/authentication">
                      <LogInIcon />
                      Entrar ou criar conta
                    </Link>
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>

          <Link
            href="/"
            className="surface-panel flex shrink-0 items-center gap-3 rounded-full px-4 py-2.5"
          >
            <Image
              src="/logo.svg"
              alt="BEWEAR"
              width={100}
              height={26}
              className="h-auto w-[92px] sm:w-[102px]"
            />
            <span className="text-muted-foreground hidden text-[11px] font-semibold tracking-[0.18em] uppercase sm:block">
              Urban essentials
            </span>
          </Link>
        </div>

        <nav className="hidden items-center gap-2 lg:flex">
          {mainNavigation.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              className="rounded-full px-4 text-sm"
              asChild
            >
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {session?.user ? (
            <div className="hidden items-center gap-2 lg:flex">
              <Button variant="ghost" className="rounded-full" asChild>
                <Link href="/my-orders">
                  <Package2Icon />
                  Meus pedidos
                </Link>
              </Button>

              <div className="surface-panel flex items-center gap-3 rounded-full px-3 py-2">
                <Avatar className="border-border/60 size-9 border">
                  <AvatarImage src={session.user.image as string | undefined} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <div className="max-w-32">
                  <p className="truncate text-sm font-semibold">
                    {session.user.name}
                  </p>
                  <p className="text-muted-foreground truncate text-xs">
                    {session.user.email}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-9 rounded-full"
                  onClick={() => authClient.signOut()}
                >
                  <LogOutIcon />
                </Button>
              </div>
            </div>
          ) : (
            <Button
              variant="outline"
              className="hidden rounded-full lg:inline-flex"
              asChild
            >
              <Link href="/authentication">
                <LogInIcon />
                Entrar
              </Link>
            </Button>
          )}

          <Cart />
        </div>
      </div>
    </header>
  );
};
