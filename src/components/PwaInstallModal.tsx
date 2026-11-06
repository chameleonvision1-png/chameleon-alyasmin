"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CheckIcon, ShareIosIcon, XIcon } from "./icons";

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

declare global {
  interface Window {
    __pwaInstallPrompt?: BeforeInstallPromptEvent | null;
  }
}

export function triggerPwaInstall() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("trigger-pwa-install"));
  }
}

export function useIsStandalonePwa() {
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const check = () => {
      const standalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
      setIsStandalone(standalone);
    };
    check();

    const mql = window.matchMedia("(display-mode: standalone)");
    const onChange = (e: MediaQueryListEvent) => setIsStandalone(e.matches);
    const onInstalled = () => setIsStandalone(true);

    mql.addEventListener("change", onChange);
    window.addEventListener("appinstalled", onInstalled);
    window.addEventListener("pwa-app-installed", onInstalled);

    return () => {
      mql.removeEventListener("change", onChange);
      window.removeEventListener("appinstalled", onInstalled);
      window.removeEventListener("pwa-app-installed", onInstalled);
    };
  }, []);

  return isStandalone;
}

export default function PwaInstallModal() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showGuide, setShowGuide] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    setDeferredPrompt(window.__pwaInstallPrompt ?? null);
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
    );

    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      window.__pwaInstallPrompt = promptEvent;
      setDeferredPrompt(promptEvent);
    };

    const onPromptAvailable = () => {
      if (window.__pwaInstallPrompt) {
        setDeferredPrompt(window.__pwaInstallPrompt);
      }
    };

    const onInstalled = () => {
      window.__pwaInstallPrompt = null;
      setDeferredPrompt(null);
      setShowGuide(false);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("pwa-install-available", onPromptAvailable);
    window.addEventListener("appinstalled", onInstalled);
    window.addEventListener("pwa-app-installed", onInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("pwa-install-available", onPromptAvailable);
      window.removeEventListener("appinstalled", onInstalled);
      window.removeEventListener("pwa-app-installed", onInstalled);
    };
  }, []);

  useEffect(() => {
    const handleTrigger = async () => {
      const promptEvent = deferredPrompt || window.__pwaInstallPrompt;
      if (promptEvent) {
        try {
          await promptEvent.prompt();
          const choice = await promptEvent.userChoice;
          if (choice.outcome === "accepted") {
            window.__pwaInstallPrompt = null;
            setDeferredPrompt(null);
          }
          return;
        } catch {
          setShowGuide(true);
          return;
        }
      }
      setShowGuide(true);
    };

    window.addEventListener("trigger-pwa-install", handleTrigger);
    return () => window.removeEventListener("trigger-pwa-install", handleTrigger);
  }, [deferredPrompt]);

  useEffect(() => {
    if (!showGuide) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [showGuide]);

  if (!showGuide || typeof document === "undefined") return null;

  return createPortal(
    <div
      dir="rtl"
      className="fixed inset-0 z-[95] flex items-end sm:items-center justify-center p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pwa-install-title"
    >
      <div
        className="absolute inset-0 bg-[#18110C]/70 backdrop-blur-xs"
        onClick={() => setShowGuide(false)}
      />
      <div className="relative w-full max-w-md rounded-3xl bg-[#FAF6EC] p-5 sm:p-6 shadow-2xl border-2 border-[#E8A514]/40">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icon-192.png"
              alt="مطعم الياسمين"
              className="w-12 h-12 rounded-2xl border border-[#E8A514]/40 bg-[#18110C] p-0.5 object-contain shrink-0 shadow-sm"
            />
            <div>
              <h3 id="pwa-install-title" className="text-base sm:text-lg font-black text-[#18110C]">
                تنزيل تطبيق مطعم الياسمين
              </h3>
              <p className="text-xs font-bold text-[#5A3218] mt-0.5">
                ثبّت التطبيق على شاشتك الرئيسية لطلب أسرع في أي وقت
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowGuide(false)}
            aria-label="إغلاق"
            className="p-2 rounded-full bg-white text-[#18110C]/70 hover:text-[#18110C] cursor-pointer"
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>

        {isIOS ? (
          <div className="space-y-2.5 rounded-2xl bg-white p-4 text-xs sm:text-sm font-bold text-[#18110C] border border-[#E8A514]/25">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-[#18110C] text-[#E8A514] text-xs font-black grid place-items-center shrink-0">
                1
              </span>
              <span className="flex items-center gap-1.5 flex-wrap">
                اضغط على زر المشاركة
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#FAF6EC] border border-[#E8A514]/35 text-[#B87B06]">
                  <ShareIosIcon className="w-3.5 h-3.5" />
                  <span dir="ltr" className="font-en">Share</span>
                </span>
                في المتصفح
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-[#18110C] text-[#E8A514] text-xs font-black grid place-items-center shrink-0">
                2
              </span>
              <span>اختر «إضافة إلى الشاشة الرئيسية» (Add to Home Screen)</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-[#18110C] text-[#E8A514] text-xs font-black grid place-items-center shrink-0">
                3
              </span>
              <span>اضغط «إضافة» (Add) بأعلى الشاشة</span>
            </div>
          </div>
        ) : (
          <div className="space-y-2.5 rounded-2xl bg-white p-4 text-xs sm:text-sm font-bold text-[#18110C] border border-[#E8A514]/25">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-[#18110C] text-[#E8A514] text-xs font-black grid place-items-center shrink-0">
                1
              </span>
              <span>افتح قائمة المتصفح (⋮) في أعلى الشاشة</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-[#18110C] text-[#E8A514] text-xs font-black grid place-items-center shrink-0">
                2
              </span>
              <span>اختر «تثبيت التطبيق» أو «الإضافة إلى الشاشة الرئيسية»</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-[#18110C] text-[#E8A514] text-xs font-black grid place-items-center shrink-0">
                3
              </span>
              <span>أكد التثبيت ليظهر تطبيق الياسمين على موبايلك فوراً</span>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => setShowGuide(false)}
          className="w-full mt-4 rounded-full bg-[#E8A514] hover:bg-[#D99B10] text-[#18110C] font-black text-sm py-3 flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
        >
          <CheckIcon className="w-4 h-4" />
          <span>تمام، فهمت</span>
        </button>
      </div>
    </div>,
    document.body
  );
}
