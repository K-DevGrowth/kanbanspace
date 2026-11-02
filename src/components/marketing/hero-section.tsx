import Link from "next/link";
import { ArrowRight, CheckCircle2, Shield, Zap } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 lg:pt-28 lg:pb-32">
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-primary/30 to-blue-400/20 opacity-30 sm:left-[calc(50%-20rem)] sm:w-288.75"
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Hero Title */}
        <h1 className="text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Quản lý công việc,{" "}
          <span className="block mt-1 sm:mt-2 pb-1 leading-[1.15] bg-linear-to-r from-primary via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            làm chủ mọi kế hoạch.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-2xl text-balance text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed">
          Lên kế hoạch, phân công nhiệm vụ và kiểm soát tiến độ để mọi thứ luôn
          đi đúng hướng.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/signup"
            className={cn(
              buttonVariants({ size: "lg" }),
              "w-full sm:w-auto h-12 px-7 text-base font-semibold shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/35 gap-2 transition-all",
            )}
          >
            <span>Dùng thử miễn phí</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
