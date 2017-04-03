import { Mser2Page } from './app.po';

describe('mser2 App', () => {
  let page: Mser2Page;

  beforeEach(() => {
    page = new Mser2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
