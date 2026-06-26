import React from 'react';
import styles from './Cell.module.css';

interface CellProps {
  value: number; // 0 means empty
  onChange: (value: string) => void;
  disabled: boolean;
}

const Cell: React.FC<CellProps> = ({ value, onChange, disabled }) => {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      className={styles.cell}
      type="text"
      inputMode="numeric"
      pattern="[1-9]"
      maxLength={1}
      value={value === 0 ? '' : value}
      onChange={handleInput}
      disabled={disabled}
    />
  );
};

export default Cell;
