'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui';

export default function ErrorButton() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count > 2) {
      throw new Error('Unexpected error');
    }
  }, [count]);

  return <Button onClick={() => setCount(count + 1)}>Click me</Button>;
}
