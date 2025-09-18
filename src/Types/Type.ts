export interface Employee{
    id: Number;
    employee_id: String;
    name: String;
    email: String;
    address: String;
    department: Department;
}

interface Department{
    id: Number;
    department_name: String;
    max_clock_in_time: Date;
    max_clock_out_time: Date;
}