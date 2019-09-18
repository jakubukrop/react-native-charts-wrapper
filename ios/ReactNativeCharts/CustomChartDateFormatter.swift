//
//  CustomChartDateFormatter.swift
//  Charts
//
//  Created by wuxudong on 2018/10/6.
//

import Foundation
import Charts

open class CustomChartDateFormatter: NSObject, IValueFormatter, IAxisValueFormatter {

    open var dateFormatter = DateFormatter();

    open var since = 0.0

    open var timeUnit : String?

    open var timeUnitCount : Int?

    public override init() {

    }

    public init(pattern: String?, since: Double, timeUnit: String?, timeUnitCount: Int?) {
        self.dateFormatter.dateFormat = pattern;
        // uncommenting this will result in same date as on binance.org
        //self.dateFormatter.timeZone = TimeZone(secondsFromGMT: 0)
        self.since = since
        self.timeUnit = timeUnit
        self.timeUnitCount = timeUnitCount
    }

    open func stringForValue(_ value: Double, axis: AxisBase?) -> String {
        return format(value)
    }

    open func stringForValue(_ value: Double, entry: ChartDataEntry, dataSetIndex: Int, viewPortHandler: ViewPortHandler?) -> String {
        return format(value)
    }

    fileprivate func format(_ value: Double) -> String
    {
        let sinceDate = Date(timeIntervalSince1970: self.since / 1000.0)
        // replace by iso calendar ?
        let sinceWeekDay = Calendar.current.component(.weekday, from: sinceDate)
        var span: DateComponents
        let intValue = Int(value)*timeUnitCount!

        // TODO: any better enum other than String equals to java.util.TimeUnit
        switch timeUnit {
        case "MILLISECONDS":
          span = DateComponents.init(nanosecond: intValue*1000)
        case "SECONDS":
            span = DateComponents.init(second: intValue)
        case "MINUTES":
            span = DateComponents.init(minute: intValue)
        case "HOURS":
            span = DateComponents.init(hour: intValue)
        case "DAYS":
            span = DateComponents.init(day: intValue)
        case "WEEKS":
            // 2 is monday
            // https://developer.apple.com/documentation/foundation/calendar/component/weekday
            span = DateComponents.init(day: intValue*7 + 2 - sinceWeekDay)
        case "MONTHS":
            span = DateComponents.init(month: intValue)
        default:
            span = DateComponents.init(nanosecond: intValue*1000)
        }
        let desiredDate = Calendar.current.date(byAdding: span, to: sinceDate)
        // replace by iso foramtter?
        return self.dateFormatter.string(from: desiredDate!)
    }

}
