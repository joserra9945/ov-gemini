import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import Swal from 'sweetalert2';
import RecoveryPasswordService from 'utils/services/recovery-password-service';

const recoveryPasswordService = new RecoveryPasswordService();

const InputEmail = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { handleSubmit, register, formState } = useForm({
    mode: 'onChange',
  });

  const { errors } = formState;

  const onSubmit = (data) => {
    setIsSubmitted(true);
    recoveryPasswordService
      .sendResetPasswordEmail(data)
      .then(() => {
        Swal.fire({
          title: 'Éxito!',
          text: 'Se ha enviado un mensaje electrónico a su correo electrónico para recuperar su contraseña.',
          icon: 'success',
        });
        setIsSubmitted(false);
      })
      .catch(() => {
        setIsSubmitted(false);
      });
  };
  return (
    <div className="recovery-password rp-s1">
      <div className="card">
        <div className="header">
          <div className="title">
            <h2>Recuperar contraseña</h2>
          </div>
        </div>
        <div className="content">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-field field field-password">
              <label htmlFor="password">Introduce tu email:</label>
              <input
                className={
                  errors?.email
                    ? 'p-inputtext p-component p-filled p-invalid'
                    : 'p-inputtext p-component p-filled'
                }
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...register('email', {
                  required: 'Email requerido',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email inválido',
                  },
                })}
                type="email"
              />
              {errors?.email && (
                <small className="p-error p-d-block">
                  {errors?.email.message}
                </small>
              )}
            </div>

            <Button
              label="Recuperar contraseña"
              disabled={!formState.isValid || isSubmitted}
              onClick={handleSubmit(onSubmit)}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default InputEmail;
