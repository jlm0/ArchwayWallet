import {TFunction} from 'react-i18next';
import {CommonPasswordList} from '../constants';

export function validatePassword(
  password: string,
  setError: React.Dispatch<React.SetStateAction<string>>,
  t: TFunction<'translation', undefined>,
) {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?!.*\s)(?=.{8,})/;

  if (!password) {
    setError(t('password.errors.empty', {ns: 'global'}));
    return;
  }

  if (!passwordRegex.test(password)) {
    if (!/(?=.*[a-z])/.test(password)) {
      setError(t('password.errors.lowercase', {ns: 'global'}));
      return;
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      setError(t('password.errors.uppercase', {ns: 'global'}));
      return;
    }
    if (!/(?=.*[0-9])/.test(password)) {
      setError(t('password.errors.digits', {ns: 'global'}));
      return;
    }
    if (!/(?=.*[!@#$%^&*])/.test(password)) {
      setError(t('password.errors.symbols', {ns: 'global'}));
      return;
    }
    if (password.length < 8) {
      setError(t('password.errors.min', {ns: 'global'}));
      return;
    }
    if (/\s/.test(password)) {
      setError(t('password.errors.spaces', {ns: 'global'}));
      return;
    }
  }

  if (CommonPasswordList.includes(password)) {
    setError(t('password.errors.oneOf', {ns: 'global'}));
    return;
  }
  setError('');
  return;
}

export function validateConfirmPassword(
  password: string,
  confirmPassword: string,
  setError: React.Dispatch<React.SetStateAction<string>>,
  t: TFunction<'translation', undefined>,
) {
  if (!confirmPassword) {
    setError(t('password.errors.empty', {ns: 'global'}));
    return;
  }
  if (confirmPassword !== password) {
    setError(t('password.errors.match', {ns: 'global'}));
    return;
  }
  setError('');
  return;
}
