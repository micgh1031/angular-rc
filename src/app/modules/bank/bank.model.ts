import { Currency } from '../currency/currency.model';

export class Bank
{
  id: string;
  name: string;
  currency_id: number;
  is_online: boolean;
  is_active: boolean;
  currency: Currency;

  /**
   * Constructor
   *
   */
  constructor(bank)
  {
    {
      this.id = bank.id || '';
      this.name = bank.name || '';
      this.currency_id = bank.currency_id || null;
      this.is_online = bank.is_active || true;
      this.is_active = bank.is_active || true;
      this.currency = bank.currency || null;
    }
  }
}
