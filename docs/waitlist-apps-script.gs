/**
 * Waitlist → Google Sheet webhook for the /automate landing page.
 *
 * Setup (5 minutes):
 *  1. Create a Google Sheet. Extensions → Apps Script. Paste this file.
 *  2. Deploy → New deployment → Web app.
 *     Execute as: Me. Who has access: Anyone. Copy the web app URL.
 *  3. In Vercel → Project → Settings → Environment Variables, add
 *     WAITLIST_WEBHOOK_URL = <that URL>, then redeploy.
 *
 * One row per lead. The "email" stage creates the row; the "profile" stage
 * fills in the rest of the same row (matched by leadId).
 */

const SHEET_NAME = 'Waitlist';

const COLUMNS = [
  'receivedAt', 'leadId', 'stage', 'name', 'email', 'company', 'whatsapp',
  'useCases', 'task', 'quantity', 'tools', 'teamSize', 'hoursLost',
  'pricingModel', 'currency', 'priceBand', 'priceLabel', 'timeline', 'deposit',
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
  'fbclid', 'gclid', 'ttclid', 'ref', 'referrer', 'landingPath',
  'country', 'city', 'secondsOnForm', 'userAgent',
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = getSheet_();
    const ids = sheet.getRange(2, 2, Math.max(sheet.getLastRow() - 1, 1), 1).getValues().flat();
    const rowIndex = ids.indexOf(data.leadId);

    if (rowIndex === -1) {
      sheet.appendRow(COLUMNS.map((c) => data[c] ?? ''));
    } else {
      const row = rowIndex + 2;
      const range = sheet.getRange(row, 1, 1, COLUMNS.length);
      const current = range.getValues()[0];
      // Keep existing values; overwrite only with non-empty new ones.
      range.setValues([COLUMNS.map((c, i) => (data[c] !== undefined && data[c] !== '' ? data[c] : current[i]))]);
    }
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(COLUMNS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}
