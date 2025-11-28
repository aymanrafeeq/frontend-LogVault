import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { Skeleton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setLogs } from '../logSlice';

const columns = [
    { id: "timestamp", label: "Timestamps", minWidth: 170 },
    { id: "level", label: "Level", minWidth: 100, align: "right" },
    { id: "component", label: "Component", minWidth: 100, align: "right" },
    { id: "host", label: "Host", minWidth: 100, align: "right" },
    { id: "requestid", label: "Request ID", minWidth: 150, align: "right" },
    { id: "message", label: "Message", minWidth: 200, align: "right" },
];

export default function LogTable() {
    // const [logData, setLogData] = React.useState(null);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [total, setTotal] = React.useState(0)

    const logsData = useSelector((state) => state?.logStore?.logs);
    const dispatch = useDispatch();

    const filter = useSelector((state)=>state?.logStore.filters)

    console.log("filter at table: ", filter);
    React.useEffect(() => {

        fetchLogData()
    }, [page, rowsPerPage,filter])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const fetchLogData = () => {
        // dispatch(setLogs(null))
        axios
            .post("http://localhost:8080/filter", filter,{
                headers: {
                    "Content-Type": "application/json",
                },
                params: { 
                  page:page, 
                  pageSize:rowsPerPage }
            })
            .then(function (response) {
                console.log(response);
                const rows = response.data.entries.map((e) => ({
                    id: e.ID ?? e.id,
                    timestamp: e.TimeStamp ?? e.timestamp,
                    level: e.Level?.Level ?? "",
                    component: e.Component?.Component ?? "",
                    host: e.Host?.Host ?? "",
                    message: e.Message ?? e.message,
                    requestid: e.RequestId,
                }));

                dispatch(setLogs(rows))
                setTotal(response.data.count)
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () { });
    };
    

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{
                maxHeight: 440,
            }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                            logsData === null
                                ?
                                Array.from({ length: rowsPerPage }).map((_, i) => (
                                    <TableRow key={i}>
                                        <TableCell colSpan={columns.length}>
                                            <Skeleton
                                                variant="rectangular"
                                                width="100%"
                                                height={30}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))
                                :
                                logsData
                                    .map((row, index) => (
                                        <TableRow hover tabIndex={-1} key={index}>
                                            {columns.map((column) => (
                                                <TableCell key={column.id} align={column.align}>
                                                    {row[column.id]}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={total}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}

            />
        </Paper >
    );
}