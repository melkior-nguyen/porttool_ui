import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useState } from 'react'
import { appColor } from '../../AppColor'
import { Accordion, AccordionDetails, AccordionSummary } from './AccordionComponents'
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AppTable from '../AppTable/AppTable';
import OutlineBtn from '../Button/OutlineBtn';
import FillBtn from '../Button/FillBtn';
import Dropdown2 from '../Dropdown/Dropdown2';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiDotsVerticalRounded } from 'react-icons/bi';
// import { isDisableAction } from "@/utils/CheckPermission";


function AppAccordion() {
  const [openEditProject, setOpenEditProject] = useState(false);

  const handleClickOpenEditProject = () => {
    setOpenEditProject(true);
  };
  const rows = [
    {
      id: '01',
      email: 'abc123@gmail.com',
      role: 'Admin',
      status: 'Complete',
      action: 'Delete',
      avatar: 'https://www.seekpng.com/png/detail/514-5147412_default-avatar-icon.png'
    },
    {
      id: '02',
      email: 'xyz456@gmail.com',
      role: 'Manager',
      status: 'In progress',
      action: 'Delete',
      avatar: 'https://www.pngmart.com/files/22/User-Avatar-Profile-Download-PNG-Isolated-Image.png '
    },
    {
      id: '03',
      email: 'mnk789@gmail.com',
      role: 'Employee',
      status: 'New',
      action: 'Delete',
      avatar: 'https://images.squarespace-cdn.com/content/v1/54b7b93ce4b0a3e130d5d232/1519987020970-8IQ7F6Z61LLBCX85A65S/icon.png?format=1000w'
    },
  ];
  return (
    <Box sx={{
      border: `1px solid #fff`,
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.2rem',
      overflow: 'hidden'
    }}>
      <Accordion expanded={true}>
        {/* Header */}
        <AccordionSummary
          aria-controls="panel1d-content"
          id="panel1d-header"
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              whiteSpace: "nowrap",
            }}
          >
            <Typography
              component="h3"
              sx={{
                color: appColor.primary,
                fontWeight: '600',
                fontSize: { xs: 18, sm: 20 },
              }}
            >
              Manage Access
            </Typography>
            <Box
              sx={{
                height: 40,
                display: "flex",
                alignItems: 'center'
              }}
            >
              {/* <Button
                                color="primary"
                                sx={{ textTransform: "capitalize", mr: 2 }}
                                // disabled={isDisableAction(currentProject?.canInviteProject)}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleClickOpenEditProject();
                                }}
                            >
                                <AddCircleOutlineIcon className="mr-1" />
                                Add Member
                            </Button> */}
              <OutlineBtn icon={<BsFillPlusCircleFill />} label='Add member' size='large' />
            </Box>
          </Box>
        </AccordionSummary>
        {/* Body */}
        <AccordionDetails
          sx={{ borderBottom: "1px solid rgba(0, 0, 0, .125)" }}
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{
                "& .MuiTableCell-head": {
                  borderBottom: `1px solid ${appColor.primary}`,
                  fontSize: '16px',
                  padding: '16px 12px',
                  color: appColor.primary
                },
              }}>
                <TableRow>
                  <TableCell >ID</TableCell>
                  <TableCell >Email</TableCell>
                  <TableCell >Role</TableCell>
                  <TableCell >Status</TableCell>
                  <TableCell >Action</TableCell>
                  <TableCell ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody >
                {rows.map((row) => (
                  <TableRow
                    key={row.email}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      "& .MuiTableCell-body": {
                        fontSize: '14px',
                        padding: '6px 12px',
                      },
                      "& .MuiTableCell-body:first-child": {
                        color: appColor.primary
                      }
                    }}
                  >
                    <TableCell>{row.id}</TableCell>
                    <TableCell>
                      <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                      }}>
                        <Box sx={{
                          width: '30px',
                          aspectRatio: '1',
                          borderRadius: '50%',
                          overflow: 'hidden',
                        }}>
                          <img src={row.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center' }} />
                        </Box>
                        {row.email}
                      </Box>
                    </TableCell>
                    <TableCell >
                      <Box sx={{ width: '100px', position:'relative' }}>
                        <Dropdown2 label={row.role} data={['Admin', 'Manager', 'Employee']} />
                      </Box>
                    </TableCell>
                    {row.status === 'Complete' &&
                      <TableCell sx={{ color: 'green' }}>{row.status}</TableCell>
                    }
                    {row.status === 'In progress' &&
                      <TableCell sx={{ color: 'orange' }}>{row.status}</TableCell>
                    }
                    {row.status === 'New' &&
                      <TableCell sx={{ color: 'blue' }}>{row.status}</TableCell>
                    }
                    <TableCell align='right' sx={{
                      cursor: 'pointer',
                    }}>
                      <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '8px',
                      }}>
                        {row.action}
                        <AiOutlineDelete style={{ color: 'red' }} />
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: 'blue' }}>
                      <BiDotsVerticalRounded style={{ float: 'right', color: '#acacac', cursor: 'pointer' }} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion >
    </Box >
  )
}

export default AppAccordion


{/*<Accordion expanded={true} sx={{ mb: 4 }}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              whiteSpace: "nowrap",
            }}
          >
            <Typography
              component="h3"
              sx={{
                color: (theme) => theme.palette.text.primary,
                fontWeight: Fonts.MEDIUM,
                fontSize: { xs: 18, sm: 20 },
              }}
            >
              Manage Access
            </Typography>
            <Box
              sx={{
                height: 40,
                display: "flex",
              }}
            >
              <Button
                color="primary"
                sx={{ textTransform: "capitalize", mr: 2 }}
                disabled={isDisableAction(currentProject?.canInviteProject)}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClickOpenEditProject();
                }}
              >
                <AddCircleOutlineIcon className="mr-1" />
                Add Member
              </Button>
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails
          sx={{ borderBottom: "1px solid rgba(0, 0, 0, .125)" }}
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell align="right">Role</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentProject?.members?.map((row: any) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {row?.account ? (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            textAlign: "center",
                          }}
                        >
                          <IconButton
                            size="small"
                            sx={{ mr: 1 }}
                            aria-haspopup="true"
                          >
                            <Avatar
                              sx={{
                                width: 32,
                                height: 32,
                                border: "1px solid rgb(204, 204, 204)",
                              }}
                              src={row?.account?.avatar || Placeholder}
                            />
                          </IconButton>
                          <Box sx={{ textAlign: "left" }}>
                            <Box>{row?.account.username}</Box>
                            <Box sx={{ fontSize: "16px" }}>
                              {row?.account.fullName}
                            </Box>
                          </Box>
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            textAlign: "center",
                          }}
                        >
                          <IconButton
                            size="small"
                            sx={{ mr: 1 }}
                            aria-haspopup="true"
                          >
                            <Avatar
                              sx={{
                                width: 32,
                                height: 32,
                                border: "1px solid rgb(204, 204, 204)",
                              }}
                              src={row?.avatar || Placeholder}
                            />
                          </IconButton>
                          <Box>{row?.email}</Box>
                        </Box>
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <FormControl fullWidth size="small" sx={{}}>
                        <InputLabel id="demo-simple-select-label">
                          Role
                        </InputLabel>
                        <Select
                          sx={{ textAlign: "left" }}
                          disabled={isDisableAction(
                            currentProject?.canInviteProject
                          )}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Role"
                          value={row.role}
                          onChange={(value) =>
                            handleChangeRoleMember(row.id, value.target.value)
                          }
                        >
                          <MenuItem value={"ADMIN"}>Admin</MenuItem>
                          <MenuItem value={"MODIFY"}>Modify</MenuItem>
                          <MenuItem value={"READ"}>Read</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell align="right">
                      {
                        STATUSES.find((status) => status.value === row.status)
                          ?.label
                      }
                    </TableCell>
                    <TableCell align="right" style={{ whiteSpace: "nowrap" }}>
                      <Box>
                        <Button
                          color="error"
                          sx={{ textTransform: "capitalize" }}
                          disabled={isDisableAction(
                            currentProject?.canInviteProject
                          )}
                          onClick={() => {
                            handleClickOpenDeleteMember(row.id);
                          }}
                        >
                          <DeleteIcon className="!text-base h-[12px] w-[12px]" />
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>*/}