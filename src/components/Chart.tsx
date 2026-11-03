import ReactEChartsCore from 'echarts-for-react/esm/core'
import type { EChartsOption } from 'echarts'
import { echarts } from '../lib/echarts'

interface Props {
  option: EChartsOption
  height?: number
  onEvents?: Record<string, (params: unknown) => void>
}

export function Chart({ option, height = 300, onEvents }: Props) {
  return (
    <ReactEChartsCore
      echarts={echarts}
      option={option}
      notMerge
      lazyUpdate
      onEvents={onEvents}
      style={{ height, width: '100%' }}
      opts={{ renderer: 'canvas' }}
    />
  )
}
