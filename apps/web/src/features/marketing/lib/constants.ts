import {
  faCalendarCheck,
  faCamera,
  faCar,
  faCircleCheck,
  faClipboardCheck,
  faFileInvoiceDollar,
  faFileLines,
  faGears,
  faKey,
  faMagnifyingGlass,
  faScrewdriverWrench,
  faShieldHalved,
} from '@fortawesome/free-solid-svg-icons';

export const STALE_TIME_MS = 10 * 60 * 1000;

export const repairProcessSteps = [
  {
    number: '01',
    icon: faCalendarCheck,
    translationKey: 'booking',
  },
  {
    number: '02',
    icon: faCar,
    translationKey: 'acceptance',
  },
  {
    number: '03',
    icon: faMagnifyingGlass,
    translationKey: 'diagnostics',
  },
  {
    number: '04',
    icon: faFileInvoiceDollar,
    translationKey: 'estimate',
  },
  {
    number: '05',
    icon: faScrewdriverWrench,
    translationKey: 'repair',
  },
  {
    number: '06',
    icon: faClipboardCheck,
    translationKey: 'qualityControl',
  },
  {
    number: '07',
    icon: faKey,
    translationKey: 'delivery',
  },
] as const;

export const warrantyStandards = [
  {
    id: '01',
    icon: faFileInvoiceDollar,
    title: 'standards.priceApproval.title',
    description: 'standards.priceApproval.description',
  },
  {
    id: '02',
    icon: faCamera,
    title: 'standards.defectDocumentation.title',
    description: 'standards.defectDocumentation.description',
  },
  {
    id: '03',
    icon: faGears,
    title: 'standards.approvedParts.title',
    description: 'standards.approvedParts.description',
  },
  {
    id: '04',
    icon: faClipboardCheck,
    title: 'standards.postRepairInspection.title',
    description: 'standards.postRepairInspection.description',
  },
  {
    id: '05',
    icon: faFileLines,
    title: 'standards.serviceHistory.title',
    description: 'standards.serviceHistory.description',
  },
  {
    id: '06',
    icon: faShieldHalved,
    title: 'standards.workWarranty.title',
    description: 'standards.workWarranty.description',
  },
] as const;

export const warrantyTrustItems = [
  {
    id: 1,
    icon: faCircleCheck,
    translationKey: 'trust.approvedWork',
  },
  {
    id: 2,
    icon: faFileLines,
    translationKey: 'trust.documentedHistory',
  },
  {
    id: 3,
    icon: faClipboardCheck,
    translationKey: 'trust.qualityControl',
  },
  {
    id: 4,
    icon: faShieldHalved,
    translationKey: 'trust.warranty',
  },
] as const;

export const warrantyCoverageItems = [
  {
    id: 'work',
    icon: faScrewdriverWrench,
    title: 'items.work.title',
    description: 'items.work.description',
  },
  {
    id: 'parts',
    icon: faGears,
    title: 'items.parts.title',
    description: 'items.parts.description',
  },
  {
    id: 'quality',
    icon: faClipboardCheck,
    title: 'items.quality.title',
    description: 'items.quality.description',
  },
  {
    id: 'history',
    icon: faFileLines,
    title: 'items.history.title',
    description: 'items.history.description',
  },
] as const;
