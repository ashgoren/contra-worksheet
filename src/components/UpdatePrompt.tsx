import { Button, Snackbar } from '@mui/material';
import { useRegisterSW } from 'virtual:pwa-register/react';

// Checked hourly — the browser only checks for a new service worker on
// navigation by default, so a tab left open all night wouldn't otherwise
// notice a new deploy.
const UPDATE_CHECK_INTERVAL_MS = 60 * 60 * 1000;

export const UpdatePrompt = () => {
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(_url, registration) {
      if (!registration) return;
      setInterval(() => registration.update(), UPDATE_CHECK_INTERVAL_MS);
      // Backgrounded tabs (e.g. iPad Safari after switching apps) suspend JS
      // timers, so the interval above can't be relied on alone — check again
      // whenever the tab comes back to the foreground.
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') registration.update();
      });
    },
  });

  // Never auto-reload: this is a form, and a forced refresh mid-entry could
  // interrupt someone before their edits are saved (autosave only fires on
  // blur). Show a dismissible-by-inaction prompt instead and let them choose
  // when it's safe to refresh.
  return (
    <Snackbar
      open={needRefresh}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      message='A new version of the worksheet is available.'
      action={
        <Button color='inherit' size='small' onClick={() => updateServiceWorker(true)}>
          Refresh
        </Button>
      }
    />
  );
};
