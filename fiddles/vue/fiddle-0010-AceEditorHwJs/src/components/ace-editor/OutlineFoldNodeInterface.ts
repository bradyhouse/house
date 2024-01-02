import type { Ace } from 'ace-builds'

export interface OutlineFoldNodeInterface {
  range: Ace.Range
  text: string
  children: OutlineFoldNodeInterface[]
  parent: OutlineFoldNodeInterface
}
