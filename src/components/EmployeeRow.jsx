import React from 'react';
const EmployeeCard = props => {
  const { firstName, lastName, email, title } = props.employeeDetails;
  return (
    <tr>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{email}</td>
      <td>{title}</td>
    </tr>
  );
};

export default EmployeeCard;
