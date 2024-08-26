import { Box } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"

type TableComponentProps<T> ={
    height? : string
    widgth?:string
    rows:T[] ,
    columns:GridColDef[],
    loading?:boolean
}

const TableComponent = <T,>({height="20rem",widgth= "25rem" ,rows,columns,loading}:TableComponentProps<T>) => {
  return (
    <Box height={height} width={widgth}>

    <DataGrid
    loading={loading}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10,15]}
      />
    </Box>
  )
}

export default TableComponent
