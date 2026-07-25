import React from 'react';

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

const TableComponent: React.FC<TableProps> = ({ children, className = '' }) => {
  return (
    <div className={`overflow-x-auto rounded-xl glass border border-white/10 ${className}`}>
      <table className="w-full">{children}</table>
    </div>
  );
};

interface TableHeaderProps {
  children: React.ReactNode;
}

const TableHeader: React.FC<TableHeaderProps> = ({ children }) => {
  return <thead className="bg-[#1E3A8A]/50">{children}</thead>;
};

interface TableBodyProps {
  children: React.ReactNode;
}

const TableBody: React.FC<TableBodyProps> = ({ children }) => {
  return <tbody className="divide-y divide-white/10">{children}</tbody>;
};

interface TableRowProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const TableRow: React.FC<TableRowProps> = ({ children, className = '', onClick }) => {
  return (
    <tr
      className={`hover:bg-[#06B6D4]/10 transition-colors ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </tr>
  );
};

interface TableCellProps {
  children: React.ReactNode;
  className?: string;
}

const TableCell: React.FC<TableCellProps> = ({ children, className = '' }) => {
  return <td className={`px-6 py-4 text-sm ${className}`}>{children}</td>;
};

interface TableHeadProps {
  children: React.ReactNode;
  className?: string;
}

const TableHead: React.FC<TableHeadProps> = ({ children, className = '' }) => {
  return (
    <th className={`px-6 py-3 text-left text-xs font-medium text-[#06B6D4] uppercase tracking-wider ${className}`}>
      {children}
    </th>
  );
};

const Table = Object.assign(TableComponent, {
  Header: TableHeader,
  Body: TableBody,
  Row: TableRow,
  Cell: TableCell,
  Head: TableHead,
});

export default Table;