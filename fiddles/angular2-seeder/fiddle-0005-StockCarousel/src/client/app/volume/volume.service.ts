import { Injectable } from '@angular/core';

import { DataService } from '../interfaces/index';

export class Value {
  value: number;
  diff: number;
}

export class DayClose {
  close: number;
  date: Date;
}

export class WeekData {
  date: Date;
  open: Value;
  high: Value;
  low: Value;
  close: Value;
  volume: number;
  adjClose: number;
  dayClose: DayClose[];
}

const weekData: WeekData[] = [{
  'date': new Date('2013/12/23'),
  'open': {
    'value': 0,
    'diff': 92.76
  },
  'high': {
    'value': 359111,
    'diff': 50.34
  },
  'low': {
    'value': 3552.3,
    'diff': 129.44
  },
  'close': {
    'value': 3574.02,
    'diff': 42.83
  },
  'volume': 125434000,
  'adjClose': 3574.02,
  'dayClose': [{
    'close': 3569.4,
    'date': new Date('2013/12/23')
  }, {
    'close': 3572.8,
    'date': new Date('2013/12/24')
  }, {
    'close': 3584.58,
    'date': new Date('2013/12/26')
  }, {
    'close': 3574.02,
    'date': new Date('2013/12/27')
  }]
}, {
  'date': new Date('2013/12/16'),
  'open': {
    'value': 0,
    'diff': -45.24
  },
  'high': {
    'value': 420022,
    'diff': 16.96
  },
  'low': {
    'value': 3422.86,
    'diff': -26.88
  },
  'close': {
    'value': 3531.19,
    'diff': 74.79
  },
  'volume': 226135200,
  'adjClose': 3531.19,
  'dayClose': [{
    'close': 3475.79,
    'date': new Date('2013/12/16')
  }, {
    'close': 3469.32,
    'date': new Date('2013/12/17')
  }, {
    'close': 3509.63,
    'date': new Date('2013/12/18')
  }, {
    'close': 3498.63,
    'date': new Date('2013/12/19')
  }, {
    'close': 3531.19,
    'date': new Date('2013/12/20')
  }]
}];

@Injectable()
export class VolumeService implements DataService {
  getData() {
    return weekData;
  }
}
