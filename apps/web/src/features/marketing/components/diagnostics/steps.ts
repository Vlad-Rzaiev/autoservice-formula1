import {
  faClipboardCheck,
  faMagnifyingGlassChart,
  faPlug,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';

export const steps = [
  {
    id: '01',
    icon: faPlug,
    title: 'steps.connection.title',
    description: 'steps.connection.description',
  },
  {
    id: '02',
    icon: faTriangleExclamation,
    title: 'steps.errors.title',
    description: 'steps.errors.description',
  },
  {
    id: '03',
    icon: faMagnifyingGlassChart,
    title: 'steps.analysis.title',
    description: 'steps.analysis.description',
  },
  {
    id: '04',
    icon: faClipboardCheck,
    title: 'steps.recommendation.title',
    description: 'steps.recommendation.description',
  },
] as const;
