import React, { FC, useEffect, useState } from 'react';

import { GenericInputText } from '../GenericInputText';

import ChipEmailTemplate from './ChipEmailTemplate';

interface IProps {
  value: string[];
  onChange: (emails: string[]) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

const GenericInputEmails: FC<IProps> = ({
  value: emails,
  onChange,
  className,
  placeholder,
  disabled,
}) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const trimmedEmails = emails.map((email) => email.trim());
    if (JSON.stringify(trimmedEmails) !== JSON.stringify(emails)) {
      onChange(trimmedEmails);
    }
  }, [emails, onChange]);

  useEffect(() => {
    if (Array.isArray(emails) && emails.length === 1) {
      const formattedValue = emails[0];
      const splitEmails = formattedValue
        .split(';')
        .map((email: string) => email.trim());
      if (JSON.stringify(splitEmails) !== JSON.stringify(emails)) {
        onChange(splitEmails);
      }
    }
  }, [emails, onChange]);

  const handleAddValue = () => {
    if (inputValue.trim() !== '') {
      onChange([...emails, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === ',') {
      e.preventDefault();
      handleAddValue();
    }
  };

  const handleDeleteValue = (emailToDelete: string) => {
    const newEmails = emails.filter((email) => email !== emailToDelete);
    onChange(newEmails);
  };

  return (
    <div
      className={`${className} flex items-baseline border border-gray-300 rounded-md px-3 py-2 w-full`}
    >
      <ChipEmailTemplate emails={emails} onDelete={handleDeleteValue} />
      <GenericInputText
        className="flex-1 border-none outline-none"
        placeholder={placeholder}
        disabled={disabled}
        value={inputValue}
        onChange={(value) => setInputValue(value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default GenericInputEmails;
