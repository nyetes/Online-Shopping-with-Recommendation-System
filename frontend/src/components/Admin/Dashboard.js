import React, { useEffect } from 'react'
import Sidebar from './Sidebar/Sidebar';
import './dashboard.scss';
import { useSelector, useDispatch } from 'react-redux'
import { getAdminProduct } from '../../redux/actions/productAction';
import MetaData from '../layout/Metadata';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Chart, CategoryScale, registerables } from "chart.js";
import { Doughnut, Line } from 'react-chartjs-2';
import { getAllOrders } from '../../redux/actions/orderAction';
import { getAllUsers } from "../../redux/actions/userAction"
Chart.register(CategoryScale, ...registerables);


const Dashboard = () => {
    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.products);
    const { orders } = useSelector((state) => state.allOrders);
    const { users } = useSelector((state) => state.allUsers);
    useEffect(() => {
        dispatch(getAdminProduct());

        dispatch(getAllOrders());

        dispatch(getAllUsers());
    }, [dispatch]);

    let outOfStock = 0;

    products && products.forEach((items) => {
        if (items.stock === 0) {
            outOfStock += 1;
        }
    });

    let totalAmount = 0;
    orders && orders.forEach((item) => {
        totalAmount += item.totalPrice;
    })

    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "TOTAL AMOUNT",
                backgroundColor: ['tomato'],
                hoverBackgroundColor: ['rgb(197,72,49)'],
                data: [0, totalAmount],
            }
        ],
    };
    const doughnutState = {
        labels: ['Out of Stock', "InStock"],
        datasets: [
            {
                backgroundColor: ['#00A6B4', "#6800B4"],
                hoverBackgroundColor: ['#485000', "#35014F"],
                data: [outOfStock, products.length - outOfStock]
            }
        ]
    }


    return (
        <React.Fragment>
            <MetaData title="E-KinBech Dashboard" />
            <div className='dashboard'>
                <Sidebar />
                <div className="dashboardContainer">
                    <Typography component="h1">Dashboard</Typography>
                    <div className='dashboardSummary'>
                        <div>
                            <p>
                                Total Amount <br /> रु {totalAmount}
                            </p>
                        </div>
                        <div className='dashboardSummaryBox2'>
                            <Link to="/admin/products">
                                <p>Product</p>
                                <p>{products && products.length}</p>
                            </Link>
                            <Link to="/admin/orders">
                                <p>Orders</p>
                                <p>{orders && orders.length}</p>
                            </Link>
                            <Link to="/admin/users">
                                <p>Users</p>
                                <p>{users && users.length}</p>
                            </Link>
                        </div>
                    </div>

                    <div className='lineChart'>
                        <Line data={lineState} />
                    </div>

                    <div className='doughnutChart'>
                        <Doughnut data={doughnutState} />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Dashboard