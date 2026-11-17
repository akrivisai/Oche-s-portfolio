/**
 * MediScripts — waitlist & bulk-enquiry leads → Google Sheet.
 *
 * Setup:
 *  1. Create a Google Sheet. Extensions → Apps Script. Paste this file.
 *  2. Deploy → New deployment → Web app. Execute as: Me. Who has access: Anyone.
 *  3. Copy the web app URL. In Vercel → Project → Settings → Environment
 *     Variables add LEAD_WEBHOOK_URL = <that URL>, then redeploy.
 *
 * Waitlist sign-ups and bulk enquiries go to separate tabs.
 */

const COLUMNS = [
  'receivedAt', 'kind', 'name', 'organisation', 'phone', 'email', 'quantity', 'interests', 'message',
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'ttclid', 'gclid',
  'referrer', 'page', 'country', 'city',
];

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const tab = data.kind === 'bulk' ? 'Bulk enquiries' : 'Waitlist';
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(tab);
  if (!sheet) {
    sheet = ss.insertSheet(tab);
    sheet.appendRow(COLUMNS);
    sheet.setFrozenRows(1);
  }
  sheet.appendRow(COLUMNS.map((c) => data[c] || ''));
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}
