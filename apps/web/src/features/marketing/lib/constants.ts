import {
  faCalendarCheck,
  faCamera,
  faCar,
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
];
