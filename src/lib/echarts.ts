// Tree-shaken ECharts build: only the pieces the dashboard uses.
import * as echarts from 'echarts/core'
import { BarChart, LineChart, RadarChart, ScatterChart } from 'echarts/charts'
import { GridComponent, LegendComponent, RadarComponent, TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([BarChart, LineChart, RadarChart, ScatterChart, GridComponent, LegendComponent, RadarComponent, TooltipComponent, CanvasRenderer])

export { echarts }
