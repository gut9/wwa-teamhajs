import { LivechatAppPage } from './app.po';

describe('livechat-app App', () => {
  let page: LivechatAppPage;

  beforeEach(() => {
    page = new LivechatAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
