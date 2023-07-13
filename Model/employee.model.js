const mongoose=require('mongoose')

const employeeSchema=mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
	department : String,
	salary : Number,
	
})

const EmployeeModel=mongoose.model('employee', employeeSchema)

module.exports={EmployeeModel}
// - First Name
// - Last Name
// - Email
// - Department (Select Tag with Tech, Marketing, and Operations as options)
// - Salary