"use client";

import { useEffect } from "react";

interface HtmlLangSyncProps {
  locale: string;
}

export default function HtmlLangSync({ locale }: HtmlLangSyncProps) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
