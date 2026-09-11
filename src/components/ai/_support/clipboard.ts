/**
 * Copy text to clipboard, degrading quietly wherever the async Clipboard API
 * is unavailable.
 *
 * This app is rendered inside an iframe whose permissions policy withholds
 * `clipboard-write`. In that situation `navigator.clipboard` still exists and
 * `writeText` is still a function, so a plain feature check passes and the call
 * rejects with `NotAllowedError`. Catching the rejection is not enough: the
 * browser reports the policy violation to the console the moment the call is
 * made, so a caught error still surfaces as an error. The only way to stay
 * quiet is to ask permission first and never make the call.
 *
 * Hence the two guards below — a policy probe before the first call, and a
 * latch after any failure — with a hidden-textarea path behind both.
 */

/** Set once the API has failed, so a blocked document only ever pays for it once. */
let clipboardApiBlocked = false;

/**
 * Whether calling `navigator.clipboard.writeText` is worth attempting.
 *
 * Deliberately conservative: anything we cannot positively confirm is treated
 * as unavailable, because the fallback works everywhere and a false negative
 * costs nothing while a false positive logs a violation.
 */
function clipboardApiAvailable(): boolean {
  if (clipboardApiBlocked) return false;
  if (typeof navigator === 'undefined') return false;
  if (!navigator.clipboard || typeof navigator.clipboard.writeText !== 'function') return false;

  // The API is gated on a secure context regardless of any policy.
  if (typeof window !== 'undefined' && window.isSecureContext === false) return false;

  // Permissions Policy — `featurePolicy` is the older name for the same thing,
  // and neither is in the DOM lib types, so both are read defensively.
  const policy = (document as unknown as {
    permissionsPolicy?: { allowsFeature(f: string): boolean };
    featurePolicy?: { allowsFeature(f: string): boolean };
  });
  const probe = policy.permissionsPolicy ?? policy.featurePolicy;
  if (probe && typeof probe.allowsFeature === 'function') {
    try {
      if (!probe.allowsFeature('clipboard-write')) return false;
    } catch {
      // Some engines throw on unknown feature names. Inconclusive, not a no.
    }
  }

  return true;
}

/**
 * The pre-Clipboard-API path: a throwaway offscreen textarea plus
 * `execCommand('copy')`. Deprecated, but it is the only synchronous copy that
 * survives a restrictive permissions policy, and it needs no permission
 * because the selection is user-visible by definition.
 */
function copyViaTextarea(text: string): void {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.setAttribute('aria-hidden', 'true');
  // Fixed and offscreen so selecting it cannot scroll the page or steal focus
  // in a way the user can see.
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  textarea.style.top = '0';
  textarea.style.opacity = '0';
  textarea.style.pointerEvents = 'none';

  const previouslyFocused = document.activeElement as HTMLElement | null;

  document.body.appendChild(textarea);
  try {
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);
    document.execCommand('copy');
  } catch {
    // execCommand is deprecated and may be gone. Copying is a convenience,
    // never a correctness requirement — the text is on screen either way.
  } finally {
    document.body.removeChild(textarea);
    // Restore focus so the copy button keeps its ring and keyboard users do not
    // get dropped back to <body>.
    previouslyFocused?.focus?.();
  }
}

/**
 * Copy `text`, preferring the async Clipboard API and falling back silently.
 *
 * Never rejects. Callers treat copying as fire-and-forget, and a rejected
 * promise from a helper this widely used is just an unhandled-rejection
 * generator.
 */
export async function copyToClipboard(text: string): Promise<void> {
  if (clipboardApiAvailable()) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Blocked after all — latch it so no later call repeats the violation,
      // then fall through.
      clipboardApiBlocked = true;
    }
  }

  copyViaTextarea(text);
}
