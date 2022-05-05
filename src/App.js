import './App.css';
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Center, Square, Circle } from '@chakra-ui/react'
import Footer from './Footer';
import Navbar from './Navbar';

function App() {
  const [studentData, setStudentData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const url = "http://15.207.112.45:8000/attendance";

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `http://15.207.112.45:8000/attendance`
        );
        setStudentData(response.data.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setStudentData([]);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div className="App">
      {/* {console.log(studentData)}
      <h4>
        {studentData?.map(data => (
          <p key={data?.id}> {data?.Name}</p>
        ))}
      </h4> */}
      <Navbar />
      <div>
        <TableContainer>
          <Table variant='striped'>
            <TableCaption>Attendance</TableCaption>
            <Thead>
              <Tr>
                <Th>Roll</Th>
                <Th>Name</Th>
                <Th>Branch</Th>
                <Th>Batch</Th>
                <Th>Attendance</Th>
              </Tr>
            </Thead>
            <Tbody>
              {studentData?.map(data => (
                <Tr>
                  <Td key={data?.id}> {data?._id}</Td>
                  <Td key={data?.id}> {data?.Name}</Td>
                  <Td key={data?.id}> {data?.Branch}</Td>
                  <Td key={data?.id}> {data?.batch}</Td>
                  <Td key={data?.id}> {data?.date.map(dat => (
                    <span>{`${dat[Object.keys(dat)[0]]},`}</span>
                  ))}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Center h='100px' color='white'>
          <Button colorScheme='pink' onClick={refreshPage}>Refresh</Button>
        </Center>
        <Footer />
      </div>
    </div>
  );
}

export default App;
