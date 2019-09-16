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
        var span = 0.0
        
        // TODO: any better enum other than String equals to java.util.TimeUnit
        switch timeUnit {
        case "MILLISECONDS":
            span = value / 1000.0
        case "SECONDS":
            span = value
        case "MINUTES":
            span = value * 60
        case "HOURS":
            span = value * 60 * 60
        case "DAYS":
            span = value * 60 * 60 * 24
        case "WEEKS":
            // TODO naive, use some lib to ensure start of week
            span = value * 60 * 60 * 24 * 7
        case "MONTHS":
            // TODO naive, use some lib to add months
            span = value * 60 * 60 * 24 * 30
        default:
            span = value / 1000.0
        }
        
        let timeIntervalSince1970 = self.since / 1000.0 + Double(timeUnitCount!) * span
        
        let date = Date(timeIntervalSince1970: timeIntervalSince1970);
        return self.dateFormatter.string(from: date);
    }
    
}
