'use client';

import Button from './ui/Button';
import TextLink from './ui/TextLink';

// PlanVisitModal (mounted in the root layout) listens for this event.
function openPlanVisit() {
  window.dispatchEvent(new CustomEvent('open-plan-visit-modal'));
}

export default function PlanVisitTrigger({ as = 'button', ...props }) {
  if (as === 'text') return <TextLink onClick={openPlanVisit} {...props} />;
  return <Button onClick={openPlanVisit} {...props} />;
}
