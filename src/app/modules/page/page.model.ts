export class Page
{
  id: string;
  name: string;
  description: string;

  /**
   * Constructor
   *
   */
  constructor(page)
  {
    {
      this.id = page.id || '';
      this.name = page.name || '';
      this.description = page.description || '';
    }
  }
}
