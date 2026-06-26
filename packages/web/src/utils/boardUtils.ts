/**
 * Board utility functions for the web client.
 * These are thin wrappers around the more general Sudoku utilities.
 */
import { createEmptyBoard, copyBoard, isBoardComplete, isBoardValid } from './sudoku.js';
import { isValidMove } from './validation.js';

export { createEmptyBoard, copyBoard, isBoardComplete, isBoardValid, isValidMove };
