"use client";

import { useEffect, useMemo, useState } from "react";
import { generateQrMatrix } from "@/lib/qrcode";
import {
  CheckIcon,
  CopyIcon,
  DownloadAppIcon,
  FacebookIcon,
  PrintIcon,
  QrCodeIcon,
  ShareNodesIcon,
  TelegramIcon,
  WhatsAppIcon,
  XIcon,
} from "./icons";

const MENU_URL = "https://alyasmin.chameleon.vision/menu";
const SHARE_TITLE = "منيو مطعم الياسمين السوري الكامل | Alyasmin Menu";
const SHARE_TEXT =
  "تصفح منيو مطعم الياسمين السوري الكامل (شاورما عالصاج، مشاوي عالفحم، فتات دمشقية بالسمن البلدي، بروستد ومقبلات شامية) واطلب أونلاين مباشرة:";

export function openMenuQrModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-menu-qr"));
  }
}

export default function MenuQrModal({
  open: controlledOpen,
  onClose: controlledOnClose,
}: {
  open?: boolean;
  onClose?: () => void;
} = {}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const handleClose = () => {
    if (controlledOnClose) controlledOnClose();
    setInternalOpen(false);
  };

  const matrix = useMemo(() => generateQrMatrix(MENU_URL, "Q"), []);
  const size = matrix.length;
  const quiet = 3;
  const total = size + quiet * 2;

  useEffect(() => {
    const onOpenEvent = () => setInternalOpen(true);
    window.addEventListener("open-menu-qr", onOpenEvent);
    return () => window.removeEventListener("open-menu-qr", onOpenEvent);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(MENU_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      const input = document.createElement("input");
      input.value = MENU_URL;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: SHARE_TITLE,
          text: SHARE_TEXT,
          url: MENU_URL,
        });
        return;
      } catch {
        // user cancelled or fallback
      }
    }
    handleCopy();
  };

  const buildPosterCanvas = async (): Promise<HTMLCanvasElement> => {
    const W = 1080;
    const H = 1380;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d")!;

    // Deep Espresso Background
    const bgGrad = ctx.createLinearGradient(0, 0, W, H);
    bgGrad.addColorStop(0, "#18110C");
    bgGrad.addColorStop(0.55, "#231810");
    bgGrad.addColorStop(1, "#120C08");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // Subtle golden glow top & bottom
    const glowTop = ctx.createRadialGradient(W / 2, 160, 20, W / 2, 160, 500);
    glowTop.addColorStop(0, "rgba(232, 165, 20, 0.28)");
    glowTop.addColorStop(1, "rgba(232, 165, 20, 0)");
    ctx.fillStyle = glowTop;
    ctx.fillRect(0, 0, W, H);

    // Outer Golden Frame
    ctx.strokeStyle = "rgba(232, 165, 20, 0.45)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.roundRect(44, 44, W - 88, H - 88, 44);
    ctx.stroke();

    // Top Gold Pill Badge
    ctx.fillStyle = "#E8A514";
    ctx.beginPath();
    ctx.roundRect(W / 2 - 210, 96, 420, 56, 28);
    ctx.fill();

    ctx.fillStyle = "#18110C";
    ctx.font = "900 24px 'Plus Jakarta Sans', 'Cairo', sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("ALYASMIN SYRIAN CUISINE", W / 2, 125);

    // Main Arabic Title
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "900 56px 'Cairo', sans-serif";
    ctx.fillText("امسح الباركود لتصفح المنيو", W / 2, 225);

    ctx.fillStyle = "#E8A514";
    ctx.font = "700 28px 'Cairo', sans-serif";
    ctx.fillText("شاورما عالصاج • مشاوي عالفحم • فتات دمشقية بالسمن البلدي", W / 2, 282);

    // White QR Card Container
    const cardSize = 680;
    const cardX = (W - cardSize) / 2;
    const cardY = 335;

    ctx.save();
    ctx.shadowColor = "rgba(0, 0, 0, 0.55)";
    ctx.shadowBlur = 45;
    ctx.shadowOffsetY = 18;
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, cardSize, cardSize, 44);
    ctx.fill();
    ctx.restore();

    // Gold border around QR card
    ctx.strokeStyle = "#E8A514";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, cardSize, cardSize, 44);
    ctx.stroke();

    // Draw QR Matrix modules
    const pad = 54;
    const qrDrawSize = cardSize - pad * 2;
    const cell = qrDrawSize / size;

    ctx.fillStyle = "#18110C";
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (!matrix[r][c]) continue;
        const x = cardX + pad + c * cell;
        const y = cardY + pad + r * cell;
        ctx.fillRect(Math.floor(x), Math.floor(y), Math.ceil(cell), Math.ceil(cell));
      }
    }

    // Center logo badge on QR
    const logoBox = 132;
    const lx = W / 2 - logoBox / 2;
    const ly = cardY + cardSize / 2 - logoBox / 2;

    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.roundRect(lx - 10, ly - 10, logoBox + 20, logoBox + 20, 32);
    ctx.fill();

    ctx.fillStyle = "#18110C";
    ctx.beginPath();
    ctx.roundRect(lx, ly, logoBox, logoBox, 26);
    ctx.fill();

    ctx.strokeStyle = "#E8A514";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.roundRect(lx, ly, logoBox, logoBox, 26);
    ctx.stroke();

    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject();
        img.src = "/logo-emblem.png";
      });
      ctx.drawImage(img, lx + 16, ly + 16, logoBox - 32, logoBox - 32);
    } catch {
      ctx.fillStyle = "#E8A514";
      ctx.font = "900 32px 'Cairo', sans-serif";
      ctx.fillText("الياسمين", W / 2, ly + logoBox / 2);
    }

    // Bottom URL Pill
    ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
    ctx.beginPath();
    ctx.roundRect(W / 2 - 330, 1068, 660, 74, 37);
    ctx.fill();

    ctx.strokeStyle = "rgba(232, 165, 20, 0.5)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(W / 2 - 330, 1068, 660, 74, 37);
    ctx.stroke();

    ctx.fillStyle = "#E8A514";
    ctx.font = "800 30px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("alyasmin.chameleon.vision/menu", W / 2, 1106);

    // Footer Hotline & Branches
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "900 32px 'Cairo', sans-serif";
    ctx.fillText("مطعم الياسمين للمأكولات السورية • خدمة التوصيل: 01010400507", W / 2, 1205);

    ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
    ctx.font = "700 23px 'Cairo', sans-serif";
    ctx.fillText("أصالة المذاق الدمشقي في القاهرة • اطلب أونلاين أو عبر واتساب", W / 2, 1258);

    return canvas;
  };

  const handleDownloadPng = async () => {
    try {
      setDownloading(true);
      const canvas = await buildPosterCanvas();
      const dataUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "alyasmin-menu-qr.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } finally {
      setDownloading(false);
    }
  };

  const handlePrintQr = async () => {
    setDownloading(true);
    try {
      const canvas = await buildPosterCanvas();
      const dataUrl = canvas.toDataURL("image/png");
      const win = window.open("", "_blank", "width=900,height=1100");
      if (!win) {
        handleDownloadPng();
        return;
      }
      win.document.write(`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8" />
  <title>طباعة باركود منيو الياسمين — Alyasmin QR</title>
  <style>
    @page { size: A4 portrait; margin: 10mm; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #18110C;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      font-family: 'Cairo', system-ui, sans-serif;
      padding: 16px;
    }
    img {
      max-width: 100%;
      max-height: 92vh;
      width: auto;
      height: auto;
      border-radius: 24px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.45);
    }
    @media print {
      body { background: #ffffff; padding: 0; }
      img { max-height: 270mm; box-shadow: none; }
    }
  </style>
</head>
<body>
  <img src="${dataUrl}" alt="Alyasmin Menu QR Poster" onload="setTimeout(() => { window.print(); }, 250);" />
</body>
</html>`);
      win.document.close();
    } finally {
      setDownloading(false);
    }
  };

  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(`${SHARE_TEXT}\n${MENU_URL}`)}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(MENU_URL)}`;
  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(MENU_URL)}&text=${encodeURIComponent(SHARE_TEXT)}`;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={handleClose}
    >
      <div
        dir="rtl"
        className="relative w-full max-w-md rounded-[28px] bg-[#FAF6EC] border-2 border-[#E8A514]/50 shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Branded Header */}
        <div
          className="relative bg-[#18110C] text-white px-5 pt-5 pb-4 border-b border-[#E8A514]/25"
          style={{
            backgroundImage:
              "radial-gradient(circle at 85% 20%, rgba(232,165,20,0.22), transparent 55%)",
          }}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-[#E8A514] text-[#18110C] grid place-items-center shadow-md shrink-0">
                <QrCodeIcon className="w-5 h-5" />
              </div>
              <div>
                <span
                  dir="ltr"
                  className="font-en text-[10px] font-extrabold uppercase tracking-widest text-[#E8A514] block"
                >
                  SCAN &amp; SHARE MENU
                </span>
                <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                  باركود ومشاركة منيو الياسمين
                </h3>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              aria-label="إغلاق"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white grid place-items-center transition cursor-pointer shrink-0"
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-5 space-y-4">
          {/* Branded QR Code Stage */}
          <div className="relative mx-auto w-full max-w-[265px] aspect-square rounded-3xl bg-white p-3.5 shadow-[0_14px_35px_-10px_rgba(24,17,12,0.18)] border-2 border-[#E8A514]/60 grid place-items-center">
            <svg
              viewBox={`0 0 ${total} ${total}`}
              shapeRendering="crispEdges"
              className="w-full h-full"
              aria-label="QR Code for Alyasmin Syrian Cuisine Menu"
            >
              <rect width={total} height={total} fill="#FFFFFF" />
              {matrix.map((row, r) =>
                row.map((dark, c) =>
                  dark ? (
                    <rect
                      key={`${r}-${c}`}
                      x={c + quiet}
                      y={r + quiet}
                      width={1}
                      height={1}
                      fill="#18110C"
                    />
                  ) : null
                )
              )}
            </svg>

            {/* Center Logo Badge Overlay */}
            <div className="absolute inset-0 grid place-items-center pointer-events-none">
              <div className="w-13 h-13 rounded-2xl bg-[#18110C] p-1.5 shadow-lg ring-4 ring-white border-2 border-[#E8A514] grid place-items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo-emblem.png"
                  alt="الياسمين"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          <div className="text-center space-y-0.5">
            <p className="text-xs sm:text-sm font-black text-[#18110C]">
              وجّه كاميرا الموبايل لفتح المنيو السوري الكامل فوراً
            </p>
            <p className="text-[11px] text-[#5C4938] font-semibold">
              أو انسخ الرابط وشاركه مع أصحابك والعيلة على واتساب وفيسبوك
            </p>
          </div>

          {/* Direct URL Copy Bar */}
          <div className="flex items-center gap-2 rounded-2xl bg-white border border-[#18110C]/12 p-1.5 pr-3 shadow-xs">
            <span
              dir="ltr"
              className="font-en text-xs font-extrabold text-[#18110C] truncate flex-1 text-left select-all"
            >
              alyasmin.chameleon.vision/menu
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-black transition cursor-pointer shrink-0 ${
                copied
                  ? "bg-emerald-600 text-white"
                  : "bg-[#18110C] hover:bg-[#E8A514] text-white hover:text-[#18110C]"
              }`}
            >
              {copied ? (
                <>
                  <CheckIcon className="w-3.5 h-3.5" />
                  <span>تم النسخ</span>
                </>
              ) : (
                <>
                  <CopyIcon className="w-3.5 h-3.5 text-[#E8A514]" />
                  <span>نسخ الرابط</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Social Share Grid */}
          <div className="grid grid-cols-4 gap-2">
            <a
              href={whatsappShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-[#25D366]/12 hover:bg-[#25D366] text-[#15803D] hover:text-white py-2.5 px-2 text-[11px] font-black transition border border-[#25D366]/25"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>واتساب</span>
            </a>

            <a
              href={facebookShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-[#1877F2]/10 hover:bg-[#1877F2] text-[#1877F2] hover:text-white py-2.5 px-2 text-[11px] font-black transition border border-[#1877F2]/20"
            >
              <FacebookIcon className="w-4 h-4" />
              <span>فيسبوك</span>
            </a>

            <a
              href={telegramShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-[#0088CC]/10 hover:bg-[#0088CC] text-[#0088CC] hover:text-white py-2.5 px-2 text-[11px] font-black transition border border-[#0088CC]/20"
            >
              <TelegramIcon className="w-4 h-4" />
              <span>تيليجرام</span>
            </a>

            <button
              type="button"
              onClick={handleNativeShare}
              className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-[#E8A514]/15 hover:bg-[#E8A514] text-[#18110C] py-2.5 px-2 text-[11px] font-black transition border border-[#E8A514]/35 cursor-pointer"
            >
              <ShareNodesIcon className="w-4 h-4" />
              <span>مشاركة</span>
            </button>
          </div>

          {/* Print & Download High-Res QR Poster Actions */}
          <div className="grid grid-cols-2 gap-2.5 pt-1 border-t border-[#18110C]/10">
            <button
              type="button"
              onClick={handlePrintQr}
              disabled={downloading}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#18110C] hover:bg-[#2A1E15] text-white py-3 px-3 text-xs font-black transition shadow-sm cursor-pointer disabled:opacity-60"
            >
              <PrintIcon className="w-4 h-4 text-[#E8A514]" />
              <span>طباعة الباركود</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadPng}
              disabled={downloading}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#E8A514] hover:bg-[#F3B72B] text-[#18110C] py-3 px-3 text-xs font-black transition shadow-md cursor-pointer disabled:opacity-60"
            >
              <DownloadAppIcon className="w-4 h-4" />
              <span>{downloading ? "جاري التحميل..." : "تحميل صورة QR"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
