import { test, expect} from '@playwright/test';
test.use({
    //headless: true,
    viewport: {
        width: 1920,
        height: 1080
    },

    launchOptions: {
        slowMo: 100 //ms   
    }

});
test('Customizing a roller shade Positive test ', async ({ page }) => {

    // launching the browser and navigating to the URL
    await page.goto("https://www.serenashades.com/");

    //Clinck on Design & Buy button
    await page.locator("(//a[@class='btn'])[3]").click();

    // Choosing Shade Style
    await page.waitForTimeout(2000);
    await page.locator('div:nth-child(3) > .option-img').first().click(); // Select "Roller" option
    await page.waitForTimeout(2000);
    await page.locator("//a[contains(text(),'Next')]").click();  //Click Next Button

    // Entering Measurement
    await page.locator("select[name='width']").selectOption('19');
    await page.locator("select[name='width_frac']").selectOption('7/8');
    await page.locator("select[name='height']").selectOption('12');
    await page.locator("select[name='height_frac']").selectOption('1/2');
    //await page.waitForTimeout(5000)  
    await page.locator("(//a[@class='button'])[3]").click();

    await page.waitForTimeout(2000);

    // Selecting Power Options
    await page.locator("(//div[contains(@class,'option power-option')]//div)[1]").click(); // Selecting "Battery Powered"  option
    await page.locator("//a[contains(text(),'Next')]").click(); //Click  next button after selecting power option

    // Chooseing  Mount Type & Headrail 
    await page.locator("(//div[@data-id='im'])[1]").click();   // Mounting Type. seslecting "Inside Mount".
    await page.locator("div[data-id='arcf']").click(); // Headrail Options. Selecting "Architectural Fascia"
    await page.locator("//a[contains(text(),'Next')]").click(); //Click next button

    // Choosing Fabric Style
    await page.locator("//div[@class='option blackout']//div[1]").click();  // Selecting "Blackout" as  fabric style.
    await page.locator("//a[contains(text(),'Next')]").click(); //Click next button

    // Choosing Fabric Collection & Color

    //await page.evaluate(() => {
    //window.scrollBy(0, 600);
    //});
    //await page.waitForTimeout(3000);  
    await page.locator('#tab-color div').filter({ hasText: /^\+-RedDetails$/ }).locator('div').nth(1).click(); //Selecting "Red" color.
    await page.waitForTimeout(2000);

    //await page.evaluate(() => {
    //window.scrollBy(0, 1000);
    //});
    //await page.waitForTimeout(2000); 
    await page.locator("(//div[@class = 'arch-finish-color-item-inner'])[3]").click(); //Selecting "Silver" color as Architectural Fascia Finish Color
    await page.locator("//a[contains(text(),'Next')]").click(); //Click next button

    // Choosing How To Control the Shade
    await page.locator("//div[@data-value='remotes|pico']//div[1]").click(); // Selecting "Remote Control"  as a control Option.
    await page.locator("(//div[contains(@class,'option-img accessories-item')])[1]").click(); // Shoosing "Pico 3-Button Remote Control With Raise/Lower".
    await page.locator("(//select[@class='product-select'])[1]").selectOption({ label: 'Light Almond' }); //Selecting "Light Almond" color for Pico.
    await page.locator("(//a[@class='button'])[3]").click();  // Clicking on Next button.

    // Entering Shade Location
    await page.locator("input.paste").fill("Master Bedroom");  //  Adding Room Name.
    await page.locator("//a[contains(text(),'Add to Cart')]").click(); //  Clicking on Add to cart Button.

    // validating the Test.
    const shoppingCartValid = await page.locator("//span[text()='Shopping Cart']").innerText();
    expect(shoppingCartValid).toEqual('Shopping Cart');
    if (shoppingCartValid == "Shopping Cart") {
        console.log("/// **** Great job, User Customized a shade and Added it to the Cart successfly ****///");
        page.screenshot()
    } else {
        console.log("/// **** User failed to Customized a shade and Added it to the Cart ****///");
        page.screenshot()
    }


});