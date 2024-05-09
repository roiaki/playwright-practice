import {test, expect} from '@playwright/test';
import {NavigationPage} from '../page-object/navigationPage';
import { FormLayoutsPage } from "../page-object/formLayoutsPage";

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
  await navigateTo.formLayoutsPage();
  await onFormLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'testtest123', 'Option 1');
  await onFormLayoutsPage.submitInlineFormWithNameAndCheckbox('test', 'test@test.com', true);
});


