"use client";

import * as React from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export type StepShellV2Props = {
  step: number;
  total: number;
  title: string;
  subtitle?: string;
  stepTitles?: string[];
  children: React.ReactNode;
  onBack?: () => void;
  onSkip?: () => void;
  onContinue?: () => void;
  continueDisabled?: boolean;
  rightRail?: React.ReactNode;
};

export function StepShellV2({
  step,
  total,
  title,
  subtitle,
  stepTitles,
  children,
  onBack,
  onSkip,
  onContinue,
  continueDisabled,
  rightRail,
}: StepShellV2Props) {
  const pct = Math.round((step / total) * 100);
  const hasRightRail = !!rightRail;

  return (
    <div className="min-h-dvh flex flex-col">
      <main className="flex-1">
        {/* Inline header (no separate black bar), placed at the very top */}
        <div className={cn("mx-auto w-full px-4 pt-0", hasRightRail ? "max-w-screen-2xl" : "max-w-3xl") }>
          <div className="flex items-center gap-3">
            <div className="text-xs text-muted-foreground">Step {step} of {total}</div>
            <div className="hidden md:flex items-center gap-2 flex-1">
              <Progress value={pct} className="h-1.5 flex-1" />
              <span className="text-xs text-muted-foreground w-14 text-right">{pct}%</span>
            </div>
          </div>
          <div className="py-3">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">{title}</h1>
            {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
            {/* Minimal header: no step chips for a cleaner premium look */}
          </div>
        </div>

        <div className={cn(
          "mx-auto w-full p-4",
          hasRightRail ? "max-w-screen-2xl grid grid-cols-1 lg:grid-cols-12 gap-6" : "max-w-3xl"
        )}>
          <section className={cn("space-y-4", hasRightRail && "lg:col-span-7") }>
            <Card className="rounded-2xl shadow-sm">
              <CardContent className="p-6">{children}</CardContent>
            </Card>
          </section>

          {hasRightRail && (
            <aside className="hidden lg:flex lg:col-span-5">
              <div className="w-full space-y-4">{rightRail}</div>
            </aside>
          )}
        </div>
      </main>

      <footer className="sticky bottom-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className={cn("mx-auto px-4 py-3 flex items-center gap-2", hasRightRail ? "max-w-screen-2xl" : "max-w-3xl") }>
          <Button variant="ghost" size="sm" onClick={onBack} type="button">
            <ChevronLeft className="mr-1 h-4 w-4" /> Back
          </Button>
          <Button variant="secondary" size="sm" onClick={onSkip} type="button">Skip for now</Button>
          <div className="ml-auto" />
          <Button size="sm" onClick={onContinue} disabled={continueDisabled} type="button">
            Continue <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </footer>
    </div>
  );
}

// No default right rail; only render when provided via props

function Line({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <span className="shrink-0 text-foreground/70">{icon}</span>
      <span>{text}</span>
    </div>
  );
}
