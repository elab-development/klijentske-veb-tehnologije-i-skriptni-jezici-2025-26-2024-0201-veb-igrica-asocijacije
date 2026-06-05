import { ButtonHTMLAttributes } from 'react';
export default function Button(
  props: ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'ghost' | 'danger';
  },
) {
  const { variant = 'primary', className = '', ...rest } = props;
  return <button className={`btn ${variant} ${className}`} {...rest} />;
}
