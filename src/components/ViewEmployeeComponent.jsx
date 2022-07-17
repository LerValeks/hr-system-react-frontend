import React, { Component } from 'react';

import { useLocation } from 'react-router-dom';
import EmployeeService from '../Services/EmployeeService';


export const withNavigationLocation = (Component: Component) => {
    return props => <Component {...props} location={useLocation()} />;
}
class ViewEmployeeComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.location.state.employeeId,
            employee: {}
        }
    }

    componentDidMount() {
        EmployeeService.getEmployeeById(this.state.id).then(res => {
            this.setState({ employee: res.data });


        });
    }
    render() {
        return (
            <div>
                <div className='card col-md-6 offset-md-3'>
                    <h3 className='text-center'>View Employee Details</h3>
                    <div className='card-body'>
                        <div className='row'>
                            <label>Employee Firs Name:</label>

                            <div>{this.state.employee.firstName}</div>
                        </div>
                        <div >
                            <label>Employee Last Name:</label>
                            <div>{this.state.employee.lastName}</div>
                        </div>
                        <div className='row'>
                            <label>Employee Email:</label>
                            <div>{this.state.employee.email}</div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}


export default withNavigationLocation(ViewEmployeeComponent);