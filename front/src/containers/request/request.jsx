import React from 'react'
import { Flex, Box } from '@rebass/grid'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'

import { UserContext } from '../../user-context'
import { colors, indentations, routes } from '../../common'
import { login } from '../../api'

function createRequestInfoData(
  requisites,
  person,
  purpose,
  description,
  address,
) {
  return {
    requisites,
    person,
    purpose,
    description,
    address,
  }
}

const requestInfoRows = [
  createRequestInfoData('ОАО "Глобус"', 'Петров А.И.', 3.7, 67, 4.3),
]

const requestInfoHeadRows = [
  { id: 'requisites', disablePadding: false, label: 'Реквизиты клиента' },
  { id: 'person', disablePadding: false, label: 'Физическое лицо' },
  { id: 'purpose', disablePadding: false, label: 'Цель запроса' },
  { id: 'description', disablePadding: false, label: 'Краткое описание' },
  { id: 'address', disablePadding: false, label: 'Адрес объекта' },
]

function createRequestEmployeesData(
  requisites,
  person,
  purpose,
  description,
  address,
) {
  return {
    requisites,
    person,
    purpose,
    description,
    address,
  }
}

const requestEmployeesRows = [
  createRequestInfoData('ОАО "Глобус"', 'Петров А.И.', 3.7, 67, 4.3),
]

const requestInfoHeadRows = [
  { id: 'requisites', disablePadding: false, label: 'Реквизиты клиента' },
  { id: 'person', disablePadding: false, label: 'Физическое лицо' },
  { id: 'purpose', disablePadding: false, label: 'Цель запроса' },
  { id: 'description', disablePadding: false, label: 'Краткое описание' },
  { id: 'address', disablePadding: false, label: 'Адрес объекта' },
]

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein }
}

const rows = [
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Donut', 452, 25.0, 51, 4.9),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Honeycomb', 408, 3.2, 87, 6.5),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Jelly Bean', 375, 0.0, 94, 0.0),
  createData('KitKat', 518, 26.0, 65, 7.0),
  createData('Lollipop', 392, 0.2, 98, 0.0),
  createData('Marshmallow', 318, 0, 81, 2.0),
  createData('Nougat', 360, 19.0, 9, 37.0),
  createData('Oreo', 437, 18.0, 63, 4.0),
]

function desc(a, b, orderBy) {
  if (b[ orderBy ] < a[ orderBy ]) {
    return -1
  }
  if (b[ orderBy ] > a[ orderBy ]) {
    return 1
  }
  return 0
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [ el, index ])
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[ 0 ], b[ 0 ])
    if (order !== 0) {
      return order
    }
    return a[ 1 ] - b[ 1 ]
  })
  return stabilizedThis.map(el => el[ 0 ])
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy)
}

const headRows = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)' },
  { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
  { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
  { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
  { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
]

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props
  const createSortHandler = property => event => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {headRows.map(row => (
          <TableCell
            key={row.id}
            align={row.numeric ? 'right' : 'left'}
            padding={row.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === row.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === row.id}
              direction={order}
              onClick={createSortHandler(row.id)}
            >
              {row.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
}

const EnhancedTableToolbar = () => (
  <Toolbar>
    <Typography variant="h6" id="tableTitle">
      Информация о заявке
    </Typography>
  </Toolbar>
)

function EnhancedTable() {
  const classes = {}
  const [ order, setOrder ] = React.useState('asc')
  const [ orderBy, setOrderBy ] = React.useState('calories')
  const [ selected, setSelected ] = React.useState([])
  const [ page, setPage ] = React.useState(0)
  const [ dense, setDense ] = React.useState(false)
  const [ rowsPerPage, setRowsPerPage ] = React.useState(5)

  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === 'desc'
    setOrder(isDesc ? 'asc' : 'desc')
    setOrderBy(property)
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.name)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  function handleClick(event, name) {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }

    setSelected(newSelected)
  }

  function handleChangePage(event, newPage) {
    setPage(newPage)
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value)
  }

  const isSelected = name => selected.indexOf(name) !== -1

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

  return (
    <div>
      <Paper>
        <EnhancedTableToolbar numSelected={selected.length} />
        <div>
          <Table
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  const isItemSelected = isSelected(row.name)
                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isItemSelected} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                      <TableCell align="right">{row.protein}</TableCell>
                    </TableRow>
                  )
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[ 5, 10, 25 ]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  )
}

const initialState = {
  username: '',
  password: '',
  showPassword: false,
  dialogOpened: false,
}

export class Request extends React.Component {
  state = initialState

  static contextType = UserContext

  render() {
    return (
      <Flex flex="1 0 auto" flexDirection="column" justifyContent="center" alignItems="center">
        <Helmet>
          <title>Заявка</title>
        </Helmet>
        <Box>
          <EnhancedTable />
        </Box>
      </Flex>
    )
  }
}
