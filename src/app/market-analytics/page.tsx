'use client';

import React, { useState, useEffect } from 'react';
import OncomHeader from '@/components/OncomHeader';

interface SuburbData {
  name: string;
  medianPrice: number;
  priceChange: number;
  medianRent: number;
  rentYield: number;
  daysOnMarket: number;
  auctionClearance: number;
  soldThisYear: number;
  population: number;
  schools: number;
}

export default function MarketAnalyticsPage() {
  const [selectedSuburb, setSelectedSuburb] = useState('Berwick');
  const [timeRange, setTimeRange] = useState<'3m' | '6m' | '1y' | '2y' | '5y'>('1y');
  const [propertyType, setPropertyType] = useState<'house' | 'unit' | 'land'>('house');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Sample data for suburbs
  const suburbsData: SuburbData[] = [
    {
      name: 'Berwick',
      medianPrice: 1050000,
      priceChange: 12.5,
      medianRent: 550,
      rentYield: 2.7,
      daysOnMarket: 28,
      auctionClearance: 78,
      soldThisYear: 245,
      population: 54158,
      schools: 12
    },
    {
      name: 'Narre Warren',
      medianPrice: 750000,
      priceChange: 8.3,
      medianRent: 480,
      rentYield: 3.3,
      daysOnMarket: 32,
      auctionClearance: 72,
      soldThisYear: 312,
      population: 30327,
      schools: 8
    },
    {
      name: 'Cranbourne',
      medianPrice: 680000,
      priceChange: 10.2,
      medianRent: 460,
      rentYield: 3.5,
      daysOnMarket: 35,
      auctionClearance: 69,
      soldThisYear: 428,
      population: 51659,
      schools: 10
    },
    {
      name: 'Pakenham',
      medianPrice: 620000,
      priceChange: 15.8,
      medianRent: 440,
      rentYield: 3.7,
      daysOnMarket: 38,
      auctionClearance: 65,
      soldThisYear: 389,
      population: 54118,
      schools: 9
    },
    {
      name: 'Officer',
      medianPrice: 720000,
      priceChange: 18.2,
      medianRent: 500,
      rentYield: 3.6,
      daysOnMarket: 30,
      auctionClearance: 74,
      soldThisYear: 156,
      population: 12000,
      schools: 3
    }
  ];

  const currentData = suburbsData.find(s => s.name === selectedSuburb) || suburbsData[0];

  // Sample price history data
  const priceHistory = [
    { month: 'Jan', price: 950000 },
    { month: 'Feb', price: 960000 },
    { month: 'Mar', price: 975000 },
    { month: 'Apr', price: 990000 },
    { month: 'May', price: 1010000 },
    { month: 'Jun', price: 1025000 },
    { month: 'Jul', price: 1030000 },
    { month: 'Aug', price: 1040000 },
    { month: 'Sep', price: 1045000 },
    { month: 'Oct', price: 1050000 }
  ];

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    }
    return `$${(value / 1000).toFixed(0)}K`;
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f8f8' }}>
      <OncomHeader />

      <main style={{
        paddingTop: isMobile ? '180px' : '200px'
      }}>
        {/* Header Section */}
        <section style={{
          backgroundColor: '#fff',
          borderBottom: '1px solid #e5e5e5',
          padding: isMobile ? '20px' : '32px 40px'
        }}>
          <div style={{
            maxWidth: '1440px',
            margin: '0 auto'
          }}>
            <h1 style={{
              fontSize: isMobile ? '28px' : '40px',
              fontWeight: '700',
              marginBottom: '8px',
              letterSpacing: '-0.02em'
            }}>
              Market Analytics Dashboard
            </h1>
            <p style={{
              fontSize: '16px',
              color: '#666'
            }}>
              Real-time property market insights for Casey & Cardinia
            </p>

            {/* Controls */}
            <div style={{
              display: 'flex',
              gap: '16px',
              marginTop: '24px',
              flexWrap: 'wrap'
            }}>
              {/* Suburb Selector */}
              <select
                value={selectedSuburb}
                onChange={(e) => setSelectedSuburb(e.target.value)}
                style={{
                  padding: '10px 16px',
                  border: '1px solid #e5e5e5',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  backgroundColor: '#fff'
                }}
              >
                {suburbsData.map(suburb => (
                  <option key={suburb.name} value={suburb.name}>
                    {suburb.name}
                  </option>
                ))}
              </select>

              {/* Property Type */}
              <div style={{ display: 'flex', gap: '4px' }}>
                {(['house', 'unit', 'land'] as const).map(type => (
                  <button
                    key={type}
                    onClick={() => setPropertyType(type)}
                    style={{
                      padding: '10px 16px',
                      border: '1px solid #e5e5e5',
                      borderRadius: type === 'house' ? '8px 0 0 8px' :
                                   type === 'land' ? '0 8px 8px 0' : '0',
                      backgroundColor: propertyType === type ? '#000' : '#fff',
                      color: propertyType === type ? '#fff' : '#000',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      textTransform: 'capitalize'
                    }}
                  >
                    {type === 'house' ? '🏠 House' :
                     type === 'unit' ? '🏢 Unit' :
                     '🏞️ Land'}
                  </button>
                ))}
              </div>

              {/* Time Range */}
              <div style={{ display: 'flex', gap: '4px' }}>
                {(['3m', '6m', '1y', '2y', '5y'] as const).map(range => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    style={{
                      padding: '10px 12px',
                      border: '1px solid #e5e5e5',
                      borderRadius: range === '3m' ? '8px 0 0 8px' :
                                   range === '5y' ? '0 8px 8px 0' : '0',
                      backgroundColor: timeRange === range ? '#002b7f' : '#fff',
                      color: timeRange === range ? '#fff' : '#000',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Key Metrics Grid */}
        <section style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: isMobile ? '20px' : '32px 40px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px'
          }}>
            {/* Median Price */}
            <div style={{
              backgroundColor: '#fff',
              padding: '24px',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'start',
                marginBottom: '12px'
              }}>
                <span style={{ fontSize: '14px', color: '#666' }}>Median Price</span>
                <span style={{
                  padding: '4px 8px',
                  backgroundColor: currentData.priceChange >= 0 ? '#e8f5e9' : '#ffebee',
                  color: currentData.priceChange >= 0 ? '#2e7d32' : '#c62828',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  {currentData.priceChange >= 0 ? '↑' : '↓'} {Math.abs(currentData.priceChange)}%
                </span>
              </div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#000' }}>
                {formatCurrency(currentData.medianPrice)}
              </div>
              <div style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>
                vs last year
              </div>
            </div>

            {/* Median Rent */}
            <div style={{
              backgroundColor: '#fff',
              padding: '24px',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>
                Median Rent
              </div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#000' }}>
                ${currentData.medianRent}
              </div>
              <div style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>
                per week
              </div>
            </div>

            {/* Days on Market */}
            <div style={{
              backgroundColor: '#fff',
              padding: '24px',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>
                Days on Market
              </div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#000' }}>
                {currentData.daysOnMarket}
              </div>
              <div style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>
                average days
              </div>
            </div>

            {/* Auction Clearance */}
            <div style={{
              backgroundColor: '#fff',
              padding: '24px',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>
                Auction Clearance
              </div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#000' }}>
                {currentData.auctionClearance}%
              </div>
              <div style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>
                clearance rate
              </div>
            </div>

            {/* Properties Sold */}
            <div style={{
              backgroundColor: '#fff',
              padding: '24px',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>
                Properties Sold
              </div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#000' }}>
                {currentData.soldThisYear}
              </div>
              <div style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>
                this year
              </div>
            </div>

            {/* Rental Yield */}
            <div style={{
              backgroundColor: '#fff',
              padding: '24px',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>
                Rental Yield
              </div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#000' }}>
                {currentData.rentYield}%
              </div>
              <div style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>
                gross yield
              </div>
            </div>
          </div>
        </section>

        {/* Price Chart Section */}
        <section style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: isMobile ? '0 20px 20px' : '0 40px 32px'
        }}>
          <div style={{
            backgroundColor: '#fff',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              marginBottom: '24px'
            }}>
              Price Trend - {selectedSuburb}
            </h2>

            {/* Simple Chart Visualization */}
            <div style={{
              height: '300px',
              position: 'relative',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              padding: '20px 0',
              borderLeft: '2px solid #e5e5e5',
              borderBottom: '2px solid #e5e5e5'
            }}>
              {priceHistory.map((point, index) => (
                <div
                  key={index}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    padding: '0 4px'
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      backgroundColor: '#002b7f',
                      borderRadius: '4px 4px 0 0',
                      height: `${(point.price / 1050000) * 250}px`,
                      position: 'relative',
                      transition: 'opacity 0.2s',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                  >
                    <div style={{
                      position: 'absolute',
                      top: '-20px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: '10px',
                      whiteSpace: 'nowrap',
                      display: 'none'
                    }}>
                      {formatCurrency(point.price)}
                    </div>
                  </div>
                  <span style={{
                    fontSize: '11px',
                    color: '#666',
                    marginTop: '8px'
                  }}>
                    {point.month}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Suburb Comparison */}
        <section style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: isMobile ? '0 20px 40px' : '0 40px 60px'
        }}>
          <div style={{
            backgroundColor: '#fff',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              marginBottom: '24px'
            }}>
              Suburb Comparison
            </h2>

            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse'
              }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e5e5e5' }}>
                    <th style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}>
                      Suburb
                    </th>
                    <th style={{
                      padding: '12px',
                      textAlign: 'right',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}>
                      Median Price
                    </th>
                    <th style={{
                      padding: '12px',
                      textAlign: 'right',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}>
                      Change
                    </th>
                    <th style={{
                      padding: '12px',
                      textAlign: 'right',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}>
                      Rent/Week
                    </th>
                    <th style={{
                      padding: '12px',
                      textAlign: 'right',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}>
                      Days on Market
                    </th>
                    <th style={{
                      padding: '12px',
                      textAlign: 'right',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}>
                      Sold YTD
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {suburbsData.map((suburb, index) => (
                    <tr
                      key={suburb.name}
                      style={{
                        borderBottom: '1px solid #f0f0f0',
                        backgroundColor: suburb.name === selectedSuburb ? '#f8f9fa' : 'transparent'
                      }}
                    >
                      <td style={{
                        padding: '16px 12px',
                        fontWeight: suburb.name === selectedSuburb ? '600' : '400'
                      }}>
                        {suburb.name}
                      </td>
                      <td style={{
                        padding: '16px 12px',
                        textAlign: 'right',
                        fontWeight: '600'
                      }}>
                        {formatCurrency(suburb.medianPrice)}
                      </td>
                      <td style={{
                        padding: '16px 12px',
                        textAlign: 'right'
                      }}>
                        <span style={{
                          color: suburb.priceChange >= 0 ? '#2e7d32' : '#c62828',
                          fontWeight: '600'
                        }}>
                          {suburb.priceChange >= 0 ? '+' : ''}{suburb.priceChange}%
                        </span>
                      </td>
                      <td style={{
                        padding: '16px 12px',
                        textAlign: 'right'
                      }}>
                        ${suburb.medianRent}
                      </td>
                      <td style={{
                        padding: '16px 12px',
                        textAlign: 'right'
                      }}>
                        {suburb.daysOnMarket}
                      </td>
                      <td style={{
                        padding: '16px 12px',
                        textAlign: 'right'
                      }}>
                        {suburb.soldThisYear}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Market Insights */}
        <section style={{
          backgroundColor: '#002b7f',
          color: '#fff',
          padding: isMobile ? '40px 20px' : '60px 40px'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: isMobile ? '28px' : '36px',
              fontWeight: '700',
              marginBottom: '16px'
            }}>
              Market Insights
            </h2>
            <p style={{
              fontSize: '18px',
              opacity: 0.9,
              marginBottom: '48px',
              maxWidth: '800px',
              margin: '0 auto 48px'
            }}>
              Get expert analysis and predictions for the Casey & Cardinia property market
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '32px'
            }}>
              <div>
                <div style={{
                  fontSize: '48px',
                  marginBottom: '16px'
                }}>
                  📈
                </div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '8px'
                }}>
                  Growth Areas
                </h3>
                <p style={{
                  fontSize: '14px',
                  opacity: 0.8
                }}>
                  Officer and Clyde showing strongest growth potential
                </p>
              </div>

              <div>
                <div style={{
                  fontSize: '48px',
                  marginBottom: '16px'
                }}>
                  🏗️
                </div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '8px'
                }}>
                  Infrastructure
                </h3>
                <p style={{
                  fontSize: '14px',
                  opacity: 0.8
                }}>
                  New schools and shopping centers driving demand
                </p>
              </div>

              <div>
                <div style={{
                  fontSize: '48px',
                  marginBottom: '16px'
                }}>
                  🚂
                </div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '8px'
                }}>
                  Transport
                </h3>
                <p style={{
                  fontSize: '14px',
                  opacity: 0.8
                }}>
                  Pakenham line upgrade improving connectivity
                </p>
              </div>
            </div>

            <button
              style={{
                marginTop: '48px',
                padding: '16px 32px',
                backgroundColor: '#fff',
                color: '#002b7f',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Download Full Market Report
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}