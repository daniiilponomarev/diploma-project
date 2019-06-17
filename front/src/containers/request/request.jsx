import React from 'react';
import { Flex, Box } from '@rebass/grid';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Save from '@material-ui/icons/Save';

import { UserContext } from '../../user-context';
import { colors, indentations, routes } from '../../common';
import { login } from '../../api';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const tableIcons = {
  Add: AddBox,
  Check: Check,
  Clear: Clear,
  Delete: DeleteOutline,
  DetailPanel: ChevronRight,
  Edit: Edit,
  Export: SaveAlt,
  Filter: FilterList,
  FirstPage: FirstPage,
  LastPage: LastPage,
  NextPage: ChevronRight,
  PreviousPage: ChevronLeft,
  ResetSearch: Clear,
  Search: Search,
  SortArrow: ArrowUpward,
  ThirdStateCheck: Remove,
  ViewColumn: ViewColumn,
  Save: Save,
};

export function RequestInfo() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'ИНН клиента', field: 'INN' },
      { title: 'КПП клиента', field: 'KPP' },
      { title: 'Физическое лицо', field: 'person' },
      { title: 'Цель запроса', field: 'purpose' },
      { title: 'Краткое описание', field: 'description' },
      { title: 'Адрес объекта', field: 'address' },
    ],
    data: [
      {
        INN: '6449013711 ',
        KPP: '644901001',
        person: 'ТУЧИН МИХАИЛ АЛЕКСАНДРОВИЧ',
        purpose: 'Настроить экраны',
        description: 'Вышли из строя экраны оборудования',
        address: 'Тула, ул. Петрова, д.8',
      },
    ],
  });

  return (
    <MaterialTable
      title="Заявка"
      icons={tableIcons}
      columns={state.columns}
      data={state.data}
      // data={query =>
      //   new Promise((resolve, reject) => {
      //     let url = 'https://reqres.in/api/users?'
      //     url += 'per_page=' + query.pageSize
      //     url += '&page=' + (query.page + 1)
      //     fetch(url)
      //       .then(response => response.json())
      //       .then(result => {
      //         resolve({
      //           data: result.data,
      //           page: result.page - 1,
      //           totalCount: result.total,
      //         })
      //       })
      //   })
      // }
      options={{
        exportButton: true,
        paging: false,
        search: false,
      }}
    />
  );
}

export function RequestBrigade() {
  const [state, setState] = React.useState({
    columns: [{ title: 'ФИО', field: 'fullName' }, { title: 'Квалификация', field: 'qualificate' }],
    data: [
      {
        fullName: 'Дорофеев Герасим Филатович',
        qualificate: 'Специалист',
      },
      {
        fullName: 'Голубев Мечеслав Авксентьевич',
        qualificate: 'Специалист',
      },
      {
        fullName: 'Рожков Ким Лукьянович',
        qualificate: 'Младший специалист',
      },
    ],
  });

  return (
    <MaterialTable
      title="Бригада #5"
      icons={tableIcons}
      columns={state.columns}
      data={state.data}
      // data={query =>
      //   new Promise((resolve, reject) => {
      //     let url = 'https://reqres.in/api/users?'
      //     url += 'per_page=' + query.pageSize
      //     url += '&page=' + (query.page + 1)
      //     fetch(url)
      //       .then(response => response.json())
      //       .then(result => {
      //         resolve({
      //           data: result.data,
      //           page: result.page - 1,
      //           totalCount: result.total,
      //         })
      //       })
      //   })
      // }
      options={{
        exportButton: true,
        paging: false,
        search: false,
      }}
    />
  );
}

function RequestService(props) {
  const [state, setState] = React.useState({
    columns: [
      {
        title: 'Этап',
        field: 'phase',
        editable: 'never',
      },
      { title: 'Начало', field: 'beginning', type: 'date' },
      { title: 'Окончание', field: 'ending', type: 'date' },
      {
        title: 'Выполнено',
        field: 'done',
        editable: 'never',
        render: rowData => (
          <Checkbox
            checked={rowData.done}
            onChange={() => {
              setState(state => {
                let data = state.data;
                data[rowData.tableData.id].done = !rowData.done;
                return { ...state, data };
              });
            }}
          />
        ),
      },
      { title: 'Комментарий', field: 'comment' },
    ],
    data: [
      {
        phase: 'Прибытие',
        beginning: new Date('2019-05-20'),
        ending: new Date('2019-05-20'),
        done: true,
        comment: 'Комментарий',
      },
      {
        phase: 'Получение изделия',
        beginning: new Date('2019-05-20'),
        ending: new Date('2019-05-20'),
        done: true,
        comment: 'Комментарий',
      },
      {
        phase: 'Диагностика',
        beginning: new Date('2019-05-20'),
        ending: new Date('2019-05-21'),
        done: true,
        comment: 'Комментарий',
      },
      {
        phase: 'Ремонт',
        beginning: new Date('2019-05-21'),
        done: false,
      },
      { phase: 'Сервисное обслуживание', done: false },
      { phase: 'Контрольная проверка работы', done: false },
      { phase: 'Передача изделия', done: false },
      { phase: 'Формирование документа результата', done: false },
      { phase: 'Возвращение', done: false },
    ],
    localization: {
      toolbar: {
        exportTitle: 'Экспортировать',
        exportName: 'Экспортировать как CSV',
      },
      header: {
        actions: 'Действия',
      },
      body: {
        emptyDataSourceMessage: 'Нет данных',
        editTooltip: 'Редактировать',
        editRow: { saveTooltip: 'Сохранить', cancelTooltip: 'Отмена' },
      },
    },
  });

  return (
    <MaterialTable
      title="Статус"
      icons={tableIcons}
      columns={state.columns}
      data={state.data}
      localization={state.localization}
      actions={[
        {
          icon: tableIcons.Save,
          tooltip: 'Сохранить',
          onClick: (event, rowData) => {
            // Do save operation
            console.log('save',event,rowData);
            // login({
            //   username: this.state.username,
            //   password: this.state.password,
            // }).then(
            //   response => {
            //     console.log(response);
            //     if (response.username) {
            //       this.context.authorize(response.username, response.role);
            //       this.handleClearForm();
            //       this.props.history.push(routes.base)
            //     } else {
            //       this.setState(state => ({ dialogOpened: true }));
            //       console.log('Authorization error');
            //     }
            //   },
            //   error => {
            //     this.setState(state => ({ dialogOpened: true }));
            //     console.log('Authorization error', error);
            //   },
            // );

            return new Promise(resolve => {
              setTimeout(() => {
                resolve();
                props.handleDialogClose();
              }, 0);
            });
          },
        },
      ]}
      editable={{
        // onRowAdd: newData =>
        //   new Promise(resolve => {
        //     setTimeout(() => {
        //       resolve();
        //       const data = [...state.data];
        //       data.push(newData);
        //       setState({ ...state, data });
        //     }, 600);
        //   }),
        onRowUpdate: (newData, oldData) => {
          // login({
          //   username: this.state.username,
          //   password: this.state.password,
          // }).then(
          //   response => {
          //     console.log(response);
          //     if (response.username) {
          //       this.context.authorize(response.username, response.role);
          //       this.handleClearForm();
          //       this.props.history.push(routes.base)
          //     } else {
          //       this.setState(state => ({ dialogOpened: true }));
          //       console.log('Authorization error');
          //     }
          //   },
          //   error => {
          //     this.setState(state => ({ dialogOpened: true }));
          //     console.log('Authorization error', error);
          //   },
          // );

          newData.beginning = new Date(newData.beginning);
          newData.ending = new Date(newData.ending);
          return new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data[data.indexOf(oldData)] = newData;
              setState({ ...state, data });
              // props.handleDialogClose();
            }, 0);
          });
        },
        // onRowDelete: oldData =>
        //   new Promise(resolve => {
        //     setTimeout(() => {
        //       resolve();
        //       const data = [...state.data];
        //       data.splice(data.indexOf(oldData), 1);
        //       setState({ ...state, data });
        //     }, 600);
        //   }),
      }}
      options={{
        exportButton: true,
        paging: false,
        search: false,
      }}
    />
  );
}

const initialState = {
  dialogOpened: false,
};

export class Request extends React.Component {
  state = initialState;

  static contextType = UserContext;

  handleDialogClose = () => {
    this.setState(state => ({ dialogOpened: !state.dialogOpened }));
  };

  render() {
    return (
      <Flex flex="1 0 auto" flexDirection="column" justifyContent="flex-start" alignItems="center">
        <Helmet>
          <title>Заявка</title>
        </Helmet>
        <Box width={1} px={indentations.s} mt="15px" m="0 auto">
          <RequestInfo />
        </Box>
        <Box width={1} px={indentations.s} mt="10px" m="0 auto">
          <RequestBrigade />
        </Box>
        <Box width={1} px={indentations.s} mt="10px" pb="15px" m="0 auto">
          <RequestService handleDialogClose={this.handleDialogClose} />
        </Box>

        <Dialog
          open={this.state.dialogOpened}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleDialogClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description">
          <DialogTitle id="alert-dialog-slide-title">Сохранение невозможно!</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">Повторите попытку позже!</DialogContentText>
          </DialogContent>
        </Dialog>
      </Flex>
    );
  }
}
