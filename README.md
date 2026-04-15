# Usage Guide

## Pages

**Page 1 — Data entry:** Fill in event info (most of which flows directly to the bookings history spreadsheet), cash/check/electronic payment breakdown, donations, memberships, misc expenses, and the talent grid.

> **Talent grid order:**  The first row defaults to the sound person, which is different from the old paper form.

**Page 2 — Calculations:** Displays computed results based on your inputs, including the talent grid with share amounts and signature spots. There is also a spot to enter your name before submitting.

## Submitting

Submission:
- Generates a PDF report, emails it to the bookkeeper, and saves it to Google Drive
- Adds a row to the bookings history spreadsheet with all columns filled, and a link to the PDF

Resubmission:
- To correct a previously submitted worksheet, click **Restore Backup**, make your changes, and resubmit.

## Data persistence

Form data is saved locally in the browser, so refreshing or accidentally closing the tab won't lose your work. You can also fill out the form offline and submit once you're back online, as long as the form has been loaded on the device at least once.

---

# Developer Guide

## Deployment

```sh
git push origin main # or merge branch into main
firebase deploy --only functions
```
