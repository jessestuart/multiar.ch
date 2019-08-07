import '@testing-library/jest-dom/extend-expect'
import { createTransformer } from 'babel-jest'

// Gatsby's `<Link>` overrides:
// Gatsby defines a global called ___loader to prevent its method calls from
// creating console errors.
// @ts-ignore
global.___loader = {
  // tslint:disable
  enqueue: () => {},
  hovering: () => {},
}

export default createTransformer({
  presets: ['babel-preset-gatsby'],
})
