export class Withdraw
{
  merchant_id: string;
  user_id: string;
  bank_id: string;
  currency_id: string;
  amount: string;
  fee: string;
  percent: string;
  discount: string;
  status: string;
  is_online: boolean;
  created_at: string;
  merchant: any;
  user: any;
  bank: any;
  currency: any;

  /**
   * Constructor
   *
   */
  constructor(withdraw)
  {
    {
      this.merchant_id = withdraw.merchant_id || '';
      this.user_id = withdraw.user_id || '';
      this.bank_id = withdraw.bank_id || '';
      this.currency_id = withdraw.currency_id || '';
      this.amount = withdraw.amount || '';
      this.fee = withdraw.fee || '';
      this.percent = withdraw.percent || '';
      this.discount = withdraw.discount || '';
      this.status = withdraw.status || '';
      this.is_online = withdraw.is_online || true;
      this.created_at = withdraw.created_at || '';
      this.merchant = withdraw.merchant || null;
      this.user = withdraw.user || null;
      this.bank = withdraw.bank || null;
      this.currency = withdraw.currency || null;
    }
  }
}
