const express = require("express");

const app = express();

const port = 5000;

app.use(express.json());

let employee =[
    {id:1,name:"raga_deepika", mobile:123456789},
    {id:2,name:"deepika", mobile:987654321},
    {id:3,name:"deepi", mobile:345678912},
    {id:4,name:"deepu", mobile:3214567890},
]

//api to say about this server
app.get('/',(req,res)=>{
    res.send("learning API creation")
})

// api to fetch all employeedetails
app.get('/allemployeedetails',(req,res)=>{
    console.log("fetching all employee details")
    res.json(employee)
})

// api to post new employee
app.post('/insertnewemployee',(req,res)=>{
    console.log("posting new employee details")
    const new_employee = req.body;
    employee.push(new_employee)
    res.json(employee)
})

// api to fetch all employee details after inserting new employee


app.get('/allemployeedetails',(req,res)=>{
    console.log("fetching all employee details_1")
    console.log("fetching all employee details")
    res.json(employee)
})

// api to get particular employee based on id

app.get('/employee/:id',(req,res)=>{
    const unique_employee = parseInt(req.params.id)
    const employe= employee.find(emp=>emp.id===unique_employee)
    if(employee){
        res.json(employe);
    }
    else{
        res.status(404).json({message:"employee not found"})
    }
})

//api to post multiple employee details
app.post('/insertmultipleemployees', (req, res) => {
    console.log("Posting multiple employee details");
  
    const new_employees = req.body; // Expect an array of employee objects
  
    if (Array.isArray(new_employees)) {
      new_employees.forEach(emp => employee.push(emp));
      res.json(employee);
    } else {
      res.status(400).send('Invalid data format. Expected an array of employees.');
    }
  });
  

//api to modify the existing employees
app.put('/modifyemployee/:id', (req, res) => {
    console.log("Modifying employee details");
  
    const employeeId = parseInt(req.params.id);
    const updated_employee = req.body;
  
    const employeeIndex = employee.findIndex(emp => emp.id === employeeId);
  
    if (employeeIndex !== -1) {
      // Update employee details
      employee[employeeIndex] = { ...employee[employeeIndex], ...updated_employee };
      res.json(employee[employeeIndex]);
    } else {
      res.status(404).send('Employee not found');
    }
  });
  

//api to delete one employee details

app.delete('/deleteemployee/:id', (req, res) => {
    console.log("Deleting an employee");
  
    const employeeId = parseInt(req.params.id);
  
    const employeeIndex = employee.findIndex(emp => emp.id === employeeId);
  
    if (employeeIndex !== -1) {
      // Remove employee from array
      const deletedEmployee = employee.splice(employeeIndex, 1);
      res.json(deletedEmployee);
    } else {
      res.status(404).send('Employee not found');
    }
  });
  
  
app.listen(port,()=>{
    console.log(`server is listening on port number${port}`)
})