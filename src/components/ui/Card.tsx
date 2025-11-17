import React from 'react';

interface CardProps {
  children: React.ReactNode;
  padding?: 'none' | 'small' | 'medium' | 'large';
  shadow?: 'none' | 'small' | 'medium' | 'large';
  borderRadius?: 'none' | 'small' | 'medium' | 'large';
  hoverable?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function Card({
  children,
  padding = 'medium',
  shadow = 'small',
  borderRadius = 'medium',
  hoverable = false,
  onClick,
  className = ''
}: CardProps) {
  const paddingStyles = {
    none: '0',
    small: '12px',
    medium: '20px',
    large: '32px',
  };

  const shadowStyles = {
    none: 'none',
    small: '0 1px 3px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 6px rgba(0, 0, 0, 0.1)',
    large: '0 10px 20px rgba(0, 0, 0, 0.1)',
  };

  const radiusStyles = {
    none: '0',
    small: '4px',
    medium: '8px',
    large: '12px',
  };

  const styles: React.CSSProperties = {
    backgroundColor: '#fff',
    padding: paddingStyles[padding],
    boxShadow: shadowStyles[shadow],
    borderRadius: radiusStyles[borderRadius],
    border: '1px solid #e5e5e5',
    transition: hoverable ? 'all 0.2s ease' : 'none',
    cursor: onClick ? 'pointer' : 'default',
    ...(hoverable && {
      ':hover': {
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
        transform: 'translateY(-2px)',
      },
    }),
  };

  return (
    <div
      style={styles}
      onClick={onClick}
      className={className}
      onMouseEnter={(e) => {
        if (hoverable) {
          e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }
      }}
      onMouseLeave={(e) => {
        if (hoverable) {
          e.currentTarget.style.boxShadow = shadowStyles[shadow];
          e.currentTarget.style.transform = 'translateY(0)';
        }
      }}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return (
    <div
      style={{
        borderBottom: '1px solid #e5e5e5',
        marginBottom: '16px',
        paddingBottom: '16px',
      }}
      className={className}
    >
      {children}
    </div>
  );
}

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export function CardBody({ children, className = '' }: CardBodyProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div
      style={{
        borderTop: '1px solid #e5e5e5',
        marginTop: '16px',
        paddingTop: '16px',
      }}
      className={className}
    >
      {children}
    </div>
  );
}