import {React,  Component} from 'react';
import {Link} from  'react-router-dom'
import EmployeeService from '../Services/EmployeeService';
import { useNavigate } from "react-router-dom";

export const  withNavigation = (Component : Component) => {
    return props => <Component {...props} navigate={useNavigate()} />;
  } 

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)
       
        this.state={
            employees: []
        }
        this.editEmployee= this.editEmployee.bind(this);
        this.deleteEmployee= this.deleteEmployee.bind(this);
    }

    componentDidMount() {
        EmployeeService.getEmployees().then((res) => {
            this.setState({employees:res.data});
        });
    }

    editEmployee(id) {
        this.props.navigate(`/update-employee/${id}`, {
            state : {
                employeeId: id
            }
        })
    }

    deleteEmployee(id) {
       EmployeeService.deleteEmployeeById(id).then( res=> {
        this.setState({employees: this.state.employees.filter(employee=> employee.id!==id)});
       });
    }


    viewEmployee(id) {
        this.props.navigate(`/view-employee/${id}`, {
            state : {
                employeeId: id
            }
        })
    }


    render() {
        return (
            <div>
                <h2 className='text-center'>Employee List</h2>
                <div className='row'>
                    <Link to = '/add-employee' className='btn btn-primary' >Add Employee </Link>
                </div>
                <div className='row'>
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>Employee First Name</th>
                                <th>Employee Last Name</th>
                                <th>Employee Email Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.employees.map(
                                    employee =>
                                    <tr key={employee.id}>
                                        <td>{employee.firstName}</td>
                                        <td>{employee.lastName}</td>
                                        <td>{employee.email}</td>
                                        <td>
                                            <button onClick={() => this.editEmployee(employee.id)} className = 'btn btn-info' >Update</button>
                                            <button  onClick={() => this.deleteEmployee(employee.id)} className = 'btn btn-danger' style={{ marginLeft: '10px' }} >Delete</button>
                                            <button  onClick={() => this.viewEmployee(employee.id)} className = 'btn btn-info' style={{ marginLeft: '10px' }} >View</button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                
            </div>
        );
    }
}

export default withNavigation(ListEmployeeComponent);

