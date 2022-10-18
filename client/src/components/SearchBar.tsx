import { TextField, MenuItem, Select } from '@mui/material'
import {  SearchBarProps } from '../types'

const style = {
	//HOW DO I CENTER A DIV HELP
	margin: 'auto',
	width: '20%',
	padding: '10px',
	borderRadius: '25px'
}

export default function SearchBar(props: SearchBarProps) {
  return (
    <div style={style}>
      <TextField
        type="text"
        label="Book title"
        value={props.searchTerm}
        variant="filled"
        onChange={props.handleTermChange}
      />
    </div>
  )
}
