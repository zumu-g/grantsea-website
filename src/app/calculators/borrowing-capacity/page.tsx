'use client';

import React, { useState, useEffect } from 'react';
import OncomHeader from '@/components/OncomHeader';

interface BorrowingResult {
  maxBorrowingAmount: number;
  monthlyRepayment: number;
  loanToIncomeRatio: number;
  debtServiceRatio: number;
  recommendedPurchasePrice: number;
  warnings: string[];
}

export default function BorrowingCapacityCalculatorPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Form inputs
  const [annualIncome, setAnnualIncome] = useState<string>('');
  const [partnerIncome, setPartnerIncome] = useState<string>('');
  const [monthlyExpenses, setMonthlyExpenses] = useState<string>('');
  const [existingDebts, setExistingDebts] = useState<string>('');
  const [deposit, setDeposit] = useState<string>('');
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [hasChildren, setHasChildren] = useState<boolean>(false);
  const [employmentType, setEmploymentType] = useState<string>('fulltime');

  const [result, setResult] = useState<BorrowingResult | null>(null);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const parseNumber = (value: string): number => {
    return parseFloat(value.replace(/[,$]/g, '')) || 0;
  };

  const formatNumberInput = (value: string): string => {
    const number = parseNumber(value);
    if (number === 0) return '';
    return number.toLocaleString('en-AU');
  };

  const calculateMonthlyRepayment = (principal: number, rate: number, years: number): number => {
    const monthlyRate = rate / 100 / 12;
    const numPayments = years * 12;
    return principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
  };

  const calculateBorrowingCapacity = (): BorrowingResult => {
    const totalAnnualIncome = parseNumber(annualIncome) + parseNumber(partnerIncome);
    const monthlyIncome = totalAnnualIncome / 12;
    const monthlyExpensesNum = parseNumber(monthlyExpenses);
    const existingDebtsNum = parseNumber(existingDebts);
    const depositNum = parseNumber(deposit);

    const warnings: string[] = [];

    // Employment type adjustments
    let incomeMultiplier = 1.0;
    if (employmentType === 'casual' || employmentType === 'contract') {
      incomeMultiplier = 0.8;
      warnings.push('Casual/contract employment may reduce borrowing capacity');
    } else if (employmentType === 'selfemployed') {
      incomeMultiplier = 0.7;
      warnings.push('Self-employment may require additional documentation and reduce borrowing capacity');
    }

    const adjustedMonthlyIncome = monthlyIncome * incomeMultiplier;

    // Calculate minimum living expenses (HEM - Household Expenditure Measure)
    let minimumExpenses = 2500; // Base HEM for single person
    if (parseNumber(partnerIncome) > 0) minimumExpenses += 1500; // Add for partner
    if (hasChildren) minimumExpenses += 1000; // Add for children

    // Use the higher of declared expenses or HEM
    const totalMonthlyExpenses = Math.max(monthlyExpensesNum, minimumExpenses);

    // Calculate net disposable income
    const netDisposableIncome = adjustedMonthlyIncome - totalMonthlyExpenses - existingDebtsNum;

    if (netDisposableIncome <= 0) {
      warnings.push('Insufficient income after expenses and existing debts');
      return {
        maxBorrowingAmount: 0,
        monthlyRepayment: 0,
        loanToIncomeRatio: 0,
        debtServiceRatio: 0,
        recommendedPurchasePrice: 0,
        warnings
      };
    }

    // Apply serviceability buffer (usually 3% above current rate)
    const assessmentRate = interestRate + 3.0;

    // Calculate maximum borrowing using serviceability
    let maxBorrowing = 0;
    let testAmount = 100000;
    const increment = 10000;

    // Binary search for maximum borrowing amount
    while (testAmount <= 2000000) {
      const monthlyRepayment = calculateMonthlyRepayment(testAmount, assessmentRate, loanTerm);
      const totalMonthlyCommitments = monthlyRepayment + existingDebtsNum;

      if (totalMonthlyCommitments <= netDisposableIncome * 0.8) { // 80% of net income rule
        maxBorrowing = testAmount;
        testAmount += increment;
      } else {
        break;
      }
    }

    // Apply loan-to-income ratio limit (usually 6x income)
    const incomeBasedLimit = totalAnnualIncome * 6;
    if (maxBorrowing > incomeBasedLimit) {
      maxBorrowing = incomeBasedLimit;
      warnings.push('Borrowing capacity limited by loan-to-income ratio (6x annual income)');
    }

    // Calculate actual monthly repayment at current rate
    const actualMonthlyRepayment = calculateMonthlyRepayment(maxBorrowing, interestRate, loanTerm);

    // Calculate ratios
    const loanToIncomeRatio = maxBorrowing / totalAnnualIncome;
    const debtServiceRatio = (actualMonthlyRepayment + existingDebtsNum) / adjustedMonthlyIncome;

    // Calculate recommended purchase price
    const recommendedPurchasePrice = maxBorrowing + depositNum;

    // Additional warnings
    if (depositNum < recommendedPurchasePrice * 0.2) {
      warnings.push('Consider saving a larger deposit (20%) to avoid Lenders Mortgage Insurance');
    }
    if (debtServiceRatio > 0.3) {
      warnings.push('Debt service ratio exceeds 30% - consider reducing expenses or existing debts');
    }
    if (totalAnnualIncome < 80000) {
      warnings.push('Lower income levels may require additional verification and documentation');
    }

    return {
      maxBorrowingAmount: maxBorrowing,
      monthlyRepayment: actualMonthlyRepayment,
      loanToIncomeRatio,
      debtServiceRatio,
      recommendedPurchasePrice,
      warnings
    };
  };

  useEffect(() => {
    if (parseNumber(annualIncome) > 0) {
      const result = calculateBorrowingCapacity();
      setResult(result);
    } else {
      setResult(null);
    }
  }, [annualIncome, partnerIncome, monthlyExpenses, existingDebts, deposit, interestRate, loanTerm, hasChildren, employmentType]);

  return (
    <>
      <OncomHeader />

      <main style={{
        paddingTop: isMobile ? '180px' : '200px',
        minHeight: '100vh',
        backgroundColor: '#fff'
      }}>
        {/* Hero Section */}
        <section style={{
          backgroundColor: '#f8f8f8',
          padding: isMobile ? '60px 20px' : '100px 0',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <h1 style={{
              fontSize: isMobile ? '36px' : '56px',
              fontWeight: '700',
              marginBottom: '24px',
              color: '#000',
              lineHeight: '1.1'
            }}>
              How Much Can I Borrow?
            </h1>
            <p style={{
              fontSize: isMobile ? '18px' : '24px',
              fontWeight: '300',
              maxWidth: '800px',
              margin: '0 auto',
              color: '#666',
              lineHeight: '1.5'
            }}>
              Calculate your maximum borrowing capacity based on your income, expenses, and financial situation
            </p>
          </div>
        </section>

        {/* Calculator Section */}
        <section style={{
          padding: isMobile ? '40px 20px' : '80px 40px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '40px' : '60px'
          }}>
            {/* Input Form */}
            <div style={{
              backgroundColor: '#fff',
              border: '1px solid #e5e5e5',
              borderRadius: '8px',
              padding: '40px'
            }}>
              <h2 style={{
                fontSize: '28px',
                fontWeight: '600',
                marginBottom: '30px',
                color: '#000'
              }}>
                Your Financial Details
              </h2>

              {/* Income Details */}
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '20px',
                  color: '#002b7f'
                }}>
                  Income Information
                </h3>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: '#333'
                  }}>
                    Your Annual Income (before tax)
                  </label>
                  <input
                    type="text"
                    value={annualIncome}
                    onChange={(e) => setAnnualIncome(formatNumberInput(e.target.value))}
                    placeholder="e.g. 80,000"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#002b7f'}
                    onBlur={(e) => e.target.style.borderColor = '#ddd'}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: '#333'
                  }}>
                    Partner's Annual Income (optional)
                  </label>
                  <input
                    type="text"
                    value={partnerIncome}
                    onChange={(e) => setPartnerIncome(formatNumberInput(e.target.value))}
                    placeholder="e.g. 65,000"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#002b7f'}
                    onBlur={(e) => e.target.style.borderColor = '#ddd'}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: '#333'
                  }}>
                    Employment Type
                  </label>
                  <select
                    value={employmentType}
                    onChange={(e) => setEmploymentType(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '16px',
                      outline: 'none',
                      backgroundColor: '#fff'
                    }}
                  >
                    <option value="fulltime">Full-time Employee</option>
                    <option value="parttime">Part-time Employee</option>
                    <option value="casual">Casual Employee</option>
                    <option value="contract">Contract Worker</option>
                    <option value="selfemployed">Self-employed</option>
                  </select>
                </div>
              </div>

              {/* Expenses & Commitments */}
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '20px',
                  color: '#002b7f'
                }}>
                  Monthly Expenses & Commitments
                </h3>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: '#333'
                  }}>
                    Monthly Living Expenses
                  </label>
                  <input
                    type="text"
                    value={monthlyExpenses}
                    onChange={(e) => setMonthlyExpenses(formatNumberInput(e.target.value))}
                    placeholder="e.g. 3,500"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#002b7f'}
                    onBlur={(e) => e.target.style.borderColor = '#ddd'}
                  />
                  <small style={{ color: '#666', fontSize: '12px' }}>
                    Include rent, groceries, utilities, transport, insurance, etc.
                  </small>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: '#333'
                  }}>
                    Existing Monthly Debt Payments
                  </label>
                  <input
                    type="text"
                    value={existingDebts}
                    onChange={(e) => setExistingDebts(formatNumberInput(e.target.value))}
                    placeholder="e.g. 800"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#002b7f'}
                    onBlur={(e) => e.target.style.borderColor = '#ddd'}
                  />
                  <small style={{ color: '#666', fontSize: '12px' }}>
                    Credit cards, personal loans, car loans, etc.
                  </small>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#333',
                    cursor: 'pointer'
                  }}>
                    <input
                      type="checkbox"
                      checked={hasChildren}
                      onChange={(e) => setHasChildren(e.target.checked)}
                      style={{
                        marginRight: '8px',
                        transform: 'scale(1.2)'
                      }}
                    />
                    Have dependent children
                  </label>
                </div>
              </div>

              {/* Loan Details */}
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '20px',
                  color: '#002b7f'
                }}>
                  Loan Details
                </h3>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: '#333'
                  }}>
                    Available Deposit
                  </label>
                  <input
                    type="text"
                    value={deposit}
                    onChange={(e) => setDeposit(formatNumberInput(e.target.value))}
                    placeholder="e.g. 150,000"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#002b7f'}
                    onBlur={(e) => e.target.style.borderColor = '#ddd'}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: '#333'
                  }}>
                    Interest Rate (%)
                  </label>
                  <select
                    value={interestRate}
                    onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '16px',
                      outline: 'none',
                      backgroundColor: '#fff'
                    }}
                  >
                    <option value={5.5}>5.5%</option>
                    <option value={6.0}>6.0%</option>
                    <option value={6.5}>6.5%</option>
                    <option value={7.0}>7.0%</option>
                    <option value={7.5}>7.5%</option>
                  </select>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: '#333'
                  }}>
                    Loan Term (years)
                  </label>
                  <select
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(parseInt(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '16px',
                      outline: 'none',
                      backgroundColor: '#fff'
                    }}
                  >
                    <option value={25}>25 years</option>
                    <option value={30}>30 years</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Results */}
            <div style={{
              backgroundColor: '#f8f8f8',
              border: '1px solid #e5e5e5',
              borderRadius: '8px',
              padding: '40px'
            }}>
              <h2 style={{
                fontSize: '28px',
                fontWeight: '600',
                marginBottom: '30px',
                color: '#000'
              }}>
                Your Borrowing Capacity
              </h2>

              {result && result.maxBorrowingAmount > 0 ? (
                <>
                  {/* Main Result */}
                  <div style={{
                    backgroundColor: '#fff',
                    padding: '30px',
                    borderRadius: '8px',
                    border: '3px solid #002b7f',
                    marginBottom: '30px',
                    textAlign: 'center'
                  }}>
                    <h3 style={{
                      fontSize: '20px',
                      fontWeight: '600',
                      marginBottom: '10px',
                      color: '#002b7f'
                    }}>
                      Maximum Borrowing Amount
                    </h3>
                    <div style={{
                      fontSize: '48px',
                      fontWeight: '700',
                      color: '#002b7f',
                      marginBottom: '10px'
                    }}>
                      {formatCurrency(result.maxBorrowingAmount)}
                    </div>
                    <div style={{
                      fontSize: '16px',
                      color: '#666'
                    }}>
                      Monthly repayment: {formatCurrency(result.monthlyRepayment)}
                    </div>
                  </div>

                  {/* Purchase Price */}
                  <div style={{
                    backgroundColor: '#e8f5e8',
                    padding: '20px',
                    borderRadius: '8px',
                    marginBottom: '30px',
                    textAlign: 'center'
                  }}>
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      marginBottom: '10px',
                      color: '#2e7d32'
                    }}>
                      Recommended Purchase Price Range
                    </h3>
                    <div style={{
                      fontSize: '24px',
                      fontWeight: '600',
                      color: '#2e7d32'
                    }}>
                      Up to {formatCurrency(result.recommendedPurchasePrice)}
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                    gap: '15px',
                    marginBottom: '30px'
                  }}>
                    <div style={{
                      backgroundColor: '#fff',
                      padding: '20px',
                      borderRadius: '8px',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '24px', fontWeight: '700', color: '#1976d2' }}>
                        {result.loanToIncomeRatio.toFixed(1)}x
                      </div>
                      <div style={{ fontSize: '14px', color: '#666' }}>
                        Loan-to-Income Ratio
                      </div>
                    </div>
                    <div style={{
                      backgroundColor: '#fff',
                      padding: '20px',
                      borderRadius: '8px',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '24px', fontWeight: '700', color: '#1976d2' }}>
                        {(result.debtServiceRatio * 100).toFixed(1)}%
                      </div>
                      <div style={{ fontSize: '14px', color: '#666' }}>
                        Debt Service Ratio
                      </div>
                    </div>
                  </div>

                  {/* Warnings */}
                  {result.warnings.length > 0 && (
                    <div style={{
                      backgroundColor: '#fff3cd',
                      border: '1px solid #ffeaa7',
                      borderRadius: '8px',
                      padding: '20px',
                      marginBottom: '30px'
                    }}>
                      <h3 style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        marginBottom: '15px',
                        color: '#856404'
                      }}>
                        Important Considerations:
                      </h3>
                      <ul style={{
                        margin: 0,
                        paddingLeft: '20px',
                        color: '#856404'
                      }}>
                        {result.warnings.map((warning, index) => (
                          <li key={index} style={{ marginBottom: '8px', fontSize: '14px' }}>
                            {warning}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : result && result.maxBorrowingAmount === 0 ? (
                <div style={{
                  backgroundColor: '#ffebee',
                  border: '1px solid #ffcdd2',
                  borderRadius: '8px',
                  padding: '30px',
                  textAlign: 'center'
                }}>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    marginBottom: '15px',
                    color: '#c62828'
                  }}>
                    Unable to Calculate Borrowing Capacity
                  </h3>
                  <p style={{ color: '#c62828', marginBottom: '0' }}>
                    Based on your current financial situation, you may need to reduce expenses,
                    increase income, or pay down existing debts before applying for a home loan.
                  </p>
                </div>
              ) : (
                <div style={{
                  textAlign: 'center',
                  padding: '40px 20px',
                  color: '#666'
                }}>
                  <p>Enter your income details to calculate your borrowing capacity</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section style={{
          backgroundColor: '#f0f0f0',
          padding: isMobile ? '40px 20px' : '60px 40px',
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '15px',
              color: '#333'
            }}>
              Important Information
            </h3>
            <p style={{
              fontSize: '14px',
              lineHeight: '1.6',
              color: '#666'
            }}>
              This calculator provides estimates only and is not a pre-approval or guarantee of lending.
              Actual borrowing capacity will depend on your individual circumstances, credit history, and lender criteria.
              Interest rates and lending criteria are subject to change. We strongly recommend speaking with a qualified
              mortgage broker or financial advisor for personalized advice.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}