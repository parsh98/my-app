import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { TextField, Button, Box } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface Record {
  id: number;
  name: string;
  phone: string;
  email: string;
  security: string;
  revenue: number;
}

export default function Main() {
  const [records, setRecords] = useState<Record[]>([
    {
      id: 1,
      name: "John Doe",
      phone: "+1 555 1234",
      email: "john.doe@example.com",
      security: "Low",
      revenue: 10000,
    },
    {
      id: 2,
      name: "John Doe",
      phone: "+1 555 1234",
      email: "john.doe@example.com",
      security: "Low",
      revenue: 10000,
    },
    {
      id: 3,
      name: "John Doe",
      phone: "+1 555 1234",
      email: "john.doe@example.com",
      security: "Low",
      revenue: 10000,
    },
  ]);

  const [newRecord, setNewRecord] = useState<Partial<Record>>({
    name: "",
    phone: "",
    email: "",
    security: "",
    revenue: 0,
  });

  const [editRecord, setEditRecord] = useState<Partial<Record>>({
    id: undefined,
    name: "",
    phone: "",
    email: "",
    security: "",
    revenue: 0,
  });

  const baseUrl = "add your link here";

  // Fetch records
  const fetchRecords = async (): Promise<void> => {
    try {
      const response = await axios.get<Record[]>(`${baseUrl}/records`);
      setRecords(response.data);
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  // Add new record
  const addRecord = async (): Promise<void> => {
    try {
      await axios.post(`${baseUrl}/records`, newRecord);
      setNewRecord({
        name: "",
        phone: "",
        email: "",
        security: "",
        revenue: 0,
      });
      fetchRecords();
    } catch (error) {
      console.error("Error adding record:", error);
    }
  };

  // Update record
  const updateRecord = async (): Promise<void> => {
    if (!editRecord.id) return;

    try {
      await axios.patch(`${baseUrl}/records/${editRecord.id}`, editRecord);
      setEditRecord({
        id: undefined,
        name: "",
        phone: "",
        email: "",
        security: "",
        revenue: 0,
      });
      fetchRecords();
    } catch (error) {
      console.error("Error updating record:", error);
    }
  };

  // Delete record
  const deleteRecord = async (id: number): Promise<void> => {
    try {
      await axios.delete(`${baseUrl}/records/${id}`);
      fetchRecords();
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{
          padding: 3,
          flexDirection: "column",
          maxWidth: "90%",
          margin: "0 auto",
        }}
      >
        {/* Form to add a new record */}
        <Box sx={{ mb: 4 }}>
          <h2>Add New Record</h2>
          <TextField
            label="Name"
            value={newRecord.name}
            onChange={(e) =>
              setNewRecord({ ...newRecord, name: e.target.value })
            }
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Phone"
            value={newRecord.phone}
            onChange={(e) =>
              setNewRecord({ ...newRecord, phone: e.target.value })
            }
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            value={newRecord.email}
            onChange={(e) =>
              setNewRecord({ ...newRecord, email: e.target.value })
            }
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Security"
            value={newRecord.security}
            onChange={(e) =>
              setNewRecord({ ...newRecord, security: e.target.value })
            }
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Revenue"
            value={newRecord.revenue}
            onChange={(e) =>
              setNewRecord({ ...newRecord, revenue: Number(e.target.value) })
            }
            type="number"
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button onClick={addRecord} variant="contained" sx={{ mt: 2 }}>
            Add Record
          </Button>
        </Box>

        {/* Form to update an existing record */}
        {editRecord.id && (
          <Box sx={{ mb: 4 }}>
            <h2>Edit Record</h2>
            <TextField
              label="Name"
              value={editRecord.name}
              onChange={(e) =>
                setEditRecord({ ...editRecord, name: e.target.value })
              }
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Phone"
              value={editRecord.phone}
              onChange={(e) =>
                setEditRecord({ ...editRecord, phone: e.target.value })
              }
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Email"
              value={editRecord.email}
              onChange={(e) =>
                setEditRecord({ ...editRecord, email: e.target.value })
              }
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Security"
              value={editRecord.security}
              onChange={(e) =>
                setEditRecord({ ...editRecord, security: e.target.value })
              }
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Revenue"
              value={editRecord.revenue}
              onChange={(e) =>
                setEditRecord({
                  ...editRecord,
                  revenue: Number(e.target.value),
                })
              }
              type="number"
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button onClick={updateRecord} variant="contained" sx={{ mt: 2 }}>
              Update Record
            </Button>
          </Box>
        )}

        {/* Table to display records */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Phone</StyledTableCell>
                <StyledTableCell align="right">Email</StyledTableCell>
                <StyledTableCell align="right">Security</StyledTableCell>
                <StyledTableCell align="right">Revenue</StyledTableCell>
                <StyledTableCell align="right">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.map((record) => (
                <StyledTableRow key={record.id}>
                  <StyledTableCell>{record.name}</StyledTableCell>
                  <StyledTableCell align="right">
                    {record.phone}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {record.email}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {record.security}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {record.revenue}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button onClick={() => setEditRecord(record)}>Edit</Button>
                    <Button onClick={() => deleteRecord(record.id)}>
                      Delete
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}
