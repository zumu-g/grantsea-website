'use client';

import React, { useState, useEffect } from 'react';
import OncomHeader from '@/components/OncomHeader';

interface StampDutyResult {
  stampDuty: number;
  landTransferDuty: number;
  totalCost: number;
  firstHomeBuyerSaving: number;
  breakdown: {
    threshold: string;
    rate: string;
    amount: number;
  }[];
}

export default function StampDutyCalculatorPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Form inputs
  const [propertyValue, setPropertyValue] = useState<string>('');
  const [isFirstHomeBuyer, setIsFirstHomeBuyer] = useState<boolean>(false);
  const [propertyType, setPropertyType] = useState<string>('house');
  const [state, setState] = useState<string>('VIC');

  const [result, setResult] = useState<StampDutyResult | null>(null);

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

  const calculateVICStampDuty = (value: number, isFirstHomeBuyer: boolean): StampDutyResult => {
    const breakdown: { threshold: string; rate: string; amount: number }[] = [];
    let totalStampDuty = 0;

    // Victorian stamp duty rates (2024)
    const thresholds = [
      { min: 0, max: 25000, rate: 1.4 },
      { min: 25001, max: 130000, rate: 2.4 },
      { min: 130001, max: 960000, rate: 6.0 },
      { min: 960001, max: Infinity, rate: 5.5 }
    ];

    let remainingValue = value;

    for (const threshold of thresholds) {
      if (remainingValue <= 0) break;

      const thresholdMin = threshold.min;
      const thresholdMax = Math.min(threshold.max, value);
      const taxableAmount = Math.min(remainingValue, thresholdMax - thresholdMin + (thresholdMin > 0 ? 1 : 0));

      if (taxableAmount > 0) {
        const stampDutyForThreshold = (taxableAmount * threshold.rate) / 100;
        totalStampDuty += stampDutyForThreshold;

        breakdown.push({
          threshold: thresholdMin === 0 ? `$0 - $${thresholdMax.toLocaleString()}` :
                    threshold.max === Infinity ? `$${thresholdMin.toLocaleString()}+` :
                    `$${thresholdMin.toLocaleString()} - $${thresholdMax.toLocaleString()}`,
          rate: `${threshold.rate}%`,
          amount: stampDutyForThreshold
        });

        remainingValue -= taxableAmount;
      }
    }

    // First Home Buyer concessions (Victoria)
    let firstHomeBuyerSaving = 0;
    let concessionStampDuty = totalStampDuty;

    if (isFirstHomeBuyer) {
      if (value <= 600000) {
        // Full exemption for properties up to $600,000
        concessionStampDuty = 0;
        firstHomeBuyerSaving = totalStampDuty;
      } else if (value <= 750000) {
        // Partial concession for properties between $600,001 - $750,000
        const concessionRate = (750000 - value) / 150000;
        concessionStampDuty = totalStampDuty * (1 - concessionRate);
        firstHomeBuyerSaving = totalStampDuty - concessionStampDuty;
      }
    }

    return {
      stampDuty: isFirstHomeBuyer ? concessionStampDuty : totalStampDuty,
      landTransferDuty: 0, // Victoria doesn't have separate land transfer duty
      totalCost: isFirstHomeBuyer ? concessionStampDuty : totalStampDuty,
      firstHomeBuyerSaving,
      breakdown
    };
  };

  const calculateResults = () => {
    const value = parseNumber(propertyValue);
    if (value === 0) {
      setResult(null);
      return;
    }

    // Currently only supporting Victoria
    if (state === 'VIC') {
      const result = calculateVICStampDuty(value, isFirstHomeBuyer);
      setResult(result);
    }
  };

  useEffect(() => {
    calculateResults();
  }, [propertyValue, isFirstHomeBuyer, propertyType, state]);

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
              Stamp Duty Calculator
            </h1>
            <p style={{
              fontSize: isMobile ? '18px' : '24px',
              fontWeight: '300',
              maxWidth: '800px',
              margin: '0 auto',
              color: '#666',
              lineHeight: '1.5'
            }}>
              Calculate stamp duty and government fees for your property purchase in Victoria
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

              <div style={{ marginBottom: '25px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#333'
                }}>
                  Property Value
                </label>
                <input
                  type="text"
                  value={propertyValue}
                  onChange={(e) => setPropertyValue(formatNumberInput(e.target.value))}
                  placeholder="e.g. 750,000"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '18px',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#002b7f'}
                  onBlur={(e) => e.target.style.borderColor = '#ddd'}
                />
              </div>

              <div style={{ marginBottom: '25px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#333'
                }}>
                  State/Territory
                </label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
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
                  <option value="VIC">Victoria</option>
                  <option value="NSW" disabled>NSW (Coming Soon)</option>
                  <option value="QLD" disabled>QLD (Coming Soon)</option>
                  <option value="SA" disabled>SA (Coming Soon)</option>
                  <option value="WA" disabled>WA (Coming Soon)</option>
                  <option value="TAS" disabled>TAS (Coming Soon)</option>
                  <option value="NT" disabled>NT (Coming Soon)</option>
                  <option value="ACT" disabled>ACT (Coming Soon)</option>
                </select>
              </div>

              <div style={{ marginBottom: '25px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#333'
                }}>
                  Property Type
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
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
                  <option value="house">House</option>
                  <option value="apartment">Apartment/Unit</option>
                  <option value="land">Vacant Land</option>
                  <option value="commercial">Commercial Property</option>
                </select>
              </div>

              <div style={{ marginBottom: '25px' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#333',
                  cursor: 'pointer',
                  padding: '12px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '4px',
                  border: '1px solid #e9ecef'
                }}>
                  <input
                    type="checkbox"
                    checked={isFirstHomeBuyer}
                    onChange={(e) => setIsFirstHomeBuyer(e.target.checked)}
                    style={{
                      marginRight: '12px',
                      transform: 'scale(1.3)'
                    }}
                  />
                  <div>
                    <div>I am a first home buyer</div>
                    <div style={{ fontSize: '12px', color: '#666', fontWeight: '400', marginTop: '4px' }}>
                      You may be eligible for stamp duty concessions or exemptions
                    </div>
                  </div>
                </label>
              </div>

              {isFirstHomeBuyer && (
                <div style={{
                  backgroundColor: '#e3f2fd',
                  border: '1px solid #bbdefb',
                  borderRadius: '8px',
                  padding: '16px',
                  marginBottom: '25px'
                }}>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: '#1565c0'
                  }}>
                    Victoria First Home Buyer Benefits:
                  </h4>
                  <ul style={{
                    margin: 0,
                    paddingLeft: '20px',
                    color: '#1565c0',
                    fontSize: '14px'
                  }}>
                    <li>Full stamp duty exemption for properties up to $600,000</li>
                    <li>Partial concession for properties $600,001 - $750,000</li>
                    <li>Conditions apply - you must not have owned property before</li>
                  </ul>
                </div>
              )}
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
                Stamp Duty Calculation
              </h2>

              {result ? (
                <>
                  {/* Total Cost */}
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
                      Total Stamp Duty
                    </h3>
                    <div style={{
                      fontSize: '48px',
                      fontWeight: '700',
                      color: '#002b7f',
                      marginBottom: result.firstHomeBuyerSaving > 0 ? '10px' : '0'
                    }}>
                      {formatCurrency(result.stampDuty)}
                    </div>
                    {result.firstHomeBuyerSaving > 0 && (
                      <div style={{
                        fontSize: '16px',
                        color: '#2e7d32',
                        fontWeight: '600'
                      }}>
                        You save: {formatCurrency(result.firstHomeBuyerSaving)}
                      </div>
                    )}
                  </div>

                  {/* First Home Buyer Savings */}
                  {result.firstHomeBuyerSaving > 0 && (
                    <div style={{
                      backgroundColor: '#e8f5e8',
                      border: '2px solid #4caf50',
                      borderRadius: '8px',
                      padding: '25px',
                      marginBottom: '30px',
                      textAlign: 'center'
                    }}>
                      <h3 style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        marginBottom: '10px',
                        color: '#2e7d32'
                      }}>
                        🎉 First Home Buyer Concession
                      </h3>
                      <div style={{
                        fontSize: '18px',
                        color: '#2e7d32',
                        marginBottom: '10px'
                      }}>
                        Standard stamp duty: <span style={{ textDecoration: 'line-through' }}>{formatCurrency(result.stampDuty + result.firstHomeBuyerSaving)}</span>
                      </div>
                      <div style={{
                        fontSize: '24px',
                        fontWeight: '700',
                        color: '#2e7d32'
                      }}>
                        Your stamp duty: {formatCurrency(result.stampDuty)}
                      </div>
                    </div>
                  )}

                  {/* Calculation Breakdown */}
                  <div style={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e5e5',
                    borderRadius: '8px',
                    padding: '25px',
                    marginBottom: '30px'
                  }}>
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      marginBottom: '20px',
                      color: '#333'
                    }}>
                      Calculation Breakdown
                    </h3>

                    <div style={{ marginBottom: '15px' }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontWeight: '600',
                        paddingBottom: '10px',
                        borderBottom: '1px solid #e5e5e5',
                        fontSize: '14px',
                        color: '#666'
                      }}>
                        <span>Value Range</span>
                        <span>Rate</span>
                        <span>Amount</span>
                      </div>
                    </div>

                    {result.breakdown.map((item, index) => (
                      <div key={index} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '8px 0',
                        borderBottom: index < result.breakdown.length - 1 ? '1px solid #f0f0f0' : 'none'
                      }}>
                        <span style={{ fontSize: '14px', color: '#333', flex: 1 }}>{item.threshold}</span>
                        <span style={{ fontSize: '14px', color: '#333', width: '60px', textAlign: 'center' }}>{item.rate}</span>
                        <span style={{ fontSize: '14px', color: '#333', width: '80px', textAlign: 'right' }}>
                          {formatCurrency(item.amount)}
                        </span>
                      </div>
                    ))}

                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      paddingTop: '15px',
                      marginTop: '15px',
                      borderTop: '2px solid #002b7f',
                      fontWeight: '600',
                      fontSize: '16px'
                    }}>
                      <span>Total Stamp Duty:</span>
                      <span>{formatCurrency(result.stampDuty + result.firstHomeBuyerSaving)}</span>
                    </div>

                    {result.firstHomeBuyerSaving > 0 && (
                      <>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          padding: '8px 0',
                          color: '#2e7d32',
                          fontWeight: '600'
                        }}>
                          <span>First Home Buyer Concession:</span>
                          <span>-{formatCurrency(result.firstHomeBuyerSaving)}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          paddingTop: '15px',
                          marginTop: '15px',
                          borderTop: '2px solid #2e7d32',
                          fontWeight: '700',
                          fontSize: '18px',
                          color: '#2e7d32'
                        }}>
                          <span>Amount Payable:</span>
                          <span>{formatCurrency(result.stampDuty)}</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Additional Information */}
                  <div style={{
                    backgroundColor: '#fff3cd',
                    border: '1px solid #ffeaa7',
                    borderRadius: '8px',
                    padding: '20px'
                  }}>
                    <h4 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      marginBottom: '10px',
                      color: '#856404'
                    }}>
                      Additional Costs to Consider:
                    </h4>
                    <ul style={{
                      margin: 0,
                      paddingLeft: '20px',
                      color: '#856404',
                      fontSize: '14px'
                    }}>
                      <li>Legal/conveyancing fees: $1,500 - $3,000</li>
                      <li>Building and pest inspections: $500 - $800</li>
                      <li>Loan application fees: $300 - $1,000</li>
                      <li>Lenders Mortgage Insurance (if deposit &lt; 20%)</li>
                      <li>Property insurance</li>
                    </ul>
                  </div>
                </>
              ) : (
                <div style={{
                  textAlign: 'center',
                  padding: '40px 20px',
                  color: '#666'
                }}>
                  <p>Enter a property value to calculate stamp duty</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Information Section */}
        <section style={{
          backgroundColor: '#f8f8f8',
          padding: isMobile ? '40px 20px' : '60px 40px'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '600',
              marginBottom: '30px',
              textAlign: 'center',
              color: '#000'
            }}>
              Understanding Stamp Duty in Victoria
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: '30px',
              marginBottom: '40px'
            }}>
              <div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '15px',
                  color: '#002b7f'
                }}>
                  What is Stamp Duty?
                </h3>
                <p style={{
                  fontSize: '16px',
                  lineHeight: '1.6',
                  color: '#666'
                }}>
                  Stamp duty is a state government tax charged on property purchases. In Victoria,
                  the rate varies based on the property value, with higher-value properties paying
                  a higher percentage.
                </p>
              </div>

              <div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '15px',
                  color: '#002b7f'
                }}>
                  When is it Due?
                </h3>
                <p style={{
                  fontSize: '16px',
                  lineHeight: '1.6',
                  color: '#666'
                }}>
                  Stamp duty must be paid within 30 days of signing the contract of sale.
                  Most buyers arrange for their solicitor or conveyancer to handle the payment
                  at settlement.
                </p>
              </div>
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
              This calculator provides estimates based on current Victorian stamp duty rates and is for
              general information only. Rates and concessions are subject to change. First home buyer
              eligibility has specific criteria that must be met. For accurate calculations and advice
              specific to your situation, consult with a qualified conveyancer or the State Revenue Office Victoria.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}