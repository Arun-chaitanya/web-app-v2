import Card from '@atoms/card';
import { Otp as OtpCom } from '@atoms/otp/otp';
import { Button } from '@atoms/button/button';
import { useOtpShared } from '../otp.shared';
import css from './desktop.module.scss';

export const Desktop: React.FC = () => {
  const { backToPerviousPage, otpValue, setOtpValue, submit, onResendOtp } = useOtpShared();

  return (
    <div className={css.container}>
      <Card className={css.card}>
        <div className={css.header}>
          <img src="/icons/chevron-left.svg" alt="back-icon" className={css.icon} onClick={backToPerviousPage} />
        </div>
        <div className={css.main}>
          <div className={css.content}>
            <span className={css.title}>Making sure it's you </span>
            <span className={css.text}>
              A message with a verification code has been sent to your email. Enter the code to continue.
            </span>
          </div>
          <OtpCom value={otpValue} length={6} onChange={setOtpValue} />
        </div>
        <div className={css.footer}>
          <Button onClick={submit} disabled={!(otpValue.length === 6)}>
            Verify
          </Button>
          <Button weight="normal" removeBorder color="white" onClick={onResendOtp}>
            Resend code
          </Button>
        </div>
      </Card>
    </div>
  );
};
