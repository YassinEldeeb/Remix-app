import { useSubmit } from '@remix-run/react';
import { useState } from 'react';
import Input from 'react-verification-input';

export const VerificationInput = () => {
  const submit = useSubmit();
  const [inputLength, setInputLength] = useState(0);
  const [code, setCode] = useState('');

  const handleChange = (value: string) => {
    setCode(value);
    setInputLength(value.length);
  };

  return (
    <div className="max-w-xs">
      <label
        htmlFor="authenticationCode"
        className="block text-sm  text-gray-700 mb-5"
      >
        Passcode
      </label>
      <Input
        onChange={(value) => handleChange(value)}
        autoFocus
        value={code}
        placeholder=" "
        removeDefaultStyles
        classNames={{
          container: 'container',
          character: 'character',
          characterInactive: 'character--inactive',
          characterSelected: 'character--selected',
        }}
        inputProps={{
          name: 'authenticationCode',
        }}
      />
    </div>
  );
};
