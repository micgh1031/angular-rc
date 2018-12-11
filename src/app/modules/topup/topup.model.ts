export class TopUp
{
  id: string;
  user_id: number;
  user: any;
  currency_id: number;
  currency: any;
  merchant_id: number;
  merchant: any;
  target_phone: string;
  amount: number;
  fee: number;
  percent: number;
  fixed: number;
  discount: number;
  status: string;
  processed_at: string;

  /**
   * Constructor
   *
   */
  constructor(top_up)
  {
    {
      this.id = top_up.id || '';
      this.user_id = top_up.user_id || null;
      this.user = top_up.user || null;
      this.currency_id = top_up.currency_id || null;
      this.currency = top_up.currency || null;
      this.merchant_id = top_up.merchant_id || null;
      this.merchant = top_up.merchant || null;
      this.target_phone = top_up.target_phone || '';
      this.amount = top_up.amount || '';
      this.fee = top_up.fee || '';
      this.percent = top_up.percent || '';
      this.fixed = top_up.fixed || '';
      this.discount = top_up.discount || '';
      this.status = top_up.status || '';
      this.processed_at = top_up.processed_at || '';
    }
  }
}
