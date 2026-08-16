import {
  faBullseye,
  faPiggyBank,
  faScrewdriverWrench,
  faClipboardCheck,
} from '@fortawesome/free-solid-svg-icons';

export const diagnosticsBenefits = [
  {
    id: 'accuracy',
    icon: faBullseye,
    title: 'benefits.accuracy.title',
    description: 'benefits.accuracy.description',
  },
  {
    id: 'saving',
    icon: faPiggyBank,
    title: 'benefits.saving.title',
    description: 'benefits.saving.description',
  },
  {
    id: 'equipment',
    icon: faScrewdriverWrench,
    title: 'benefits.equipment.title',
    description: 'benefits.equipment.description',
  },
  {
    id: 'result',
    icon: faClipboardCheck,
    title: 'benefits.result.title',
    description: 'benefits.result.description',
  },
] as const;
