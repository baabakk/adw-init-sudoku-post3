import React from 'react';
interface BoardProps {
    board: number[][];
    onCellChange: (row: number, col: number, value: number) => void;
    disabled: boolean;
}
declare const Board: React.FC<BoardProps>;
export default Board;
