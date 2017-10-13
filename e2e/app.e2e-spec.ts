import { HeatmapsPage } from './app.po';

describe('heatmaps App', () => {
  let page: HeatmapsPage;

  beforeEach(() => {
    page = new HeatmapsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
