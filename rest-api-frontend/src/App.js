import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';

const apiUrl = "http://cloudadmin.network";

const App = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getAllPeople();
  }, []);

  const createPerson = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${apiUrl}/people`, { name, surname });
      const person = response.data;
      setPeople((prevPeople) => [...prevPeople, person]);
      setName('');
      setSurname('');
    } catch (error) {
      console.error('Failed to create person', error);
    }
  };

  const getAllPeople = async () => {
    try {
      const response = await axios.get(`${apiUrl}/people/all`);
      const peopleData = response.data;
      setPeople(peopleData);
    } catch (error) {
      console.error('Failed to get people', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 20 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        REST API Frontend
      </Typography>

      <form onSubmit={createPerson}>
        <TextField
          label="Name"
          fullWidth
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Surname"
          fullWidth
          required
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Create Person
        </Button>
      </form>

      <Typography variant="h5" component="h2" align="center" sx={{ marginTop: 4 }}>
        People
      </Typography>

      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Surname</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {people.map((person) => (
              <TableRow key={person._id}>
                <TableCell>{person.name}</TableCell>
                <TableCell>{person.surname}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default App;

