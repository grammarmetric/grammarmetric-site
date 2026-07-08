/**
 * GrammarMetric — demo-class lead endpoint (Google Apps Script → Google Sheet)
 *
 * This receives demo-class requests from the website's booking form and appends
 * one row per request to a Google Sheet you own. Free, no third-party service,
 * no server to run.
 *
 * SETUP (one time, ~3 minutes):
 *  1. Create a new Google Sheet (e.g. "GrammarMetric Leads").
 *  2. In the Sheet: Extensions → Apps Script. Delete the sample code,
 *     paste this whole file, save.
 *  3. Deploy → New deployment → type "Web app":
 *       - Execute as:        Me
 *       - Who has access:    Anyone          ← required; visitors are anonymous
 *     → Deploy, authorize with your Google account, copy the /exec URL.
 *  4. Paste that URL into index.html → CONFIG.LEAD_ENDPOINT.
 *  5. Smoke test: open the /exec URL in a browser — you should see
 *     {"ok":true,"ping":"grammarmetric-lead-endpoint"} — then submit one real
 *     test booking from the site and check the "Leads" tab.
 *
 * NOTE: if you later edit this script you must Deploy → Manage deployments →
 * edit (pencil) → new version, or the live URL keeps running the old code.
 *
 * TIP: to get an email each time a lead arrives, uncomment the MailApp line
 * below and set NOTIFY_EMAIL.
 */

var SHEET_NAME   = 'Leads';
var NOTIFY_EMAIL = '';   // e.g. 'admin@grammarmetric.com' — leave '' for no email

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, ping: 'grammarmetric-lead-endpoint' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(5000); // two people submitting at once shouldn't lose a row
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sh.getLastRow() === 0) {
      sh.appendRow(['Received', 'Kind', 'Name', 'Method', 'Contact', 'Class type',
                    'Level', 'Schedule', 'Message', 'Consent', 'Page', 'Raw JSON']);
      sh.setFrozenRows(1);
    }
    var d = JSON.parse(e.postData.contents);
    sh.appendRow([
      new Date(),
      d.kind || 'demo', d.name || '', d.method || '', d.contact || '',
      d.classType || '', d.level || '',
      (d.schedule || []).join(', '),
      d.message || '',
      d.consent ? 'yes' : 'NO — investigate, the form should not send without consent',
      d.page || '',
      e.postData.contents,
    ]);

    if (NOTIFY_EMAIL) {
      MailApp.sendEmail(NOTIFY_EMAIL,
        'New demo-class request — ' + (d.name || 'someone'),
        'Contact (' + (d.method || '?') + '): ' + (d.contact || '') +
        '\nClass type: ' + (d.classType || '') +
        '\nLevel: ' + (d.level || '') +
        '\nSchedule: ' + ((d.schedule || []).join(', ') || 'any') +
        '\nNotes: ' + (d.message || '-'));
    }

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    try { lock.releaseLock(); } catch (ignored) {}
  }
}
