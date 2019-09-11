import 'typeface-alegreya'
import 'typeface-fira-mono'
import 'typeface-nunito'

import _ from 'lodash'
import fp from 'lodash/fp'
import Typography from 'typography'
import { colors } from '../styles/Theme'

const sansSerifFontFamilies = [
  'Nunito',
  '-apple-system',
  'BlinkMacSystemFont',
  'Segoe UI',
  'Roboto',
  'Oxygen',
  'Ubuntu',
  'Cantarell',
  'Fira Sans',
  'Droid Sans',
  'Helvetica Neue',
  'Arial',
  'sans-serif',
]

const monospaceFontFamilies = [
  'Fira Mono',
  'SFMono-Regular',
  'Menlo',
  'Monaco',
  'Consolas',
  'Liberation Mono',
  'Courier New',
  'monospace',
]

const mapFontFamilyListToString = fp.join(',')

export const textColorBase = 'rgba(0, 0, 0, 0.8)'
export const textColorMuted = 'rgba(0, 0, 0, 0.6)'

// tslint:disable
const options = {
  baseFontSize: '16px',
  baseLineHeight: 1.7,
  blockMarginBottom: 0.75,
  bodyColor: textColorBase,
  bodyFontFamily: sansSerifFontFamilies,
  fontFamily: sansSerifFontFamilies,
  headerFontFamily: sansSerifFontFamilies,
  headerLineHeight: 1.5,
  monospaceFontFamily: monospaceFontFamilies,
  scaleRatio: 2,
  overrideStyles: () => ({
    html: {
      backgroundColor: colors.secondary,
    },
    body: {
      backgroundColor: 'white',
    },
    ol: {
      listStyle: 'none',
    },

    '.code': {
      fontFamily: mapFontFamilyListToString(monospaceFontFamilies),
    },

    '.fira-mono': {
      fontFamily: mapFontFamilyListToString(monospaceFontFamilies),
    },

    '#___gatsby code': {
      fontFamily: mapFontFamilyListToString(monospaceFontFamilies),
      fontWeight: 400,
      textShadow: 'none',
    },

    '.gatsby-highlight > pre': {
      borderRadius: '5px',
    },
  }),
}

const typography = new Typography(options)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
