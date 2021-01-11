import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import * as ProductAPI from '../api/ProductAPI';
import * as StockAPI from '../api/StockAPI';
import { useHistory } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));
const stocksColumns = [
    { field: 'id', headerName: 'ID', width: 100 },
    {
        field: 'warehouse', headerName: 'warehouse', width: 160, valueGetter: (params) => {
            console.log(params.row.warehouse.name);
            return params.row.warehouse.name;
        }
    },
    {
        field: 'product', headerName: 'product', width: 160, valueGetter: (params) => {
            return params.row.product.name
        }
    },
    {
        field: 'operator',
        headerName: 'operator',
        width: 160,
    },
    {
        field: 'qty',
        headerName: 'qty',
        width: 100,
    },
    {
        field: 'type',
        headerName: 'type',
        width: 160,
    },
    {
        field: 'createAt',
        headerName: 'Create At',
        width: 160,
    },
];


const statusColumns = [
    {
        field: 'warehouseId',
        headerName: 'id',
        width: 160,
    },
    {
        field: 'warehouseName',
        headerName: 'Warehouse Name',
        width: 160,
    },
    {
        field: 'total',
        headerName: 'total',
        width: 160,
    },
    {
        field: 'type',
        headerName: 'Type',
        width: 160,
    },
];


function ProductDetail(props) {
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [stock, setStock] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [statusStock, setStatusStock] = useState([]);
    let history = useHistory();
    const { productId } = props;
    useEffect(() => {
        //fetch the product
        const fetchProduct = async () => {
            setIsLoading(true);
            setIsError(false);
            try {
                const result = await ProductAPI.get(productId);
                console.log(result);
                setData(result);
                setIsLoading(false);
            } catch (error) {
                setIsError(true);
            }
            setIsLoading(false);
        }

        //fetch the product
        const fetchStock = async () => {
            setIsLoading(true);
            setIsError(false);
            try {
                const result = await StockAPI.get(productId);
                console.log(result);
                setStock(result);
                setIsLoading(false);
            } catch (error) {
                setIsError(true);
            }
            setIsLoading(false);

        }

        const fetchStatusStock = async () => {
            setIsLoading(true);
            setIsError(false);
            try {
                let result = await StockAPI.getStatus(productId);
                let newResult = result.map(status => {
                    return {
                        id: status.warehouseId,
                        ...status,
                    }
                });
                setStatusStock(newResult);
                setIsLoading(false);
            } catch (error) {
                setIsError(true);
            }
            setIsLoading(false);
        }

        fetchProduct();
        fetchStock();
        fetchStatusStock();

    }, []);

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        Product name: {data.name}
                        <br />
                         code: {data.code}
                        <br />
                         weight: {data.weight}
                        <br />
                         type: {data.type}
                        <br />
                         unit: {data.unit}
                        <br />
                         create at : {data.createAt}
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Grid item xs={12}><h3>In-Stock Status</h3></Grid>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid rows={stock} columns={stocksColumns} pageSize={5} onRowClick={(rowParams) => {
                            const { row } = rowParams;
                        }} />
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <Grid item xs={12}><h3>Inventory Status</h3></Grid>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid rows={statusStock} columns={statusColumns} pageSize={5} onRowClick={(rowParams) => {
                            const { row } = rowParams;
                        }} />
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default ProductDetail;
