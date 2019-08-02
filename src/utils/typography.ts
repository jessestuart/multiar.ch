import 'typeface-alegreya'
import 'typeface-alegreya-sans'
import 'typeface-fira-mono'
import 'typeface-lato'

import _ from 'lodash'
import fp from 'lodash/fp'
import Typography from 'typography'

const sansSerifFontFamilies = [
  'Lato',
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

const serifFontFamilies = [
  'Alegreya',
  'Georgia',
  'Times New Roman',
  'Times',
  'serif',
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

const baseFontFamilyList = _.concat(['Lato'], sansSerifFontFamilies)

const mapFontFamilyListToString = fp.join(',')

export const textColorBase = 'rgba(0, 0, 0, 0.8)'
export const textColorMuted = 'rgba(0, 0, 0, 0.6)'

// tslint:disable
const options = {
  baseFontSize: '16px',
  baseLineHeight: 1.9,
  blockMarginBottom: 0.75,
  bodyColor: textColorBase,
  bodyFontFamily: baseFontFamilyList,
  fontFamily: baseFontFamilyList,
  // headerColor: Theme.colors.primary,
  headerFontFamily: _.concat(['Alegreya Sans'], sansSerifFontFamilies),
  headerLineHeight: 1.7,
  monospaceFontFamily: monospaceFontFamilies,
  scaleRatio: 2,
  overrideStyles: () => ({
    // blockquote: {
    //   fontStyle: 'inherit',
    //   textAlign: 'justify',
    //   textIndent: '2em',
    // },
    // a: {
    //   color: textColorBase,
    // },

    ol: {
      listStyle: 'none',
    },

    '.spectral': {
      fontFamily: mapFontFamilyListToString(serifFontFamilies),
    },

    '.lato': {
      fontFamily: mapFontFamilyListToString(baseFontFamilyList),
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

    '.token.operator': {
      background: 'inherit !important',
    },

    // 'blockquote > *not(:last-child)': {
    //   paddingBottom: '0.5',
    // },

    // '.pseudo-underline': {
    //   borderBottom: `2px solid ${colors.defaultLink}`,
    //   position: 'relative',
    //   textDecoration: 'none',
    //   fontFamily: overrideStyleOptions.headerFontFamily.join(','),
    // },

    // 'article a.anchor': {
    //   borderBottom: 'none',
    //   boxShadow: 'none',
    //   color: 'inherit',
    //   fill: colors.primary.main,
    //   textDecoration: 'none',
    // },
  }),
}

const typography = new Typography(options)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
