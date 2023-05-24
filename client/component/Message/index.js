import StatusAlert, { StatusAlertService } from "react-status-alert";
// https://www.npmjs.com/package/react-status-alert 文档地址
const error = (...ags) => StatusAlertService.showError(...ags);
const warning = (...ags) => StatusAlertService.showWarning(...ags);
const success = (...ags) => StatusAlertService.showSuccess(...ags);
const alert = (...ags) => StatusAlertService.showError(...ags);
const info = (...ags) => StatusAlertService.showInfo(...ags);
const removeAlert = (...ags) => StatusAlertService.removeAlert(...ags);
const removeAllAlerts = (...ags) => StatusAlertService.removeAllAlerts(...ags);

StatusAlert.error = error;
StatusAlert.warning = warning;
StatusAlert.alert = alert;
StatusAlert.removeAlert = removeAlert;
StatusAlert.removeAllAlerts = removeAllAlerts;
StatusAlert.success = success;
StatusAlert.warning = warning;
export default StatusAlert;
export { alert, error, info, removeAlert, removeAllAlerts, success, warning };
