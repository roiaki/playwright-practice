import { test, expect } from "@playwright/test";

test.describe("Form Layouts page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200");
    await page.getByText("Forms").click();
    await page.getByText("Form Layout").click();
  });

  test("chap33", async ({ page }) => {
    const usingTheGridEmailInput = page
      .locator("nb-card", { hasText: "Using the Grid" })
      .getByRole("textbox", { name: "Email" });

    await usingTheGridEmailInput.fill("test@test.com");
    await usingTheGridEmailInput.clear();
    // 一文字ずつ入力する
    await usingTheGridEmailInput.pressSequentially("test2@test.com", {
      delay: 500,
    });

    // generic assertion
    // await page.waitForTimeout(1000);
    const inputValue = await usingTheGridEmailInput.inputValue();
    expect(inputValue).toEqual("test2@test.com");

    // locator assertion
    await expect(usingTheGridEmailInput).toHaveValue("test2@test.com");
  });

  test("chap34 ラジオボタン", async ({ page }) => {
    const usingTheGridForm = page.locator("nb-card", {
      hasText: "Using the Grid",
    });

    //await usingTheGridForm.getByLabel('Option 1').check({force: true});
    // Option 1
    await usingTheGridForm
      .getByRole("radio", { name: "Option 1" })
      .check({ force: true });
    const radioStatus1 = await usingTheGridForm
      .getByRole("radio", { name: "Option 1" })
      .isChecked();
    expect(radioStatus1).toBeTruthy();
    await expect(
      usingTheGridForm.getByRole("radio", { name: "Option 1" })
    ).toBeChecked();

    // Option 2
    await usingTheGridForm
      .getByRole("radio", { name: "Option 2" })
      .check({ force: true });

    // getByRoleが推奨
    expect(
      await usingTheGridForm
        .getByRole("radio", { name: "Option 1" })
        .isChecked()
    ).toBeFalsy();
    expect(
      await usingTheGridForm
        .getByRole("radio", { name: "Option 2" })
        .isChecked()
    ).toBeTruthy();

    const radioStatus2 = await usingTheGridForm
      .getByRole("radio", { name: "Option 2" })
      .isChecked();
    expect(
      await usingTheGridForm
        .getByRole("radio", { name: "Option 1" })
        .isChecked()
    ).toBeFalsy();
    // なぜかTrueになってエラー
    //await expect(radioStatus1).toBeFalsy();
    expect(radioStatus2).toBeTruthy();
    //await expect(usingTheGridForm.getByRole('radio', {name: "Option 2"})).toBeChecked();
  });

  test("chap35 CheckBox", async ({ page }) => {
    await page.goto("http://localhost:4200");
    await page.getByText("Modal & Overlays").click();
    await page.getByText("Toastr").click();

    await page
      .getByRole("checkbox", { name: "Hide on click" })
      .uncheck({ force: true });
    await page
      .getByRole("checkbox", { name: "Prevent arising of duplicate toast" })
      .check({ force: true });

    const allCheckBox = page.getByRole("checkbox");

    for (const box of await allCheckBox.all()) {
      await box.check({ force: true });
      expect(await box.isChecked()).toBeTruthy();
    }

    for (const box of await allCheckBox.all()) {
      await box.uncheck({ force: true });
      expect(await box.isChecked()).toBeFalsy();
    }
  });

  test("chap36 Lists and DropDown", async ({ page }) => {
    const dropDownMenu = page.locator("ngx-header nb-select");

    await dropDownMenu.click();

    // when the list has a UL tag
    page.getByRole("List");
    // when the list has Li tag
    page.getByRole("listitem");

    // 子要素で取得
    const optionList = page.locator("nb-option-list nb-option");
    await expect(optionList).toHaveText([
      "Light",
      "Dark",
      "Cosmic",
      "Corporate",
    ]);
    await optionList.filter({ hasText: "Cosmic" }).click();

    const header = page.locator("nb-layout-header");

    await expect(header).toHaveCSS("background-color", "rgb(50, 50, 89)");

    const colors = {
      Light: "rgb(255, 255, 255)",
      Dark: "rgb(34, 43, 69)",
      Cosmic: "rgb(50, 50, 89)",
      Corporate: "rgb(255, 255, 255)",
    };

    await dropDownMenu.click();
    for (const color in colors) {
      await optionList.filter({ hasText: color }).click();
      await expect(header).toHaveCSS("background-color", colors[color]);
      await dropDownMenu.click();
      // if(color != "Corporate") {
      //   await dropDownMenu.click();
      // }
    }
  });

  test("chap37 Tooltips", async ({ page }) => {
    await page.getByText("Modal & Overlays").click();
    await page.getByText("Tooltip").click();

    const toolTipCard = page.locator("nb-card", {
      hasText: "Tooltip Placements",
    });
    await toolTipCard.getByRole("button", { name: "Top" }).hover();

    page.getByRole("tooltip");
    const tooltip = await page.locator("nb-tooltip").textContent();
    expect(tooltip).toEqual("This is a tooltip");
  });

  test("chap38 DialogBox", async ({ page }) => {
    await page.getByText("Tables & Data").click();
    await page.getByText("Smart Table").click();

    page.on("dialog", (dialog) => {
      expect(dialog.message()).toEqual("Are you sure you want to delete?");
      dialog.accept();
    });

    await page
      .getByRole("table")
      .locator("tr", { hasText: "mdo@gmail.com" })
      .locator(".nb-trash")
      .click();
    await expect(page.locator("table tr").first()).not.toHaveText(
      "mdo@gmail.com"
    );
  });

  test("chap39 tables-01", async ({ page }) => {
    await page.getByText("Tables & Data").click();
    await page.getByText("Smart Table").click();

    const targetRow = page.getByRole("row", { name: "twitter@outlook.com" });
    await targetRow.locator(".nb-edit").click();
    await page.locator("input-editor").getByPlaceholder("Age").clear();
    await page.locator("input-editor").getByPlaceholder("Age").fill("35");
    await page.locator(".nb-checkmark").click();

    await page.locator(".ng2-smart-pagination-nav").getByText("2").click();
    const tagetRowById = page
      .getByRole("row", { name: "11" })
      .filter({ has: page.locator("td").nth(1).getByText("11") });
    await tagetRowById.locator(".nb-edit").click();
    await page.locator("input-editor").getByPlaceholder("E-mail").clear();
    await page
      .locator("input-editor")
      .getByPlaceholder("E-mail")
      .fill("test@test.com");
    await page.locator(".nb-checkmark").click();
    await expect(tagetRowById.locator("td").nth(5)).toHaveText("test@test.com");

    // 検索
    const ages = ["20", "30", "40", "200"];

    for (let age of ages) {
      await page.locator("input-filter").getByPlaceholder("Age").clear();
      await page.locator("input-filter").getByPlaceholder("Age").fill(age);
      await page.waitForTimeout(500);

      const ageRows = page.locator("tbody tr");

      for (let row of await ageRows.all()) {
        const cellValue = await row.locator("td").last().textContent();

        if (age == "200") {
          expect(await page.getByRole("table").textContent()).toContain(
            "No data found"
          );
        } else {
          expect(cellValue).toEqual(age);
        }
      }
    }
  });

  test("chap41-42 DatePicker", async ({ page }) => {
    await page.getByText("Forms").click();
    await page.getByText("Datepicker").click();

    const calendarInputField = page.getByPlaceholder("Form Picker");
    await calendarInputField.click();

    let date = new Date();
    date.setDate(date.getDate() + 7);
    const expectedDate = date.getDate().toString();
    const expectedMonthShot = date.toLocaleString("En-US", { month: "short" });
    const expectedMonthLong = date.toLocaleString("En-US", { month: "long" });
    const expectedYear = date.getFullYear();
    const dateToAssert = `${expectedMonthShot} ${expectedDate}, ${expectedYear}`;

    // 完全一致 exact: true
    await page
      .locator('[class="day-cell ng-star-inserted"]')
      .getByText("8", { exact: true })
      .click();
    await calendarInputField.click();

    let calendarMonthAndYear = await page
      .locator("nb-calendar-view-mode")
      .textContent();
    const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`;

    while (!calendarMonthAndYear.includes(expectedMonthAndYear)) {
      await page
        .locator('nb-calendar-pageable-navigation [data-name="chevron-right"]')
        .click();
      let calendarMonthAndYear = await page
        .locator("nb-calendar-view-mode")
        .textContent();
    }

    // 部分一致
    await expect(calendarInputField).toHaveValue(/2024/);
    await page
      .locator('[class="day-cell ng-star-inserted"]')
      .getByText(expectedDate, { exact: true })
      .click();
    await expect(calendarInputField).toHaveValue(dateToAssert);
  });

  test("スクリーンショット", async ({ page }) => {
    const usingTheGridForm = page.locator("nb-card", {
      hasText: "Using the Grid",
    });
    await usingTheGridForm
      .getByRole("radio", { name: "Option 1" })
      .check({ force: true });
    await expect(usingTheGridForm).toHaveScreenshot();
  });
});
