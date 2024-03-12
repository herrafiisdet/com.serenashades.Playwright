import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'Get started' }).click();

const validateText = await page.locator("//div[@class='theme-doc-markdown markdown']//h1[1]").innerText();
expect (validateText).toEqual('Installation');

if(validateText  == "Installation"){

 console.log("///**** great!! User Navigated to the link successfly ****/// ");
 page.screenshot()

}else{

  console.log("///*** oops!!! User failed, cant located Installation  heading");
  page.screenshot()
}

});