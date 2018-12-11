export class Currency
{
  id: string;
  name: string;
  symbol: string;
  is_active: boolean;

  /**
   * Constructor
   *
   */
  constructor(currency)
  {
    {
      this.id = currency.id || '';
      this.name = currency.name || '';
      this.symbol = currency.symbol || '';
      this.is_active = currency.is_active || true;
    }
  }
}
