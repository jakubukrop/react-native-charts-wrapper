import * as React from 'react'
import {ViewProps} from 'react-native'

export type CombinableChartType = 'BAR' | 'BUBBLE' | 'LINE' | 'CANDLE' | 'SCATTER'

export type AxisDependency = 'LEFT' | 'RIGHT'

export type TimeUnit = 'MILLISECONDS' | 'SECONDS' | 'MINUTES' | 'HOURS' | 'DAYS' | 'WEEKS' | 'MONTHS'

export type GradientOrientation =
  // draw the gradient from the top to the bottom
  'TOP_BOTTOM'
  // draw the gradient from the top-right to the bottom-left
  | 'TR_BL'
  // draw the gradient from the right to the left
  | 'RIGHT_LEFT'
  // draw the gradient from the bottom-right to the top-left
  | 'BR_TL'
  // draw the gradient from the bottom to the top
  | 'BOTTOM_TOP'
  // draw the gradient from the bottom-left to the top-right
  | 'BL_TR'
  // draw the gradient from the left to the right
  | 'LEFT_RIGHT'
  // draw the gradient from the top-left to the bottom-right
  | 'TL_BR'

export type LineMode = 'LINEAR' | 'STEPPED' | 'CUBIC_BEZIER' | 'HORIZONTAL_BEZIER'

export type PaintStyle = 'FILL' | 'STROKE' | 'FILL_AND_STROKE'

export type Highlights = Array<{
  x: number,
  dataSetIndex?: number,  // this is used in stacked bar chart
  dataIndex?: number,  // this is necessary in combined chart when default highlight is set. the default sequence is line, bar, scatter, candle, bubble
  y?: number,
  stackIndex?: number // for StackBarChart
}>

export type ChangeNativeEvent = {
  action: string,
  left: number,
  right: number,
  top: number,
  bottom: number,
  scaleX: number,
  scaleY: number,
  centerX: number,
  centerY: number
}

export type SelectionNativeEvent = any // TODO

declare namespace ChartDataSetConfig {
  type Common = {
    color?: number,
    colors?: Array<number>,
    highlightEnabled?: boolean,
    drawValues?: boolean,
    valueTextSize?: number,
    valueTextColor?: number,
    visible?: boolean,
    valueFormatter?: 'largeValue' | 'percent' | 'date' | string | Array<string>,
    valueFormatterPattern?: string,
    axisDependency?: AxisDependency,
  }

  type BarLineScatterCandleBubble = {
    highlightColor?: number
  }

  type LineScatterCandleRadar = {
    drawVerticalHighlightIndicator?: boolean,
    drawHorizontalHighlightIndicator?: boolean,
    highlightLineWidth?: number
  }

  type LineRadar = {
    fillGradient?: {
      colors?: Array<number>,
      // iOS
      positions?: Array<number>,
      angle?: number,
      // Android
      orientation?: GradientOrientation,
    },
    fillColor?: number,
    fillAlpha?: number,
    drawFilled?: boolean,
    lineWidth?: number, // between 0.2f and 10f
  }
}

type LineDataConfig = ChartDataSetConfig.Common
  & ChartDataSetConfig.BarLineScatterCandleBubble
  & ChartDataSetConfig.LineScatterCandleRadar
  & ChartDataSetConfig.LineRadar
  & {
    circleRadius?: number,
    drawCircles?: boolean,
    mode?: LineMode,
    drawCubicIntensity?: number,
    circleColor?: number,
    circleColors?: Array<number>,
    circleHoleColor?: number,
    drawCircleHole?: boolean,
    dashedLine?: {
      lineLength: number,
      spaceLength: number,
      phase?: number,
    }
  }

type LineData = {
  dataSets: Array<{
    values: Array<
      {
        x?: number,
        y: number,
        marker?: string,
      } | number
    >,
    label: string,
    config?: LineDataConfig,
  }>
}

type BarData = {
  dataSets: Array<{
    values: Array<
      {
        x?: number,
        y: number | Array<number>,
        marker?: string | Array<string>,
      } | number | Array<number>
    >,
    label: string,
    config: ChartDataSetConfig.Common
    & ChartDataSetConfig.BarLineScatterCandleBubble
    & {
      barShadowColor?: number,
      highlightAlpha?: number,  // using android format (0-255), not ios format(0-1), the conversion is x/255
      stackLabels?: Array<string>,
    }
  }>,
  config?: {
    barWidth?: number,
    group?: {
      fromX: number,
      groupSpace: number,
      barSpace: number,
    }
  }
}

type BubbleData = {
  dataSets: Array<{
    values: Array<{
      x?: number,
      y: number,
      size: number,
      marker?: string,
    }>,
    label: string,
    config?: ChartDataSetConfig.Common | ChartDataSetConfig.BarLineScatterCandleBubble,
  }>
}

type CandleData = {
  dataSets: Array<{
    values: Array<
      {
        x?: number,
        shadowH: number,
        shadowL: number,
        open: number,
        close: number,
        marker?: string,
      }
    >,
    label: string,
    config?: ChartDataSetConfig.Common
    & ChartDataSetConfig.BarLineScatterCandleBubble
    & ChartDataSetConfig.LineScatterCandleRadar
    & {
      barSpace?: number,
      shadowWidth?: number,
      shadowColor?: number,
      shadowColorSameAsCandle?: boolean,
      neutralColor?: number,
      decreasingColor?: number,
      decreasingPaintStyle?: PaintStyle,
      increasingColor?: number,
      increasingPaintStyle?: PaintStyle,
    }
  }>,
}

type PieData = {
  dataSets: Array<{
    values: Array<
      {
        value: number,
        label?: string
      } | number
    >,
    label: string,
    config?: ChartDataSetConfig.Common
    & {
      sliceSpace?: number,
      selectionShift?: number,
      xValuePosition?: 'INSIDE_SLICE' | 'OUTSIDE_SLICE',
      yValuePosition?: 'INSIDE_SLICE' | 'OUTSIDE_SLICE',
      valueLinePart1Length?: number,
      valueLinePart2Length?: number,
      valueLineColor?: number,
      valueLineWidth?: number,
      valueLinePart1OffsetPercentage?: number,
      valueLineVariableLength?: boolean
    }
  }>,
}

type RadarData = {
  dataSets: Array<{
    values: Array<{value: number} | number>,
    label: string,
    config?: ChartDataSetConfig.Common
    & ChartDataSetConfig.LineScatterCandleRadar
    & ChartDataSetConfig.LineRadar,
  }>,
  labels: Array<string>,
}

type ScatterData = {
  dataSets: Array<{
    values: Array<
      {
        x?: number,
        y: number,
        marker?: string,
      } | number
    >,
    label: string,
    config?: ChartDataSetConfig.Common
    & ChartDataSetConfig.BarLineScatterCandleBubble
    & ChartDataSetConfig.LineScatterCandleRadar
    & {
      scatterShapeSize: number,
      scatterShape: 'SQUARE' | 'CIRCLE' | 'TRIANGLE' | 'CROSS' | 'X',
      scatterShapeHoleColor: number,
      scatterShapeHoleRadius: number
    },
  }>,
}

export type CombinedData = {
  lineData?: LineData,
  barData?: BarData,
  scatterData?: ScatterData,
  candleData?: CandleData,
  bubbleData?: BubbleData
}

export type Axis = {
  // what is drawn
  enabled?: boolean,
  drawLabels?: boolean,
  drawAxisLine?: boolean,
  drawGridLines?: boolean,
  // style
  textColor?: number,
  textSize?: number,
  fontFamily?: string,
  fontStyle?: string,
  fontWeight?: string,
  gridColor?: number,
  gridLineWidth?: number,
  axisLineColor?: number,
  axisLineWidth?: number,
  gridDashedLine?: {
    lineLength?: number,
    spaceLength?: number,
    phase?: number
  },
  // limit lines
  limitLines?: Array<{
    limit: number,
    label?: string,
    lineColor?: number,
    lineWidth?: number,
    valueTextColor?: number,
    valueFont?: number,
    labelPosition?: 'LEFT_TOP' | 'LEFT_BOTTOM' | 'RIGHT_TOP' | 'RIGHT_BOTTOM',
    lineDashPhase?: number,
    lineDashLengths?: Array<number>,
  }>,
  drawLimitLinesBehindData?: boolean,

  axisMaximum?: number,
  axisMinimum?: number,
  granularity?: number,
  granularityEnabled?: boolean,

  labelCount?: number,
  labelCountForce?: boolean,

  // Centers the axis labels instead of drawing them at their original position. This is useful especially for grouped BarChart.
  centerAxisLabels?: boolean,

  // formatting
  valueFormatter?: 'largeValue' | 'percent' | 'date' | string | Array<string>,
  valueFormatterPattern?: string,
  since?: number, // milliseconds from 1970-1-1 when x=0
  timeUnit?: TimeUnit, // timeUnit of x,
  timeUnitCount?: number,
}

export type XAxis = Axis & {
  labelRotationAngle?: number,
  avoidFirstLastClipping?: boolean,
  position?: 'TOP' | 'BOTTOM' | 'BOTH_SIDED' | 'TOP_INSIDE' | 'BOTTOM_INSIDE',
  yOffset?: number
}

export type YAxis = Axis & {
  inverted?: boolean,
  spaceTop?: number,
  spaceBottom?: number,
  position?: 'OUTSIDE_CHART' | 'INSIDE_CHART',
  maxWidth?: number,
  minWidth?: number,
  // zero line
  zeroLine?: {
    enabled?: boolean,
    lineWidth?: number,
    lineColor?: number
  }
}

export type Description = {
  text?: string,
  textColor?: number,
  textSize?: number,

  positionX?: number,
  positionY?: number,
}

export type Legend = {
  enabled?: boolean,

  textColor?: number,
  textSize?: number,
  fontFamily?: string,
  fontStyle?: number,
  fontWeight?: number,

  wordWrapEnabled?: boolean,
  maxSizePercent?: number,

  horizontalAlignment?: 'LEFT' | 'CENTER' | 'RIGHT',
  verticalAlignment?: 'TOP' | 'CENTER' | 'BOTTOM',
  orientation?: 'HORIZONTAL' | 'VERTICAL',
  drawInside?: boolean,
  direction?: 'LEFT_TO_RIGHT' | 'RIGHT_TO_LEFT',

  form?: 'NONE' | 'EMPTY' | 'DEFAULT' | 'SQUARE' | 'CIRCLE' | 'LINE',
  formSize?: number,
  xEntrySpace?: number,
  yEntrySpace?: number,
  formToTextSpace?: number,

  custom?: {
    colors?: Array<number>,
    labels?: Array<string>,
  },
}

interface ChartBase extends ViewProps {
  animation?: {
    durationX?: number, // Millis
    durationY?: number, // Millis
    easingX?: string,
    easingY?: string
  },

  chartBackgroundColor?: number,
  logEnabled?: boolean,
  noDataText?: string,

  touchEnabled?: boolean,
  dragDecelerationEnabled?: boolean,
  dragDecelerationFrictionCoef?: number, // between 0 and 1

  highlightPerTapEnabled?: boolean,
  chartDescription?: Description,
  legend?: Legend,
  xAxis?: XAxis,

  marker?: {
    enabled?: boolean,
    digits?: number,
    markerColor?: number,
    textColor?: number,
    textSize?: number,
  },

  highlights?: Highlights,

  onSelect?: (event: {nativeEvent: SelectionNativeEvent}) => void
  onChange?: (event: {nativeEvent: ChangeNativeEvent}) => void
}

interface BarLineChartBaseProps extends ChartBase {
  maxHighlightDistance?: number,
  drawGridBackground?: boolean,
  gridBackgroundColor?: number,

  drawBorders?: boolean,
  borderColor?: number,
  borderWidth?: number,

  minOffset?: number,
  maxVisibleValueCount?: number,
  visibleRange?: {
    x?: {
      min?: number,
      max?: number
    },
    y?: {
      left?: {
        min?: number,
        max?: number
      },
      right?: {
        min?: number,
        max?: number
      }
    }
  },
  autoScaleMinMaxEnabled?: boolean,
  keepPositionOnRotation?: boolean,

  highlightPerDragEnabled?: boolean,

  scaleEnabled?: boolean,
  scaleXEnabled?: boolean,
  scaleYEnabled?: boolean,
  dragEnabled?: boolean,
  pinchZoom?: boolean,
  doubleTapToZoomEnabled?: boolean,
  yAxis?: {
    left?: YAxis,
    right?: YAxis,
  },
  zoom?: {
    scaleX: number,
    scaleY: number,
    xValue: number,
    yValue: number,
    axisDependency?: AxisDependency
  },
  viewPortOffsets?: {
    left?: number,
    top?: number,
    right?: number,
    bottom?: number
  },
  extraOffsets?: {
    left?: number,
    top?: number,
    right?: number,
    bottom?: number
  },

  group?: string,
  identifier?: string,
  syncX?: boolean,
  syncY?: boolean,
}

interface PieRadarChartBase extends ChartBase {
  minOffset?: number,
  rotationEnabled?: boolean,
  rotationAngle?: number
}

declare class ChartComponent<P> extends React.Component<P> {
  highlights(config: Highlights): void;

  moveViewTo(x: number, y: number, axisDependency: AxisDependency): void;
  moveViewToX(x: number): void;
  moveViewToAnimated(x: number, y: number, axisDependency: AxisDependency, duration: number): void;
  centerViewTo(x: number, y: number, axisDependency: AxisDependency): void;
  centerViewToAnimated(x: number, y: number, axisDependency: AxisDependency, duration: number): void;

  fitScreen(): void;

  setDataAndLockIndex(data: LineData | BarData | ScatterData | CandleData | BubbleData | PieData | RadarData | CombinedData): void;
}

interface LineChartProps extends BarLineChartBaseProps {
  data: LineData,
}

export class LineChart extends ChartComponent<LineChartProps> {}

interface BubbleChartProps extends BarLineChartBaseProps {
  data: BubbleData,
}

export class BubbleChart extends ChartComponent<BubbleChartProps> {}

interface ScatterChartProps extends BarLineChartBaseProps {
  data: ScatterData,
}

export class ScatterChart extends ChartComponent<ScatterChartProps> {}

interface BarChartProps extends BarLineChartBaseProps {
  drawValueAboveBar?: boolean,
  drawBarShadow?: boolean,
  data: BarData,
}

export class BarChart extends ChartComponent<BarChartProps> {}

interface HorizontalBarChartProps extends BarLineChartBaseProps {
  drawValueAboveBar?: boolean,
  drawBarShadow?: boolean,
  data: BarData,
}

export class HorizontalBarChart extends ChartComponent<HorizontalBarChartProps> {}

interface CandleStickChartProps extends BarLineChartBaseProps {
  data: CandleData,
}

export class CandleStickChart extends ChartComponent<CandleStickChartProps> {}

interface PieChartProps extends PieRadarChartBase {
  drawEntryLabels?: boolean,
  usePercentValues?: boolean,

  centerText?: string,
  styledCenterText?: {
    text?: string,
    color?: number,
    size?: number
  },
  centerTextRadiusPercent?: number,
  holeRadius?: number,
  holeColor?: number,
  transparentCircleRadius?: number,
  transparentCircleColor?: number,

  entryLabelColor?: number,
  entryLabelTextSize?: number,
  maxAngle?: number,

  data: PieData,
}

export class PieChart extends ChartComponent<PieChartProps> {}

interface RadarChartProps extends PieRadarChartBase {
  yAxis?: YAxis,
  drawWeb?: boolean,
  skipWebLineCount?: number,
  data: RadarData,
}

export class RadarChart extends ChartComponent<RadarChartProps> {}

interface CombinedChartProps extends BarLineChartBaseProps {
  drawOrder?: Array<CombinableChartType>,
  drawValueAboveBar?: boolean,
  highlightFullBarEnabled?: boolean,
  drawBarShadow?: boolean,
  data: CombinedData,
}

export class CombinedChart extends ChartComponent<CombinedChartProps> {
}
