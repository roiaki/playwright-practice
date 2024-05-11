import {test, expect} from '@playwright/test';
import { FormLayoutsPage } from "../../page-object/formLayoutsPage";
import { faker } from "@faker-js/faker";
import { NavigationPage } from "../../page-object/navigationPage";

test.beforeEach(async({page}) => {
  await page.goto('http://localhost:4200');
});

test('chap46 PageObject', async({page}) => {
  const navigateTo = new NavigationPage(page);
  await navigateTo.formLayoutsPage();
  await navigateTo.datepickerPage();
  await navigateTo.smartTablePage();
  await navigateTo.toastrPage();
  await navigateTo.tooltipPage();
});

/**
 * This method will out the Inline form with user details
 * @param name - should be first and last name
 * @param Email - valid email for the test user
 * @param rememberMe - true or false if user session to be safed
 */
test('chap49 Parametrized Methods', async({page})  => {
  const navigateTo = new NavigationPage(page);
  const onFormLayoutsPage = new FormLayoutsPage(page);

  const randomFullName = faker.person.fullName();
  const randomEmail = `${randomFullName}${faker.number.int(100)}@test.com`;

  await navigateTo.formLayoutsPage();
  await onFormLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption(randomEmail, 'testtest123', 'Option 1');
  await onFormLayoutsPage.submitInlineFormWithNameAndCheckbox(randomFullName, randomEmail, true);
});

test('chap43 Slider', async({page}) => {
  const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle');
    await tempGauge.evaluate(node => {
      node.setAttribute('cx', '232.630');
      node.setAttribute('cy', '232.630');
    })
    await tempGauge.click();
});

test('chap53', async({page}) => {
  
});


