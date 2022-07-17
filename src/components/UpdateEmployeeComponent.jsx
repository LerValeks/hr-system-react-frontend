import React, { Component  } from 'react';
import { Link } from 'react-router-dom'
import EmployeeService from '../Services/EmployeeService';
import { useNavigate } from "react-router-dom";
import {useLocation} from 'react-router-dom';

export const  withNavigationLocation = (Component : Component) => {
    return props => <Component {...props} navigate={useNavigate()} location={useLocation()} />;
  } 
  


class UpdateEmployeeComponent extends Component {


    constructor(props) {
        super(props)
        
        this.state = {
            id: this.props.location.state.employeeId,
            firstName: '',
            lastName: '',   
            email: ''

        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);
    }

    componentDidMount(){
        EmployeeService.getEmployeeById(this.state.id).then((res) => {
           
            let employee = res.data;
            this.setState({firstName:employee.firstName,
              lastName:employee.lastName,
              email: employee.email})
        });
    }


    changeFirstNameHandler = (event) => {
        this.setState({ firstName: event.target.value })
    }

    changeLastNameHandler = (event) => {
        this.setState({ lastName: event.target.value })
    }

    changeEmailHandler = (event) => {
        this.setState({ email: event.target.value })
    }

    updateEmployee = (e) => {
        e.preventDefault();
        let employee = { firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email }
        console.log('employee =>' + JSON.stringify(employee))

        EmployeeService.updateEmployeeById(employee, this.state.id).then(res=>{
            this.props.navigate('/employees')
        });
    }


    render() {
        return (
            <div>
                <div className='container'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3'>
                            <h3 className='text-center'> Employee Form</h3>
                            <div className='card-body'>
                                <form>
                                    <div className='form-group'>
                                        <label> First Name</label>
                                        <input placeholder='First Name' name='firstName' className='form-control'
                                            value={this.state.firstName} onChange={this.changeFirstNameHandler} />
                                    </div>
                                    <div className='form-group'>
                                        <label> Last Name</label>
                                        <input placeholder='Last Name' name='lastName' className='form-control'
                                            value={this.state.lastName} onChange={this.changeLastNameHandler} />
                                    </div>
                                    <div className='form-group'>
                                        <label> Email</label>
                                        <input placeholder='Email' name='email' className='form-control'
                                            value={this.state.email} onChange={this.changeEmailHandler} />
                                    </div>
                                    <button className='btn btn-success' onClick={this.updateEmployee}>Update</button>
                                    <Link to='/employees' className='btn btn-danger' style={{ marginLeft: '10px' }}>Cancel</Link>
                                 
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default withNavigationLocation(UpdateEmployeeComponent);
