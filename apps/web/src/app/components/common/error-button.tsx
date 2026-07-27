"use client";

import { Button } from "@/app/components/ui/button";
import React, { useEffect, useState } from "react";

export interface MagicButtonProps {
  children?: React.ReactNode;
}

export default function ErrorButton({}: MagicButtonProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count > 2) {
      throw new Error("Unexpected error");
    }
  }, [count]);

  return <Button onClick={() => setCount(count + 1)}>Click me</Button>;
}
