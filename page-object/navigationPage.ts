import { Locator, Page } from "@playwright/test";


export class NavigationPage {
  readonly page: Page;
  // readonly formLayoutsMenuItem: Locator;
  // readonly datePickerMenuItem: Locator;
  // readonly smartTableMenuItem: Locator;
  // readonly toastMenuItem: Locator;
  // readonly tooltipMenuItem: Locator;

  constructor(page) {
    this.page = page;
    // this.formLayoutsMenuItem = page.getByText('Form Layout');
    // this.datePickerMenuItem = page.getByText('Datepicker');
    // this.smartTableMenuItem = page.getByText('Datepicker');
    // this.toastMenuItem = page.getByText('Toastr');
    // this.tooltipMenuItem = page.getByText('Tooltips);
  }

  async formLayoutsPage() {
    // await this.page.getByText('Forms').click();
    await this.selectGroupMenuItem('Forms');
    await this.page.getByText('Form Layout').click();
  }

  async datepickerPage() {
    // await this.page.getByText('Forms').click();
    await this.selectGroupMenuItem('Forms');
    await this.page.getByText('Datepicker').click();
  }

  async smartTablePage() {
    //await this.page.getByText('Tables & Data').click();
    await this.selectGroupMenuItem('Tables & Data');
    await this.page.getByText('Smart Table').click();
  }

  async toastrPage() {
    //await this.page.getByText('Modal & Overlays').click();
    await this.selectGroupMenuItem('Modal & Overlays');
    await this.page.getByText('Toastr').click();
  }

  async tooltipPage() {
    await this.selectGroupMenuItem('Modal & Overlays');
    await this.page.getByText('Tooltip').click();
  }

  async selectGroupMenuItem(title) {
    const groupMenuItem = this.page.getByTitle(title);
    const expandedState = await groupMenuItem.getAttribute('aria-expanded');
    if(expandedState == "false") {
      await groupMenuItem.click();
    }
  }
}

// module.exports = NavigationPage;
