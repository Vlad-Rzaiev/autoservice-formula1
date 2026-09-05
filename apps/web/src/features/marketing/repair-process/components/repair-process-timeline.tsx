import {
  faCalendarCheck,
  faCar,
  faClipboardCheck,
  faFileInvoiceDollar,
  faKey,
  faMagnifyingGlass,
  faScrewdriverWrench,
} from '@fortawesome/free-solid-svg-icons';
import RepairProcessStep from './repair-process-step';

const steps = [
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

export default function RepairProcessTimeline() {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="
          absolute
          left-5
          top-6
          bottom-6
          w-px
          bg-border
          md:left-1/2
          md:-translate-x-1/2
        "
      />

      <ol className="relative space-y-10 md:space-y-0">
        {steps.map((step, index) => (
          <RepairProcessStep
            key={step.translationKey}
            number={step.number}
            icon={step.icon}
            translationKey={step.translationKey}
            reverse={index % 2 !== 0}
          />
        ))}
      </ol>
    </div>
  );
}
