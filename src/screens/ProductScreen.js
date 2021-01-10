import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import * as ProductAPI from '../api/ProductAPI';
import { useHistory } from "react-router-dom";

const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'code', headerName: 'Product Code', width: 160 },
    { field: 'name', headerName: 'Product Name', width: 160 },
    {
        field: 'weight',
        headerName: 'Product Weight',
        type: 'number',
        width: 160,
    },
    {
        field: 'type',
        headerName: 'Product Type',
        width: 160,
    },
    {
        field: 'unit',
        headerName: 'Product Unit',
        width: 160,
    },
    {
        field: 'createAt',
        headerName: 'Create At',
        width: 160,
    },
];
function ProductScreen() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    let history = useHistory();


    useEffect(() => {
        //fetch the product
        const fetchProduct = async () => {
            setIsLoading(true);
            setIsError(false);
            try {
                const result = await ProductAPI.getAll();
                console.log(result);
                setData(result);
                setIsLoading(false);
            } catch (error) {
                setIsError(true);
            }
        }
        fetchProduct();
    }, []);

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={data} columns={columns} pageSize={5} onRowClick={(rowParams) => {
                const { row } = rowParams;
                history.push(`/products/${row.id}`);
            }} />
        </div>
    );
}

export default ProductScreen;