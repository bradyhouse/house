import { describe, it, expect, vi } from 'vitest'
import * as d3 from 'd3'
import useD3 from '../useD3'

vi.mock('d3', () => ({
  csv: vi.fn().mockResolvedValue([
    { x1: '1', y1: '2', z1: '3', x2: '4', y2: '5', z2: '6' },
  ])
}))

describe('useD3', () => {
  it('fetches and processes data correctly', async () => {
    const result = await useD3()

    expect(d3.csv).toHaveBeenCalledWith('https://raw.githubusercontent.com/plotly/datasets/master/3d-scatter.csv')

    expect(result).toHaveProperty('data')
    expect(result).toHaveProperty('layout')
    expect(result).toHaveProperty('options')

    expect(result.data[0].x).toEqual(['1'])
    expect(result.data[0].y).toEqual(['2'])
    expect(result.data[0].z).toEqual(['3'])
    expect(result.data[1].x).toEqual(['4'])
    expect(result.data[1].y).toEqual(['5'])
    expect(result.data[1].z).toEqual(['6'])

  })
})
