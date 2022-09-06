export const MESSAGE = 'This page does not exist :('

export const MAIN_URL = 'http://79.143.31.216'

export const SHORT_LINKS_URL = 'http://79.143.31.216/s'

export const URLS = {
  LOGIN: 'login',
  REGISTER: 'register',
  SQUEEZE: 'squeeze',
  STATISTICS: 'statistics',
}

export const ORDER: {
  ASC: { [index in string]: string }
  DESC: { [index in string]: string }
} = {
  ASC: {
    SHORT: 'asc_short',
    TARGET: 'asc_target',
    COUNT: 'asc_counter',
  },
  DESC: {
    SHORT: 'desc_short',
    TARGET: 'desc_target',
    COUNT: 'desc_counter',
  },
}
