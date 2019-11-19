const faker = require('faker');
const colors = require('colors/safe');
const { db, Employee } = require('./index.js');

// Adjust this number to create more/less employees
const TOTAL_EMPLOYEES = 325;

const generateSingleEmployee = () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = faker.internet.email();
  const title = faker.name.jobTitle();

  return { firstName, lastName, email, title };
};

const generateEmployees = numEmployees => {
  return Array(numEmployees)
    .fill('')
    .map(() => generateSingleEmployee());
};

const createEmployees = numEmployees => {
  const allEmployees = generateEmployees(numEmployees);
  // bulkCreate takes an array of objects and creates them all at once
  return Employee.bulkCreate(allEmployees);
};

const seed = numEmployees => {
  db.sync({ force: true })
    .then(() => {
      console.log(colors.america('seeding employees...'));
      return createEmployees(numEmployees);
    })
    .then(() => {
      console.log(colors.rainbow('seeding complete'));
      db.close();
    })
    .catch(e => {
      console.error('seeding error', e);
      db.close();
    });
};

seed(TOTAL_EMPLOYEES);
