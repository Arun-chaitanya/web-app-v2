import { PaymentDetailProps } from "@molecules/payment-detail/payment-detail.types";

export interface PaymentSummaryCardProps extends PaymentDetailProps {
  title: string;
  total_price: number;
  containerClassName?: string;
}
