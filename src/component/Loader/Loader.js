import React from 'react'
import css from './Loader.css'

const loader = (props) => (
  props.show ? <div className={css.Loader} /> : null
)

export default loader;