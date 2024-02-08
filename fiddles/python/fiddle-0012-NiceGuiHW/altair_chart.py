from typing import Callable, Optional

from nicegui.element import Element




class AltairChart(Element, component='altair_chart.js'):

    def __init__(self, *, on_change: Optional[Callable] = None) -> None:
        super().__init__()
        self.on('change', on_change)

    def next(self) -> None:
        self.run_method('next')
    
    def prev(self) -> None:
        self.run_method('prev')
    
    def fromDrop(self) -> None:
        self.run_method('fromDrop')

