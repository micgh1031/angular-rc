export class Transfer
{
  id: string;
  sender_id: number;
  sender: any;
  receiver_id: number;
  receiver: any;
  currency_id: number;
  currency: any;
  amount: number;
  fee: number;
  percent: number;
  fixed: number;
  discount: number;
  status: string;
  note: string;
  processed_at: string;
  created_at: string;

  /**
   * Constructor
   *
   */
  constructor(transfer)
  {
    {
      this.id = transfer.id || '';
      this.sender_id = transfer.sender_id || '';
      this.sender = transfer.sender || null;
      this.receiver_id = transfer.receiver_id || '';
      this.receiver = transfer.receiver || null;
      this.currency_id = transfer.currency_id || '';
      this.currency = transfer.currency || null;
      this.amount = transfer.amount || '';
      this.fee = transfer.fee || '';
      this.percent = transfer.percent || '';
      this.fixed = transfer.fixed || '';
      this.discount = transfer.discount || '';
      this.status = transfer.status || '';
      this.note = transfer.note || '';
      this.processed_at = transfer.processed_at || '';
      this.created_at = transfer._created || '';
    }
  }
}
