import React from 'react';
interface CellProps {
    value: number;
    onChange: (value: string) => void;
    disabled: boolean;
}
declare const Cell: React.FC<CellProps>;
export default Cell;
