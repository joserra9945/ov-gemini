import { useCallback, useState } from 'react';

import { InputTag } from './InputTag';

import '@shared/styles/main.scss';

export const BasicInputTag = (): JSX.Element => {
  const [emails, setEmails] = useState<string[]>([]);

  const validate = useCallback((value: string[]) => {
    const tmpEmails: React.SetStateAction<string[]> = [];
    value.forEach((email: string) => {
      const resEmail = email
        .trim()
        .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
      if (resEmail?.length) tmpEmails.push(email);
    });
    setEmails(tmpEmails);
  }, []);
  return (
    <InputTag
      onChange={validate}
      componentClass="input-tag__container"
      inputClass="input-tag__input"
      value={emails}
      autoFocus
      separator={[';', ' ']}
    />
  );
};
