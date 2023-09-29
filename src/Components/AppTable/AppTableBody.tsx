import React from 'react'
import { appColor } from '../../AppColor'
import { Box, Pagination } from '@mui/material'

function AppTableBody({ tableTitle, tableData }: any) {
    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xl uppercase" style={{ backgroundColor: appColor.text.white, color: appColor.text.black }}>
                        <tr>
                            {tableTitle.map((title: any, index: any) => {
                                return (
                                    <th scope="col" className="px-6 py-6">
                                        {title}
                                    </th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((data: any, index: any) => {
                            return (
                                <tr className={index % 2 === 0 ? "bg-transparent border-b" : "bg-slate-200 border-b"} style={{ borderColor: appColor.sidebar.border }}>
                                    <th scope="row" className="px-6 py-6 text-xl font-medium text-gray-900 whitespace-nowra">
                                        {data.name}
                                    </th>
                                    <th scope="row" className="px-6 py-6 text-xl font-medium text-gray-900 whitespace-nowra">
                                        {data.type}
                                    </th>
                                    <th scope="row" className="px-6 py-6 text-xl font-medium text-gray-900 whitespace-nowra">
                                        {data.host}
                                    </th>
                                    <th scope="row" className="px-6 py-6 text-xl font-medium text-green-500 whitespace-nowra">
                                        {data.status}
                                    </th>
                                    <th scope="row" className="px-6 py-6 text-xl font-medium text-gray-900 whitespace-nowra">
                                        {data.last_time}
                                    </th>
                                    <th scope="row" className="px-6 py-6 text-xl font-medium text-blue-500 whitespace-nowra cursor-pointer underline">
                                        {data.action}
                                    </th>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <Box sx={{ my: '12px' }}>
                    <Pagination count={10} sx={{
                        "& .MuiButtonBase-root": {
                            fontSize: '12px',
                        },
                        "& .MuiPaginationItem-root.Mui-selected": {
                            backgroundColor: appColor.primary,
                            color: '#fff'
                        }
                    }} />
                </Box>
            </div>
        </>
    )
}

export default AppTableBody

// import React, { useState } from 'react';
// // Import các phần còn lại

// function AppTableBody({ tableTitle, tableData }: any) {
//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 5; // Số mục trên mỗi trang

//     const handlePageChange = (event: any, newPage: number) => {
//         setCurrentPage(newPage);
//     };

//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     const displayedData = tableData.slice(startIndex, endIndex);

//     // Render bảng với dữ liệu đã lọc theo trang hiện tại
//     return (
//         <>
//             {/*... Mã HTML cho bảng */}
//             <tbody>
//                 {displayedData.map((data: any, index: any) => {
//                     return (
//                         //... Render dòng dữ liệu
//                     );
//                 })}
//             </tbody>
//             <Pagination
//                 count={Math.ceil(tableData.length / itemsPerPage)}
//                 page={currentPage}
//                 onChange={handlePageChange}
//                 color="primary"
//                 sx={{
//                     "& .MuiButtonBase-root": {
//                         fontSize: '12px'
//                     }
//                 }}
//             />
//         </>
//     );
// }

// export default AppTableBody;