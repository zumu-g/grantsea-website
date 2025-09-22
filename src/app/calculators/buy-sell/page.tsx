'use client';

import React, { useState, useEffect } from 'react';
import OncomHeader from '@/components/OncomHeader';

interface CalculationResult {
  sellingCosts: {
    agentCommission: number;
    marketingCosts: number;
    legalFees: number;
    conveyancingFees: number;
    totalSellingCosts: number;
  };
  buyingCosts: {
    stampDuty: number;
    legalFees: number;
    inspectionFees: number;
    loanApplicationFees: number;
    lendersInsurance: number;
    removalistCosts: number;
    totalBuyingCosts: number;
  };
  netPosition: number;
  cashRequired: number;
}

export default function BuySellCalculatorPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Form inputs
  const [salePrice, setSalePrice] = useState<string>('');
  const [purchasePrice, setPurchasePrice] = useState<string>('');
  const [existingMortgage, setExistingMortgage] = useState<string>('');
  const [newMortgage, setNewMortgage] = useState<string>('');
  const [commissionRate, setCommissionRate] = useState<number>(2.5);
  const [isFirstHomeBuyer, setIsFirstHomeBuyer] = useState<boolean>(false);

  const [result, setResult] = useState<CalculationResult | null>(null);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const calculateStampDuty = (price: number, isFirstHomeBuyer: boolean): number => {
    // Victorian stamp duty calculator (simplified)
    if (isFirstHomeBuyer && price <= 600000) return 0;
    if (isFirstHomeBuyer && price <= 750000) {
      return Math.max(0, ((price - 600000) / 150000) * calculateFullStampDuty(price));
    }
    return calculateFullStampDuty(price);
  };

  const calculateFullStampDuty = (price: number): number => {
    if (price <= 25000) return price * 0.014;
    if (price <= 130000) return 350 + (price - 25000) * 0.024;
    if (price <= 960000) return 2870 + (price - 130000) * 0.06;
    return 52670 + (price - 960000) * 0.055;
  };

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

  const calculateResults = () => {
    const salePriceNum = parseNumber(salePrice);
    const purchasePriceNum = parseNumber(purchasePrice);
    const existingMortgageNum = parseNumber(existingMortgage);
    const newMortgageNum = parseNumber(newMortgage);

    if (salePriceNum === 0 || purchasePriceNum === 0) return;

    // Selling costs
    const agentCommission = salePriceNum * (commissionRate / 100);
    const marketingCosts = Math.min(5000, salePriceNum * 0.005); // ~0.5% up to $5k
    const legalFeesSellingNum = 1500;
    const conveyancingFeesNum = 800;
    const totalSellingCosts = agentCommission + marketingCosts + legalFeesSellingNum + conveyancingFeesNum;

    // Buying costs
    const stampDuty = calculateStampDuty(purchasePriceNum, isFirstHomeBuyer);
    const legalFeesBuyingNum = 1500;
    const inspectionFees = 600;
    const loanApplicationFees = newMortgageNum > 0 ? 600 : 0;
    const lendersInsurance = newMortgageNum > purchasePriceNum * 0.8 ? purchasePriceNum * 0.015 : 0;
    const removalistCosts = 2000;
    const totalBuyingCosts = stampDuty + legalFeesBuyingNum + inspectionFees + loanApplicationFees + lendersInsurance + removalistCosts;

    // Net position
    const saleProceeds = salePriceNum - totalSellingCosts - existingMortgageNum;
    const cashRequired = purchasePriceNum - newMortgageNum + totalBuyingCosts - saleProceeds;
    const netPosition = saleProceeds - totalBuyingCosts - (purchasePriceNum - newMortgageNum);

    setResult({
      sellingCosts: {
        agentCommission,
        marketingCosts,
        legalFees: legalFeesSellingNum,
        conveyancingFees: conveyancingFeesNum,
        totalSellingCosts,
      },
      buyingCosts: {
        stampDuty,
        legalFees: legalFeesBuyingNum,
        inspectionFees,
        loanApplicationFees,
        lendersInsurance,
        removalistCosts,
        totalBuyingCosts,
      },
      netPosition,
      cashRequired: Math.max(0, cashRequired),
    });
  };

  useEffect(() => {
    calculateResults();
  }, [salePrice, purchasePrice, existingMortgage, newMortgage, commissionRate, isFirstHomeBuyer]);

  return (
    <>
      <OncomHeader />

      <main style={{
        paddingTop: isMobile ? '90px' : '200px',
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
              Buy & Sell Calculator
            </h1>
            <p style={{
              fontSize: isMobile ? '18px' : '24px',
              fontWeight: '300',
              maxWidth: '800px',
              margin: '0 auto',
              color: '#666',
              lineHeight: '1.5'
            }}>
              Calculate the costs and cash requirements when selling your current home and buying a new one
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
                Property Details
              </h2>

              {/* Current Property Sale */}
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '20px',
                  color: '#002b7f'
                }}>
                  Current Property (Selling)
                </h3>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: '#333'
                  }}>
                    Expected Sale Price
                  </label>
                  <input
                    type="text"
                    value={salePrice}
                    onChange={(e) => setSalePrice(formatNumberInput(e.target.value))}
                    placeholder="e.g. 750,000"
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
                    Existing Mortgage Balance
                  </label>
                  <input
                    type="text"
                    value={existingMortgage}
                    onChange={(e) => setExistingMortgage(formatNumberInput(e.target.value))}
                    placeholder="e.g. 400,000"
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
                    Agent Commission Rate (%)
                  </label>
                  <select
                    value={commissionRate}
                    onChange={(e) => setCommissionRate(parseFloat(e.target.value))}
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
                    <option value={2.0}>2.0%</option>
                    <option value={2.2}>2.2%</option>
                    <option value={2.5}>2.5%</option>
                    <option value={2.8}>2.8%</option>
                    <option value={3.0}>3.0%</option>
                  </select>
                </div>
              </div>

              {/* New Property Purchase */}
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '20px',
                  color: '#002b7f'
                }}>
                  New Property (Buying)
                </h3>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: '#333'
                  }}>
                    Purchase Price
                  </label>
                  <input
                    type="text"
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(formatNumberInput(e.target.value))}
                    placeholder="e.g. 900,000"
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
                    New Mortgage Amount
                  </label>
                  <input
                    type="text"
                    value={newMortgage}
                    onChange={(e) => setNewMortgage(formatNumberInput(e.target.value))}
                    placeholder="e.g. 600,000"
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
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#333',
                    cursor: 'pointer'
                  }}>
                    <input
                      type="checkbox"
                      checked={isFirstHomeBuyer}
                      onChange={(e) => setIsFirstHomeBuyer(e.target.checked)}
                      style={{
                        marginRight: '8px',
                        transform: 'scale(1.2)'
                      }}
                    />
                    First Home Buyer
                  </label>
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
                Calculation Results
              </h2>

              {result ? (
                <>
                  {/* Selling Costs */}
                  <div style={{ marginBottom: '30px' }}>
                    <h3 style={{
                      fontSize: '20px',
                      fontWeight: '600',
                      marginBottom: '15px',
                      color: '#d32f2f'
                    }}>
                      Selling Costs
                    </h3>
                    <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                      <span>Agent Commission:</span>
                      <span>{formatCurrency(result.sellingCosts.agentCommission)}</span>
                    </div>
                    <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                      <span>Marketing Costs:</span>
                      <span>{formatCurrency(result.sellingCosts.marketingCosts)}</span>
                    </div>
                    <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                      <span>Legal Fees:</span>
                      <span>{formatCurrency(result.sellingCosts.legalFees)}</span>
                    </div>
                    <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between' }}>
                      <span>Conveyancing:</span>
                      <span>{formatCurrency(result.sellingCosts.conveyancingFees)}</span>
                    </div>
                    <div style={{
                      paddingTop: '15px',
                      borderTop: '2px solid #d32f2f',
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontWeight: '600',
                      fontSize: '18px'
                    }}>
                      <span>Total Selling Costs:</span>
                      <span>{formatCurrency(result.sellingCosts.totalSellingCosts)}</span>
                    </div>
                  </div>

                  {/* Buying Costs */}
                  <div style={{ marginBottom: '30px' }}>
                    <h3 style={{
                      fontSize: '20px',
                      fontWeight: '600',
                      marginBottom: '15px',
                      color: '#1976d2'
                    }}>
                      Buying Costs
                    </h3>
                    <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                      <span>Stamp Duty:</span>
                      <span>{formatCurrency(result.buyingCosts.stampDuty)}</span>
                    </div>
                    <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                      <span>Legal Fees:</span>
                      <span>{formatCurrency(result.buyingCosts.legalFees)}</span>
                    </div>
                    <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                      <span>Inspection Fees:</span>
                      <span>{formatCurrency(result.buyingCosts.inspectionFees)}</span>
                    </div>
                    <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                      <span>Loan Application:</span>
                      <span>{formatCurrency(result.buyingCosts.loanApplicationFees)}</span>
                    </div>
                    <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                      <span>LMI Premium:</span>
                      <span>{formatCurrency(result.buyingCosts.lendersInsurance)}</span>
                    </div>
                    <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between' }}>
                      <span>Moving Costs:</span>
                      <span>{formatCurrency(result.buyingCosts.removalistCosts)}</span>
                    </div>
                    <div style={{
                      paddingTop: '15px',
                      borderTop: '2px solid #1976d2',
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontWeight: '600',
                      fontSize: '18px'
                    }}>
                      <span>Total Buying Costs:</span>
                      <span>{formatCurrency(result.buyingCosts.totalBuyingCosts)}</span>
                    </div>
                  </div>

                  {/* Summary */}
                  <div style={{
                    backgroundColor: '#fff',
                    padding: '25px',
                    borderRadius: '8px',
                    border: '2px solid #002b7f'
                  }}>
                    <h3 style={{
                      fontSize: '24px',
                      fontWeight: '700',
                      marginBottom: '20px',
                      color: '#002b7f',
                      textAlign: 'center'
                    }}>
                      Cash Required
                    </h3>
                    <div style={{
                      fontSize: '36px',
                      fontWeight: '700',
                      textAlign: 'center',
                      color: result.cashRequired > 0 ? '#d32f2f' : '#388e3c'
                    }}>
                      {formatCurrency(result.cashRequired)}
                    </div>
                    {result.cashRequired > 0 && (
                      <p style={{
                        textAlign: 'center',
                        marginTop: '10px',
                        fontSize: '14px',
                        color: '#666'
                      }}>
                        Additional cash needed to complete the purchase
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <div style={{
                  textAlign: 'center',
                  padding: '40px 20px',
                  color: '#666'
                }}>
                  <p>Enter property details to see your calculation results</p>
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
              Important Disclaimer
            </h3>
            <p style={{
              fontSize: '14px',
              lineHeight: '1.6',
              color: '#666'
            }}>
              This calculator provides estimates only and should not be used as the sole basis for financial decisions.
              Actual costs may vary based on individual circumstances, market conditions, and specific lender requirements.
              We recommend consulting with a qualified financial advisor or mortgage broker for personalized advice.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}