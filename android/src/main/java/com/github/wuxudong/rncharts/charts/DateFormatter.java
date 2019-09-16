package com.github.wuxudong.rncharts.charts;

import com.github.mikephil.charting.formatter.ValueFormatter;

import java.util.Calendar;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

/**
 * Created by dougl on 05/09/2017.
 */
public class DateFormatter extends ValueFormatter {

    private DateFormat mFormat;

    private long since = 0;

    private String timeUnit;

    private int timeUnitCount;

    public DateFormatter(String pattern, long since, String timeUnit, int timeUnitCount) {
        mFormat = new SimpleDateFormat(pattern);

        this.since = since;

        this.timeUnit = timeUnit;

        this.timeUnitCount = timeUnitCount;
    }

    @Override
    public String getFormattedValue(float value) {
        Calendar c = Calendar.getInstance(TimeZone.getTimeZone("GMT"));
        c.setTimeInMillis(since);
        int field;

        switch (timeUnit) {
        case "MILLISECONDS":
            field = Calendar.MILLISECOND;
            break;
        case "SECONDS":
            field = Calendar.SECOND;
            break;
        case "MINUTES":
            field = Calendar.MINUTE;
            break;
        case "HOURS":
            field = Calendar.HOUR_OF_DAY;
            break;
        case "DAYS":
            field = Calendar.DAY_OF_YEAR;
            break;
        case "WEEKS":
            field = Calendar.WEEK_OF_YEAR;
            break;
        case "MONTHS":
            field = Calendar.MONTH;
            break;
        default:
            field = Calendar.MILLISECOND;
        }

        c.add(field, timeUnitCount * (int) value);

        if ("WEEKS".equals(timeUnit)) {
            c.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY); // shift to week start
        }

        return mFormat.format(c.getTime());
    }
}