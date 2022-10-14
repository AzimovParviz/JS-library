import { TextField, MenuItem, Select } from '@mui/material'
import {  SearchBarProps } from '../types'

export default function SearchBar(props: SearchBarProps) {
  return (
    <div className="searchBar">
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
