import { Box } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { AppliedJobsTableRowType } from "../vite-env"

type TableComponentProps ={
    height? : string
    widgth?:string
    rows:AppliedJobsTableRowType[],
    columns:GridColDef[]
}

const TableComponent = ({height="20rem",widgth= "25rem" ,rows,columns}:TableComponentProps) => {
  return (
    <Box height={height} width={widgth}>

<DataGrid

        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10,15]}
        // checkboxSelection
      />
    </Box>
  )
}

export default TableComponent
