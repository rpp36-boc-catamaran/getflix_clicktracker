import React from 'react';
import { useTable } from 'react-table';

export default function Table({ columns, data }) {
  const {
   getTableProps,
   getTableBodyProps,
   headerGroups,
   rows,
   prepareRow,
 } = useTable({
   columns,
   data,
 })
 return (
  <table {...getTableProps()} align="center">
    <thead>
      {// Loop over the header rows
      headerGroups.map(headerGroup => (
        // Apply the header row props
        <tr {...headerGroup.getHeaderGroupProps()}>
          {// Loop over the headers in each row
          headerGroup.headers.map(column => (
            // Apply the header cell props
            <th
              {...column.getHeaderProps()}
              style={{
                borderBottom: 'solid 3px red',
                background: 'aliceblue',
                color: 'black',
                fontWeight: 'bold',
              }}
            >
              {// Render the header
              column.render('Header')}
            </th>
          ))}
        </tr>
      ))}
    </thead>
    {/* Apply the table body props */}
    <tbody {...getTableBodyProps()}>
      {// Loop over the table rows
      rows.map(row => {
        // Prepare the row for display
        prepareRow(row)
        return (
          // Apply the row props
          <tr {...row.getRowProps()}>
            {// Loop over the rows cells
            row.cells.map(cell => {
              // Apply the cell props
              return (
                <td
                  {...cell.getCellProps()}
                  style={{
                    padding: '10px',
                    border: 'solid 1px gray'
                  }}
                >
                  {// Render the cell contents
                  cell.render('Cell')}
                </td>
              )
            })}
          </tr>
        )
      })}
    </tbody>
  </table>
 )
}