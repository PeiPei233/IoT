package bs.backend.utils.time;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TimestampRange {
    Long beginTimestamp;
    Long endTimestamp;

    public TimestampRange(String beginTime, String endTime) {
        if (beginTime == null || beginTime.equals("")) {
            if (endTime == null || endTime.equals("")) {
                this.beginTimestamp = null;
                this.endTimestamp = null;
            } else {
                setRange(endTime);
            }
        } else {
            if (endTime == null || endTime.equals("")) {
                setRange(beginTime);
            } else {
                setRange(beginTime, endTime);
            }
        }
    }

    public TimestampRange(String time) {
        if (time == null || time.equals("")) {
            this.beginTimestamp = null;
            this.endTimestamp = null;
        } else {
            setRange(time);
        }
    }

    private void setRange(String time) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String padTime = getPadTime(time);
        LocalDateTime start = LocalDateTime.parse(padTime, formatter).truncatedTo(getTruncateUnit(time));
        LocalDateTime end = start.plus(1, getTruncateUnit(time)).minusNanos(1);

        beginTimestamp = start.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();
        endTimestamp = end.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();
    }

    private void setRange(String beginTime, String endTime) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String padBeginTime = getPadTime(beginTime);
        String padEndTime = getPadTime(endTime);
        LocalDateTime start = LocalDateTime.parse(padBeginTime, formatter).truncatedTo(getTruncateUnit(beginTime));
        LocalDateTime end = LocalDateTime.parse(padEndTime, formatter).truncatedTo(getTruncateUnit(endTime)).plus(1, getTruncateUnit(endTime)).minusNanos(1);

        beginTimestamp = start.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();
        endTimestamp = end.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();
    }

    private String getPadTime(String time) {
        return switch (time.length()) {
            case 4 -> time + "-01-01 00:00:00";
            case 7 -> time + "-01 00:00:00";
            case 10 -> time + " 00:00:00";
            case 13 -> time + ":00:00";
            case 16 -> time + ":00";
            case 19 -> time;
            default -> throw new IllegalStateException("Unexpected value: " + time.length());
        };
    }

    private ChronoUnit getTruncateUnit(String time) {
        return switch (time.length()) {
            case 4 -> ChronoUnit.YEARS;
            case 7 -> ChronoUnit.MONTHS;
            case 10 -> ChronoUnit.DAYS;
            case 13 -> ChronoUnit.HOURS;
            case 16 -> ChronoUnit.MINUTES;
            case 19 -> ChronoUnit.SECONDS;
            default -> ChronoUnit.NANOS; // Default case, should not happen
        };
    }

}
