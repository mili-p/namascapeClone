import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'

export const ExportToExcel = async (func,sheetName="Sheet1",fileName="List") => {

    const eventDownloadData = await func()

    if (eventDownloadData && eventDownloadData.length > 0) {

    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet(sheetName)

    const numberFormat = '#,##0.00' 
    const dateFormat = 'MM-dd-yyyy' 
    const currencyFormat = '$#,##0.00'

    const headers =eventDownloadData?.length > 0 ? Object.keys(eventDownloadData[0]) : []
    const dataRows =eventDownloadData?.map((row) => Object.values(row))

    const headerStyle = {
      font: { bold: true, color: { argb: 'fffff' } },
      fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: '2a5ebf' } }, 
    }

    if (headers.length > 0) {
      const headerRow = worksheet.addRow(headers)
      for (let i = 1; i <= headers.length; i++) {
        const cell = headerRow.getCell(i)
        cell.border = { top: 'thin', left: 'thin', bottom: 'thin', right: 'thin' }
        cell.fill = headerStyle.fill
        cell.font = headerStyle.font

        if (headers[i - 1].includes('Date')) {
          cell.numFmt = dateFormat
        } else if (headers[i - 1].includes('Price') || headers[i - 1].includes('Cost')) {
          cell.numFmt = currencyFormat
        } else {
          cell.numFmt = numberFormat
        }
      }
    }

    const maxColumnWidths = new Array(headers.length).fill(0);
    if (dataRows && dataRows.length > 0) {
    dataRows.forEach((row, rowIndex) => {
      const dataRow = worksheet.addRow(row)

      for (let i = 1; i <= row.length; i++) {

        const cell = dataRow.getCell(i)
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
        const cellValue = row[i];
         const cellValueLength = cellValue ? cellValue.toString().length : 0;
        if (cellValueLength > maxColumnWidths[i]) {
          maxColumnWidths[i] = cellValueLength;
        }
      }
    })
  }

    for (let i = 0; i < headers.length; i++) {
        worksheet.getColumn(i + 1).width = maxColumnWidths[i] + 2;
      }

    worksheet.properties.defaultRowHeight = 20
    worksheet.views = [
      {
        state: 'frozen',
        xSplit: 0,
        ySplit: 1,
        topLeftCell: 'A2',
        activeCell: 'A2',
        showGridLines: false,
      },
    ]

  const buffer = await workbook.xlsx.writeBuffer()
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    saveAs(blob, fileName)
  }
  else{
    console.error('No data available for download');
  }
}
