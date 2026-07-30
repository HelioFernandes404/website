/** Pure state helpers. Keeping scroll selection out of React Flow makes it testable. */
export function selectActiveStep(entries, fallback = 0) {
  const visible = entries
    .filter((entry) => entry.isIntersecting)
    .sort((left, right) => right.intersectionRatio - left.intersectionRatio);

  if (visible.length === 0) return fallback;
  return Number(visible[0].target.dataset.scrollyStep);
}

export function normalizeStepIndex(index, stepCount) {
  if (!Number.isInteger(index) || stepCount < 1) return 0;
  return Math.max(0, Math.min(index, stepCount - 1));
}

export function canExplore(activeStep, stepCount) {
  return stepCount > 0 && activeStep === stepCount - 1;
}
