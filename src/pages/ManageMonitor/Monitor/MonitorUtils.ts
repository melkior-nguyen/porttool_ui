import { apiFormData } from "./MonitorFormData/apiFormData";
import { httpFormData } from "./MonitorFormData/httpFormData";
import { httpsFormData } from "./MonitorFormData/httpsFormData";
import { mongoDBFormData } from "./MonitorFormData/mongoDBFormData";
import { mySQLFormData } from "./MonitorFormData/mySQLFormData";
import { portFormData } from "./MonitorFormData/portFormData";
import { postgresFormData } from "./MonitorFormData/postgresFormData";
import { redisFormData } from "./MonitorFormData/redisFormData";
import { smtpFormData } from "./MonitorFormData/smtpFormData";

export const MONITOR_TYPES = [
  { value: "PORT", name: "PORT", formData: portFormData },
  { value: "HTTP", name: "HTTP", formData: httpFormData },
  { value: "HTTPS", name: "HTTPS", formData: httpsFormData },
  { value: "POSTGRES", name: "POSTGRES", formData: postgresFormData },
  { value: "MYSQL", name: "MYSQL", formData: mySQLFormData },
  { value: "MONGO", name: "MONGO", formData: mongoDBFormData },
  { value: "REDIS", name: "REDIS", formData: redisFormData },
  { value: "SMTP", name: "SMTP", formData: smtpFormData },
  { value: "API", name: "API", formData: apiFormData },
];
