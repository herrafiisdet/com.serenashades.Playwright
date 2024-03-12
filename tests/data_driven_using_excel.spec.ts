import {test , expect} from '@playwright/test';
import Exceljs from 'exceljs';
// To maximize the window, set the viewport to 1912x924 useviewport: {width: 1912, height: 924,}
// We use this website to find the best resolution for the viewport.https://whatismyviewport.com/
// test.use({viewport:{width: 1912, height: 924,}})

test ('Data driven test using excel file', async ({page}) => {

    //Load excel file 
    const workbook = new Exceljs.Workbook()
    await workbook.xlsx.readFile('files/Computer_List.xlsx')
    const worksheet = workbook.getWorksheet('Sheet1')

    // Iterate over rows in Excel sheet.
    for (let i = 2; i <= worksheet.rowCount; i++){
        const Computer_name = worksheet.getCell(`A${i}`).value
        const Introduced = worksheet.getCell(`B${i}`).value
        const Discontinued = worksheet.getCell(`C${i}`).value
        const Company = worksheet.getCell(`D${i}`).value

        // Test logic using data
        await page.goto('https://computer-database.gatling.io/computers')
        await page.locator("#add").click()
        // Fill the form with data from Excel Sheet
        await page.fill("#name",  Computer_name)
        await page.fill("#introduced" , Introduced)
        await page.fill("#discontinued" , Discontinued)
        await page.selectOption("#company" , Company)
        await page.locator("input[type='submit']").click()
        // Verify if the computer is added successfully or not
        await expect(page.locator("div.alert-message.warning")).toContainText("has been created")

    }

})