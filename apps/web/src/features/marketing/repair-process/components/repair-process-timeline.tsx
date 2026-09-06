import { repairProcessSteps } from '@/features/marketing/lib';
import RepairProcessStep from './repair-process-step';

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
        {repairProcessSteps.map((step, index) => (
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
