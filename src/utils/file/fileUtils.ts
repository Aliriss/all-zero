import XLSX from 'xlsx';

/**
 * 文件工具
 */
export class FileUtils {
  /**
   * base64编码转文件
   * 编码必须是文件的编码
   * @param base64Str base64文件编码
   * @param fileName 文件名，带后缀
   */
  static base64ToFile(base64Str: string, fileName: string) {
    const byteCharacters = atob(base64Str);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], {type: 'application/octet-stream'});
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  }

  /**
   * 下载excel文件
   * @param excelName excel文件名，需要包含后缀名: 例如.xlsx
   * @param tableColumns 表头
   * @param dataSource 数据
   */
  static downloadExcel(excelName: string, tableColumns: any, dataSource: any) {
    const tableHead: any = [];
    const checkboxGroup: string[] = [];
    tableColumns.forEach((item: any) => {
      if (item.title !== '操作') {
        tableHead.push(item.title);
        checkboxGroup.push(item.dataIndex);
      }
    });
    const tableBody = dataSource.map((item: any) => checkboxGroup.map((k: string) => item[k]));

    const tableData = [tableHead, ...tableBody];
    // 将一组 JS 数据数组转换为工作表
    const ws = XLSX.utils.aoa_to_sheet(tableData);
    // 创建 workbook
    const wb = XLSX.utils.book_new();
    // 将 工作表 添加到 workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    // 将 workbook 写入文件
    XLSX.writeFile(wb, excelName);
  }
}
