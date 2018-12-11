export class Transaction
{
  id: string;
  user_id: number;
  user: any;
  merchant_id: number;
  merchant: any;
  type: string;
  relation_id: number;
  status: string;
  processed_at: string;
  created_at: string;

  /**
   * Constructor
   *
   */
  constructor(transaction)
  {
    {
      this.id = transaction.id || '';
      this.user_id = transaction.user_id || '';
      this.user = transaction.user || null;
      this.merchant_id = transaction.id || '';
      this.merchant = transaction.merchant || null;
      this.type = transaction.type || '';
      this.relation_id = transaction.relation_id || '';
      this.status = transaction.status || '';
      this.processed_at = transaction.processed_at || '';
      this.created_at = transaction.created_at || '';
    }
  }
}
