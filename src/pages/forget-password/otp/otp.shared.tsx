import { useState } from 'react';
import { useMatch, useNavigate } from '@tanstack/react-location';
import { endpoint } from '@core/endpoints';
import { handleError } from '@core/http';
import { dialog } from '@core/dialog/dialog';
import translate from '@translations';
import { setAuthCookies } from '@pages/sign-in/sign-in.services';
import { forgetPassword } from '../forget-password.service';

export const useOtpShared = () => {
  const navigate = useNavigate();
  const queryParam = useMatch().search;
  const email = String(queryParam.email);
  const [otpValue, setOtpValue] = useState('');

  function submit() {
    endpoint.get.auth['otp/confirm']({ email, otp: otpValue })
      .then((resp) => {
        if (resp.access_token && resp.access_token?.length > 0) {
          setAuthCookies(resp);
          navigate({ to: '../password' });
        }
      })
      .catch((err) => {
        handleError()(err);
        setOtpValue('');
      });
  }

  function onResendOtp() {
    forgetPassword(email)
      .then(() => dialog.alert({ title: 'success', message: translate('OTP sent success') }))
      .catch((err) => {
        handleError()(err);
        setOtpValue('');
      });
  }

  const backToPerviousPage = () => {
    navigate({ to: '../email' });
  };

  return { backToPerviousPage, otpValue, setOtpValue, submit, onResendOtp };
};
