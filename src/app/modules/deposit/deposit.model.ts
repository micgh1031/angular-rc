export class Deposit
{
  id: string;
  user_id: number;
  user: any;
  bank_id: number;
  bank: any;
  currency_id: number;
  currency: any;
  amount: number;
  fee: number;
  percent: number;
  fixed: number;
  discount: number;
  status: string;
  is_online: boolean;
  created_at: string;

  /**
   * Constructor
   *
   */
  constructor(deposit)
  {
    {
      this.id = deposit.id || '';
      this.user_id = deposit.user_id || '';
      this.user = deposit.user || null;
      this.bank_id = deposit.bank_id || '';
      this.bank = deposit.bank || null;
      this.currency_id = deposit.currency_id || '';
      this.currency = deposit.currency || null;
      this.amount = deposit.amount || '';
      this.fee = deposit.fee || '';
      this.percent = deposit.percent || '';
      this.fixed = deposit.fixed || '';
      this.discount = deposit.discount || '';
      this.status = deposit.status || '';
      this.is_online = deposit.is_online || true;
      this.created_at = deposit.created_at || '';
    }
  }
}
