import { TextField, MenuItem, Select } from '@mui/material'
import {  SearchBarProps } from '../types'

export default function SearchBar(props: SearchBarProps) {
  return (
    <div className="searchBar">
      <TextField
        type="text"
        label="Country's name"
        value={props.searchTerm}
        variant="filled"
        onChange={props.handleTermChange}
      />
    </div>
  )
}
