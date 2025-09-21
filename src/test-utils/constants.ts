export const FAKE_VALUE = crypto.randomUUID().replace(/-/g, '');

export const TestId = {
  ErrorFallback: 'error-fallback',
  ErrorFallbackHeading: 'error-fallback-heading',
  ErrorFallbackMessage: 'error-fallback-message',
  ErrorFallbackStack: 'error-fallback-stack',
  ErrorFallbackIcon: 'error-fallback-icon',
  ErrorFallbackResetBtn: 'error-fallback-reset-btn',
  ProblematicChildMock: 'problematic-child-mock',
  ModalBackdrop: 'modal-backdrop',
  ClearBtn: 'clear-btn',
} as const;
