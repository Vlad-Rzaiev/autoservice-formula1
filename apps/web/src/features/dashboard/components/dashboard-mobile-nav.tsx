'use client';

import { useState } from 'react';
import { faBarsStaggered } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslations } from 'next-intl';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { IconButton } from '@/components/common';
import DashboardSidebar from './dashboard-sidebar';

export default function DashboardMobileNav() {
  const t = useTranslations('dashboard.header');
  const [open, setOpen] = useState(false);

  const handleNavigate = (): void => {
    setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen} swipeDirection="left">
      <IconButton
        aria-label={t('openMenu')}
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="navigation:hidden"
      >
        <FontAwesomeIcon
          icon={faBarsStaggered}
          aria-hidden="true"
          className="
            relative text-lg
            transition-transform duration-200
            group-hover:scale-110
            group-focus-visible:scale-110
          "
        />
      </IconButton>

      <DrawerContent className="w-[min(88vw,18rem)]">
        <DashboardSidebar onNavigate={handleNavigate} />
      </DrawerContent>
    </Drawer>
  );
}
