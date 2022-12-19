import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export const convertToLocalTimezone = (date: Dayjs, timezone: number) =>
  date.utc().add(timezone, "seconds");
